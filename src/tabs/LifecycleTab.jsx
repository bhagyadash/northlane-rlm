import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  ClipboardList,
  Truck,
  Gauge,
  ArrowLeftRight,
  Receipt,
  Wallet,
  Inbox,
  Play,
  SkipForward,
  Eye,
  FileText,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Globe2,
  Target,
} from 'lucide-react'
import { DEALS, STEP_ORDER, NORTH_STAR_METRIC } from '../data/lifecycle.js'
import { money } from '../lib/format.js'
import { ReasoningStep, ThinkingStep, DecisionBanner, StatCard, Pill } from '../components/ui.jsx'
import LifecycleExplainer from '../components/LifecycleExplainer.jsx'

function ChannelBadge({ deal }) {
  return deal.channel === 'partner' ? <Pill tone="violet">via {deal.partnerName}</Pill> : <Pill>direct</Pill>
}

const STEP_META = {
  quote: { icon: ClipboardList, label: 'Quote & order (CPQ)' },
  fulfillment: { icon: Truck, label: 'Fulfillment & provisioning' },
  metering: { icon: Gauge, label: 'Usage metering & rating' },
  fxConversion: { icon: ArrowLeftRight, label: 'FX conversion & settlement' },
  invoice: { icon: Receipt, label: 'Invoice generation' },
  cashApplication: { icon: Wallet, label: 'Cash application' },
}

const STEP_DELAY_MS = 650
const DECISION_DELAY_MS = 550
const SETTLE_DELAY_MS = 900

