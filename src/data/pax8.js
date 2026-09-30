// Content for the "For Pax8" tab — an independent product-thinking exercise prepared
// ahead of an interview conversation for Pax8's VP of Product, Fintech role. This is
// not affiliated with, endorsed by, or built using any non-public information from
// Pax8 — the marketplace/distributor mechanics below are modeled on publicly known
// patterns of how cloud marketplaces work, not Pax8's actual systems, and every number
// is invented for this demo.

export const ROLE = {
  title: 'VP of Product, Fintech',
  company: 'Pax8',
  reqId: 'R-102327',
  url: 'https://pax8inc.wd12.myworkdayjobs.com/en-US/Pax8Careers/job/VP-of-Product--Fintech_R-102327',
}

export const PILLARS = [
  {
    key: 'strategy',
    title: 'Financial platform strategy & vision',
    icon: 'Target',
    ask: 'Own the roadmap across quoting, fulfillment, metering, FX, order-to-cash, and product information — balancing business, technical, compliance, and growth priorities.',
    response:
      "This entire prototype is that roadmap made concrete: one pipeline (Lifecycle Console) spanning all six domains, a system of record feeding it (Product Information), and a phased build-out (Vision & requirements) that sequences what ships first vs. what waits. Every deal runs through the same six steps in the same order — that shared architecture, not six separate workstreams stitched together, is the kind of commitment a roadmap has to make before it can be sequenced.",
    tieIns: ['Lifecycle Console', 'Vision & requirements'],
  },
  {
    key: 'compliance',
    title: 'Compliance-driven product leadership',
    icon: 'ShieldCheck',
    ask: 'Turn regulatory and financial requirements into product advantages, partnering with Finance, Compliance, and Operations for auditable, trustworthy, scalable outcomes.',
    response:
      "Three of the six held deals in the Lifecycle Console treat a compliance requirement as a first-class product state, not an ops afterthought: a Brazil withholding-tax certificate (Vantage Retail Group), a lithium-battery transport-documentation hold at EU customs (Kestrel Biologics), and a credit-committee approval threshold on payment terms (Torque Industrial). Each one names exactly which control triggered and what clears it — that's what turns a compliance requirement into something a customer or partner can trust instead of a black box.",
    tieIns: ['Lifecycle Console'],
  },
  {
    key: 'ai-commerce',
    title: 'Building the AI commerce layer',
    icon: 'Sparkles',
    ask: 'Build product capabilities for AI-driven consumption and financial transactions — usage-based billing, token consumption, settlement, and new commerce primitives.',
    response:
      "This is the New Frontiers tab's entire subject: a five-era history of what actually triggers a charge, a dimension-by-dimension comparison of conventional vs. emerging RLM, and six concrete primitives, each tied to a specific deal as evidence rather than a hypothetical. The worked settlement example below takes that thinking one step further and runs a distributor-model transaction — the shape of Pax8's own business — through it with real numbers.",
    tieIns: ['New Frontiers'],
  },
  {
    key: 'cx',
    title: 'Customer & financial experience',
    icon: 'HeartHandshake',
    ask: 'Create seamless financial experiences for partners and internal stakeholders — trusted, intuitive, scalable invoicing, billing, reconciliation, and settlement.',
    response:
      "The reasoning trail running through every deal in the Lifecycle Console is the trust mechanism, not a UI flourish. When a settlement-adjacent step is held — the CloudRelay/Sable & Voss usage-attribution case is the closest analog here to an MSP payout — the party waiting on money sees the exact reason and what clears it, never just a delayed payout with no explanation attached.",
    tieIns: ['Lifecycle Console'],
  },
  {
    key: 'stakeholders',
    title: 'Enterprise stakeholder leadership',
    icon: 'Users',
    ask: 'Build trusted partnerships across Finance, Operations, Commercial, and Executive Leadership, balancing competing priorities.',
    response:
      "The Vision tab's Open Questions section is itself a stakeholder-alignment artifact — each question names the specific function that has to weigh in (treasury on FX rate-lock ownership, pricing ops on catalog governance, revenue ops on held-deal routing) instead of leaving ownership ambiguous. The Phasing section does the same for executive alignment: it sequences the build so leadership sees working value each phase instead of waiting on one big-bang delivery.",
    tieIns: ['Vision & requirements'],
  },
  {
    key: 'team',
    title: 'Team leadership & development',
    icon: 'GraduationCap',
    ask: 'Build and develop a world-class fintech product organization — a culture of learning, accountability, innovation, and inclusion.',
    response:
      "A prototype can't demonstrate team leadership directly, so I'll say that plainly rather than stretch a feature to cover it. What I can show is the standard I'd hold a team to: every prototype in this line of work enforces the same rule — an always-on, evidence-backed reasoning trail, never a spinner standing in for an explanation — which doubles as a review bar. If a teammate's feature can't narrate why it did what it did, it isn't done yet.",
    tieIns: [],
  },
  {
    key: 'thought-leadership',
    title: 'Industry thought leadership',
    icon: 'Lightbulb',
    ask: 'Stay ahead of financial infrastructure, digital commerce, AI-enabled transactions, and regulatory evolution; inform platform investment, partnership, and M&A thinking.',
    response:
      "The New Frontiers tab's five-era framing and its capability-gap table are a thesis, not a feature list: revenue is becoming multi-party and continuous by default, which is exactly the shift a distributor business sits in the middle of. The bets below are where that thesis turns into specific proposals rather than commentary.",
    tieIns: ['New Frontiers'],
  },
]

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
  },
  {
    title: 'Compliance-embedded quoting',
    detail:
      "Surface regulatory, tax, and customs constraints at the moment of quoting, not downstream where they become a held deal — the way this prototype's withholding-tax and customs cases only show up after the sale rather than before it.",
  },
  {
    title: 'Usage & token-consumption rate cards for AI-native ISVs',
    detail:
      "As more vendors selling through the marketplace ship agentic/AI products, the distributor's own metering and rating layer needs multi-dimensional rate cards — per model, per token direction — not just a per-seat or per-call number, the way Northlane's Copilot product line does in this prototype.",
  },
  {
    title: 'A partner-facing trust layer',
    detail:
      "Publish the same reasoning-trail discipline outward to MSPs and ISVs themselves, so a held settlement leg shows its exact reason and resolution path instead of a partner just waiting on an unexplained payout delay.",
  },
]
