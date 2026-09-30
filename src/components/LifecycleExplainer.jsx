import React, { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, ClipboardList, Truck, Gauge, ArrowLeftRight, Receipt, Wallet } from 'lucide-react'

const EXPLAINER_STEPS = [
  {
    title: 'Quote & order (CPQ)',
    icon: ClipboardList,
    definition: "The moment a deal gets priced and approved — what's being sold, at what discount, under what terms.",
    whyItMatters: "Get this step wrong and everything downstream inherits the error — you can't fulfill, meter, or invoice against a quote that was never actually approved correctly.",
    commonFailure: 'A discount or payment term exceeds what was pre-approved, and the deal needed sign-off before it could book.',
  },
  {
    title: 'Fulfillment & provisioning',
    icon: Truck,
    definition: 'Actually delivering what was sold — activating a software seat, shipping a physical device, issuing an API key.',
    whyItMatters: "For physical goods, many contracts tie invoicing to confirmed delivery, not to the sale itself — so fulfillment status can directly gate when (or whether) revenue can be recognized.",
    commonFailure: 'A shipment gets held at customs or a warehouse, and the revenue behind it has to wait too.',
  },
  {
    title: 'Usage metering & rating',
    icon: Gauge,
    definition: 'Counting what was actually consumed — API calls, AI tokens, minutes — and pricing it against the plan.',
    whyItMatters: "Usage-based products don't have a fixed monthly number; if the metering pipeline itself has a gap, the bill goes wrong in a way no human can eyeball and catch.",
    commonFailure: 'A metering pipeline has an outage, and usage looks artificially low for the days it was down.',
  },
  {
    title: 'FX conversion & settlement',
    icon: ArrowLeftRight,
    definition: "Turning a deal priced in one currency into the currency the seller reports revenue in — and handling what happens when rates move between quote and invoice.",
    whyItMatters: "A rate locked at quote time doesn't stay accurate forever; if too much time passes before invoicing, the locked rate can drift away from the real market rate.",
    commonFailure: 'An invoice goes out weeks after its FX rate lock expired, and nobody re-verified the rate before booking revenue.',
  },
  {
    title: 'Invoice generation',
    icon: Receipt,
    definition: 'Assembling everything above into one bill: the subscription charge, the metered usage, the hardware — in the currency the customer expects.',
    whyItMatters: "This is the one artifact the customer actually sees — every number on it needs to trace back to something real, or trust breaks.",
    commonFailure: "A bill goes out before every underlying number is actually finalized, and it has to be corrected after the fact.",
  },
  {
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
            6-step primer
          </span>
        </div>
        {open ? <ChevronUp size={16} className="shrink-0 text-slate-500" /> : <ChevronDown size={16} className="shrink-0 text-slate-500" />}
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-slate-800 px-4 py-4">
          <p className="text-xs text-slate-500">
            A plain-English walkthrough of the six steps every deal below actually takes — not specific to any one
            deal's numbers. If you already know what quote-to-cash means, skip this.
          </p>
          <div className="flex flex-col gap-2.5">
            {EXPLAINER_STEPS.map((s, i) => {
              const Icon = s.icon
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
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
