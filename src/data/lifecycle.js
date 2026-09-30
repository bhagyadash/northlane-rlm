// Lifecycle Console data — seven synthetic deals for the fictional global vendor
// "Northlane Systems," each run through the same six-step pipeline every deal takes
// from quote to cash. Six steps map directly to the six domains this prototype
// covers: quoting, fulfillment, metering, FX, invoicing, and cash application — the
// last two together being "order-to-cash." Numbers are invented for this demo, not
// pulled from a live CPQ, ERP, or bank feed.

export const STEP_ORDER = ['quote', 'fulfillment', 'metering', 'fxConversion', 'invoice', 'cashApplication']

export const STEP_LABELS = {
  quote: 'Quote & order (CPQ)',
  fulfillment: 'Fulfillment & provisioning',
  metering: 'Usage metering & rating',
  fxConversion: 'FX conversion & settlement',
  invoice: 'Invoice generation',
  cashApplication: 'Cash application',
}

const RAW_DEALS = [
  {
    customer: 'Northfield Health',
    dealId: 'DEAL-3301',
    region: 'United Kingdom',
    currency: 'GBP',
    fxRate: 1.27,
    products: ['Core', 'Sensors'],
    period: 'Aug 2026',
    lineItems: [
      { label: 'Core · Enterprise, 85 seats (8% volume discount)', amount: 7741.8 },
      { label: 'Sensors · 40× Sensor-300 (cold-chain)', amount: 7400.0 },
      { label: 'Sensors · 5× Gateway-Hub', amount: 2600.0 },
    ],
    steps: {
      quote: {
        detail:
          'Quote Q-88210: 85 Core Enterprise seats @ £99.00 + 40 Sensor-300 + 5 Gateway-Hub units under the Facility IoT Bundle. An 8% volume discount was applied — within the 10% auto-approval threshold for deals under this MSA, so no manual sign-off was required.',
        confidence: 98,
      },
      fulfillment: {
        detail:
          '85 seats provisioned instantly in tenant NORTH-UK-01. 45 hardware units (40 Sensor-300 + 5 Gateway-Hub) shipped via DHL from the EU distribution center, cleared customs under the UK–EU trade agreement, and delivery was confirmed by device telemetry heartbeat from all 45 units.',
        confidence: 97,
      },
      metering: {
        detail: 'No usage-based product on this deal (flat subscription + hardware only) — step is a no-op.',
        confidence: 100,
      },
      fxConversion: {
        detail:
          'Contract rate locked at quote date: 1 GBP = 1.27 USD. Current spot is 1.265, a 0.4% variance — well inside the 2% re-lock tolerance, so the locked rate applies with no hedge action needed.',
        confidence: 96,
      },
      invoice: {
        detail: 'Assembled 3 line items totaling £17,741.80, billed in GBP. Functional-currency value for revenue reporting: $22,532.09 at the locked rate.',
        confidence: 99,
      },
      cashApplication: {
        detail: 'Payment received via wire in GBP for the full £17,741.80 within 2 days of the invoice due date — matched to the invoice automatically, no variance.',
        confidence: 99,
      },
    },
  },
  {
    customer: 'Sable & Voss (via CloudRelay)',
    dealId: 'DEAL-3302',
    region: 'Australia',
    currency: 'AUD',
    fxRate: 0.66,
    products: ['Core', 'API'],
    period: 'Aug 2026',
    lineItems: [
      { label: 'Core · Professional, 30 seats (partner price book)', amount: 2616.0 },
      { label: 'Data API overage · 362,400 calls @ partner rate (provisional)', amount: 1014.72 },
    ],
    steps: {
      quote: {
        detail:
          'Quote submitted by marketplace distributor CloudRelay against the Marketplace Partner Standard Bundle: 30 Core Professional seats at CloudRelay\'s standing partner price book (20% below direct list, pre-negotiated in the distributor agreement) — no manual approval needed, within the standing agreement.',
        confidence: 97,
      },
      fulfillment: {
        detail: 'Provisioned under CloudRelay\'s reseller account, sub-tenant SBVS-AU-02. 30 seats activated and Data API keys issued — no physical hardware on this deal.',
        confidence: 98,
      },
      metering: {
        detail:
          'Parent partner account CloudRelay-AU-Pool logged 2.14M total API calls across 14 managed sub-tenants this period. Sable & Voss\'s key (SBVS-AU-02) shows 362,400 calls under direct attribution, but a shared regional gateway node (ap-southeast-node-3) used by 2 of the 14 sub-tenants was misconfigured to tag pooled traffic under the first-provisioned tenant on that node — CloudRelay\'s partner ops team must confirm per-tenant attribution before this sub-tenant\'s overage figure is billable.',
        confidence: 54,
        issue: true,
        issueLabel:
          'Usage attribution for sub-tenant SBVS-AU-02 is unconfirmed — a shared gateway node may have mis-tagged pooled partner traffic. Held pending CloudRelay partner-ops confirmation of the 362,400-call figure.',
      },
      fxConversion: {
        detail: 'No rate lock on partner deals — Northlane converts at spot on invoice date per the distributor agreement. Current spot: 1 AUD = 0.66 USD.',
        confidence: 95,
      },
      invoice: {
        detail:
          'The 30-seat charge (AUD $2,616.00) is unaffected and could issue independently, but the API overage line cannot be finalized until per-tenant attribution is confirmed — the full invoice to CloudRelay is held rather than splitting the billing period.',
        confidence: null,
      },
      cashApplication: {
        detail: 'Not yet reached — no invoice has issued for this period.',
        confidence: null,
      },
    },
  },
  {
    customer: 'Kestrel Biologics',
    dealId: 'DEAL-3303',
    region: 'Germany',
    currency: 'EUR',
    fxRate: 1.09,
    products: ['Sensors'],
    period: 'Aug 2026',
    lineItems: [
      { label: 'Sensors · 120× Sensor-300 (cold-chain)', amount: 28680.0 },
      { label: 'Sensors · 15× Gateway-Hub', amount: 9375.0 },
    ],
    steps: {
      quote: {
        detail:
          'Cold-Chain Monitoring Bundle at list price under the existing MSA volume terms: 120 Sensor-300 + 15 Gateway-Hub units, €38,055.00. No discount requested, no approval needed.',
        confidence: 98,
      },
      fulfillment: {
        detail:
          '135 units shipped from the Rotterdam distribution center via customs broker. EU customs flagged the shipment for a restricted-substance compliance recheck — the Sensor-300 units\' lithium cell requires UN38.3 transport documentation — and held 14 of the 135 units at the border pending that paperwork. Delivery is confirmed for the remaining 121 units.',
        confidence: 47,
        issue: true,
        issueLabel:
          '14 of 135 hardware units are held at EU customs pending UN38.3 lithium-battery transport documentation. Delivery is only 89.6% confirmed.',
      },
      metering: {
        detail: 'No usage-based product on this deal (hardware only) — step is a no-op.',
        confidence: 100,
      },
      fxConversion: {
        detail: 'Contract rate lock of 1 EUR = 1.09 USD confirmed valid through this quarter — would apply once the invoice issues, no action needed yet.',
        confidence: 95,
      },
      invoice: {
        detail:
          "Per the MSA's 'bill on confirmed delivery' clause, only 121 of 135 units (89.6%) have confirmed delivery. The invoice can't be split without a contract amendment, so the full €38,055.00 invoice is held until the customs hold on the remaining 14 units clears.",
        confidence: null,
      },
      cashApplication: {
        detail: 'Not yet reached — no invoice has issued.',
        confidence: null,
      },
    },
  },
  {
    customer: 'Solstice Robotics',
    dealId: 'DEAL-3304',
    region: 'Japan',
    currency: 'JPY',
    fxRate: 0.0067,
    products: ['Core', 'Copilot'],
    period: 'Aug 2026',
    lineItems: [
      { label: 'Core · Enterprise, 54 seats', amount: 1036800.0 },
      { label: 'Copilot platform fee', amount: 37200.0 },
      { label: 'Copilot tokens · Halyard Reason — 18.5M in / 6.2M out', amount: 42690.0 },
    ],
    steps: {
      quote: {
        detail:
          'Quote approved at list price: 54 Core Enterprise seats + Copilot (Halyard Reason model). Includes the standard 30-day FX rate lock at 1 JPY = 0.0069 USD, per contract terms.',
        confidence: 98,
      },
      fulfillment: {
        detail: '54 seats provisioned and Copilot model access enabled instantly — no hardware on this deal.',
        confidence: 99,
      },
      metering: {
        detail: 'Halyard Reason token usage ingested cleanly from the model gateway: 18.5M input / 6.2M output tokens for the period.',
        confidence: 97,
      },
      fxConversion: {
        detail:
          "The quote-time rate lock (1 JPY = 0.0069 USD) expired 32 days ago under the contract's 30-day lock window — this invoice is being raised on day 62. Current spot is 1 JPY = 0.0067 USD, a 2.9% yen depreciation, beyond the 2% re-lock tolerance band. The JPY-denominated invoice to the customer is unaffected (contract terms make it FX-neutral to them) — only Northlane's USD revenue-recognition entry needs finance to confirm the re-locked rate before this period closes.",
        confidence: 61,
        issue: true,
        issueLabel:
          "FX rate lock expired 32 days before invoicing; yen moved 2.9%, past the 2% tolerance. Customer invoice proceeds unaffected — only the internal USD revenue entry is held for finance sign-off.",
      },
      invoice: {
        detail: 'Assembled 3 line items totaling ¥1,116,690.00, billed in JPY — issues to the customer normally, unaffected by the FX question above.',
        confidence: 94,
      },
      cashApplication: {
        detail: 'Payment received via domestic bank transfer for the full ¥1,116,690.00, matched to the invoice with no variance.',
        confidence: 98,
      },
    },
  },
  {
    customer: 'Bellwether Analytics',
    dealId: 'DEAL-3305',
    region: 'United States',
    currency: 'USD',
    fxRate: 1.0,
    products: ['Core', 'Copilot'],
    period: 'Aug 2026',
    lineItems: [
      { label: 'Core · Professional, 22 seats', amount: 1738.0 },
      { label: 'Copilot platform fee', amount: 249.0 },
      { label: 'Copilot tokens (provisional, understated) · 24.6M in / 8.1M out', amount: 109.08 },
    ],
    steps: {
      quote: {
        detail: 'No changes vs. the prior period — the standing subscription auto-renews under the Agentic Analytics Bundle, no new quote required.',
        confidence: 100,
      },
      fulfillment: {
        detail: 'Seat count unchanged at 22 — no fulfillment action required this cycle.',
        confidence: 100,
      },
      metering: {
        detail:
          'The Northlane Swift model-gateway usage-ingestion pipeline had a 6-day outage (Aug 9–14) from an upstream logging-partition failure. Captured usage for the period is 24.6M input / 8.1M output tokens against a trailing 3-month baseline of ~40M input / 14M output — a ~38% shortfall consistent with a data gap, not an actual usage decline (workspace login activity showed no corresponding drop during the outage window). Billing on the captured figure alone would undercharge the customer by an estimated $180–210.',
        confidence: 41,
        issue: true,
        issueLabel:
          'A 6-day metering-pipeline outage left this period\'s Copilot usage ~38% understated versus the trailing baseline, with no evidence of an actual usage drop. Held pending a backfill estimate.',
      },
      fxConversion: { detail: 'Billing currency and functional currency are both USD — no conversion required.', confidence: 100 },
      invoice: {
        detail:
          'Held pending a backfill estimate or confirmed re-ingestion of the missing 6 days of Copilot usage — issuing on the captured figure alone risks a materially understated bill that would need an unusual correction next cycle.',
        confidence: null,
      },
      cashApplication: { detail: 'Not yet reached — no invoice has issued.', confidence: null },
    },
  },
  {
    customer: 'Vantage Retail Group',
    dealId: 'DEAL-3306',
    region: 'Brazil',
    currency: 'BRL',
    fxRate: 0.19,
    products: ['Core', 'API'],
    period: 'Aug 2026',
    lineItems: [
      { label: 'Core · Professional, 46 seats', amount: 19090.0 },
      { label: 'Data API overage · 90,000 calls @ subscriber rate', amount: 990.0 },
    ],
    steps: {
      quote: { detail: 'Standard renewal at list price, no discount requested — approved automatically.', confidence: 98 },
      fulfillment: { detail: '46 seats provisioned, Data API keys issued — no hardware on this deal.', confidence: 99 },
      metering: { detail: '340,000 API calls ingested cleanly against a 250,000-call included allowance — 90,000-call overage, rated at the subscriber rate.', confidence: 97 },
      fxConversion: { detail: 'BRL→USD converted at spot for revenue reporting: 1 BRL = 0.19 USD → $3,815.20 functional-currency value.', confidence: 96 },
      invoice: { detail: 'Assembled 2 line items totaling R$20,080.00, billed in BRL, including the standard note that Brazilian cross-border digital-services invoices are subject to statutory withholding.', confidence: 98 },
      cashApplication: {
        detail:
          "Incoming wire receipt: R$17,068.00 — R$3,012.00 below the R$20,080.00 invoice total. Cross-referenced against Brazil's mandatory 15% IRRF withholding-tax schedule for cross-border digital-services invoices: R$20,080.00 × 15% = R$3,012.00 matches the shortfall exactly. This is very likely compliant statutory withholding, not a short payment — but Brazilian tax law requires the customer's withholding certificate (comprovante de retenção) on file before this AR item can close as fully collected.",
        confidence: 81,
        issue: true,
        issueLabel:
          "Payment is R$3,012.00 short, matching Brazil's 15% IRRF withholding exactly — very likely compliant, but held pending the customer's official withholding certificate before the AR item can close.",
      },
    },
  },
  {
    customer: 'Torque Industrial',
    dealId: 'DEAL-3307',
    region: 'India',
    currency: 'INR',
    fxRate: 0.012,
    products: ['Core'],
    period: 'Aug 2026',
    lineItems: [{ label: 'Core · Enterprise, 110 seats, 3-year term (annual billing)', amount: 1182500.0 }],
    steps: {
      quote: {
        detail:
          '3-year, 110-seat Enterprise quote (₹1,182,500.00/yr list) requested with Net-90 payment terms. Standard policy is Net-30; Net-60 requires regional finance approval; anything beyond Net-60 requires global credit-committee sign-off, which has not yet been logged for this deal.',
        confidence: 68,
        issue: true,
        issueLabel:
          'Requested Net-90 payment terms exceed the Net-60 regional-approval ceiling and require global credit-committee sign-off, not yet on file. Order cannot book until cleared.',
      },
      fulfillment: { detail: 'Not started — provisioning cannot begin until the order books, and the order cannot book until the credit-term exception above clears.', confidence: null },
      metering: { detail: 'Not applicable yet — no active subscription period to meter against.', confidence: null },
      fxConversion: { detail: 'Not applicable yet — no invoice to convert.', confidence: null },
      invoice: { detail: 'Not started — blocked on order booking.', confidence: null },
      cashApplication: { detail: 'Not started — blocked on order booking.', confidence: null },
    },
  },
]

export const DEALS = RAW_DEALS.map((deal, i) => {
  const trail = STEP_ORDER.map((phase) => ({ phase, ...deal.steps[phase] }))
  const issueStep = trail.find((s) => s.issue)
  const total = Math.round(deal.lineItems.reduce((s, li) => s + li.amount, 0) * 100) / 100
  return {
    id: i + 1,
    ...deal,
    total,
    totalUSD: Math.round(total * deal.fxRate * 100) / 100,
    trail,
    outcome: issueStep ? 'held' : 'clear',
    outcomeReason: issueStep ? issueStep.issueLabel : null,
  }
})
