// Content for the "New Frontiers" tab — a distinct, forward-looking segment on how
// usage-based billing, token consumption, settlement, and commerce primitives are
// moving past what Zuora/Salesforce Revenue Cloud/Stripe Billing/Workday built for
// the subscription era, plus what marketplace/distributor platforms like Pax8 add
// once revenue starts flowing through multiple parties instead of one seller and
// one buyer.

export const ERAS = [
  {
    key: 'catalog',
    title: 'Static catalog, perpetual license',
    years: '1990s–2000s',
    description:
      'One price, one SKU, one invoice at the moment of sale. Product data lived in spreadsheets or an ERP item master; there was no separate "PIM" discipline because the catalog barely changed.',
    trigger: 'A signed order form',
    settlement: 'One-time payment, often net-30 wire or check',
  },
  {
    key: 'subscription',
    title: 'Per-seat subscription',
    years: '2000s–2010s',
    description:
      'Revenue became recurring and ratable. This is the era Zuora and Salesforce Revenue Cloud were built for: CPQ generates a quote against a rate-card SKU, an order books, and a subscription ledger recognizes revenue straight-line over the term.',
    trigger: 'A recurring billing date',
    settlement: 'Recurring card/ACH charge, monthly or annual',
  },
  {
    key: 'metered',
    title: 'Metered & usage-based billing',
    years: '2010s–2020s',
    description:
      'Infrastructure and API businesses (the model Stripe Billing generalized for everyone else) decoupled price from access: you pay for what you consumed, not a seat you were assigned. This is also where fulfillment stopped being purely physical — provisioning an API key or a cloud resource became a fulfillment event in its own right.',
    trigger: 'A rated usage event at period close',
    settlement: 'Post-paid invoice against metered totals, or prepaid credit draw-down',
  },
  {
    key: 'agentic',
    title: 'Agentic usage & token consumption',
    years: '2023–today',
    description:
      'An AI agent, not a person, is now the thing generating billable events — at a volume and unpredictability no seat-based system was sized for. Multi-dimensional rate cards (per model, per token direction) replace single per-call pricing, and anomaly detection has to sit inside the billing path itself, not after it.',
    trigger: 'A token event from a model gateway, batched or streamed',
    settlement: 'Same post-paid invoice mechanics as metered billing, under far more volatile volume',
  },
  {
    key: 'agentic-commerce',
    title: 'Agentic commerce & continuous settlement',
    years: 'Emerging',
    description:
      'The next shift is not another pricing model — it is who initiates the transaction and how fast money moves after it. Purchasing agents transact directly with commerce APIs, marketplaces split one transaction across several parties in real time (the Pax8 model, generalized), and settlement increasingly happens continuously instead of in monthly batches.',
    trigger: 'An autonomous agent-to-agent transaction or a continuously streamed usage ledger',
    settlement: 'Real-time / programmable settlement rails, split multi-party at the moment of the transaction',
  },
]

export const COMPARISON_ROWS = [
  {
    dimension: 'What triggers a charge',
    conventional: 'A human-signed order, or a metered total rated at period close',
    emerging: 'An autonomous agent action or a continuously streamed consumption event, rated near real time',
  },
  {
    dimension: 'Catalog structure',
    conventional: 'One list price per SKU, occasionally localized per region',
    emerging: 'PIM as a live dependency graph — a SKU is unusable in a region, channel, or bundle until every attribute (localized price, revenue treatment, partner rate) is populated; missing data blocks the transaction, not just the report',
  },
  {
    dimension: 'Who is the counterparty',
    conventional: 'One seller, one buyer, one invoice',
    emerging: 'Multi-party by default — a marketplace distributor (Pax8-style), a referral partner, and the end customer can all sit on the same transaction, each needing their own settlement leg',
  },
  {
    dimension: 'FX handling',
    conventional: 'Convert once at invoice time, or ignore it and bill in one currency',
    emerging: 'Rate locks with explicit tolerance bands, re-lock logic when a lock expires before an invoice issues, and a hard separation between the customer-facing invoice currency and the seller\'s functional-currency revenue entry',
  },
  {
    dimension: 'Settlement speed',
    conventional: 'Net-30/60/90, one batch run per billing cycle',
    emerging: 'Real-time or near-real-time payout rails (instant bank transfer networks, stablecoin settlement) that can clear a multi-party split the moment usage is rated, not 30 days later',
  },
  {
    dimension: 'Trust mechanism',
    conventional: 'A predictable bill a human can sanity-check by counting seats',
    emerging: 'An always-on, evidence-backed reasoning trail per charge — because at agentic volume and speed, no human can sanity-check the bill by inspection alone',
  },
]