function DealPanel({ deal, revealCount, decisionShown, thinking }) {
  if (!deal) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-800 text-center text-slate-500">
        <Inbox size={28} className="text-slate-700" />
        <p className="max-w-xs text-sm">Select a deal from the queue, or click "Run next deal" to watch it move through the pipeline.</p>
      </div>
    )
  }

  const clear = deal.outcome === 'clear'

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <FileText size={13} />
            {deal.dealId} · {deal.period}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold text-slate-100">{deal.customer}</span>
            <ChannelBadge deal={deal} />
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
            <Globe2 size={12} />
            {deal.region} · {deal.currency} · {deal.products.join(' + ')}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xl font-semibold text-slate-100">{money(deal.total, deal.currency)}</div>
          <div className="text-xs text-slate-500">
            {deal.currency !== 'USD' ? `≈ ${money(deal.totalUSD, 'USD')} functional currency` : 'functional currency'}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
        {deal.lineItems.map((li) => (
          <div key={li.label} className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">{li.label}</span>
            <span className={`shrink-0 font-mono ${li.amount < 0 ? 'text-emerald-400' : 'text-slate-300'}`}>{money(li.amount, deal.currency)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {deal.trail.map((step, i) => {
          const meta = STEP_META[step.phase]
          return (
            <ReasoningStep
              key={step.phase}
              icon={meta.icon}
              label={meta.label}
              detail={step.detail}
              confidence={step.confidence}
              issue={step.issue}
              visible={i < revealCount}
            />
          )
        })}
        {thinking && <ThinkingStep />}
      </div>

      <DecisionBanner
        visible={decisionShown}
        success={clear}
        title={clear ? `Cash applied — ${money(deal.total, deal.currency)} closed` : 'Held in the pipeline'}
        detail={
          clear
            ? 'Every step above cleared. This deal moved from quote to cash with no human touch.'
            : deal.outcomeReason
        }
      />
    </div>
  )
}

function QueueRow({ deal, onSelect, selected, isActive }) {
  return (
    <button
      onClick={() => onSelect(deal.id)}
      className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors ${
        selected ? 'border-sky-500/50 bg-sky-500/[0.06]' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
      }`}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-slate-200">{deal.customer}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <ChannelBadge deal={deal} />
          <span className="text-xs text-slate-500">{deal.region} · {deal.products.join(' + ')}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-xs text-slate-400">{money(deal.total, deal.currency)}</span>
        {isActive && <Loader2 size={13} className="animate-spin text-sky-400" />}
      </div>
    </button>
  )
}

function HistoryRow({ deal, onSelect, selected }) {
  const clear = deal.outcome === 'clear'
  return (
    <button
      onClick={() => onSelect(deal.id)}
      className={`flex w-full flex-col gap-1.5 border-b border-slate-800/80 px-4 py-2.5 text-left text-sm transition-colors last:border-b-0 ${
        selected ? 'bg-sky-500/[0.06]' : 'hover:bg-slate-800/40'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate font-medium text-slate-200">{deal.customer}</span>
        {clear ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
            <CheckCircle2 size={11} /> clear
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400 ring-1 ring-inset ring-amber-500/30">
            <AlertTriangle size={11} /> held
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500">{deal.dealId}</span>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-slate-400">
          {money(deal.total, deal.currency)}
          <Eye size={12} className="text-slate-600" />
        </span>
      </div>
    </button>
  )
}

export default function LifecycleTab() {
  const [queue, setQueue] = useState(() => DEALS.map((d) => d.id))
  const [history, setHistory] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [revealCount, setRevealCount] = useState(0)
  const [decisionShown, setDecisionShown] = useState(false)
  const [autoRun, setAutoRun] = useState(false)
  const timers = useRef([])

  const byId = useMemo(() => Object.fromEntries(DEALS.map((d) => [d.id, d])), [])

  const queueRef = useRef(queue)
  useEffect(() => {
    queueRef.current = queue
  }, [queue])
  const activeIdRef = useRef(activeId)
  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => () => clearTimers(), [])

  const processNext = useCallback(() => {
    if (activeIdRef.current !== null || queueRef.current.length === 0) return
    const [id, ...rest] = queueRef.current
    const deal = byId[id]

    activeIdRef.current = id
    setQueue(rest)
    setActiveId(id)
    setSelectedId(id)
    setRevealCount(0)
    setDecisionShown(false)

    deal.trail.forEach((_, i) => {
      const t = setTimeout(() => setRevealCount((c) => Math.max(c, i + 1)), STEP_DELAY_MS * (i + 1))
      timers.current.push(t)
    })
    const decisionAt = STEP_DELAY_MS * deal.trail.length + DECISION_DELAY_MS
    timers.current.push(setTimeout(() => setDecisionShown(true), decisionAt))
    timers.current.push(
      setTimeout(() => {
        setHistory((h) => [id, ...h])
        activeIdRef.current = null
        setActiveId(null)
      }, decisionAt + SETTLE_DELAY_MS),
    )
  }, [byId])

  useEffect(() => {
    if (autoRun && activeId === null && queue.length > 0) {
      const t = setTimeout(() => processNext(), 250)
      timers.current.push(t)
    }
    if (autoRun && queue.length === 0 && activeId === null) {
      setAutoRun(false)
    }
  }, [autoRun, activeId, queue.length, processNext])

  const displayed = selectedId ? byId[selectedId] : null
  const displayedIsActive = selectedId !== null && selectedId === activeId
  const displayRevealCount = displayedIsActive ? revealCount : displayed ? displayed.trail.length : 0
  const displayDecisionShown = displayedIsActive ? decisionShown : Boolean(displayed)
  const thinking = displayedIsActive && revealCount < (displayed?.trail.length ?? 0)

  const stats = useMemo(() => {
    const processed = history.map((id) => byId[id])
    const clear = processed.filter((d) => d.outcome === 'clear')
    const held = processed.filter((d) => d.outcome === 'held')
    const clearedUSD = clear.reduce((s, d) => s + d.totalUSD, 0)
    const rate = processed.length ? Math.round((clear.length / processed.length) * 100) : 0
    return { processed: processed.length, clear: clear.length, held: held.length, clearedUSD, rate }
  }, [history, byId])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.04] px-4 py-3 text-xs text-sky-200/80">
        <Sparkles size={14} className="mt-0.5 shrink-0 text-sky-400" />
        <p>
          Every card below is the literal step a deal took across quoting, fulfillment, metering, FX, invoicing, and
          cash application — not a progress bar. Seven deals span seven currencies, a hardware customs hold, a
          marketplace-partner attribution gap, an expired FX rate lock, a metering-pipeline outage, and a statutory
          withholding-tax reconciliation. When a step can't clear, the trail says exactly why and holds the deal.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] px-4 py-3 text-xs text-emerald-100/80">
        <Target size={14} className="mt-0.5 shrink-0 text-emerald-400" />
        <p>
          <span className="font-medium text-emerald-300">North Star — {NORTH_STAR_METRIC.name}: </span>
          {NORTH_STAR_METRIC.definition} Open the primer below for the one metric to optimize at each of the six
          steps.
        </p>
      </div>

      <LifecycleExplainer />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Processed" value={stats.processed} sub={`${queue.length} left in queue`} />
        <StatCard label="Straight-through rate" value={`${stats.rate}%`} tone="text-emerald-400" sub={`${stats.clear} closed clean`} />
        <StatCard label="Held in pipeline" value={stats.held} tone="text-amber-400" sub="exact reason shown per deal" />
        <StatCard label="Value cleared" value={money(stats.clearedUSD, 'USD')} sub="converted to USD for comparison" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <Inbox size={15} className="text-sky-400" />
                Deal queue
              </div>
              <span className="font-mono text-xs text-slate-500">{queue.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {queue.length === 0 && <p className="text-xs text-slate-500">Queue is empty — every deal has run through the pipeline.</p>}
              {queue.map((id) => (
                <QueueRow key={id} deal={byId[id]} onSelect={setSelectedId} selected={selectedId === id} isActive={activeId === id} />
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={processNext}
                disabled={activeId !== null || queue.length === 0}
                className="flex items-center justify-center gap-1.5 rounded-md bg-sky-500 px-3 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
              >
                <Play size={14} />
                Run next deal
              </button>
              <button
                onClick={() => setAutoRun(true)}
                disabled={autoRun || queue.length === 0}
                className="flex items-center justify-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SkipForward size={14} />
                {autoRun ? 'Running…' : 'Run all remaining'}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-200">Processed — trail retained</div>
            {history.length === 0 ? (
              <p className="px-4 py-4 text-xs text-slate-500">Processed deals will appear here — click any row later to re-open its full trail.</p>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {history.map((id) => (
                  <HistoryRow key={id} deal={byId[id]} onSelect={setSelectedId} selected={selectedId === id} />
                ))}
              </div>
            )}
          </div>
        </div>

        <DealPanel deal={displayed} revealCount={displayRevealCount} decisionShown={displayDecisionShown} thinking={thinking} />
      </div>

      <div className="flex items-start gap-2 text-xs text-slate-500">
        <Info size={14} className="mt-0.5 shrink-0" />
        <p>
          Sample data only — customers, usage volumes, FX rates, and dollar amounts are scripted for this demo, not
          pulled from a live CPQ, ERP, metering pipeline, or bank feed. The decision logic (what triggers a hold vs.
          straight-through clearance, and why) mirrors how an explainable revenue platform would evaluate each step
          across quoting, fulfillment, metering, FX, invoicing, and cash application in one pipeline. Step order is
          fixed across every deal in {STEP_ORDER.length} steps — deals without a given product (e.g. no hardware)
          simply show that step as a no-op rather than being skipped.
        </p>
      </div>
    </div>
  )
}
