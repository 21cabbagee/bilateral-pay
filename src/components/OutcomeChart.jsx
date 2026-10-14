import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * OutcomeChart (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Visualizes the replacement of traditional $6 human agency/outsourcing fees with $1 autonomous software execution.
 */
export default function OutcomeChart({
  serviceName = "Cross-Border FX & Supplier Settlement",
  defaultMonthlyVolume = 250000,
  legacyRate = 0.055, // 5.5% SWIFT + correspondent banking + manual ops
  autonomousRate = 0.01, // 1% flat stablecoin rail
  accentColor = "emerald", // emerald, blue, amber, violet, cyan
  onCtaClick
}) {
  const [volume, setVolume] = useState(defaultMonthlyVolume);

  // Financial equation
  const legacyHumanCost = Math.round(volume * legacyRate);
  const autonomousCost = Math.round(volume * autonomousRate);
  const monthlySavings = legacyHumanCost - autonomousCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = Math.round(((legacyHumanCost - autonomousCost) / legacyHumanCost) * 100);

  // Chart bar heights (max out at 100%)
  const maxCost = Math.max(legacyHumanCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autonomousCost / maxCost) * 100), 12);

  const colors = {
    emerald: {
      gradient: "from-emerald-500 to-teal-400",
      border: "border-emerald-500/30",
      bgBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "shadow-emerald-500/20",
      textAccent: "text-emerald-400",
      barFill: "fill-emerald-500"
    },
    blue: {
      gradient: "from-blue-500 to-cyan-400",
      border: "border-blue-500/30",
      bgBadge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glow: "shadow-blue-500/20",
      textAccent: "text-blue-400",
      barFill: "fill-blue-500"
    },
    amber: {
      gradient: "from-amber-500 to-yellow-400",
      border: "border-amber-500/30",
      bgBadge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glow: "shadow-amber-500/20",
      textAccent: "text-amber-400",
      barFill: "fill-amber-500"
    }
  };

  const theme = colors[accentColor] || colors.emerald;

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Sequoia Framework badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-950 border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className={theme.textAccent}>The Sequoia Equation: Software ($1) vs Services ($6)</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Autonomous Outcome Economics: <span className={theme.textAccent}>{savingsPercent}% Margin Expansion</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Legacy models charge you for human headcounts, hours, and seat licenses. Our autonomous software replaces the entire $6 human service layer and charges strictly upon verified settlement.
          </p>
        </div>

        <div className="text-right bg-slate-950/60 border border-slate-800 rounded-xl p-3 px-4 min-w-[180px]">
          <span className="text-[11px] text-slate-400 block font-medium">Annual Verified Savings</span>
          <span className={`text-2xl md:text-3xl font-black ${theme.textAccent}`}>
            ${annualSavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400/80 flex items-center justify-end gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> 100% Outcome Autopilot
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-slate-800">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Monthly Invoice / Transaction Volume:
          </label>
          <span className="text-base font-bold text-white bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            ${volume.toLocaleString()} / mo
          </span>
        </div>
        <input 
          type="range" 
          min={25000} 
          max={2000000} 
          step={25000}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>$25k / mo (Mid-Market)</span>
          <span>$500k / mo (Enterprise)</span>
          <span>$2M+ / mo (Global Scale)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-950/70 rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Cost Per Month Comparison</span>
            <span className="text-[10px] text-slate-500">Live Simulation</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Legacy Bank SWIFT + Human Ops ($6 Layer)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyHumanCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Autonomous Rails ($1 Layer)
                </span>
                <span className="font-mono font-bold text-emerald-300">${autonomousCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-emerald-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-lg shadow-lg shadow-emerald-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Monthly Net Capital Saved:</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">+${monthlySavings.toLocaleString()}</span>
          </div>
        </div>

        {/* Julien Bek 3-Pillar Vendor Swap Matrix */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Outcomes, Not Seats (Larry Ellison Playbook)</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Never pay for idle user accounts. Every dollar charged maps directly to an executed invoice, verified proof-of-settlement, and automated ERP reconciliation.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Autopilot Replaces Human Agency Work</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No back-and-forth emails, no 4-day bank delays, no compliance clerk queues. Sanctions screening, treasury liquidity, and foreign supplier payouts fire autonomously.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Guaranteed Zero-Balance-Sheet Risk</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Funds never sit in volatile crypto pools. Local currency is converted at the exact moment of dispatch and disbursed directly in recipient supplier currency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
