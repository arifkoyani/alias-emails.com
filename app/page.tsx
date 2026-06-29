"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-8rem)] bg-zinc-950 font-sans px-4">
      {/* Hero */}
      <div className="text-center flex flex-col gap-3 mb-12 max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Generate Email{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Aliases
          </span>{" "}
          Instantly
        </h1>
        <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
          Create unique email variations that all deliver to your inbox.
          Perfect for organizing signups, filtering spam, and tracking services.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Gmail Card */}
        <Link href="/gmail-alias" className="group">
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 flex flex-col gap-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] cursor-pointer overflow-hidden">
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">
                Gmail Dot Aliases
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Gmail ignores dots in usernames.{" "}
                <span className="text-zinc-300">j.ohn</span> and{" "}
                <span className="text-zinc-300">jo.hn</span> both go to{" "}
                <span className="text-zinc-300">john@gmail.com</span>.
              </p>

              {/* Tag */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span>•</span> Dot Trick
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute top-6 right-6 text-zinc-700 group-hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Outlook Card */}
        <Link href="/outlook-alias" className="group">
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 flex flex-col gap-4 transition-all duration-300 hover:border-violet-500/50 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-violet-500/10 hover:scale-[1.02] cursor-pointer overflow-hidden">
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4 group-hover:shadow-violet-500/40 transition-shadow duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">
                Outlook +Tag Aliases
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Outlook supports +tags.{" "}
                <span className="text-zinc-300">john+github</span> and{" "}
                <span className="text-zinc-300">john+work</span> both go to{" "}
                <span className="text-zinc-300">john@outlook.com</span>.
              </p>

              {/* Tag */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
                <span>+</span> Plus Addressing
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute top-6 right-6 text-zinc-700 group-hover:text-violet-400 transition-all duration-300 group-hover:translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom info */}
      <div className="mt-12 flex items-center gap-6 text-zinc-600 text-xs">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          No data stored
        </div>
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download as .txt
        </div>
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Instant generation
        </div>
      </div>
    </div>
  );
}
