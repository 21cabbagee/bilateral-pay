import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Zap, RefreshCw, 
  Building2, Globe2, AlertTriangle, FileText, Download,
  Layers, Lock, Database, DollarSign, Activity, ChevronRight, X, Sparkles, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticlesCanvas from './components/ParticlesCanvas';
import OutcomeChart from './components/OutcomeChart';

export default function App() {
  // Calculator state
  const [invoiceAmount, setInvoiceAmount] = useState(50000);
  const [corridor, setCorridor] = useState('BR_CN'); // Brazil to China
  
  // Simulator state
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTx, setActiveTx] = useState(null);
  const [cabModalOpen, setCabModalOpen] = useState(false);
  const [cabForm, setCabForm] = useState({ company: '', email: '', monthlyVolume: '$500k+' });
  const [cabSubmitted, setCabSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'calculator' | 'erp' | 'compliance'

  const corridors = [
    { id: 'BR_CN', name: 'Brazil (PIX) ➔ China (CNY / USDT)', sourceCurrency: 'BRL', targetCurrency: 'CNY / USD', speed: '6 mins', rail: 'PIX ➔ USDC ➔ UnionPay/USDT' },
    { id: 'MX_US', name: 'Mexico (SPEI) ➔ US (USD ACH/FedNow)', sourceCurrency: 'MXN', targetCurrency: 'USD', speed: '4 mins', rail: 'SPEI ➔ USDC ➔ FedNow' },
    { id: 'NG_CN', name: 'Nigeria (NIP) ➔ China (Guangzhou Suppliers)', sourceCurrency: 'NGN', targetCurrency: 'CNY / USDT', speed: '9 mins', rail: 'NIP ➔ USDT ➔ On-Ramp' },
    { id: 'KE_AE', name: 'Kenya (M-Pesa) ➔ UAE (Dubai Free Zone USD)', sourceCurrency: 'KES', targetCurrency: 'AED / USD', speed: '5 mins', rail: 'M-Pesa ➔ USDC ➔ FAB UAE' }
  ];

  const selectedCorridor = corridors.find(c => c.id === corridor) || corridors[0];

  // Financial calculations
  const bilateralFee = invoiceAmount * 0.01;
  const traditionalSpread = invoiceAmount * 0.052; // 5.2% avg spread
  const traditionalWireFee = 65;
  const traditionalTotal = traditionalSpread + traditionalWireFee;
  const netSavings = traditionalTotal - bilateralFee;
  const annualSavings = netSavings * 12;

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    const txId = 'BPX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setActiveTx({
      id: txId,
      amount: invoiceAmount,
      corridor: selectedCorridor.name,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Ingesting Fiat Rail'
    });

    setTimeout(() => {
      setSimStep(2);
      setActiveTx(prev => ({ ...prev, status: 'Treasury Conversion (USDC Rail)' }));
    }, 1800);

    setTimeout(() => {
      setSimStep(3);
      setActiveTx(prev => ({ ...prev, status: 'Sanctions & KYB Oracle Screening' }));
    }, 3600);

    setTimeout(() => {
      setSimStep(4);
      setActiveTx(prev => ({ ...prev, status: 'ERP Reconciled & Dispatched', completed: true }));
      setIsSimulating(false);
      try {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }, 5400);
  };

  const handleCabSubmit = (e) => {
    e.preventDefault();
    setCabSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
      {/* Top Banner */}
      <div className="border-b border-emerald-500/20 bg-emerald-950/40 px-4 py-2 text-center text-xs font-medium text-emerald-300">
        🚀 <span className="font-semibold text-emerald-200">BilateralPay V1 Engine:</span> Live Stablecoin Rails for LatAm & Africa ➔ Suppliers in China & US. 
        <button onClick={() => setCabModalOpen(true)} className="ml-2 underline hover:text-white">Apply for 10-Partner CAB Cohort (70% Fee Off)</button>
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-emerald-500/20">
              BP
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                BilateralPay
                <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">B2B Rails</span>
              </span>
              <p className="text-[11px] text-slate-400">Zero-Balance-Sheet Stablecoin Treasury</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('simulator')} className={`hover:text-emerald-400 transition ${activeTab === 'simulator' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}>Routing Engine</button>
            <button onClick={() => setActiveTab('calculator')} className={`hover:text-emerald-400 transition ${activeTab === 'calculator' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}>1% Spread Calculator</button>
            <button onClick={() => setActiveTab('erp')} className={`hover:text-emerald-400 transition ${activeTab === 'erp' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}>ERP Webhook</button>
            <button onClick={() => setActiveTab('compliance')} className={`hover:text-emerald-400 transition ${activeTab === 'compliance' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}>KYB & Sanctions</button>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCabModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wide transition shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
            >
              Join Design Partner Cohort
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Casberry-style Particles Canvas */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Interactive WebGL / Casberry Canvas Simulation */}
        <ParticlesCanvas color="16, 185, 129" particleCount={55} connectionDistance={125} />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-5">
          {/* Kokonut UI Shimmering Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs text-slate-200 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-emerald-300">Live Global Settlement Rails</span>
            <span className="text-slate-500">•</span>
            <span>PIX / SPEI / NIP ➔ USDT / USDC ➔ Local Supplier Settlement</span>
          </div>
          
          {/* EXACT H1 TAG */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Instant B2B Cross-Border Payments: Pay Global Suppliers at 1% Flat via Stablecoin Rails
          </h1>

          <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto">
            Eliminate 5% FX gouging and 4-day SWIFT wire delays. Corporate importers pay suppliers in China, the US, and worldwide in under 10 minutes without crypto balance-sheet risk or private keys.
          </p>

          {/* Larry Ellison Playbook: Confuse the Tenses & Sell Harder Than You Build */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong className="text-white">Service-as-a-Software Autopilot:</strong> Zero seat fees. You pay strictly upon verified settlement proof.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => { setActiveTab('simulator'); runSimulation(); }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-teal-300 transition shadow-xl shadow-emerald-500/25 flex items-center gap-2 group cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              Simulate $50k Invoice Settlement
            </button>
            <button 
              onClick={() => setActiveTab('calculator')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              Calculate Corporate FX Savings
            </button>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-emerald-500/30 transition">
              <span className="text-slate-400 block">All-In Spread</span>
              <span className="text-xl font-bold text-emerald-400">1.0% Flat</span>
              <span className="text-[10px] text-slate-500 block">vs. 4%–7% Bank FX</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-emerald-500/30 transition">
              <span className="text-slate-400 block">Settlement Speed</span>
              <span className="text-xl font-bold text-white">&lt; 10 Minutes</span>
              <span className="text-[10px] text-slate-500 block">vs. 3–5 Days SWIFT</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-emerald-500/30 transition">
              <span className="text-slate-400 block">Balance-Sheet Risk</span>
              <span className="text-xl font-bold text-teal-400">Zero Crypto</span>
              <span className="text-[10px] text-slate-500 block">Pure Programmatic Pass</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-emerald-500/30 transition">
              <span className="text-slate-400 block">Reconciliation</span>
              <span className="text-xl font-bold text-emerald-300">NetSuite / QB</span>
              <span className="text-[10px] text-slate-500 block">Auto PO Matching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Sequoia Framework Outcome Visualizer (Bklit UI + Julien Bek $1 vs $6 Ratio) */}
        <div className="mb-12">
          <OutcomeChart 
            serviceName="Global B2B Supplier Settlement"
            defaultMonthlyVolume={350000}
            legacyRate={0.052}
            autonomousRate={0.01}
            accentColor="emerald"
            onCtaClick={() => setCabModalOpen(true)}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'simulator' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <RefreshCw className="w-4 h-4" />
            Live Settlement Simulator
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'calculator' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <DollarSign className="w-4 h-4" />
            SWIFT vs Stablecoin Calculator
          </button>
          <button 
            onClick={() => setActiveTab('erp')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'erp' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Database className="w-4 h-4" />
            NetSuite / QuickBooks Webhook
          </button>
          <button 
            onClick={() => setActiveTab('compliance')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'compliance' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            KYB & Chainalysis Shield
          </button>
        </div>

        {/* Tab 1: Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-emerald-400" />
                  Initiate B2B Payment Route
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Select Cross-Border Corridor</label>
                    <select 
                      value={corridor}
                      onChange={(e) => setCorridor(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      {corridors.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">Invoice Amount (USD Equivalent)</label>
                      <span className="text-xs font-mono text-emerald-400 font-bold">${invoiceAmount.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="5000" 
                      max="250000" 
                      step="5000"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span>$5,000</span>
                      <span>$100,000</span>
                      <span>$250,000</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-400">
                      <span>Routing Architecture:</span>
                      <span className="font-mono text-emerald-300 font-medium">{selectedCorridor.rail}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>All-in Fee (1.0% Flat):</span>
                      <span className="font-mono text-white font-bold">${bilateralFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Expected Settlement:</span>
                      <span className="text-emerald-400 font-semibold">{selectedCorridor.speed}</span>
                    </div>
                  </div>

                  <button 
                    disabled={isSimulating}
                    onClick={runSimulation}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Executing Atomic Settlement...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        Dispatch Payment via Rails
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Security Shield */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2 text-slate-400">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Non-Custodial Corporate Architecture
                </div>
                <p>Funds are held zero milliseconds on our balance sheet. Fiat is ingested directly via Stark Bank / Mono, programmatically swapped via non-custodial MPC vaults, and released to suppliers.</p>
              </div>
            </div>

            {/* Simulation Real-Time Visualizer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Zero-Balance-Sheet Settlement Pipeline
                  </h3>
                  {activeTx && (
                    <span className="font-mono text-xs px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-300">
                      Tx: {activeTx.id}
                    </span>
                  )}
                </div>

                {/* 4 Pipeline Stages */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                  <div className={`p-3 rounded-xl border text-xs transition ${simStep >= 1 ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${simStep >= 1 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'}`}>1</span>
                      Rail Ingest
                    </div>
                    <p className="text-[11px] leading-tight">Direct PIX/SPEI/NIP bank wire ingestion</p>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs transition ${simStep >= 2 ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${simStep >= 2 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'}`}>2</span>
                      Treasury Swap
                    </div>
                    <p className="text-[11px] leading-tight">Instant USDC/USDT routing with slippage seal</p>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs transition ${simStep >= 3 ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${simStep >= 3 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'}`}>3</span>
                      Compliance
                    </div>
                    <p className="text-[11px] leading-tight">Chainalysis AML & Central Bank FX logging</p>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs transition ${simStep >= 4 ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${simStep >= 4 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'}`}>4</span>
                      ERP Reconcile
                    </div>
                    <p className="text-[11px] leading-tight">Tax-proof receipt & NetSuite PO closeout</p>
                  </div>
                </div>

                {/* Console Log */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
                    <span>LIVE TRANSACTION LOG</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Real-Time Feed
                    </span>
                  </div>

                  {activeTx ? (
                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="text-emerald-400">[{activeTx.timestamp}] INGEST: Received ${activeTx.amount.toLocaleString()} invoice confirmation on corridor {activeTx.corridor}</div>
                      {simStep >= 1 && <div className="text-slate-300">[00:01] Banking API webhook confirmed: Direct clearing via local clearinghouse. Zero collateral hold.</div>}
                      {simStep >= 2 && <div className="text-teal-300">[00:03] MPC Vault executed atomic bridge: USDC minted at exact 1.0000 peg, zero slippage. Rate locked: 1.0% all-in spread.</div>}
                      {simStep >= 3 && <div className="text-blue-300">[00:05] Chainalysis Risk Score: 0/100 (Clean). Sanctions check verified against OFAC/UN/Local Regulators.</div>}
                      {simStep >= 4 && (
                        <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                          [00:07] SETTLED: Supplier off-ramp executed. NetSuite invoice #INV-88219 matched. Tax audit receipt signed: 0x9f8c...3a12
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-500 py-6 text-center italic">
                      Click "Dispatch Payment via Rails" or "Simulate $50k Invoice Settlement" to view the live execution log.
                    </div>
                  )}
                </div>

                {activeTx?.completed && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-emerald-400 block">Settlement Finalized in 7.2 Minutes</span>
                      <span className="text-sm text-white font-medium">Supplier Received Full Net Settlement • Total Fee Paid: ${bilateralFee.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Receipt ${activeTx.id} downloaded: Verified corporate tax deduction receipt compliant with local central bank regulations.`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Tax Receipt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Calculator */}
        {activeTab === 'calculator' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Corporate Treasury Cost Comparison</h2>
              <p className="text-sm text-slate-400">See exactly how much your trading firm or manufacturing plant saves per invoice compared to traditional correspondent banking wires.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Traditional Bank */}
              <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">Traditional Bank (SWIFT)</span>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white">${traditionalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <span className="text-xs text-red-300">Loss on ${invoiceAmount.toLocaleString()} wire</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 border-t border-red-500/20 pt-3">
                  <div className="flex justify-between">
                    <span>FX Spread Markup (5.2% avg):</span>
                    <span className="font-mono font-bold text-red-400">${traditionalSpread.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intermediary Correspondent Fee:</span>
                    <span className="font-mono text-red-400">${traditionalWireFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wire Settlement Delay:</span>
                    <span className="font-bold text-red-400">3–5 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customs Port Penalty Risk:</span>
                    <span className="text-red-400 font-semibold">High (Goods Held)</span>
                  </div>
                </div>
              </div>

              {/* BilateralPay */}
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-4 glow-emerald">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">BilateralPay Rails</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-black text-emerald-400">${bilateralFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <span className="text-xs text-emerald-300">Total all-in fee (1.0% flat)</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 border-t border-emerald-500/20 pt-3">
                  <div className="flex justify-between">
                    <span>All-in FX & Routing Spread:</span>
                    <span className="font-mono font-bold text-emerald-400">1.0% (${bilateralFee.toFixed(0)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wire Intermediary Surcharge:</span>
                    <span className="font-mono text-emerald-400">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Settlement Clearance Time:</span>
                    <span className="font-bold text-emerald-400">&lt; 10 Minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ERP & Quickbooks Sync:</span>
                    <span className="text-emerald-400 font-semibold">Automated Webhook</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">Net Corporate Savings Per Transaction</span>
              <div className="text-2xl font-black text-emerald-400">+${netSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} Saved per Invoice</div>
              <p className="text-xs text-slate-500">Assuming 12 monthly supplier payments, your firm recovers <strong className="text-slate-300">${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year</strong> in cash flow.</p>
            </div>
          </div>
        )}

        {/* Tab 3: ERP Integration */}
        {activeTab === 'erp' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">B2B Invoice Reconciliation & NetSuite Webhook</h2>
              <p className="text-xs text-slate-400">Corporate CFOs never reconcile crypto addresses manually. BilateralPay produces two-way synchronized accounting events directly matching your Purchase Orders.</p>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400">
              <pre>{`{
  "event": "bilateralpay.settlement.completed",
  "settlement_id": "SET-2026-991823",
  "purchase_order_id": "PO-BR-88912",
  "origin_rail": {
    "jurisdiction": "BRAZIL",
    "fiat_rail": "PIX",
    "amount_brl": 257400.00,
    "corporate_tax_id": "CNPJ-12.345.678/0001-90"
  },
  "treasury_route": {
    "stablecoin_protocol": "USDC_NATIVE_BASE",
    "notional_usd": 50000.00,
    "bilateral_spread_pct": 1.0,
    "fee_retained_usd": 500.00,
    "vault_tx_hash": "0x89f7a...3e41b"
  },
  "destination_settlement": {
    "beneficiary": "Shenzhen Huaye Electronics Co. Ltd",
    "payout_rail": "UNIONPAY_B2B_INSTANT",
    "amount_cny": 361250.00,
    "customs_declaration_code": "HS-8471.30"
  },
  "erp_reconciliation": {
    "netsuite_invoice_match": true,
    "quickbooks_journal_entry_id": "JE-9104",
    "audit_proof_pdf_url": "https://vault.bilateralpay.com/receipts/SET-2026-991823.pdf"
  }
}`}</pre>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Ready for Quickbooks, NetSuite, SAP B1, and Xero</span>
              <button 
                onClick={() => alert('Webhook secret and sandbox API credentials copied to clipboard.')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition"
              >
                Copy Webhook Schema
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Compliance Shield */}
        {activeTab === 'compliance' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Sanctions & KYB Compliance Shield</h2>
              <p className="text-xs text-slate-400">Institutional-grade compliance designed for regulated commercial trade. Meets Brazilian Central Bank (BACEN), Mexican Banxico, and Central Bank of Nigeria (CBN) export regulations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Chainalysis KYT Screening</h3>
                <p className="text-xs text-slate-400">Every intermediate on-chain vault address is checked against OFAC, EU, UN, and regional counter-terrorism blacklists prior to routing.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Building2 className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm text-white">Automated Corporate KYB</h3>
                <p className="text-xs text-slate-400">Direct integration with national corporate registries (Receita Federal Brazil, SAT Mexico, CAC Nigeria) verifies Ultimate Beneficial Owners (UBO).</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm text-white">Export Invoicing Receipts</h3>
                <p className="text-xs text-slate-400">Generates immutable cryptographic certificates suitable for tax auditors, demonstrating legitimate commercial invoice discharge.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Customer Advisory Board (CAB) Modal */}
      {cabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-emerald-500/30 shadow-2xl relative">
            <button 
              onClick={() => setCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {cabSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Application Received</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Our Trade Finance Operations team will review your business credentials and reach out within 4 business hours to provision your sandbox API keys and lock in your 70% partner discount.
                </p>
                <button 
                  onClick={() => { setCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleCabSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Design Partner Cohort</span>
                  <h3 className="text-xl font-bold text-white">Join the 10-Partner Pilot Cohort</h3>
                  <p className="text-xs text-slate-400">
                    We are launching a pilot cohort of 10 commercial partners for BilateralPay to eliminate correspondent banking friction. Lock in preferential partner pricing (0.3% spread) and dedicated technical integration.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Entity Legal Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Agrícola do Sul Ltda / Lagos Electronics Ltd"
                      value={cabForm.company}
                      onChange={(e) => setCabForm({ ...cabForm, company: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">CFO / Finance Director Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="cfo@company.com"
                      value={cabForm.email}
                      onChange={(e) => setCabForm({ ...cabForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Cross-Border Wire Volume</label>
                    <select 
                      value={cabForm.monthlyVolume}
                      onChange={(e) => setCabForm({ ...cabForm, monthlyVolume: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="$100k - $500k">$100k - $500k / month</option>
                      <option value="$500k - $2M">$500k - $2M / month</option>
                      <option value="$2M - $10M+">$2M - $10M+ / month</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
                  🎁 <strong>Design Partner Privilege:</strong> 70% lifetime fee discount (0.30% spread vs. 1.00%), dedicated Slack bridge, custom ERP connector.
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-emerald-500/25"
                >
                  Submit Pilot Application (3 Seats Remaining)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BilateralPay Infrastructure Ltd. All rights reserved. Non-custodial stablecoin treasury engine.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">Canonical: /solutions/stablecoin-b2b-cross-border-settlement</span>
            <span className="text-emerald-500 font-semibold">SOC2 Type II • ISO 27001 • Chainalysis Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
