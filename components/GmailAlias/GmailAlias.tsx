"use client";

import { useState, useCallback } from "react";

function downloadAsTxt(aliases: string[], username: string) {
    const content = aliases.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username}_gmail_aliases.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default function GmailAlias() {
    const [email, setEmail] = useState("");
    const [aliases, setAliases] = useState<string[] | null>(null);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<{
        valid: boolean;
        username: string;
        totalAliases: number;
        charCount: number;
    } | null>(null);

    // Validate email on change via GET
    const handleEmailChange = useCallback(
        async (value: string) => {
            setEmail(value);
            setAliases(null);
            setError(null);
            setInfo(null);

            if (!value.trim()) return;

            try {
                const res = await fetch(
                    `/api/v2/alias/email/gmail?email=${encodeURIComponent(value.trim())}`
                );
                const data = await res.json();
                if (data.valid) {

                    setInfo({
                        valid: true,
                        username: data.username,
                        totalAliases: data.totalAliases,
                        charCount: data.charCount,
                    });
                } else {
                    if (value.trim().length > 2) {
                        setError(
                            "Please enter a valid Gmail address (e.g. yourname@gmail.com)."
                        );
                    }
                }
            } catch {
                // ignore fetch errors during typing
            }
        },
        []
    );

    // Generate aliases via POST
    const handleGenerate = useCallback(async () => {
        if (!info?.valid) return;
        setGenerating(true);
        setError(null);

        try {
            const res = await fetch("/api/v2/alias/email/gmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to generate aliases");
                return;
            }

            setAliases(data.aliases);
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setGenerating(false);
        }
    }, [info, email]);

    const handleDownload = useCallback(() => {
        if (aliases && info) downloadAsTxt(aliases, info.username);
    }, [aliases, info]);

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8 font-[var(--font-geist-sans)]">
            {/* ── Header ─────────────────────────────────── */}
            <div className="text-center flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Gmail Dot Alias Generator
                </h1>
                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                    Gmail ignores dots in usernames —{" "}
                    <span className="text-zinc-300 font-medium">a.rif</span> and{" "}
                    <span className="text-zinc-300 font-medium">ar.if</span> both deliver
                    to the same inbox. Enter your Gmail to see every possible dot-alias.
                </p>
            </div>

            {/* ── Input ──────────────────────────────────── */}
            <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />
                <div className="relative flex items-center rounded-2xl bg-zinc-900 border border-zinc-700/60 overflow-hidden shadow-lg shadow-black/30">
                    {/* mail icon */}
                    <div className="pl-5 pr-2 text-zinc-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>
                    <input
                        id="gmail-email-input"
                        type="text"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="you@gmail.com"
                        className="flex-1 py-4 px-2 bg-transparent text-white text-lg placeholder:text-zinc-600 outline-none"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    {email && (
                        <button
                            onClick={() => {
                                setEmail("");
                                setAliases(null);
                                setInfo(null);
                                setError(null);
                            }}
                            className="pr-5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                            aria-label="Clear input"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* ── Alias Count Card ──────────────────────── */}
            {info?.valid && (
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 p-6 flex flex-col gap-1 animate-[fadeSlide_0.35s_ease-out]">
                    <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
                        Possible Aliases
                    </p>
                    <p className="text-4xl font-black text-white tabular-nums">
                        {info.totalAliases.toLocaleString()}
                    </p>
                    <p className="text-zinc-400 text-sm mt-1">
                        Your Gmail{" "}
                        <span className="text-emerald-300 font-medium">
                            {info.username}@gmail.com
                        </span>{" "}
                        has{" "}
                        <span className="text-white font-semibold">{info.charCount}</span>{" "}
                        characters →{" "}
                        <span className="text-white font-semibold">
                            {info.charCount - 1}
                        </span>{" "}
                        dot positions → 2<sup>{info.charCount - 1}</sup> ={" "}
                        <span className="text-emerald-300 font-semibold">
                            {info.totalAliases.toLocaleString()}
                        </span>{" "}
                        aliases
                    </p>
                </div>
            )}

            {/* ── Error/Invalid Feedback ─────────────────── */}
            {error && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-sm animate-[fadeSlide_0.35s_ease-out]">
                    {error}
                </div>
            )}

            {/* ── Generate Button ─────────────────────────── */}
            {info?.valid && !aliases && (
                <button
                    id="gmail-generate-btn"
                    onClick={handleGenerate}
                    disabled={generating || info.totalAliases > 1048576}
                    className="relative w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.015] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {generating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Generating…
                        </span>
                    ) : info.totalAliases > 1048576 ? (
                        "Username too long (over 1M aliases)"
                    ) : (
                        `Generate All ${info.totalAliases.toLocaleString()} Aliases`
                    )}
                </button>
            )}

            {/* ── Results ─────────────────────────────────── */}
            {aliases && (
                <div className="flex flex-col gap-4 animate-[fadeSlide_0.35s_ease-out]">
                    {/* Download bar */}
                    <div className="flex items-center justify-between rounded-2xl bg-zinc-900 border border-zinc-700/60 p-4">
                        <p className="text-sm text-zinc-400">
                            <span className="text-white font-semibold">
                                {aliases.length.toLocaleString()}
                            </span>{" "}
                            aliases generated
                        </p>
                        <button
                            id="gmail-download-btn"
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download .txt
                        </button>
                    </div>

                    {/* Preview list */}
                    <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden">
                        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                                Preview
                            </p>
                            <p className="text-xs text-zinc-600">
                                Showing {Math.min(aliases.length, 50)} of{" "}
                                {aliases.length.toLocaleString()}
                            </p>
                        </div>
                        <ul className="max-h-80 overflow-y-auto divide-y divide-zinc-800/60 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {aliases.slice(0, 50).map((alias, i) => (
                                <li
                                    key={i}
                                    className="px-5 py-2.5 text-sm font-mono text-zinc-300 hover:bg-zinc-800/50 transition-colors flex items-center gap-3"
                                >
                                    <span className="text-zinc-600 text-xs w-8 text-right tabular-nums">
                                        {i + 1}.
                                    </span>
                                    {alias}
                                </li>
                            ))}
                        </ul>
                        {aliases.length > 50 && (
                            <div className="px-5 py-3 border-t border-zinc-800 text-center text-xs text-zinc-500">
                                … and {(aliases.length - 50).toLocaleString()} more — download
                                the .txt file to see all
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Keyframe animation ────── */}
            <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
