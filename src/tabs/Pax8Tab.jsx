import React from 'react'
import {
  Target,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Users,
  GraduationCap,
  Lightbulb,
  ExternalLink,
  Info,
  Workflow,
  ArrowRight,
  Rocket,
} from 'lucide-react'
import { ROLE, PILLARS, SETTLEMENT_EXAMPLE, SETTLEMENT_TIMING, NEXT_BETS } from '../data/pax8.js'
import { money } from '../lib/format.js'
import { SectionCard, Pill } from '../components/ui.jsx'

const ICONS = { Target, ShieldCheck, Sparkles, HeartHandshake, Users, GraduationCap, Lightbulb }

function PillarCard({ pillar }) {
  const Icon = ICONS[pillar.icon]
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={15} className="text-violet-400" />
        <span className="text-sm font-medium text-slate-200">{pillar.title}</span>
      </div>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 w-16 shrink-0 text-slate-600">The ask</span>
          <span className="text-slate-400">{pillar.ask}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 w-16 shrink-0 text-violet-400">My take</span>
          <span className="text-slate-300">{pillar.response}</span>
        </div>
      </div>
      {pillar.tieIns.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {pillar.tieIns.map((t) => (
            <Pill key={t} tone="violet">
              {t}
            </Pill>
          ))}
        </div>
      )}
    </div>
  )
}

