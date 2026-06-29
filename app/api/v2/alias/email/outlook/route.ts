import { NextRequest, NextResponse } from "next/server";

// ── Helpers ──────────────────────────────────────────────────────────

// Predefined useful +tag categories
const TAG_CATEGORIES: Record<string, string[]> = {
  social: [
    "facebook", "twitter", "instagram", "linkedin", "tiktok", "snapchat",
    "reddit", "pinterest", "youtube", "discord", "twitch", "mastodon",
    "threads", "bluesky",
  ],
  shopping: [
    "amazon", "ebay", "etsy", "walmart", "target", "bestbuy", "costco",
    "aliexpress", "shopify", "wish", "shein", "nike", "adidas", "zara",
  ],
  finance: [
    "paypal", "venmo", "cashapp", "stripe", "bank", "insurance", "taxes",
    "crypto", "robinhood", "coinbase", "mint", "budget",
  ],
  tech: [
    "github", "gitlab", "bitbucket", "stackoverflow", "npm", "docker",
    "aws", "azure", "gcloud", "vercel", "netlify", "heroku", "digitalocean",
  ],
  newsletters: [
    "news", "newsletter", "updates", "digest", "weekly", "daily",
    "alerts", "notifications", "promo", "deals", "offers",
  ],
  work: [
    "work", "office", "business", "client", "project", "meeting",
    "hr", "payroll", "invoice", "contract",
  ],
  gaming: [
    "steam", "epic", "xbox", "playstation", "nintendo", "roblox",
    "minecraft", "valorant", "fortnite", "apex",
  ],
  travel: [
    "airbnb", "booking", "expedia", "hotels", "flights", "uber",
    "lyft", "airline", "travel", "trip",
  ],
};

function parseOutlookEmail(raw: string): { username: string; domain: string; valid: boolean } {
  const trimmed = raw.trim().toLowerCase();
  // Match outlook.com, hotmail.com, live.com
  const match = trimmed.match(
    /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@(outlook\.com|hotmail\.com|live\.com)$/
  );
  if (!match) return { username: "", domain: "", valid: false };
  const username = match[1];
  const domain = match[2];
  if (username.length < 1 || username.length > 64)
    return { username: "", domain: "", valid: false };
  return { username, domain, valid: true };
}

function generateOutlookAliases(
  username: string,
  domain: string,
  categories?: string[]
): { aliases: string[]; categoryMap: Record<string, string[]> } {
  const selectedCategories = categories && categories.length > 0
    ? categories
    : Object.keys(TAG_CATEGORIES);

  const categoryMap: Record<string, string[]> = {};
  const aliases: string[] = [];

  for (const category of selectedCategories) {
    const tags = TAG_CATEGORIES[category];
    if (!tags) continue;
    const categoryAliases: string[] = [];
    for (const tag of tags) {
      const alias = `${username}+${tag}@${domain}`;
      aliases.push(alias);
      categoryAliases.push(alias);
    }
    categoryMap[category] = categoryAliases;
  }

  return { aliases, categoryMap };
}

// ── POST handler ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, categories } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { username, domain, valid } = parseOutlookEmail(email);

    if (!valid) {
      return NextResponse.json(
        {
          error:
            "Invalid email. Please use an Outlook, Hotmail, or Live address (e.g. you@outlook.com)",
          valid: false,
        },
        { status: 400 }
      );
    }

    const { aliases, categoryMap } = generateOutlookAliases(
      username,
      domain,
      categories
    );

    return NextResponse.json({
      valid: true,
      username,
      domain,
      totalAliases: aliases.length,
      aliases,
      categoryMap,
      availableCategories: Object.keys(TAG_CATEGORIES),
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// ── GET handler (for validation / info) ──────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email query param is required" },
      { status: 400 }
    );
  }

  const { username, domain, valid } = parseOutlookEmail(email);

  if (!valid) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  const totalTags = Object.values(TAG_CATEGORIES).reduce(
    (sum, tags) => sum + tags.length,
    0
  );

  return NextResponse.json({
    valid: true,
    username,
    domain,
    totalAliases: totalTags,
    availableCategories: Object.keys(TAG_CATEGORIES),
  });
}