export const PRIMITIVES = [
  {
    title: 'Agent-initiated purchase',
    detail:
      'A customer\'s own AI agent — not a person clicking "buy" — negotiates and completes a purchase against a seller\'s commerce API, within spending limits the customer configured in advance. Quoting has to become an API a machine can call synchronously, not a form a human fills out.',
    evidence: 'DEAL-3302',
    evidenceNote: 'Sable & Voss\'s deal already flows through a partner\'s automated provisioning, not a human-run order desk — agent-initiated purchase is the same shift one layer further out.',
  },
  {
    title: 'Multi-party, programmable settlement',
    detail:
      'One transaction splits automatically across a marketplace distributor, a referral partner, and the seller — each leg settling on its own terms — the way Pax8 splits a subscription sale across itself, the ISV, and the reselling MSP, generalized to any multi-party channel.',
    evidence: 'DEAL-3302',
    evidenceNote: 'The CloudRelay deal shows why this is hard in practice: a shared gateway node pooled two sub-tenants\' usage together, and untangling attribution had to happen before any party\'s settlement leg could be computed.',
  },
  {
    title: 'Continuous / streaming metering',
    detail:
      'Usage is rated as it happens instead of batched and reconciled once a month — closing the exact gap that let a 6-day pipeline outage go unnoticed until invoice time in a batch system.',
    evidence: 'DEAL-3305',
    evidenceNote: "Bellwether Analytics' metering pipeline outage would have quietly undercharged the customer under a batch model; a streaming model would have surfaced the gap in near real time instead of at invoice close.",
  },
  {
    title: 'Real-time, FX-aware settlement rails',
    detail:
      'Instant payment rails (RTP/FedNow-style domestic transfers, stablecoin settlement for cross-border) let a rate lock be honored at the moment of settlement rather than 30–60 days after a quote, shrinking the window where currency movement creates a rev-rec exception.',
    evidence: 'DEAL-3304',
    evidenceNote: "Solstice Robotics' invoice sat past its 30-day FX rate-lock window before it issued — a settlement rail fast enough to close within the lock window removes this exception category entirely.",
  },
  {
    title: 'Outcome- and consumption-linked pricing',
    detail:
      'Price tracks a measurable outcome an agent produced (a resolved ticket, a completed workflow) rather than raw token volume — a further evolution of usage-based pricing that needs the underlying token/API metering as its foundation, not a replacement for it.',
    evidence: null,
    evidenceNote: null,
  },
  {
    title: 'Embedded financing at fulfillment',
    detail:
      'A large hardware order can draw instant working-capital financing at the fulfillment step itself — smoothing the revenue-recognition gap that point-in-time hardware billing creates while goods are in transit or held at customs.',
    evidence: 'DEAL-3303',
    evidenceNote: 'Kestrel Biologics\' full invoice is held while 14 of 135 units clear customs — embedded financing at fulfillment is one way a seller could still get paid on schedule without breaking the bill-on-delivery contract term.',
  },
]

// Metrics that track progress on the emerging-RLM shift itself, as distinct from the
// Lifecycle Console's per-step operational metrics (see STEP_METRICS in
// src/data/lifecycle.js) — these are "are we actually winning at the next-gen shift,"
// not "is today's pipeline running well."
export const FRONTIER_METRICS = [
  {
    metric: 'Time-to-cash for a multi-party transaction',
    definition: "How long it takes the ISV's own share of a sale to actually land as cash, not just how long it takes to invoice the end customer.",
    evidence: "Today, in a batch distributor model, ~45–60 days (see the For Pax8 tab's worked example) — the metric to drive toward same-day.",
  },
  {
    metric: 'Reconciliation mismatch rate',
    definition: '% of multi-party transactions where the legs disagree with each other before they settle.',
    evidence: "The CloudRelay/Sable & Voss attribution gap (DEAL-3302) is exactly this failure surfacing — one shared ledger event (vs. three independent reconciliations) is what drives this toward zero.",
  },
  {
    metric: '% of usage rated in real time (streaming vs. batch)',
    definition: 'Share of consumption-based revenue priced as it happens, instead of reconciled once at period close.',
    evidence: "Bellwether Analytics' metering-pipeline outage (DEAL-3305) is exactly what batch-only rating risks — this metric tracks progress toward continuous metering.",
  },
  {
    metric: 'FX exposure window',
    definition: 'Average time between a rate lock and the invoice that actually uses it.',
    evidence: "Solstice Robotics (DEAL-3304) shows what happens when this window blows past the tolerance band — shrinking it is what real-time settlement buys for cross-border deals.",
  },
  {
    metric: 'Compliance resolution latency',
    definition: 'Average time to clear a compliance-driven hold (a withholding certificate, customs documentation) without it silently becoming a write-off or a customer complaint.',
    evidence: "Vantage Retail Group's withholding-tax match and Kestrel Biologics' customs hold (DEAL-3306, DEAL-3303) are both currently measured in days-to-weeks, by hand.",
  },
]

export const CAPABILITY_GAPS = [
  {
    title: 'PIM as a transactional dependency, not a reference table',
    tieIn: 'Product Information tab',
    before: 'Product/price data is read occasionally to render a catalog page',
    after: 'Every quote, fulfillment event, and invoice line checks PIM synchronously — a missing localized price or bundle definition blocks the transaction outright',
  },
  {
    title: 'FX as a first-class ledger dimension',
    tieIn: 'DEAL-3304, DEAL-3306',
    before: 'One currency, converted once, if at all',
    after: 'Rate locks with explicit expiry and tolerance logic, a hard split between customer-facing invoice currency and functional-currency revenue, and statutory-withholding-aware cash application',
  },
  {
    title: 'Multi-party settlement as a native primitive',
    tieIn: 'DEAL-3302',
    before: 'One invoice, one payer, one payee',
    after: 'A single transaction resolves into several settlement legs (distributor, partner, seller) computed and reconciled together, the way a Pax8-style marketplace payout works today',
  },
  {
    title: 'Metering built for continuous, not batch, ingestion',
    tieIn: 'DEAL-3305',
    before: 'Usage reconciled once at period close, when a gap is already unrecoverable without a backfill estimate',
    after: 'Usage streamed and rated continuously, so an ingestion gap surfaces as an operational alert within hours, not as a billing anomaly weeks later',
  },
]
