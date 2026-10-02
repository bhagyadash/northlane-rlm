// Content for the "What I learned" tab — the goal behind the prototype, the assumptions
// behind its numbers, what building it taught me, and what it cannot tell you. Written
// to be read next to the other tabs: every claim here points back at a deal, a tab, or
// a data file rather than standing on its own.

export const GOAL = {
  summary:
    "I built this to learn how a revenue lifecycle management platform works end to end — the components, how data moves between them, and where it breaks — well enough to form a point of view on it. It is a learning artifact, not a proposal or a product: the data is invented and nothing is integrated.",
  questions: [
    'What are the components of a revenue lifecycle, and who owns each one?',
    'How does data flow between them, and where are the hand-offs?',
    'Where does it fail, and what does a customer or partner experience when it does?',
    'What does good judgment look like at each step, and how would you measure it?',
    "What's conventional, and what does next-generation thinking change?",
  ],
}

// kind drives the tag color: 'invented' and 'structural' are neutral; 'simplified' and
// 'unsourced' are the ones to treat as illustrations rather than facts.
export const ASSUMPTIONS = [
  {
    kind: 'structural',
    title: 'Northlane is an ISV, seen from the seller-of-record seat',
    detail:
      "Everything in the Lifecycle Console is one vendor's view of its own revenue. Six of seven deals are direct; one routes through a marketplace distributor.",
  },
  {
    kind: 'structural',
    title: 'One fixed six-step pipeline for every deal',
    detail:
      'Quote, fulfillment, metering, FX, invoice, cash application — always in that order. A deal without a given product (no hardware, no usage) shows that step as a no-op instead of skipping it.',
  },
  {
    kind: 'invented',
    title: 'The company, customers, amounts, usage, FX rates, and price books',
    detail: 'None of it comes from a live CPQ, ERP, metering pipeline, or bank feed.',
  },
  {
    kind: 'invented',
    title: 'Which deals are held, and why',
    detail:
      'I chose six failure modes so every pipeline step had at least one. They were not picked by how often they occur in real operations.',
  },
  {
    kind: 'invented',
    title: 'Policy thresholds',
    detail:
      'A 10% discount auto-approval limit, Net-30 standard terms with Net-60 needing regional finance and anything longer needing a credit committee, a 30-day FX rate lock with a 2% re-lock tolerance, and a bill-on-confirmed-delivery clause for hardware.',
  },
  {
    kind: 'simplified',
    title: 'Brazil withholding modeled as a flat 15%',
    detail:
      'Real withholding on cross-border services varies by service type, tax treaty, and counterparty. It is here to illustrate the pattern — a short payment that is actually correct — not as tax guidance.',
  },
  {
    kind: 'simplified',
    title: 'The marketplace split',
    detail:
      'A four-party chain (end customer, MSP, distributor, ISV) with invented margins, shaped by publicly known patterns of how cloud marketplaces work. It is not any real company\'s economics.',
  },
  {
    kind: 'unsourced',
    title: '"~45–60 days" time-to-cash in a batch distributor model',
    detail: 'An illustrative figure to make the next-gen contrast concrete, not a measured or sourced benchmark.',
  },
  {
    kind: 'unsourced',
    title: 'Confidence percentages on every step',
    detail: 'Scripted to show where a check would be uncertain. They are not model output.',
  },
  {
    kind: 'unsourced',
    title: 'The North Star and per-step metrics',
    detail:
      'Derived by reasoning backward from each failure mode ("what would have caught this earlier?"). They have not been validated against real baselines, targets, or trade-offs.',
  },
]

