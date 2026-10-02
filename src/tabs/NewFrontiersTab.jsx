import React from 'react'
import { History, ArrowRightLeft, Wrench, BookOpen, Sparkles, ArrowRight, Gauge } from 'lucide-react'
import { ERAS, COMPARISON_ROWS, PRIMITIVES, CAPABILITY_GAPS, FRONTIER_METRICS } from '../data/frontiers.js'
import { DEALS } from '../data/lifecycle.js'
import { SectionCard, Pill } from '../components/ui.jsx'

function dealTag(id) {
  const d = DEALS.find((x) => x.dealId === id)
  return d ? `${d.customer} · ${id}` : id
}

function EraCard({ era, isLast }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-500/40 text-sky-400">
          <History size={14} />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-slate-800" />}
      </div>
      <div className="pb-6">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-100">{era.title}</span>
          <span className="font-mono text-xs text-slate-500">{era.years}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{era.description}</p>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
          <span>
            <span className="text-slate-400">Trigger — </span>
            {era.trigger}
          </span>
          <span>
            <span className="text-slate-400">Settlement — </span>
            {era.settlement}
          </span>
        </div>
      </div>
    </div>
  )
}

function PrimitiveCard({ p }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={13} className="text-violet-400" />
        <span className="text-sm font-medium text-slate-200">{p.title}</span>
      </div>
      <p className="text-xs leading-relaxed text-slate-400">{p.detail}</p>
      {p.evidence && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-violet-500/20 bg-violet-500/[0.05] px-3 py-2">
          <Pill tone="violet">{dealTag(p.evidence)}</Pill>
          <p className="text-[11px] leading-relaxed text-slate-400">{p.evidenceNote}</p>
        </div>
      )}
    </div>
  )
}

export default function NewFrontiersTab() {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard icon={BookOpen} title="Why this segment is separate" sub="Not another pricing model — a different question about who transacts and how fast money moves.">
        <p className="text-sm leading-relaxed text-slate-300">
          Zuora, Salesforce Revenue Cloud, Stripe Billing, and Workday were each built to answer "how do we price and
          bill this correctly" for the era they launched in — perpetual license, subscription, or metered usage.
          Marketplace platforms like <span className="text-slate-100">Pax8</span> answered a different question that
          matters more every year: what happens when a transaction has to split across more than one party — a
          distributor, an ISV, a reselling partner — before anyone gets paid. This segment is kept apart from the
          Lifecycle Console on purpose: it's a deliberate look forward at usage-based billing, token consumption,
          settlement, and commerce primitives that are still emerging, using the same seven deals as evidence rather
          than hypotheticals.
        </p>
      </SectionCard>

      <SectionCard icon={History} title="Five eras, each defined by what actually triggers the charge" sub="From a signed order form to an autonomous agent-to-agent transaction.">
        <div className="flex flex-col">
          {ERAS.map((era, i) => (
            <EraCard key={era.key} era={era} isLast={i === ERAS.length - 1} />
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={ArrowRightLeft} title="Conventional RLM vs. emerging RLM" sub="Same functions — quoting, fulfillment, metering, FX, invoicing, cash — structurally different execution.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="py-2 pr-4 font-medium">Dimension</th>
                <th className="py-2 pr-4 font-medium">Conventional RLM</th>
                <th className="py-2 font-medium text-violet-400">Emerging RLM</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.dimension} className="border-b border-slate-800/60 align-top">
                  <td className="py-2.5 pr-4 font-medium text-slate-200">{row.dimension}</td>
                  <td className="py-2.5 pr-4 text-slate-400">{row.conventional}</td>
                  <td className="py-2.5 text-slate-300">{row.emerging}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard icon={Sparkles} title="Future commerce primitives" sub="Concrete capabilities, each grounded in a deal from the Lifecycle Console.">
        <div className="grid gap-3 sm:grid-cols-2">
          {PRIMITIVES.map((p) => (
            <PrimitiveCard key={p.title} p={p} />
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={Gauge} title="Metrics that matter in emerging RLM" sub="How you'd know the shift is actually working — not the Lifecycle Console's day-to-day operating metrics, but whether the next-gen bets are paying off.">
        <div className="grid gap-3 sm:grid-cols-2">
          {FRONTIER_METRICS.map((m) => (
            <div key={m.metric} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 text-sm font-medium text-slate-200">{m.metric}</div>
              <p className="text-xs leading-relaxed text-slate-400">{m.definition}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-violet-300/90">{m.evidence}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={Wrench} title="What a conventional RLM platform has to rebuild" sub="Capability gaps, each tied to a specific deal as evidence.">
        <div className="grid gap-3 sm:grid-cols-2">
          {CAPABILITY_GAPS.map((g) => (
            <div key={g.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-200">{g.title}</span>
                <Pill tone="violet">{g.tieIn}</Pill>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 w-12 shrink-0 text-slate-600">Before</span>
                  <span className="text-slate-400">{g.before}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 w-12 shrink-0 text-violet-400">After</span>
                  <span className="text-slate-300">{g.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-sm leading-relaxed text-slate-300">
        The through-line: conventional RLM was built to price and bill <em>one seller's relationship with one
        buyer</em>. The emerging shape of revenue is multi-party by default and continuous instead of batched —
        which means PIM, FX, metering, and settlement all have to become live, always-on dependencies a transaction
        checks in real time, not reference data a report reads after the fact.
        <ArrowRight size={14} className="ml-1 inline text-slate-600" />
      </div>
    </div>
  )
}
