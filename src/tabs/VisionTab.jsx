import React from 'react'
import {
  AlertTriangle,
  Target,
  Layers,
  Ban,
  XCircle,
  HelpCircle,
  RefreshCw,
  Database,
  ClipboardList,
  Truck,
  Gauge,
  ArrowLeftRight,
  Receipt,
  Wallet,
  ShieldAlert,
  Users,
  BookOpenCheck,
  ArrowDown,
  Radio,
  Bot,
} from 'lucide-react'
import { SectionCard, StepStatusBadge } from '../components/ui.jsx'
import { NORTH_STAR_METRIC } from '../data/lifecycle.js'

const ARCH_STEPS = [
  {
    title: 'Product Information Service (PIM)',
    detail: 'Single system of record for SKUs, revenue treatment, localized price books, and bundles — quoting reads from it directly. Simulated with a static dataset, including deliberate localization gaps, in this prototype.',
    icon: Database,
    status: 'built',
  },
  {
    title: 'Quote & order capture (CPQ)',
    detail: 'Configures products against PIM data, applies discount/approval thresholds, and books the order. Simulated in the Lifecycle Console, including a credit-term exception (Torque Industrial).',
    icon: ClipboardList,
    status: 'built',
  },
  {
    title: 'Fulfillment & provisioning orchestration',
    detail: 'Routes software provisioning, physical hardware shipment/customs, and API key issuance from one booked order. Simulated, including a customs hold (Kestrel Biologics).',
    icon: Truck,
    status: 'built',
  },
  {
    title: 'Usage metering & rating',
    detail: 'Ingests API calls and AI-token events and rates them against the plan. Simulated, including a partner-attribution gap (Sable & Voss) and a pipeline-outage data gap (Bellwether Analytics).',
    icon: Gauge,
    status: 'built',
  },
  {
    title: 'FX conversion & rate-lock management',
    detail: "Locks a contract rate at quote time, converts for functional-currency reporting, and flags when a lock expires before invoicing. Simulated, including an expired-lock case (Solstice Robotics).",
    icon: ArrowLeftRight,
    status: 'built',
  },
  {
    title: 'Invoice generation',
    detail: 'Assembles line items in the customer\'s billing currency from quote, fulfillment, and metering outputs. Simulated across all seven deals.',
    icon: Receipt,
    status: 'built',
  },
  {
    title: 'Cash application',
    detail: 'Matches incoming payment to the open invoice, including statutory-withholding-aware matching (Vantage Retail Group). Simulated status only — no real payment rail.',
    icon: Wallet,
    status: 'built',
  },
  {
    title: 'Multi-party / marketplace settlement engine',
    detail: 'Splits one transaction into distributor, partner, and seller settlement legs the way a Pax8-style marketplace payout works. Narrated in the New Frontiers tab and the CloudRelay deal — not actually computed or executed.',
    icon: Users,
    status: 'planned',
  },
  {
    title: 'Agent-initiated purchasing & agent-to-agent billing',
    detail: "Northlane Copilot bills an AI product's own token consumption today — but an autonomous buying agent transacting directly against a commerce API on a customer's behalf is a distinct capability: agent identity/authorization, spend limits, and billing an agent-to-agent transaction aren't modeled yet. Discussed as a primitive in New Frontiers — not built.",
    icon: Bot,
    status: 'planned',
  },
  {
    title: 'Continuous / streaming metering',
    detail: 'Rates usage as it happens instead of batching it to period close, closing the exact gap a batch pipeline outage creates. Discussed in New Frontiers — not built.',
    icon: Radio,
    status: 'planned',
  },
  {
    title: 'Revenue/billing ops exception workspace',
    detail: 'Held deals (4 of 7 in this demo) get assigned, investigated, and released by a revenue ops team. Not built — this prototype only surfaces the hold and its reason.',
    icon: ShieldAlert,
    status: 'planned',
  },
  {
    title: 'Revenue recognition engine',
    detail: 'Classifies each line (ratable subscription, point-in-time hardware, usage-based, consumption) for accounting close, including the FX true-up question raised by the Solstice Robotics case. Not built.',
    icon: BookOpenCheck,
    status: 'planned',
  },
  {
    title: 'ERP / GL write-back',
    detail: 'Closed deals post into a general ledger via native connectors. Not built.',
    icon: RefreshCw,
    status: 'planned',
  },
]

