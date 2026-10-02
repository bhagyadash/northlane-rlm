# Northlane — Revenue Lifecycle Management Prototype

A working prototype of an end-to-end Revenue Lifecycle Management (RLM) platform,
covering quoting, fulfillment, metering, foreign exchange, order-to-cash, and product
information services — plus a distinct forward-looking segment on emerging usage-based
billing, token consumption, settlement, and commerce primitives.

**Live demo:** [northlane-rlm.vercel.app](https://northlane-rlm.vercel.app)

## Run it locally

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## What it does

**Lifecycle Console tab** — seven synthetic deals for a fictional global vendor,
Northlane Systems, which sells a per-seat subscription (Core), IoT hardware (Sensors),
a metered API, and an AI agent product billed by token consumption (Copilot), across
seven currencies (USD, GBP, EUR, AUD, JPY, BRL, INR). Click **Run next deal** (or **Run
all remaining**) and watch each deal move live through the same six-step pipeline —
quote & order (CPQ), fulfillment & provisioning, usage metering & rating, FX conversion
& settlement, invoice generation, and cash application — each step narrated with the
exact evidence behind it, not a spinner. Deals **clear** straight through, or get
**held** with the exact reason: a marketplace-partner usage-attribution gap (Sable &
Voss via CloudRelay), a customs hold on hardware (Kestrel Biologics), an expired FX
rate lock (Solstice Robotics), a metering-pipeline outage (Bellwether Analytics), a
statutory withholding-tax reconciliation (Vantage Retail Group), or a credit-term
exception that blocks an order from booking at all (Torque Industrial). Every processed
deal is retained in a history list with its full trail re-openable later. Six of the
seven deals are direct (Northlane selling its own product), one flows through a
marketplace distributor (CloudRelay) — tagged with a "direct" / "via CloudRelay" badge
on every deal. An always-visible banner states the **North Star metric** (Straight-
Through Cash Realization Rate), and a collapsed-by-default **"New to quote-to-cash?
Start here"** primer explains who's who, walks through the six pipeline steps in plain
English, and names the one metric to optimize at each step.

**Product Information tab** — the Product Information Service (PIM): the product
catalog, localized price books across all seven currencies, and bundle definitions that
quoting and fulfillment read from. Includes a deliberate data-completeness gap
(Sensors and Copilot hardware/token SKUs aren't yet localized into JPY, BRL, or INR) to
illustrate a real PIM failure mode — a missing local price blocks a quote outright.

**New Frontiers tab** — a distinct, forward-looking segment covering how usage-based
billing, token consumption, and settlement are moving past the subscription-era
platforms (Zuora, Salesforce Revenue Cloud, Stripe Billing, Workday), including
multi-party marketplace settlement in the style of Pax8. A five-era history of what
triggers a charge, a conventional-vs-emerging RLM comparison table, six concrete future
commerce primitives, capability gaps a conventional platform has to close, and a
**metrics** section (time-to-cash, reconciliation mismatch rate, % of usage rated in
real time, FX exposure window, compliance resolution latency) — each grounded in a
specific deal from the Lifecycle Console as evidence, not a hypothetical.

**Vision & requirements tab** — problem statement, a North Star metric plus two
supporting targets, system architecture (built vs. planned across all six domains,
including agent-initiated purchasing / agent-to-agent billing as a planned capability),
non-goals, open questions, and phasing for what a production version needs next.

**What I learned tab** — the goal behind the prototype and the five questions it set out
to answer, the assumptions behind its numbers (each tagged structural / invented /
simplified / not sourced), six things the exercise made concrete, ten shortcomings stated
plainly (synthetic data, no integrations, ISV rather than distributor vantage point,
no exception workflow, unvalidated metrics, and more), and the questions it raises but
cannot answer.

**For Pax8 tab** — applies this prototype's thinking to the shape of a multi-party
marketplace, like Pax8's own business. Includes a worked four-party marketplace
settlement example (end customer → reselling MSP → distributor → ISV) built on
Northlane's own catalog pricing, a today-vs-next-gen settlement comparison, and four
concrete product bets, each with the metric that tells you if it's working. Not
affiliated with, endorsed by, or built using any non-public information from Pax8.

## What's real vs. assumed

| Item | Status |
|---|---|
| Pipeline step logic (CPQ discount/approval thresholds, fulfillment routing, metered/token rating, FX rate-lock tolerance, invoice assembly, cash-application matching) | Real logic — mirrors how an explainable RLM platform would evaluate each step |
| The six "held" cases (partner attribution, customs hold, expired FX lock, metering outage, withholding-tax match, credit-term exception) | Scripted patterns illustrating each check, not trained models or live integrations |
| Customers, deal amounts, usage volumes, FX rates, price books | Invented for the demo, not pulled from any live CPQ, ERP, metering pipeline, or bank feed |
| "Clear" / "held" deal status | Simulated status only — no real invoice is sent and no payment is charged |
| Product Information tab's price-book coverage and localization gaps | Live, computed from the same catalog data file — not duplicated or hardcoded per tab |
| New Frontiers tab's deal references | Pulled live from the Lifecycle Console's data (not duplicated), so the tabs never disagree |
| Multi-party marketplace settlement (Pax8-style splits) | New Frontiers tab: narrated only. For Pax8 tab: an actually-computed worked example, but with invented company names, seats, and margins — not Pax8's real pricing or partners |
| Vision & requirements content | Product framing for this prototype, not a finalized spec |
| What I learned tab | My own framing of the goal, assumptions, and limits — it is the honest caveat layer for every other tab |
| For Pax8 tab | Independent interview prep, not an official or authorized Pax8 artifact — see its in-app disclaimer |

## Stack

Single-page React app (Vite), Tailwind for styling, lucide-react for icons. Entry point
is [`src/App.jsx`](src/App.jsx); each tab lives under [`src/tabs/`](src/tabs), synthetic
data under [`src/data/`](src/data), shared UI atoms under
[`src/components/ui.jsx`](src/components/ui.jsx), formatting helpers under
[`src/lib/format.js`](src/lib/format.js).
