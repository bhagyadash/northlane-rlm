import React, { useState } from 'react'
import LifecycleTab from './tabs/LifecycleTab.jsx'
import ProductInfoTab from './tabs/ProductInfoTab.jsx'
import NewFrontiersTab from './tabs/NewFrontiersTab.jsx'
import VisionTab from './tabs/VisionTab.jsx'
import Pax8Tab from './tabs/Pax8Tab.jsx'

const TABS = [
  {
    key: 'lifecycle',
    label: 'Lifecycle Console',
    heading: 'Quote-to-cash lifecycle console',
    sub: 'Seven global deals for Northlane Systems, each run through the same pipeline — quoting, fulfillment, metering, FX, invoicing, and cash application — with every step narrated with the exact evidence behind it, before the deal clears or gets held.',
  },
  {
    key: 'pim',
    label: 'Product Information',
    heading: 'Product Information Service',
    sub: 'The catalog, localized price books, and bundle definitions every other tab reads from — including the localization gaps that block quoting in some regions today.',
  },
  {
    key: 'frontiers',
    label: 'New Frontiers',
    heading: 'New frontiers in usage billing & settlement',
    sub: 'A distinct, forward-looking segment on token consumption, multi-party settlement, and commerce primitives emerging past the subscription-era platforms — grounded in the deals above, not hypotheticals.',
  },
  {
    key: 'vision',
    label: 'Vision & requirements',
    heading: 'Vision & requirements',
    sub: 'The three tabs above are Phase 1 only. This is the requirements review for what a production revenue lifecycle platform needs next.',
  },
  {
    key: 'pax8',
    label: 'For Pax8',
    heading: 'For Pax8 — VP of Product, Fintech',
    sub: 'An independent product-thinking exercise mapping this prototype to the role — not affiliated with or endorsed by Pax8.',
  },
]

export default function App() {
  const [view, setView] = useState('lifecycle')
  const active = TABS.find((t) => t.key === view)

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-sky-400">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Northlane — Revenue Lifecycle Management Prototype
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">{active.heading}</h1>
            <p className="max-w-2xl text-sm text-slate-400">{active.sub}</p>
          </div>

          <div className="flex flex-wrap gap-1 rounded-full border border-slate-800 bg-slate-900/60 p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setView(t.key)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  view === t.key ? 'bg-slate-700 text-slate-100' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {view === 'lifecycle' && <LifecycleTab />}
        {view === 'pim' && <ProductInfoTab />}
        {view === 'frontiers' && <NewFrontiersTab />}
        {view === 'vision' && <VisionTab />}
        {view === 'pax8' && <Pax8Tab />}
      </div>
    </div>
  )
}
