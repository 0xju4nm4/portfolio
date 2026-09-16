"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { LANGUAGES, INTRO_TEXT, UI_TEXT, type LangCode } from "@/lib/translations";

const CHARS_PER_TICK = 2;
const TICK_MS = 30;
const RESPONSE_CHARS_PER_TICK = 2;
const RESPONSE_TICK_MS = 30;

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenCapableDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

const isFullscreenActive = (): boolean => {
  const doc = document as FullscreenCapableDocument;
  return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
};

const requestFullscreen = (): void => {
  const el = document.documentElement as FullscreenCapableElement;
  const request = el.requestFullscreen ?? el.webkitRequestFullscreen;
  if (!request) return;
  try {
    const result = request.call(el);
    if (result instanceof Promise) result.catch(() => {});
  } catch {
    // Blocked by permissions policy or unsupported (iOS Safari). Not fatal.
  }
};

const leaveFullscreen = (): void => {
  const doc = document as FullscreenCapableDocument;
  const exit = doc.exitFullscreen ?? doc.webkitExitFullscreen;
  if (!exit) return;
  try {
    const result = exit.call(doc);
    if (result instanceof Promise) result.catch(() => {});
  } catch {
    // Nothing to do if the browser refuses.
  }
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function HackerTyper() {
  const [lang, setLang] = useState<LangCode>("en");
  const [started, setStarted] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const introText = INTRO_TEXT[lang];
  const isFinished = charIndex >= introText.length;

  // Chat state
  const [chatReady, setChatReady] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Response animation state
  const [fullResponse, setFullResponse] = useState("");
  const [responseCharIndex, setResponseCharIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const responseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Intro zoom-out transition
  const [introZoomOut, setIntroZoomOut] = useState(false);
  const [introHidden, setIntroHidden] = useState(false);

  // Language dropdown
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Latest Q&A to display (only the most recent)
  const latestQuestion = messages.length >= 2 ? messages[messages.length - 2] : null;
  const latestAnswer = messages.length >= 1 && messages[messages.length - 1].role === "assistant" ? messages[messages.length - 1] : null;

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStart = useCallback(() => {
    if (started) return;
    setStarted(true);
    // The first click or keypress is the user gesture fullscreen needs.
    requestFullscreen();
  }, [started]);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreenActive()) leaveFullscreen();
    else requestFullscreen();
  }, []);

  // iOS Safari ignores interactive-widget and does not shrink dvh for the
  // keyboard, so drive the height off the visual viewport instead.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const syncHeight = () => {
      document.documentElement.style.setProperty("--app-height", `${vv.height}px`);
    };
    syncHeight();
    vv.addEventListener("resize", syncHeight);
    vv.addEventListener("scroll", syncHeight);
    return () => {
      vv.removeEventListener("resize", syncHeight);
      vv.removeEventListener("scroll", syncHeight);
    };
  }, []);

  // Keep the indicator in sync with Escape and the browser's own controls
  useEffect(() => {
    const sync = () => setIsFullscreen(isFullscreenActive());
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  // Handle language change — reset intro animation
  const handleLangChange = useCallback((newLang: LangCode) => {
    setLangOpen(false);
    if (newLang === lang) return;
    setLang(newLang);
    setCharIndex(0);
    setChatReady(false);
    setIntroZoomOut(false);
    setIntroHidden(false);
    setMessages([]);
    setInput("");
    setFullResponse("");
    setResponseCharIndex(0);
    setIsAnimating(false);
    setIsStreaming(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (responseIntervalRef.current) clearInterval(responseIntervalRef.current);
    // Re-trigger the typing animation
    if (started) {
      setStarted(false);
      setTimeout(() => setStarted(true), 50);
    }
  }, [lang, started]);

  // Listen for first keypress or click
  useEffect(() => {
    if (started) return;

    const onKey = (e: KeyboardEvent) => {
      if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape"].includes(e.key)) return;
      e.preventDefault();
      handleStart();
    };
    const onClick = () => handleStart();

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [started, handleStart]);

  // Auto-type the entire content once started
  useEffect(() => {
    if (!started || isFinished) return;

    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        const next = Math.min(prev + CHARS_PER_TICK, introText.length);
        if (next >= introText.length && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, isFinished, introText.length]);

  // When intro animation finishes, enable chat
  useEffect(() => {
    if (isFinished && !chatReady) {
      const timer = setTimeout(() => {
        setChatReady(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isFinished, chatReady]);

  // Focus input when chat becomes ready or animation finishes.
  // Skipped on touch, where it would throw the keyboard up uninvited.
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer && chatReady && !isAnimating && !isStreaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatReady, isAnimating, isStreaming]);

  // Auto-scroll: follow text as it types (intro + chat responses)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [charIndex, responseCharIndex, messages, chatReady]);

  // Animate the response with typewriter effect
  useEffect(() => {
    if (!fullResponse || !isAnimating) return;

    responseIntervalRef.current = setInterval(() => {
      setResponseCharIndex((prev) => {
        const next = Math.min(prev + RESPONSE_CHARS_PER_TICK, fullResponse.length);
        if (next >= fullResponse.length && responseIntervalRef.current) {
          clearInterval(responseIntervalRef.current);
          setIsAnimating(false);
          // Update the actual message with the full content
          setMessages((prev) => {
            const updated = prev.map((m, idx) =>
              idx === prev.length - 1 && m.role === "assistant"
                ? { ...m, content: fullResponse }
                : m
            );
            return updated;
          });
        }
        return next;
      });
    }, RESPONSE_TICK_MS);

    return () => {
      if (responseIntervalRef.current) clearInterval(responseIntervalRef.current);
    };
  }, [fullResponse, isAnimating]);

  // Send message to AI
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming || isAnimating) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    // Keep history for API context but only display the latest
    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);
    setFullResponse("");
    setResponseCharIndex(0);

    // Trigger zoom-out on intro if this is the first message
    if (!introHidden) {
      setIntroZoomOut(true);
      setTimeout(() => {
        setIntroHidden(true);
      }, 600);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      let accumulated = "";
      let done = false;
      while (!done) {
        const result = await reader.read();
        done = result.done;
        if (result.value) {
          const text = decoder.decode(result.value, { stream: !done });
          accumulated += text;
        }
      }

      // Got the full response — now animate it
      setFullResponse(accumulated);
      setResponseCharIndex(0);
      setIsAnimating(true);
    } catch {
      setFullResponse("[Error: Could not reach Juan AI. Try again later.]");
      setResponseCharIndex(0);
      setIsAnimating(true);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const showChatMode = chatReady && introHidden && (latestQuestion || isStreaming);
  const isIdleEmpty = !input && !isStreaming && !isAnimating;

  const handleBack = useCallback(() => {
    setIntroZoomOut(false);
    setIntroHidden(false);
  }, []);

  return (
    <div
      className="flex flex-col w-full max-w-full overflow-x-hidden"
      style={{ height: "var(--app-height, 100dvh)" }}
    >
      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Language dropdown — top right */}
      <div ref={langRef} className="absolute top-3 right-3 z-50 font-mono text-xs">
        <button
          onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}
          className="flex items-center gap-1.5 px-2 py-1 border border-[var(--color-green)]/40 bg-[var(--color-bg)] text-[var(--color-green)] hover:border-[var(--color-green)] transition-colors"
        >
          <span>{LANGUAGES.find((l) => l.code === lang)?.label}</span>
          <span className="text-[10px] opacity-50">{langOpen ? "▲" : "▼"}</span>
        </button>
        {langOpen && (
          <div className="absolute right-0 mt-1 border border-[var(--color-green)]/40 bg-[var(--color-bg)] min-w-[120px]">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={(e) => { e.stopPropagation(); handleLangChange(l.code); }}
                className={`block w-full text-left px-3 py-1.5 transition-colors ${
                  lang === l.code
                    ? "text-[var(--color-green)] bg-[var(--color-green)]/10"
                    : "text-[var(--color-green)]/50 hover:text-[var(--color-green)] hover:bg-[var(--color-green)]/5"
                }`}
              >
                <span className="inline-block w-8">{l.label}</span>
                <span className="opacity-60">{l.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content area */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-8 pt-12 sm:pt-6 pb-4 sm:pb-6 crt-glow"
        style={{ fontSize: "clamp(14px, 1.5vw, 20px)", lineHeight: "1.7" }}
      >
        <div className="w-full max-w-full">
        {started ? (
          <>
            {!showChatMode ? (
              <div
                className={`transition-all duration-500 ease-in origin-center ${
                  introZoomOut ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                {/* Intro text */}
                <pre className="whitespace-pre-wrap wrap-anywhere font-mono text-[var(--color-green)]">
                  {introText.slice(0, charIndex)}
                  {!isFinished && <span className="cursor-blink text-[var(--color-green)]">&#9608;</span>}
                </pre>

                {/* Intro ends with a quiet handoff to the chat */}
                {chatReady && (
                  <p className="mt-8 font-mono text-[var(--color-green)] opacity-40">
                    ── {UI_TEXT[lang].online} ──
                  </p>
                )}
              </div>
            ) : (
              /* Chat mode — only show the latest question & animated response */
              <div className="font-mono animate-fade-in">
                {/* Back button */}
                <button
                  onClick={handleBack}
                  className="mb-4 text-[var(--color-green)] opacity-40 hover:opacity-80 transition-opacity font-mono text-sm"
                >
                  ← {UI_TEXT[lang].back}
                </button>

                {/* Latest question */}
                {latestQuestion && (
                  <div className="mb-6 text-[var(--color-green)] wrap-anywhere">
                    <span className="opacity-60">&gt; </span>
                    {latestQuestion.content}
                  </div>
                )}

                {/* Animated response */}
                {(isStreaming || isAnimating || latestAnswer) && (
                  <pre className="whitespace-pre-wrap wrap-anywhere font-mono text-[var(--color-green)] opacity-80">
                    {isStreaming ? (
                      <span className="cursor-blink">&#9608;</span>
                    ) : isAnimating ? (
                      <>
                        {fullResponse.slice(0, responseCharIndex)}
                        <span className="cursor-blink">&#9608;</span>
                      </>
                    ) : (
                      latestAnswer?.content
                    )}
                  </pre>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-40">
            <p className="text-2xl sm:text-3xl mb-3">Hi!</p>
            <p className="text-sm sm:text-base">
              Do something
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Input area: a bare terminal prompt. The blinking block is the affordance. */}
      {chatReady && (
        <div
          className="shrink-0 px-4 sm:px-8 bg-[var(--color-bg)]"
          style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}
        >
          <form
            onSubmit={handleSubmit}
            onClick={() => inputRef.current?.focus()}
            className={`w-full flex items-center gap-2 py-2 font-mono cursor-text transition-opacity duration-300 ${
              isStreaming || isAnimating ? "opacity-40" : "opacity-100"
            }`}
          >
            <span className="shrink-0 text-[var(--color-green)] opacity-60">&gt;</span>
            <div className="relative flex-1 min-w-0">
              {isIdleEmpty && (
                <div className="pointer-events-none absolute inset-0 flex items-center text-[var(--color-green)]">
                  <span className="cursor-blink">&#9608;</span>
                  <span className="ml-2 opacity-30">{UI_TEXT[lang].placeholder}</span>
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming || isAnimating}
                placeholder={isStreaming || isAnimating ? UI_TEXT[lang].thinking : ""}
                aria-label={UI_TEXT[lang].placeholder}
                className={`w-full bg-transparent text-[var(--color-green)] outline-none border-none font-mono placeholder:text-[var(--color-green)] placeholder:opacity-30 ${
                  isIdleEmpty ? "caret-transparent" : "caret-[var(--color-green)]"
                }`}
                style={{ fontSize: "inherit" }}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
        </div>
      )}

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[var(--color-green)] bg-[var(--color-bg)] px-4 sm:px-8">
        <div className="w-full flex items-center justify-between gap-4 py-2 text-xs sm:text-sm font-mono text-[var(--color-green)]">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap min-w-0">
            <a href="mailto:juan.villarraza@gmail.com" className="hover:underline">Email</a>
            <a href="https://linkedin.com/in/juan-manuel-villarraza-646958151" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <a href="https://github.com/0xju4nm4" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="https://t.me/ju4nm4_dev" target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram</a>
            <a href="https://palpito.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Pálpito</a>
            <span className="opacity-40 hidden sm:inline">Buenos Aires, Argentina</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:block opacity-60">
              {chatReady ? "Juan AI" : started ? `${Math.round((charIndex / introText.length) * 100)}%` : ""}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              title={UI_TEXT[lang].fullscreen}
              aria-label={UI_TEXT[lang].fullscreen}
              className={`transition-opacity ${isFullscreen ? "opacity-70" : "opacity-30"} hover:opacity-100`}
            >
              &#9974;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
