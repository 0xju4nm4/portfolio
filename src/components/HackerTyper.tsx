"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

Let's talk:
  juan@tntlabs.xyz
  linkedin.com/in/juan-manuel-villarraza-646958151
  github.com/0xju4nm4
`;

const CHARS_PER_TICK = 2;
const TICK_MS = 30;

export default function HackerTyper() {
  const [started, setStarted] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFinished = charIndex >= PORTFOLIO_CODE.length;

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

  // Auto-scroll to bottom as text appears
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [charIndex]);

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Main code area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 pb-16 crt-glow"
        style={{ fontSize: "clamp(13px, 1.4vw, 18px)", lineHeight: "1.6" }}
      >
        {started ? (
          <pre className="whitespace-pre-wrap break-words font-mono text-[var(--color-green)]">
            {PORTFOLIO_CODE.slice(0, charIndex)}
            {!isFinished && <span className="cursor-blink text-[var(--color-green)]">&#9608;</span>}
          </pre>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-40">
            <p className="text-2xl sm:text-3xl mb-3">Hi!</p>
            <p className="text-sm">Press any key or click anywhere</p>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-green)] text-xs sm:text-sm font-mono text-[var(--color-green)] bg-[var(--color-bg)] shrink-0">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <a href="mailto:juan@tntlabs.xyz" className="hover:underline">Email</a>
          <a href="https://linkedin.com/in/juan-manuel-villarraza-646958151" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          <a href="https://github.com/0xju4nm4" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://tntlabs.xyz" target="_blank" rel="noopener noreferrer" className="hover:underline">tntlabs.xyz</a>
          <span className="opacity-40 hidden sm:inline">Buenos Aires, Argentina</span>
        </div>
        <div className="hidden sm:block opacity-60">
          {started ? `${Math.round((charIndex / PORTFOLIO_CODE.length) * 100)}%` : ""}
        </div>
      </div>
    </div>
  );
}
