"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";

// ── Brief intro — the sell ────────────────────────────────────────────
const PORTFOLIO_CODE = `> Hey, I'm Juan Manuel Villarraza.

CTO at tntlabs.xyz — my own company.
Staff Engineer & Architect based in Buenos Aires.
I build things that move value across blockchains
— and I make them feel simple.

Most recently at Squid, where I built and scaled
cross-chain routing infrastructure from the ground up.
Hundreds of recurrent users, low latency, elegant
architecture — designed to last, not just to ship.

Before that, I led frontend teams in crypto fintech,
built OTC trading desks, shipped NFT marketplaces
end-to-end, and built UI at Globant and Mercado Libre
for millions of users.

I've been writing code professionally since 2017.
Bachelor's in Computer Science from Universidad
Nacional de Rosario. Went from junior dev at a small
fintech in Rosario to staff engineer on a globally
distributed team — and now CTO of my own.

What I'm good at:

  → Designing systems that scale without losing clarity
  → Leading teams while staying hands-on
  → Bridging the gap between product vision and code
  → Making Web3 accessible to Web2 developers
  → Mentoring engineers and raising the bar

I speak at Ethereum conferences.
I think in systems, but I ship in sprints.
I care about the craft, the team, and the user.

Let's talk juan@tntlabs.xyz
`;

const CHARS_PER_TICK = 2;
const TICK_MS = 30;
const RESPONSE_CHARS_PER_TICK = 2;
const RESPONSE_TICK_MS = 30;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function HackerTyper() {
  const [started, setStarted] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFinished = charIndex >= PORTFOLIO_CODE.length;

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

  // Latest Q&A to display (only the most recent)
  const latestQuestion = messages.length >= 2 ? messages[messages.length - 2] : null;
  const latestAnswer = messages.length >= 1 && messages[messages.length - 1].role === "assistant" ? messages[messages.length - 1] : null;

  const handleStart = useCallback(() => {
    if (started) return;
    setStarted(true);
  }, [started]);

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
        const next = Math.min(prev + CHARS_PER_TICK, PORTFOLIO_CODE.length);
        if (next >= PORTFOLIO_CODE.length && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, isFinished]);

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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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

  return (
    <div className="flex flex-col h-dvh w-dvw overflow-x-hidden">
      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Main code area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 pb-16 crt-glow"
        style={{ fontSize: "clamp(13px, 1.4vw, 18px)", lineHeight: "1.6" }}
      >
        {started ? (
          <>
            {/* Show intro animation OR chat */}
            {!chatReady || (!latestQuestion && !isStreaming) ? (
              <>
                {/* Intro text */}
                <pre className="whitespace-pre-wrap break-words font-mono text-[var(--color-green)]">
                  {PORTFOLIO_CODE.slice(0, charIndex)}
                  {!isFinished && <span className="cursor-blink text-[var(--color-green)]">&#9608;</span>}
                </pre>

                {/* Prompt appears after intro finishes */}
                {chatReady && (
                  <div className="mt-8 pt-6">
                    <p className="text-[var(--color-green)] opacity-50 mb-4 font-mono">
                      ── Juan AI is online. Ask me anything. ──
                    </p>
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono mt-4">
                      <span className="text-[var(--color-green)] opacity-60">&gt;</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isStreaming || isAnimating}
                        placeholder="ask juan anything..."
                        className="flex-1 bg-transparent text-[var(--color-green)] outline-none border-none font-mono placeholder:text-[var(--color-green)] placeholder:opacity-30 caret-[var(--color-green)]"
                        style={{ fontSize: "inherit" }}
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </form>
                  </div>
                )}
              </>
            ) : (
              /* Chat mode — only show the latest question & animated response */
              <div className="font-mono">
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

                {/* Input for next question — shows after animation finishes */}
                {!isStreaming && !isAnimating && latestAnswer && (
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono mt-8 pt-6">
                    <span className="text-[var(--color-green)] opacity-60">&gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isStreaming || isAnimating}
                      placeholder="ask juan anything..."
                      className="flex-1 bg-transparent text-[var(--color-green)] outline-none border-none font-mono placeholder:text-[var(--color-green)] placeholder:opacity-30 caret-[var(--color-green)]"
                      style={{ fontSize: "inherit" }}
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </form>
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
          {chatReady ? "Juan AI" : started ? `${Math.round((charIndex / PORTFOLIO_CODE.length) * 100)}%` : ""}
        </div>
      </div>
    </div>
  );
}