const NON_GOALS = [
  'No real payment processing, dunning, or collections workflow — cash application is simulated as "matched," never an actual bank/card transaction.',
  'No live CPQ, ERP, metering pipeline, or bank feed — every number across all seven deals is scripted for this demo.',
  'No true multi-party settlement engine — the CloudRelay marketplace split is narrated as a concept, not computed or executed as separate payable legs.',
  'No revenue recognition engine or ASC 606/IFRS 15 waterfall.',
  'No general tax engine — only the one Brazil IRRF withholding illustration on Vantage Retail Group.',
  'No revenue/billing ops exception workspace — held deals surface a reason but aren\'t yet workable by a team (assign, comment, resolve, reprocess).',
  'No continuous/streaming metering — usage is simulated as a single batched figure per billing cycle.',
  'No agent-initiated purchase flow — Copilot bills a product\'s own AI usage, but doesn\'t yet support an autonomous buying agent transacting against a commerce API on a customer\'s behalf.',
]

const OPEN_QUESTIONS = [
  {
    q: 'FX rate-lock ownership',
    detail: 'Who sets the lock window and tolerance band per contract (Solstice Robotics used a 30-day lock, 2% tolerance) — legal, deal desk, or treasury — and does it vary by currency volatility?',
  },
  {
    q: 'Multi-party settlement build vs. buy',
    detail: 'Does Northlane build its own marketplace settlement engine for partner deals like Sable & Voss, or integrate a payments-orchestration/embedded-finance provider that already does multi-party splits?',
  },
  {
    q: 'Held-deal routing',
    detail: 'Does a held deal route to a pooled revenue-ops queue, or to a domain-specific owner (FX to treasury, fulfillment/customs to logistics, metering to product engineering)?',
  },
  {
    q: 'PIM governance and region-launch gating',
    detail: 'Who owns closing a localization gap like Sensors/Copilot missing JPY, BRL, and INR price points, and does an incomplete price book formally block a region launch or just block individual quotes?',
  },
  {
    q: 'FX rev-rec policy',
    detail: 'For a case like Solstice Robotics (rate lock expired before invoicing), does finance restate the period at the new rate or true it up in the next close?',
  },
  {
    q: 'Agentic buyer governance',
    detail: "If a customer's own purchasing agent can transact directly against this platform, who sets its spend limits, and how is a runaway or compromised buying agent distinguished from a legitimate one — the same anomaly-detection judgment used for usage volume (Bellwether Analytics), now applied to a purchasing decision instead?",
  },
]

const PHASES = [
  {
    label: 'Phase 1 · Built',
    scope: 'Single-cycle walkthrough of all six pipeline steps across seven global deals, the Product Information Service catalog/price books/bundles, and the New Frontiers segment — the four tabs today.',
  },
  {
    label: 'Phase 2',
    scope: 'Revenue/billing ops exception workspace for the four held deals in this demo — assign, investigate, resolve, and reprocess.',
  },
  {
    label: 'Phase 3',
    scope: 'Real payment processing and dunning, plus a working multi-party settlement engine that actually computes and pays out distributor/partner/seller legs.',
  },
  {
    label: 'Phase 4',
    scope: 'Revenue recognition classification, ERP/GL write-back, and continuous/streaming metering to close the batch-ingestion gap seen in the Bellwether Analytics case.',
  },
]

