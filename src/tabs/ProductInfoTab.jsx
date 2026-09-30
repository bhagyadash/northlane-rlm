import React, { useState, useMemo } from 'react'
import { Layers, Package, Tag, Database, Globe2, Boxes, CheckCircle2, XCircle, Info } from 'lucide-react'
import { PRODUCT_FAMILIES, REGIONS, PRICE_BOOKS, BUNDLES } from '../data/catalog.js'
import { DEALS } from '../data/lifecycle.js'
import { money, pct } from '../lib/format.js'
import { SectionCard, Pill, StatCard } from '../components/ui.jsx'

function dealLabel(dealId) {
  const deal = DEALS.find((d) => d.dealId === dealId)
  return deal ? `${deal.customer} (${dealId})` : dealId
}

function FamilyRow({ family, selected, onSelect, completeness }) {
  return (
    <button
      onClick={() => onSelect(family.key)}
      className={`flex w-full items-start justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors ${
        selected ? 'border-sky-500/50 bg-sky-500/[0.06]' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
      }`}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-slate-200">{family.name}</div>
        <div className="text-xs text-slate-500">{family.category}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className={`font-mono text-xs ${completeness === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>{completeness}%</div>
        <div className="text-[10px] text-slate-600">localized</div>
      </div>
    </button>
  )
}

function FamilyDetail({ family }) {
  const rows = family.skus.map((sku) => {
    const cells = REGIONS.map((r) => ({ currency: r.currency, price: PRICE_BOOKS[r.currency]?.[sku.sku] }))
    return { sku, cells }
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Package size={15} className="text-sky-400" />
          <h3 className="text-sm font-medium text-slate-200">{family.name}</h3>
          <Pill tone="sky">{family.lifecycle}</Pill>
        </div>
        <div className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
          <div>
            <div className="text-slate-500">Unit of measure</div>
            <div className="mt-0.5 text-slate-300">{family.uom}</div>
          </div>
          <div>
            <div className="text-slate-500">Revenue treatment</div>
            <div className="mt-0.5 text-slate-300">{family.revenueTreatment}</div>
          </div>
          <div>
            <div className="text-slate-500">Category</div>
            <div className="mt-0.5 text-slate-300">{family.category}</div>
          </div>
        </div>
      </div>

      <SectionCard icon={Globe2} title="Localized price book" sub="One approved unit price per SKU per currency — a blank cell blocks quoting in that region until pricing ops fills it in.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="py-2 pr-4 font-medium">SKU</th>
                {REGIONS.map((r) => (
                  <th key={r.currency} className="py-2 pr-4 font-medium">{r.currency}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ sku, cells }) => (
                <tr key={sku.sku} className="border-b border-slate-800/60">
                  <td className="py-2.5 pr-4">
                    <div className="font-medium text-slate-200">{sku.name}</div>
                    <div className="font-mono text-[10px] text-slate-600">{sku.sku}</div>
                  </td>
                  {cells.map((c) => (
                    <td key={c.currency} className="py-2.5 pr-4 font-mono text-slate-300">
                      {typeof c.price === 'number' ? (
                        money(c.price, c.currency)
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400">
                          <XCircle size={11} /> not localized
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

export default function ProductInfoTab() {
  const [selected, setSelected] = useState('core')
  const family = PRODUCT_FAMILIES.find((f) => f.key === selected)

  const completenessByFamily = useMemo(() => {
    const out = {}
    for (const f of PRODUCT_FAMILIES) {
      const cells = f.skus.flatMap((sku) => REGIONS.map((r) => PRICE_BOOKS[r.currency]?.[sku.sku]))
      const populated = cells.filter((v) => typeof v === 'number').length
      out[f.key] = Math.round((populated / cells.length) * 100)
    }
    return out
  }, [])

  const overall = useMemo(() => {
    const vals = Object.values(completenessByFamily)
    return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)
  }, [completenessByFamily])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.04] px-4 py-3 text-xs text-sky-200/80">
        <Database size={14} className="mt-0.5 shrink-0 text-sky-400" />
        <p>
          Product Information Services is the single system of record every other tab reads from — quoting can't
          price a SKU that isn't localized into the deal's currency, and fulfillment can't provision a SKU that isn't
          in the catalog. The gaps below (Sensors/Copilot pricing not yet localized into JPY, BRL, and INR) are real
          data-completeness holes, not decoration — Solstice Robotics, Vantage Retail Group, and Torque Industrial
          can only buy Core and metered API today because of exactly this gap.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Product families" value={PRODUCT_FAMILIES.length} sub="Core, Sensors, API, Copilot" />
        <StatCard label="Total SKUs" value={PRODUCT_FAMILIES.reduce((s, f) => s + f.skus.length, 0)} />
        <StatCard label="Price-book coverage" value={pct(overall)} tone={overall === 100 ? 'text-emerald-400' : 'text-amber-400'} sub="across 7 currencies" />
        <StatCard label="Bundles defined" value={BUNDLES.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-2">
          {PRODUCT_FAMILIES.map((f) => (
            <FamilyRow key={f.key} family={f} selected={selected === f.key} onSelect={setSelected} completeness={completenessByFamily[f.key]} />
          ))}
        </div>

        <FamilyDetail family={family} />
      </div>

      <SectionCard icon={Boxes} title="Bundles" sub="Package definitions that quoting reads as one line item — each below is live in the Lifecycle Console.">
        <div className="grid gap-3 sm:grid-cols-2">
          {BUNDLES.map((b) => (
            <div key={b.key} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Tag size={13} className="text-sky-400" />
                <span className="text-sm font-medium text-slate-200">{b.name}</span>
              </div>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {b.skus.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-slate-400">{b.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {b.usedIn.map((id) => (
                  <Pill key={id} tone="emerald">
                    <CheckCircle2 size={10} className="mr-1 inline" />
                    {dealLabel(id)}
                  </Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex items-start gap-2 text-xs text-slate-500">
        <Info size={14} className="mt-0.5 shrink-0" />
        <p>
          Sample data only — the catalog, price books, and bundle definitions are invented for this demo. The
          incomplete localization (Sensors and Copilot missing JPY/BRL/INR price points) is a deliberate illustration
          of a real PIM failure mode, not a bug: expanding a product line into a new region is a pricing-ops task
          that has to finish before sales can quote it there.
        </p>
      </div>
    </div>
  )
}