export const LEARNINGS = [
  {
    title: 'It is one pipeline, not six systems',
    detail:
      'Quote, fulfillment, metering, FX, invoicing, and cash application each have their own system, owner, and data — but an error upstream always surfaces downstream. A discount that skipped approval becomes a held invoice; a customs delay becomes revenue that cannot be recognized. Because the six steps share one outcome, they need one shared metric.',
    deals: [],
    tab: 'Lifecycle Console',
  },
  {
    title: 'Every hand-off is a failure point',
    detail:
      'Product data feeds quoting. A booked order triggers fulfillment. Fulfillment status gates invoicing for physical goods. Metered usage feeds rating. An FX lock connects the quote date to the invoice date. Invoices feed cash application. I scripted one failure at each of these seams so I could watch it happen instead of just reading about it.',
    deals: [],
    tab: 'Lifecycle Console, Product Information',
  },
  {
    title: 'Many holds are policy or compliance states nobody modeled',
    detail:
      'Four of the six held deals are policy or compliance states: a credit-term limit, customs documentation, an expired FX lock, and a statutory withholding. The other two are data-quality failures: a partner usage-attribution gap and a metering outage. The product question is the same for all six — does the platform name the control or gap, say what clears it, and say who owns it, or does the customer just see a delayed payment?',
    deals: ['DEAL-3307', 'DEAL-3303', 'DEAL-3304', 'DEAL-3306', 'DEAL-3302', 'DEAL-3305'],
    tab: null,
  },
  {
    title: 'Good metrics come from the failure modes',
    detail:
      "Each step's top metric came from asking what would have caught that step's held deal earlier. That is what gave the North Star — Straight-Through Cash Realization Rate — a reason to exist: it forces six teams to answer to one outcome instead of six local optimizations.",
    deals: [],
    tab: 'Lifecycle Console, Vision & requirements',
  },
  {
    title: 'Conventional vs. next-gen is about who initiates, and how fast money moves',
    detail:
      "The shift is not a new pricing model. It is multi-party transactions by default, usage rated continuously instead of in monthly batches, and further out, autonomous agents as buyers. That is why product data, FX, metering, and settlement have to become live dependencies a transaction checks, not reference data a report reads afterward.",
    deals: [],
    tab: 'New Frontiers',
  },
  {
    title: 'Billing an AI product is different from billing an AI buyer',
    detail:
      "Copilot is an agent as the product: it needs usage anomaly detection. Agent-initiated purchasing is an agent as the customer: it needs spend limits and agent identity. They look adjacent, but they need different controls — and the second one is only planned in this prototype, not built.",
    deals: ['DEAL-3305'],
    tab: 'Vision & requirements',
  },
]

export const SHORTCOMINGS = [
  {
    title: 'Everything is synthetic and scripted',
    detail:
      'It shows I can model failure modes. It cannot show how often each one occurs or which matter most — and the amounts, usage, and deal outcomes were all chosen by me.',
  },
  {
    title: 'No real integrations or money movement',
    detail:
      '"Cash applied" is a status label, not a transaction. Latency, scale, idempotency, reconciliation at volume, and audit controls are all untouched — and those are where platforms like this are hard.',
  },
  {
    title: 'Wrong vantage point for a marketplace',
    detail:
      "Northlane is one ISV. A marketplace distributor sits in the middle of many ISVs and many partners. Vendor-by-vendor invoice consolidation, partner payout timing, chargebacks and disputes, credit risk on partners, and vendor-specific billing quirks are all outside what I modeled. The four-party split is a sketch of the shape, not the problem.",
  },
  {
    title: 'Narrated, not built: the next-gen pieces',
    detail:
      'Streaming metering, real-time multi-party settlement, and agent-initiated purchasing are discussed in New Frontiers and the Vision tab. None of them exists in the prototype.',
  },
  {
    title: 'Compliance and tax are illustrations, not guidance',
    detail:
      "There is no general tax engine. The Brazil withholding case and the customs hold show a pattern; they should not be read as an accurate description of either regime.",
  },
  {
    title: 'No exception workflow',
    detail:
      'Six of seven deals end up held, and then nothing happens: no assignment, escalation, resolution, or reprocessing. That is where most of the real human cost lives.',
  },
  {
    title: 'Metrics are proposed, not measured',
    detail:
      'No baselines, no targets, no trade-offs. For example, driving the auto-match rate up could hide real errors instead of catching them.',
  },
  {
    title: 'Missing domains',
    detail:
      'Revenue recognition, a real tax engine, dunning and collections, disputes and credit memos, contract amendments and renewals, and FX hedging strategy. Several are marked "planned" in the Vision tab, but none is built or deeply researched.',
  },
  {
    title: 'No user research',
    detail:
      'The reasoning trail and the wording of held reasons are my hypotheses about what builds trust. I have not tested them with finance, billing-ops, or partner users.',
  },
  {
    title: 'No organizational dimension',
    detail:
      'The open questions name which functions need to weigh in, but a prototype cannot show how to align them, resolve competing priorities, or sequence a roadmap across teams.',
  },
]

export const NEXT_QUESTIONS = [
  'Where do the failure modes I scripted match, or miss, the ones that actually dominate in practice?',
  'What are the real baselines for Straight-Through Cash Realization Rate and time-to-cash today, and which trade-offs bite first?',
  'How do invoice consolidation, partner payouts, disputes, and partner credit risk work from the distributor seat, across many ISVs and many partners?',
  'What happens after a hold — who owns resolution, and how long does it really take?',
]