function ArchStepRow({ step, isLast }) {
  const StepIcon = step.icon
  return (
    <div>
      <div className="flex items-start gap-3 py-2">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
            step.status === 'built' ? 'border-emerald-500/50 text-emerald-400' : 'border-slate-600 text-slate-400'
          }`}
        >
          <StepIcon size={15} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-200">{step.title}</span>
            <StepStatusBadge status={step.status} />
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{step.detail}</div>
        </div>
      </div>
      {!isLast && (
        <div className="ml-4 flex h-4 items-center">
          <ArrowDown size={12} className="text-slate-700" />
        </div>
      )}
    </div>
  )
}

export default function VisionTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-xs text-slate-400">
        The <span className="text-slate-200">Lifecycle Console</span>, <span className="text-slate-200">Product Information</span>,
        and <span className="text-slate-200">New Frontiers</span> tabs are Phase 1 — one order-to-cash cycle, fully
        explained, end to end, for one fictional global vendor (Northlane Systems) across seven currencies.
        Everything below is the surface that hasn&apos;t been built: a real exception workspace, live payment rails,
        an actual multi-party settlement engine, and revenue recognition.
      </div>

      <SectionCard icon={AlertTriangle} title="The problem this solves" sub="Why revenue lifecycle management stopped being one seller, one buyer, one invoice.">
        <p className="text-sm leading-relaxed text-slate-300">
          A revenue platform built for the subscription era — one product, one currency, one payer — breaks in at
          least four places as soon as a company sells globally and through more than one product type: FX rate
          locks expire before invoices go out, physical fulfillment introduces a delivery-confirmation gate that
          software never needed, usage metering has to survive its own pipeline outages without silently
          undercharging, and marketplace/reseller channels split one transaction across parties that each need their
          own accounting. None of that is a hypothetical edge case — it's the default shape of global, multi-product
          revenue. This prototype treats an always-on, evidence-backed reasoning trail — the same discipline used
          across every prototype in this line of work — as the fix: every dollar on every invoice, in every
          currency, traces back to the exact quote, shipment, usage event, and FX rate that produced it.
        </p>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
          <div className="mb-2 flex items-center gap-2">
            <Target size={15} className="text-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-emerald-500/80">North Star</span>
          </div>
          <div className="font-mono text-lg font-semibold text-emerald-300">{NORTH_STAR_METRIC.name}</div>
          <div className="mt-1 text-xs text-slate-400">{NORTH_STAR_METRIC.definition}</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Target size={15} className="text-sky-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Target</span>
          </div>
          <div className="font-mono text-xl font-semibold text-sky-300">100% explainable, globally</div>
          <div className="mt-1 text-xs text-slate-400">
            Every line on every invoice — seat, hardware unit, API call, or token, in any of seven currencies —
            carries a retained reasoning trail back to the exact quote, fulfillment, or usage event that produced it.
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Target size={15} className="text-sky-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Target</span>
          </div>
          <div className="font-mono text-xl font-semibold text-sky-300">Zero silent revenue leakage</div>
          <div className="mt-1 text-xs text-slate-400">
            An expired FX lock, a customs delay, a metering gap, or a mis-attributed partner usage figure is always
            held for review before it reaches an invoice or a ledger entry — never discovered after the fact.
          </div>
        </div>
      </div>

      <SectionCard icon={Layers} title="System architecture" sub="What this actually requires, end to end.">
        <div className="flex flex-col">
          {ARCH_STEPS.map((s, i) => (
            <ArchStepRow key={s.title} step={s} isLast={i === ARCH_STEPS.length - 1} />
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard icon={Ban} title="Non-goals (this prototype)" sub="What we're explicitly not building here.">
          <ul className="flex flex-col gap-2.5">
            {NON_GOALS.map((n) => (
              <li key={n} className="flex items-start gap-2 text-xs text-slate-400">
                <XCircle size={13} className="mt-0.5 shrink-0 text-rose-400" />
                {n}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={HelpCircle} title="Open questions" sub="Decisions this room needs to make.">
          <ul className="flex flex-col gap-3">
            {OPEN_QUESTIONS.map((o) => (
              <li key={o.q} className="text-xs">
                <span className="font-medium text-slate-200">{o.q}. </span>
                <span className="text-slate-400">{o.detail}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard icon={RefreshCw} title="Phasing" sub="What ships first, and why.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <div key={p.label} className="rounded-lg border border-slate-800 p-4">
              <div className="mb-2 font-mono text-xs text-sky-400">{p.label}</div>
              <div className="text-xs text-slate-400">{p.scope}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
