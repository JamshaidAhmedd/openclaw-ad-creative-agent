# OpenClaw Ad Creative Agent

An autonomous Claude-powered agent that monitors live Meta Ads performance and automatically generates replacement ad creatives — hooks, UGC briefs, and headlines — per audience segment.

## What It Does

1. **Monitors** live Meta Ads campaigns via the Meta Ads API (CTR, CPA, ROAS, frequency)
2. **Triggers** creative refresh when KPIs fall below configurable thresholds
3. **Generates** replacement hooks, UGC briefs, and headlines via Claude API — tailored per audience segment
4. **Outputs** new creative briefs to Slack and/or Email for human review or auto-approval
5. **Recommends** budget reallocation based on performance deltas

## Architecture

```
Meta Ads API
    |
    v
Node.js Orchestrator (poll every 15 min)
    |
    +-- Performance Analyzer (threshold checks)
    |
    v
Claude API (claude-sonnet-4-6)
    |
    +-- /prompts/hook-generator.txt
    +-- /prompts/ugc-brief.txt
    +-- /prompts/headline-variants.txt
    |
    v
Slack Webhook / SendGrid Email
```

## Tech Stack

- **Claude API** (claude-sonnet-4-6) — creative generation
- **OpenClaw** — agent orchestration layer
- **Node.js** — orchestrator runtime
- **Meta Ads API** — campaign performance data
- **Slack Webhooks / SendGrid** — output delivery

## Folder Structure

```
openclaw-ad-creative-agent/
├── agents/
│   ├── creative-generator.js
│   ├── performance-monitor.js
│   └── budget-reallocator.js
├── prompts/
│   ├── hook-generator.txt
│   ├── ugc-brief.txt
│   └── headline-variants.txt
├── mock-data/
│   └── sample-meta-ads-response.json
├── .env.example
├── package.json
└── README.md
```

## Setup

```bash
git clone https://github.com/jamshaidahmedd/openclaw-ad-creative-agent
cd openclaw-ad-creative-agent
npm install
cp .env.example .env
node agents/performance-monitor.js
```

## Sample Output

**Ad Hook Generated:**
> "You've been scrolling past the skincare that actually works. Here's what 40,000 customers figured out first."

**UGC Brief:**
> **Creator Brief — Audience: Women 28-44, Skincare Enthusiasts**
> Hook: Start with your morning routine frustration. Show the product naturally.
> CTA: "Link in bio" at the 12-second mark.
> Tone: Authentic, conversational, no hard sell.
> Duration: 18-25 seconds max.

## License

MIT
