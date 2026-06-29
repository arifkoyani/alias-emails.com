import { NextRequest, NextResponse } from "next/server";

// ── Helpers ──────────────────────────────────────────────────────────
function parseGmail(raw: string): { username: string; valid: boolean } {
    const trimmed = raw.trim().toLowerCase();
    const match = trimmed.match(/^([a-z0-9]+(?:\.[a-z0-9]+)*)(?:@gmail\.com)?$/);
    if (!match) return { username: "", valid: false };
    const username = match[1].replace(/\./g, "");
    if (username.length < 2 || username.length > 30)
        return { username: "", valid: false };
    return { username, valid: true };
}

function generateAllAliases(username: string): string[] {
    const n = username.length;
    const totalCombinations = 1 << (n - 1);
    const aliases: string[] = [];

    for (let mask = 0; mask < totalCombinations; mask++) {
        let alias = username[0];
        for (let i = 1; i < n; i++) {
            if (mask & (1 << (i - 1))) {
                alias += ".";
            }
            alias += username[i];
        }
        aliases.push(alias + "@gmail.com");
    }
    return aliases;
}

// ── POST handler ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const { username, valid } = parseGmail(email);

        if (!valid) {
            return NextResponse.json(
                { error: "Invalid Gmail address", valid: false },
                { status: 400 }
            );
        }

        const totalAliases = Math.pow(2, username.length - 1);

        if (totalAliases > 1048576) {
            return NextResponse.json(
                {
                    error: "Username too long (over 1M aliases)",
                    valid: true,
                    username,
                    totalAliases,
                },
                { status: 400 }
            );
        }

        const aliases = generateAllAliases(username);

        return NextResponse.json({
            valid: true,
            username,
            totalAliases,
            aliases,
        });
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}

// ── GET handler (for validation / count only) ────────────────────────
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json(
            { error: "Email query param is required" },
            { status: 400 }
        );
    }

    const { username, valid } = parseGmail(email);

    if (!valid) {
        return NextResponse.json({ valid: false }, { status: 200 });
    }

    const totalAliases = Math.pow(2, username.length - 1);

    return NextResponse.json({
        valid: true,
        username,
        totalAliases,
        charCount: username.length,
    });
}
