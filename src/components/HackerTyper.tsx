"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { LANGUAGES, INTRO_TEXT, UI_TEXT, type LangCode } from "@/lib/translations";

const CHARS_PER_TICK = 2;
const TICK_MS = 30;
const RESPONSE_CHARS_PER_TICK = 2;
const RESPONSE_TICK_MS = 30;

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

  const handleStart = useCallback(() => {
    if (started) return;
    setStarted(true);
  }, [started]);

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

  // Focus input when chat becomes ready or animation finishes
  useEffect(() => {
    if ((chatReady && !isAnimating && !isStreaming) && inputRef.current) {
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

  return (
    <div className="flex flex-col h-dvh w-dvw overflow-x-hidden">
      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Language dropdown — top right */}
      <div ref={langRef} className="absolute top-3 right-3 z-50 font-mono text-xs">
        <button
          onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}
          className="flex items-center gap-1.5 px-2 py-1 border border-[var(--color-green)]/40 text-[var(--color-green)] hover:border-[var(--color-green)] transition-colors"
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
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 crt-glow"
        style={{ fontSize: "clamp(13px, 1.4vw, 18px)", lineHeight: "1.6" }}
      >
        {started ? (
          <>
            {!showChatMode ? (
              <div
                className={`transition-all duration-500 ease-in origin-center ${
                  introZoomOut ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                {/* Intro text */}
                <pre className="whitespace-pre-wrap break-words font-mono text-[var(--color-green)]">
                  {introText.slice(0, charIndex)}
                  {!isFinished && <span className="cursor-blink text-[var(--color-green)]">&#9608;</span>}
                </pre>

                {/* Prompt appears after intro finishes */}
                {chatReady && (
                  <div className="mt-8 pt-6">
                    <p className="text-[var(--color-green)] opacity-50 mb-4 font-mono">
                      ── {UI_TEXT[lang].online} ──
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Chat mode — only show the latest question & animated response */
              <div className="font-mono animate-fade-in">
                {/* Latest question */}
                {latestQuestion && (
                  <div className="mb-6 text-[var(--color-green)]">
                    <span className="opacity-60">&gt; </span>
                    {latestQuestion.content}
                  </div>
                )}

                {/* Animated response */}
                {(isStreaming || isAnimating || latestAnswer) && (
                  <pre className="whitespace-pre-wrap break-words font-mono text-[var(--color-green)] opacity-80">
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
          </div>
        )}
      </div>

      {/* Fixed input area — always visible when chat is ready */}
      {chatReady && (
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-[var(--color-bg)]" style={{ fontSize: "clamp(13px, 1.4vw, 18px)" }}>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono">
            <span className="text-[var(--color-green)] opacity-60">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isStreaming || isAnimating}
              placeholder={UI_TEXT[lang].placeholder}
              className="flex-1 bg-transparent text-[var(--color-green)] outline-none border-none font-mono placeholder:text-[var(--color-green)] placeholder:opacity-30 caret-[var(--color-green)]"
              style={{ fontSize: "inherit" }}
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-green)] text-xs sm:text-sm font-mono text-[var(--color-green)] bg-[var(--color-bg)] shrink-0">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <a href="mailto:juan@tntlabs.xyz" className="hover:underline">Email</a>
          <a href="https://linkedin.com/in/juan-manuel-villarraza-646958151" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          <a href="https://github.com/0xju4nm4" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://tntlabs.xyz" target="_blank" rel="noopener noreferrer" className="hover:underline">TNT Labs</a>
          <span className="opacity-40 hidden sm:inline">Buenos Aires, Argentina</span>
        </div>
        <div className="hidden sm:block opacity-60">
          {chatReady ? "Juan AI" : started ? `${Math.round((charIndex / introText.length) * 100)}%` : ""}
        </div>
      </div>
    </div>
  );
}
