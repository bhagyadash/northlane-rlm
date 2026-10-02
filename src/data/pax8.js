// Content for the "For Pax8" tab — an independent product-thinking exercise. This is
// not affiliated with, endorsed by, or built using any non-public information from
// Pax8 — the marketplace/distributor mechanics below are modeled on publicly known
// patterns of how cloud marketplaces work, not Pax8's actual systems, and every number
// is invented for this demo.

// Worked example: one subscription sale flowing through a four-party marketplace —
// end customer, reselling MSP, a marketplace distributor (modeled on the publicly
// known shape of Pax8's own business), and the ISV whose product it is. Reuses
// Northlane's own Core Enterprise seat price from the Product Information catalog for
// continuity with the rest of the prototype.
export const SETTLEMENT_EXAMPLE = {
  seats: 40,
  product: 'Northlane Core — Enterprise',
  parties: {
    endCustomer: 'Anders Legal (end customer)',
    msp: 'Ferrovia Managed Services (reselling MSP)',
    distributor: 'Marketplace distributor (Pax8-style)',
    isv: 'Northlane Systems (ISV)',
  },
  pricePerSeat: {
    retail: 135.0,
    distributor: 112.0,
    wholesale: 99.0,
  },
}

export const SETTLEMENT_TIMING = [
  {
    dimension: 'Settlement legs',
    today: 'Three separate invoices (MSP → end customer, distributor → MSP, ISV → distributor), each its own AR/AP cycle',
    nextGen: 'One transaction event computes and settles all three legs together',
  },
  {
    dimension: "Time to cash (ISV)",
    today: '~45–60 days after the original sale, once all three cycles clear in sequence',
    nextGen: 'Same day or next business day',
  },
  {
    dimension: 'Reconciliation effort',
    today: "Each party reconciles its own leg independently — a mismatch (like this prototype's CloudRelay attribution gap) can surface at any one of the three, or none",
    nextGen: 'One shared ledger event all three parties read from — a mismatch is visible to everyone before any leg settles',
  },
  {
    dimension: 'Cross-border handling',
    today: 'Each leg converts FX independently, at whatever rate applies on its own invoice date',
    nextGen: 'One FX rate, locked once, applied consistently across all three legs of the same transaction',
  },
]

export const NEXT_BETS = [
  {
    title: 'Real-time multi-party settlement rail',
    detail:
      "Generalize the worked three-way split below from three independent net-30 cycles into one settlement event — cutting an ISV's time-to-cash from ~45–60 days toward same-day, and making a mismatch visible to all three parties at once instead of surfacing separately (or not at all) in each party's own reconciliation.",
    metric: 'Time-to-cash for the slowest leg (today: ~45–60 days → target: same-day)',
  },
  {
    title: 'Compliance-embedded quoting',
    detail:
      "Surface regulatory, tax, and customs constraints at the moment of quoting, not downstream where they become a held deal — the way this prototype's withholding-tax and customs cases only show up after the sale rather than before it.",
    metric: '% of deals held post-sale for a constraint that was knowable at quote time',
  },
  {
    title: 'Usage & token-consumption rate cards for AI-native ISVs',
    detail:
      "As more vendors selling through the marketplace ship agentic/AI products, the distributor's own metering and rating layer needs multi-dimensional rate cards — per model, per token direction — not just a per-seat or per-call number, the way Northlane's Copilot product line does in this prototype.",
    metric: '% of marketplace GMV from usage/token-based SKUs the rating engine can price natively',
  },
  {
    title: 'A partner-facing trust layer',
    detail:
      "Publish the same reasoning-trail discipline outward to MSPs and ISVs themselves, so a held settlement leg shows its exact reason and resolution path instead of a partner just waiting on an unexplained payout delay.",
    metric: '% of held settlement legs with a partner-visible reason and resolution path',
  },
]
