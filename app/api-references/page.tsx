"use client";

import { useState } from "react";

interface EndpointProps {
  method: string;
  path: string;
  description: string;
  curlExample: string;
  requestBody?: string;
  responseExample: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all duration-200 cursor-pointer border border-zinc-600/30"
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Copied
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
          Copy
        </span>
      )}
    </button>
  );
}

function EndpointCard({
  method,
  path,
  description,
  curlExample,
  requestBody,
  responseExample,
  params,
}: EndpointProps) {
  const [activeTab, setActiveTab] = useState<"curl" | "response">("curl");

  const methodColor =
    method === "GET"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : "bg-blue-500/15 text-blue-400 border-blue-500/30";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700/80 transition-colors duration-300">
      {/* Header */}
      <div className="px-6 py-5 border-b border-zinc-800/60">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${methodColor}`}
          >
            {method}
          </span>
          <code className="text-sm text-zinc-300 font-mono">{path}</code>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Params table */}
      {params && params.length > 0 && (
        <div className="px-6 py-4 border-b border-zinc-800/60">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-3">
            Parameters
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-xs uppercase tracking-wider">
                  <th className="text-left py-2 pr-4 font-semibold">Name</th>
                  <th className="text-left py-2 pr-4 font-semibold">Type</th>
                  <th className="text-left py-2 pr-4 font-semibold">Required</th>
                  <th className="text-left py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40">
                {params.map((p) => (
                  <tr key={p.name}>
                    <td className="py-2.5 pr-4">
                      <code className="text-emerald-400 text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {p.name}
                      </code>
                    </td>
                    <td className="py-2.5 pr-4 text-zinc-500 text-xs font-mono">
                      {p.type}
                    </td>
                    <td className="py-2.5 pr-4">
                      {p.required ? (
                        <span className="text-amber-400 text-xs font-medium">Required</span>
                      ) : (
                        <span className="text-zinc-600 text-xs">Optional</span>
                      )}
                    </td>
                    <td className="py-2.5 text-zinc-400 text-xs">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code tabs */}
      <div className="px-6 pt-4 pb-1">
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => setActiveTab("curl")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeTab === "curl"
              ? "bg-zinc-700/60 text-white"
              : "text-zinc-500 hover:text-zinc-300"
              }`}
          >
            cURL
          </button>
          {requestBody && (
            <button
              onClick={() => setActiveTab("curl")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 cursor-default"
            >
              •
            </button>
          )}
          <button
            onClick={() => setActiveTab("response")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeTab === "response"
              ? "bg-zinc-700/60 text-white"
              : "text-zinc-500 hover:text-zinc-300"
              }`}
          >
            Response
          </button>
        </div>
      </div>

      <div className="px-6 pb-5">
        <div className="relative rounded-xl bg-zinc-950 border border-zinc-800/60 overflow-hidden">
          <CopyButton
            text={activeTab === "curl" ? curlExample : responseExample}
          />
          <pre className="p-4 pr-20 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
            <code>
              {activeTab === "curl" ? curlExample : responseExample}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function ApiReferencesPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-zinc-950">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-zinc-800/40">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            REST API v1
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            API{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Reference
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
            Integrate email alias generation into your apps and workflows.
            Simple REST endpoints — no API key required.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">2</span>
              <span className="text-xs text-zinc-500 mt-0.5">Services</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">4</span>
              <span className="text-xs text-zinc-500 mt-0.5">Endpoints</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">0</span>
              <span className="text-xs text-zinc-500 mt-0.5">Auth needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Base URL */}
        <div className="mb-10 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">
              Base URL
            </p>
            <code className="text-sm text-emerald-400 font-mono">
              http://localhost:3000
            </code>
          </div>
        </div>

        {/* ── Gmail Section ──────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/15">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Gmail Aliases</h2>
              <p className="text-zinc-500 text-sm">Dot-trick alias generation</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <EndpointCard
              method="GET"
              path="/api/aliasemail?email={email}"
              description="Validate a Gmail address and get the total number of possible dot-trick aliases without generating them. Useful for previewing counts before generation."
              params={[
                {
                  name: "email",
                  type: "string",
                  required: true,
                  desc: "Gmail address to validate (e.g. john@gmail.com or just john)",
                },
              ]}
              curlExample={`curl -X GET "http://localhost:3000/api/v2/alias/email/gmail?email=john@gmail.com"`}
              responseExample={`{
  "valid": true,
  "username": "john",
  "totalAliases": 8,
  "charCount": 4
}`}
            />

            <EndpointCard
              method="POST"
              path="/api/v2/alias/email/gmail"
              description="Generate all possible dot-trick aliases for a Gmail address. Gmail ignores dots in usernames, so each dot placement creates a unique alias that delivers to the same inbox."
              params={[
                {
                  name: "email",
                  type: "string",
                  required: true,
                  desc: "Gmail address to generate aliases for",
                },
              ]}
              requestBody={`{ "email": "john@gmail.com" }`}
              curlExample={`curl -X POST http://localhost:3000/api/v2/alias/email/gmail \\
  -H "Content-Type: application/json" \\
  -d '{"email": "john@gmail.com"}'`}
              responseExample={`{
  "valid": true,
  "username": "john",
  "totalAliases": 8,
  "aliases": [
    "john@gmail.com",
    "j.ohn@gmail.com",
    "jo.hn@gmail.com",
    "j.o.hn@gmail.com",
    "joh.n@gmail.com",
    "j.oh.n@gmail.com",
    "jo.h.n@gmail.com",
    "j.o.h.n@gmail.com"
  ]
}`}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs font-medium uppercase tracking-widest">Outlook</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* ── Outlook Section ────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/15">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Outlook Aliases</h2>
              <p className="text-zinc-500 text-sm">Plus-tag alias generation</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <EndpointCard
              method="GET"
              path="/api/v2/alias/email/outlook?email={email}"
              description="Validate an Outlook/Hotmail/Live email address and get available tag categories. Returns the total number of predefined tag aliases available."
              params={[
                {
                  name: "email",
                  type: "string",
                  required: true,
                  desc: "Outlook, Hotmail, or Live email address",
                },
              ]}
              curlExample={`curl -X GET "http://localhost:3000/api/v2/alias/email/outlook?email=john@outlook.com"`}
              responseExample={`{
  "valid": true,
  "username": "john",
  "domain": "outlook.com",
  "totalAliases": 98,
  "availableCategories": [
    "social", "shopping", "finance", "tech",
    "newsletters", "work", "gaming", "travel"
  ]
}`}
            />

            <EndpointCard
              method="POST"
              path="/api/v2/alias/email/outlook"
              description="Generate +tag aliases for an Outlook email address. Outlook supports plus addressing, so john+github@outlook.com delivers to john@outlook.com. You can optionally filter by tag categories."
              params={[
                {
                  name: "email",
                  type: "string",
                  required: true,
                  desc: "Outlook, Hotmail, or Live email address",
                },
                {
                  name: "categories",
                  type: "string[]",
                  required: false,
                  desc: 'Filter by categories: "social", "shopping", "finance", "tech", "newsletters", "work", "gaming", "travel"',
                },
              ]}
              requestBody={`{ "email": "john@outlook.com", "categories": ["social", "tech"] }`}
              curlExample={`curl -X POST http://localhost:3000/api/v2/alias/email/outlook \\
  -H "Content-Type: application/json" \\
  -d '{"email": "john@outlook.com", "categories": ["social", "tech"]}'`}
              responseExample={`{
  "valid": true,
  "username": "john",
  "domain": "outlook.com",
  "totalAliases": 27,
  "aliases": [
    "john+facebook@outlook.com",
    "john+twitter@outlook.com",
    "john+instagram@outlook.com",
    "john+github@outlook.com",
    "john+gitlab@outlook.com",
    "..."
  ],
  "categoryMap": {
    "social": ["john+facebook@outlook.com", "..."],
    "tech": ["john+github@outlook.com", "..."]
  },
  "availableCategories": [
    "social", "shopping", "finance", "tech",
    "newsletters", "work", "gaming", "travel"
  ]
}`}
            />
          </div>
        </div>

        {/* ── Error Handling ─────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs font-medium uppercase tracking-widest">Error Handling</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              All endpoints return standard HTTP status codes. Error responses follow this format:
            </p>
            <div className="relative rounded-xl bg-zinc-950 border border-zinc-800/60 overflow-hidden">
              <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{`// 400 Bad Request
{
  "error": "Invalid Gmail address",
  "valid": false
}

// 400 Bad Request (missing field)
{
  "error": "Email is required"
}

// 400 Bad Request (too many aliases)
{
  "error": "Username too long (over 1M aliases)",
  "valid": true,
  "username": "verylongusername",
  "totalAliases": 2097152
}`}</code>
              </pre>
            </div>

            {/* Status codes table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800/40">
                    <th className="text-left py-2.5 pr-4 font-semibold">Status</th>
                    <th className="text-left py-2.5 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  <tr>
                    <td className="py-2.5 pr-4">
                      <span className="text-emerald-400 font-mono text-xs font-bold">200</span>
                    </td>
                    <td className="py-2.5 text-zinc-400 text-xs">Success — aliases generated or validation passed</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4">
                      <span className="text-amber-400 font-mono text-xs font-bold">400</span>
                    </td>
                    <td className="py-2.5 text-zinc-400 text-xs">Bad request — invalid email, missing params, or too many aliases</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Quick Start ────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white mb-2">Quick Start</h3>
          <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
            Get all Gmail dot-trick aliases in one command:
          </p>
          <div className="relative rounded-xl bg-zinc-950 border border-zinc-800/60 overflow-hidden">
            <CopyButton
              text={`curl -s -X POST http://localhost:3000/api/aliasemail \\\n  -H "Content-Type: application/json" \\\n  -d '{"email": "yourname@gmail.com"}' | jq '.aliases[]'`}
            />
            <pre className="p-4 pr-20 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{`# Generate and list all aliases (pipe to jq for clean output)
curl -s -X POST http://localhost:3000/api/aliasemail \\
  -H "Content-Type: application/json" \\
  -d '{"email": "yourname@gmail.com"}' | jq '.aliases[]'

# Save directly to a file
curl -s -X POST http://localhost:3000/api/aliasemail \\
  -H "Content-Type: application/json" \\
  -d '{"email": "yourname@gmail.com"}' \\
  | jq -r '.aliases[]' > aliases.txt`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
