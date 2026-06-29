import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-400">
              Alias<span className="text-zinc-300">Gen</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/gmail-alias"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Gmail Aliases
            </Link>
            <Link
              href="/outlook-alias"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Outlook Aliases
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} AliasGen. All rights reserved.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-4 border-t border-zinc-800/40">
          <p className="text-xs text-zinc-600 text-center leading-relaxed max-w-xl mx-auto">
            This tool generates email alias variations for organizational purposes.
            All aliases route to your original inbox — no new accounts are created.
          </p>
        </div>
      </div>
    </footer>
  );
}