function SettlementWaterfall() {
  const { seats, product, parties, pricePerSeat } = SETTLEMENT_EXAMPLE
  const retailTotal = seats * pricePerSeat.retail
  const distributorTotal = seats * pricePerSeat.distributor
  const wholesaleTotal = seats * pricePerSeat.wholesale
  const mspMargin = retailTotal - distributorTotal
  const distributorMargin = distributorTotal - wholesaleTotal
  const isvNet = wholesaleTotal

  const rows = [
    { label: parties.endCustomer, role: 'Pays retail for the subscription', amount: retailTotal, tone: 'text-slate-100' },
    { label: parties.msp, role: `Keeps a ${money(mspMargin, 'USD')} margin (${((mspMargin / retailTotal) * 100).toFixed(1)}% of the sale), remits the rest`, amount: -mspMargin, tone: 'text-emerald-400' },
    { label: parties.distributor, role: `Keeps a ${money(distributorMargin, 'USD')} distribution margin (${((distributorMargin / retailTotal) * 100).toFixed(1)}% of the sale), remits the rest`, amount: -distributorMargin, tone: 'text-emerald-400' },
    { label: parties.isv, role: `Net receipt for the underlying product (${((isvNet / retailTotal) * 100).toFixed(1)}% of the sale)`, amount: -isvNet, tone: 'text-slate-100' },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-medium text-slate-200">
            {seats} seats · {product}
          </div>
          <div className="font-mono text-lg font-semibold text-slate-100">{money(retailTotal, 'USD')}</div>
        </div>
        <div className="flex flex-col gap-2.5">
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-start justify-between gap-3 border-b border-slate-800/60 pb-2.5 text-xs last:border-b-0 last:pb-0">
              <div className="min-w-0">
                <div className="font-medium text-slate-200">{r.label}</div>
                <div className="mt-0.5 text-slate-500">{r.role}</div>
              </div>
              <span className={`shrink-0 font-mono ${r.tone}`}>{i === 0 ? money(r.amount, 'USD') : `−${money(-r.amount, 'USD')}`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg border border-slate-800 p-3">
          <div className="font-mono text-base font-semibold text-emerald-400">{((mspMargin / retailTotal) * 100).toFixed(1)}%</div>
          <div className="mt-1 text-slate-500">MSP margin</div>
        </div>
        <div className="rounded-lg border border-slate-800 p-3">
          <div className="font-mono text-base font-semibold text-emerald-400">{((distributorMargin / retailTotal) * 100).toFixed(1)}%</div>
          <div className="mt-1 text-slate-500">Distributor margin</div>
        </div>
        <div className="rounded-lg border border-slate-800 p-3">
          <div className="font-mono text-base font-semibold text-sky-400">{((isvNet / retailTotal) * 100).toFixed(1)}%</div>
          <div className="mt-1 text-slate-500">ISV net receipt</div>
        </div>
      </div>
    </div>
  )
}

export default function Pax8Tab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-2 rounded-xl border border-violet-500/25 bg-violet-500/[0.05] px-4 py-3 text-xs text-violet-200/80">
        <Info size={14} className="mt-0.5 shrink-0 text-violet-400" />
        <p>
          This tab is an independent product-thinking exercise prepared ahead of an interview conversation for
          Pax8's{' '}
          <a href={ROLE.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-violet-300 underline decoration-violet-500/40 underline-offset-2 hover:text-violet-200">
            {ROLE.title} role ({ROLE.reqId})
            <ExternalLink size={11} />
          </a>
          . It is not affiliated with, endorsed by, or built using any non-public information from Pax8 — the
          marketplace mechanics below are modeled on publicly known patterns of how cloud marketplaces work, not
          Pax8's actual systems, and every figure is invented for this demo.
        </p>
      </div>

      <SectionCard icon={Workflow} title="Why this prototype maps to the role" sub="Built independently, before this conversation, across the same six domains the role owns.">
        <p className="text-sm leading-relaxed text-slate-300">
          The role's scope — quoting, fulfillment, metering, FX, order-to-cash, and product information, plus an
          emerging "AI commerce" layer on top — is the same scope this entire prototype was built around. The seven
          pillars below take each part of the role and point at exactly where in this prototype that thinking already
          shows up, and where a prototype can't stand in for real experience, I've said so directly instead of
          stretching a feature to cover it.
        </p>
      </SectionCard>

      <SectionCard icon={Target} title="Role pillars, mapped" sub="What each pillar asks for, and how this prototype already reflects that thinking.">
        <div className="grid gap-3 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <PillarCard key={p.key} pillar={p} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        icon={Sparkles}
        title="Worked example: a four-party marketplace settlement"
        sub="Reuses Northlane's own Core Enterprise seat price, run through the shape of a distributor business like Pax8's."
      >
        <SettlementWaterfall />
      </SectionCard>

      <SectionCard icon={ArrowRight} title="Today vs. next-gen: the same transaction, settled two ways" sub="What changes if the split above becomes one real-time event instead of three sequential invoices.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="py-2 pr-4 font-medium">Dimension</th>
                <th className="py-2 pr-4 font-medium">Today (batch)</th>
                <th className="py-2 font-medium text-violet-400">Next-gen (real-time)</th>
              </tr>
            </thead>
            <tbody>
              {SETTLEMENT_TIMING.map((row) => (
                <tr key={row.dimension} className="border-b border-slate-800/60 align-top">
                  <td className="py-2.5 pr-4 font-medium text-slate-200">{row.dimension}</td>
                  <td className="py-2.5 pr-4 text-slate-400">{row.today}</td>
                  <td className="py-2.5 text-slate-300">{row.nextGen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard icon={Rocket} title="What I'd propose building next" sub="Four specific bets, not commentary.">
        <div className="grid gap-3 sm:grid-cols-2">
          {NEXT_BETS.map((b) => (
            <div key={b.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 text-sm font-medium text-slate-200">{b.title}</div>
              <p className="text-xs leading-relaxed text-slate-400">{b.detail}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex items-start gap-2 text-xs text-slate-500">
        <Info size={14} className="mt-0.5 shrink-0" />
        <p>
          The company names, seat counts, and dollar figures above (Anders Legal, Ferrovia Managed Services) are
          invented for this demo — the point is the mechanism, not the numbers. Nothing on this page reflects, or
          claims to reflect, Pax8's actual products, pricing, partners, or technology.
        </p>
      </div>
    </div>
  )
}
