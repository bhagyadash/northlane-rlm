import React, { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, ClipboardList, Truck, Gauge, ArrowLeftRight, Receipt, Wallet, Users, Building2, Target } from 'lucide-react'
import { STEP_METRICS, NORTH_STAR_METRIC } from '../data/lifecycle.js'

const EXPLAINER_STEPS = [
  {
    key: 'quote',
    title: 'Quote & order (CPQ)',
    icon: ClipboardList,
    definition: "The moment a deal gets priced and approved — what's being sold, at what discount, under what terms.",
    whyItMatters: "Get this step wrong and everything downstream inherits the error — you can't fulfill, meter, or invoice against a quote that was never actually approved correctly.",
    commonFailure: 'A discount or payment term exceeds what was pre-approved, and the deal needed sign-off before it could book.',
  },
  {
    key: 'fulfillment',
    title: 'Fulfillment & provisioning',
    icon: Truck,
    definition: 'Actually delivering what was sold — activating a software seat, shipping a physical device, issuing an API key.',
    whyItMatters: "For physical goods, many contracts tie invoicing to confirmed delivery, not to the sale itself — so fulfillment status can directly gate when (or whether) revenue can be recognized.",
    commonFailure: 'A shipment gets held at customs or a warehouse, and the revenue behind it has to wait too.',
  },
  {
    key: 'metering',
    title: 'Usage metering & rating',
    icon: Gauge,
    definition: 'Counting what was actually consumed — API calls, AI tokens, minutes — and pricing it against the plan.',
    whyItMatters: "Usage-based products don't have a fixed monthly number; if the metering pipeline itself has a gap, the bill goes wrong in a way no human can eyeball and catch.",
    commonFailure: 'A metering pipeline has an outage, and usage looks artificially low for the days it was down.',
  },
  {
    key: 'fxConversion',
    title: 'FX conversion & settlement',
    icon: ArrowLeftRight,
    definition: "Turning a deal priced in one currency into the currency the seller reports revenue in — and handling what happens when rates move between quote and invoice.",
    whyItMatters: "A rate locked at quote time doesn't stay accurate forever; if too much time passes before invoicing, the locked rate can drift away from the real market rate.",
    commonFailure: 'An invoice goes out weeks after its FX rate lock expired, and nobody re-verified the rate before booking revenue.',
  },
  {
    key: 'invoice',
    title: 'Invoice generation',
    icon: Receipt,
    definition: 'Assembling everything above into one bill: the subscription charge, the metered usage, the hardware — in the currency the customer expects.',
    whyItMatters: "This is the one artifact the customer actually sees — every number on it needs to trace back to something real, or trust breaks.",
    commonFailure: "A bill goes out before every underlying number is actually finalized, and it has to be corrected after the fact.",
  },
  {
    key: 'cashApplication',
    title: 'Cash application',
    icon: Wallet,
    definition: "Matching the payment that actually arrives back to the invoice it's paying off.",
    whyItMatters: "A payment that's short of the invoice total isn't always a problem — sometimes it's a legally required tax withholding — so this step has to tell the difference.",
    commonFailure: 'A short payment gets treated as a customer problem when it was actually a compliance requirement, or vice versa.',
  },
]

export default function LifecycleExplainer() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-sky-400" />
          <span className="text-sm font-medium text-slate-200">New to quote-to-cash? Start here</span>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            cast of characters + 6-step primer + metrics
          </span>
        </div>
        {open ? <ChevronUp size={16} className="shrink-0 text-slate-500" /> : <ChevronDown size={16} className="shrink-0 text-slate-500" />}
      </button>

      {open && (
        <div className="flex flex-col gap-5 border-t border-slate-800 px-4 py-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <Users size={13} className="text-sky-400" />
              Cast of characters — who's who in the deal queue
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                <Building2 size={13} className="mt-0.5 shrink-0 text-slate-500" />
                <span>
                  <span className="font-medium text-slate-200">Northlane Systems is the ISV</span> — the vendor that
                  owns this RLM platform and the products running through it (Core, Sensors, Data API, Copilot).
                  Everything below is Northlane's own view of its revenue.
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                <Building2 size={13} className="mt-0.5 shrink-0 text-slate-500" />
                <span>
                  <span className="font-medium text-slate-200">Six of the seven deals are direct</span> — the
                  customer (e.g. Northfield Health, Kestrel Biologics) buys straight from Northlane, with no
                  reseller in between.
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                <Building2 size={13} className="mt-0.5 shrink-0 text-slate-500" />
                <span>
                  <span className="font-medium text-slate-200">One deal is a channel deal</span> — Sable & Voss buys
                  through a marketplace distributor, CloudRelay, instead of buying from Northlane directly. That's
                  the one row tagged "via CloudRelay" in the queue, and it's the same shape as a Pax8-style
                  marketplace: ISV → distributor → reselling partner → end customer. See the For Pax8 tab for where
                  that shape gets explored further.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-sky-500/25 bg-sky-500/[0.05] p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-sky-400">
              <Target size={13} />
              North Star — {NORTH_STAR_METRIC.name}
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{NORTH_STAR_METRIC.definition}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{NORTH_STAR_METRIC.why}</p>
          </div>

          <div>
            <p className="mb-3 text-xs text-slate-500">
              A plain-English walkthrough of the six steps every deal below actually takes, each with the one metric
              a PM would hold the step accountable to — not specific to any one deal's numbers. If you already know
              what quote-to-cash means, skip this.
            </p>
            <div className="flex flex-col gap-2.5">
              {EXPLAINER_STEPS.map((s, i) => {
                const Icon = s.icon
                const m = STEP_METRICS[s.key]
                return (
                  <div key={s.title} className="flex gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">
                        {i + 1}. {s.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.definition}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        <span className="text-slate-400">Why it matters — </span>
                        {s.whyItMatters}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        <span className="text-slate-400">What commonly goes wrong — </span>
                        {s.commonFailure}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-emerald-400/90">
                        <span className="font-medium">Metric to optimize — </span>
                        {m.metric}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
