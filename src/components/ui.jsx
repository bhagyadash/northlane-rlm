import React from 'react'
import { AlertTriangle, CheckCircle2, ShieldAlert, Loader2 } from 'lucide-react'

export function ConfidenceChip({ value }) {
  if (typeof value !== 'number') return null
  const tone =
    value >= 90
      ? 'text-emerald-400 ring-emerald-500/30 bg-emerald-500/10'
      : value >= 75
      ? 'text-sky-400 ring-sky-500/30 bg-sky-500/10'
      : 'text-amber-400 ring-amber-500/30 bg-amber-500/10'
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-mono font-medium ring-1 ring-inset ${tone}`}>
      {value}% confidence
    </span>
  )
}

export function ReasoningStep({ icon: Icon, label, detail, confidence, issue, visible }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
      } ${issue ? 'border-amber-500/30 bg-amber-500/[0.06]' : 'border-slate-800 bg-slate-900/40'}`}
    >
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          issue ? 'bg-amber-500/10 text-amber-400' : 'bg-sky-500/10 text-sky-400'
        }`}
      >
        {issue ? <AlertTriangle size={14} /> : <Icon size={14} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
          <ConfidenceChip value={confidence} />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{detail}</p>
      </div>
    </div>
  )
}

export function ThinkingStep({ label = 'Agent is working on the next step…' }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-400">
        <Loader2 size={14} className="animate-spin" />
      </div>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  )
}

export function DecisionBanner({ visible, success, title, detail }) {
  if (!visible) return null
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 transition-all duration-500 ${
        success ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-amber-500/10'
      }`}
    >
      <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${success ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
        {success ? <CheckCircle2 size={15} /> : <ShieldAlert size={15} />}
      </div>
      <div>
        <div className={`text-sm font-semibold ${success ? 'text-emerald-300' : 'text-amber-300'}`}>{title}</div>
        <div className="mt-0.5 text-xs text-slate-400">{detail}</div>
      </div>
    </div>
  )
}

export function SectionCard({ icon: Icon, title, sub, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-1 flex items-center gap-2">
        {Icon && <Icon size={15} className="text-sky-400" />}
        <h3 className="text-sm font-medium text-slate-200">{title}</h3>
      </div>
      {sub && <p className="mb-4 text-xs text-slate-500">{sub}</p>}
      {children}
    </div>
  )
}

export function StatCard({ label, value, sub, tone = 'text-slate-100' }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1.5 font-mono text-2xl font-semibold ${tone}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  )
}

export function StepStatusBadge({ status }) {
  if (status === 'built') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
        built
      </span>
    )
  }
  if (status === 'adjacent') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-400 ring-1 ring-inset ring-sky-500/30">
        separate product
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400 ring-1 ring-inset ring-slate-600/50">
      not yet built
    </span>
  )
}

export function Pill({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-800/60 text-slate-300 ring-slate-700',
    sky: 'bg-sky-500/10 text-sky-400 ring-sky-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
    violet: 'bg-violet-500/10 text-violet-400 ring-violet-500/30',
  }
  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  )
}
