import React from 'react'
import { Target, ListChecks, Lightbulb, AlertTriangle, Compass, Info } from 'lucide-react'
import { GOAL, ASSUMPTIONS, LEARNINGS, SHORTCOMINGS, NEXT_QUESTIONS } from '../data/learnings.js'
import { DEALS } from '../data/lifecycle.js'
import { SectionCard, Pill } from '../components/ui.jsx'

const KIND_META = {
  structural: { label: 'structural choice', tone: 'slate' },
  invented: { label: 'invented', tone: 'sky' },
  simplified: { label: 'simplified', tone: 'amber' },
  unsourced: { label: 'not sourced', tone: 'amber' },
}

function dealTag(id) {
  const d = DEALS.find((x) => x.dealId === id)
  return d ? `${d.customer} · ${id}` : id
}

export default function LearningsTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.04] px-4 py-3 text-xs text-sky-200/80">
        <Info size={14} className="mt-0.5 shrink-0 text-sky-400" />
        <p>
          A learning artifact, not a proposal. This page says what building the prototype taught me, which of its
          numbers are assumptions, and what it cannot tell you — so you can weigh the other tabs accordingly.
        </p>
      </div>

      <SectionCard icon={Target} title="Goal" sub="Why I built this.">
        <p className="text-sm leading-relaxed text-slate-300">{GOAL.summary}</p>
        <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">Questions I set out to answer</div>
        <ol className="mt-2 flex flex-col gap-1.5">
          {GOAL.questions.map((q, i) => (
            <li key={q} className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
              <span className="mt-0.5 w-4 shrink-0 font-mono text-sky-400">{i + 1}.</span>
              {q}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard icon={ListChecks} title="Assumptions behind the numbers" sub="What I decided, invented, or simplified. The amber tags are the ones to treat as illustrations, not facts.">
        <div className="grid gap-3 sm:grid-cols-2">
          {ASSUMPTIONS.map((a) => {
            const meta = KIND_META[a.kind]
            return (
              <div key={a.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-200">{a.title}</span>
                  <Pill tone={meta.tone}>{meta.label}</Pill>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">{a.detail}</p>
              </div>
            )
          })}
        </div>
      </SectionCard>

      <SectionCard icon={Lightbulb} title="What I learned" sub="Six things the exercise made concrete.">
        <div className="grid gap-3 sm:grid-cols-2">
          {LEARNINGS.map((l, i) => (
            <div key={l.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-start gap-2">
                <span className="mt-0.5 font-mono text-xs text-emerald-400">{i + 1}.</span>
                <span className="text-sm font-medium text-slate-200">{l.title}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">{l.detail}</p>
              {(l.tab || l.deals.length > 0) && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {l.tab && <Pill tone="emerald">{l.tab}</Pill>}
                  {l.deals.map((id) => (
                    <Pill key={id} tone="violet">
                      {dealTag(id)}
                    </Pill>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={AlertTriangle} title="What this prototype does not help with" sub="Shortcomings, stated plainly.">
        <div className="grid gap-3 sm:grid-cols-2">
          {SHORTCOMINGS.map((s) => (
            <div key={s.title} className="rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-4">
              <div className="mb-1.5 text-sm font-medium text-slate-200">{s.title}</div>
              <p className="text-xs leading-relaxed text-slate-400">{s.detail}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={Compass} title="What I'd want to learn next" sub="The questions this prototype raises but cannot answer.">
        <ul className="flex flex-col gap-2.5">
          {NEXT_QUESTIONS.map((q) => (
            <li key={q} className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
              <Compass size={13} className="mt-0.5 shrink-0 text-sky-400" />
              {q}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
