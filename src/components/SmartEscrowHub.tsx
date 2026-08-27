import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  Percent, 
  Wallet, 
  DollarSign, 
  Sparkles, 
  Radio, 
  RefreshCw, 
  AlertCircle,
  FileCheck2,
  Lock,
  Play
} from 'lucide-react';
import { RescueEscrowOperation } from '../types';
import { MOCK_RESCUE_OPERATIONS } from '../data';

interface SmartEscrowHubProps {
  initialTargetContract?: string;
  lang: 'ar' | 'en';
}

export const SmartEscrowHub: React.FC<SmartEscrowHubProps> = ({
  initialTargetContract,
  lang
}) => {
  const isAr = lang === 'ar';
  const [operations, setOperations] = useState<RescueEscrowOperation[]>(MOCK_RESCUE_OPERATIONS);
  const [activeOp, setActiveOp] = useState<RescueEscrowOperation>(MOCK_RESCUE_OPERATIONS[0]);
  
  // Simulator input state
  const [simAddress, setSimAddress] = useState(initialTargetContract || '0x71C8a1b269b2F0c2E29B1238D3Eb3499f57E4a9c');
  const [simAsset, setSimAsset] = useState('USDC Liquidity Pool (Uniswap V3)');
  const [simBalance, setSimBalance] = useState(120000);
  const [simBountyPct, setSimBountyPct] = useState(15);
  const [simRelay, setSimRelay] = useState<'Flashbots Private Relay' | 'Chainlink CCIP' | 'Eden Network'>('Flashbots Private Relay');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStepIndex, setSimStepIndex] = useState(0);

  const calculateNetRescue = (bal: number, pct: number) => {
    const fee = (bal * pct) / 100;
    const net = bal - fee;
    return { fee, net };
  };

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimStepIndex(1);

    const newOpId = `RESCUE-${Math.floor(1000 + Math.random() * 9000)}`;
    const fee = (simBalance * simBountyPct) / 100;

    const newOp: RescueEscrowOperation = {
      id: newOpId,
      targetAddress: simAddress.substring(0, 6) + '...' + simAddress.substring(simAddress.length - 4),
      targetAsset: simAsset,
      network: 'Ethereum Mainnet',
      victimBalanceUSD: simBalance,
      bountyPercentage: simBountyPct,
      rescueFeeUSD: fee,
      status: 'PRIVATE_RELAY_BROADCAST',
      relayUsed: simRelay as any,
      reverseSimulationHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      steps: [
        { id: '1', title: 'Sweeper Bot Intercepted', titleAr: 'اعتراض روبوت المسح في الـ Mempool', detail: 'Identified malicious drain signature in mempool queue', detailAr: 'رصد توقيع محاولة السحب الخبيثة في طابور المعاملات', status: 'done', time: '09:30:01' },
        { id: '2', title: 'Private Bundle Assembled', titleAr: 'تجهيز حزمة المعاملات الخاصة', detail: 'Zero-gas transfer + bribed miner bundle via Flashbots builder', detailAr: 'إنشاء حزمة معاملات صفرية الغاز مع تحفيز المعدن', status: 'active', time: '09:30:03' },
        { id: '3', title: 'Conditional ZKP Validated', titleAr: 'التحقق من إثبات ZKP المشروط', detail: 'Verified victim entitlement proof without exposing private keys', detailAr: 'التحقق من ملكية الضحية للأموال دون كشف المفاتيح', status: 'pending' },
        { id: '4', title: `${simBountyPct}% Escrow Split Settled`, titleAr: `تسوية نسبة الضمان (${simBountyPct}%) وتحويل الصافي`, detail: `Transferred $${(simBalance - fee).toLocaleString()} USD to Safe Vault & $${fee.toLocaleString()} USD to Escrow`, detailAr: `تحويل $${(simBalance - fee).toLocaleString()} للمحفظة الآمنة واقتطاع $${fee.toLocaleString()} للضمان`, status: 'pending' }
      ]
    };

    setOperations((prev) => [newOp, ...prev]);
    setActiveOp(newOp);

    // Progression timer
    setTimeout(() => {
      setSimStepIndex(2);
      setActiveOp((prev) => ({
        ...prev,
        status: 'CCIP_BRIDGING',
        steps: prev.steps.map((s, i) => i === 1 ? { ...s, status: 'done' } : i === 2 ? { ...s, status: 'active', time: '09:30:05' } : s)
      }));
    }, 1500);

    setTimeout(() => {
      setSimStepIndex(3);
      setActiveOp((prev) => ({
        ...prev,
        status: 'ZKP_VERIFIED',
        steps: prev.steps.map((s, i) => i <= 2 ? { ...s, status: 'done' } : i === 3 ? { ...s, status: 'active', time: '09:30:07' } : s)
      }));
    }, 3000);

    setTimeout(() => {
      setSimStepIndex(4);
      setIsSimulating(false);
      setActiveOp((prev) => ({
        ...prev,
        status: 'COMPLETED',
        steps: prev.steps.map((s) => ({ ...s, status: 'done' }))
      }));
    }, 4500);
  };

  const { fee, net } = calculateNetRescue(simBalance, simBountyPct);

  return (
    <div className="space-y-6 font-mono">
      {/* Header Overview */}
      <div className="cyber-panel p-5 rounded-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>{isAr ? 'مركز الاسترداد والضمان الذكي (Smart Escrow Hub)' : 'Smart Escrow & Autonomous Rescue Hub'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  FLASHBOTS MEV RELAY
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'تنفيذ عمليات السحب الأخلاقي، استباق روبوتات التصيد، واقتطاع نسبة الضمان (10-20%) بتوقيعات ZKP'
                  : 'Private MEV bundle front-running, zero-knowledge conditional escrow splits (10-20%) & automated victim recovery'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'إجمالي الأصول المستردة:' : 'Total Rescued:'}</span>
              <span className="text-emerald-400 font-bold text-sm">$1,845,200 USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Engine & Configuration (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Rescue Simulator (6 Columns) */}
        <div className="lg:col-span-6 cyber-panel p-5 rounded-xl border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'محاكي الاسترداد والإنقاذ المشروط' : 'Interactive Rescue Simulator'}</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              SANDBOX TESTNET
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Target Address Input */}
            <div>
              <label className="block text-slate-400 mb-1">
                {isAr ? 'عنوان العقد / المحفظة المهددة:' : 'Target Compromised Address / Contract:'}
              </label>
              <input
                type="text"
                value={simAddress}
                onChange={(e) => setSimAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-emerald-500/30 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Asset & Estimated Balance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">
                  {isAr ? 'الأصل المستهدف للإنقاذ:' : 'Target Locked Asset:'}
                </label>
                <input
                  type="text"
                  value={simAsset}
                  onChange={(e) => setSimAsset(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-slate-800 text-slate-200 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 flex items-center justify-between">
                  <span>{isAr ? 'القيمة التقديرية (USD):' : 'Estimated Value (USD):'}</span>
                </label>
                <input
                  type="number"
                  value={simBalance}
                  onChange={(e) => setSimBalance(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-slate-800 text-slate-200 font-mono text-xs"
                />
              </div>
            </div>

            {/* Bounty Percentage Slider (10% - 20%) */}
            <div className="p-3 rounded-lg bg-black/50 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" />
                  {isAr ? 'نسبة اقتطاع الضمان (Bounty / Escrow %):' : 'Conditional Escrow Split:'}
                </span>
                <span className="text-emerald-400 font-bold text-sm">{simBountyPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="1"
                value={simBountyPct}
                onChange={(e) => setSimBountyPct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10% (الحد الأدنى)</span>
                <span>15% (المعياري)</span>
                <span>20% (الحد الأقصى للعمليات المعقدة)</span>
              </div>
            </div>

            {/* Private Relay Selection */}
            <div>
              <label className="block text-slate-400 mb-1">
                {isAr ? 'قناة التنفيذ والتخفي (Private Relay Channel):' : 'Private Execution Relay Channel:'}
              </label>
              <select
                value={simRelay}
                onChange={(e) => setSimRelay(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                <option value="Flashbots Private Relay">Flashbots Private Relay (Ethereum / EVM)</option>
                <option value="Chainlink CCIP">Chainlink CCIP (Cross-Chain Bridge Relay)</option>
                <option value="Eden Network">Eden Network (MEV Protected RPC)</option>
              </select>
            </div>

            {/* Real-time Escrow Financial Split Card */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">{isAr ? 'عائد الضحية المسترد الصافي' : 'Net Returned to Victim'}</span>
                <span className="text-sm font-bold text-emerald-400">${net.toLocaleString()} USD</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{isAr ? `رسوم الضمان والإنقاذ (${simBountyPct}%)` : `Escrow Fee (${simBountyPct}%)`}</span>
                <span className="text-sm font-bold text-amber-400">${fee.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Launch Simulation Button */}
            <button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950 disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>
                {isSimulating
                  ? (isAr ? 'جاري تنفيذ حزمة الـ MEV الخاصة...' : 'Executing MEV Bundle...')
                  : (isAr ? 'بدء محاكاة الإنقاذ الآن' : 'Initiate Autonomous Rescue Simulation')}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Active Operation Lifecycle & Steps (6 Columns) */}
        <div className="lg:col-span-6 cyber-panel p-5 rounded-xl border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] text-slate-500">{activeOp.id}</span>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                {activeOp.targetAsset}
              </h3>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded font-bold uppercase ${
                activeOp.status === 'COMPLETED'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse'
              }`}
            >
              {activeOp.status}
            </span>
          </div>

          {/* Operation Telemetry Card */}
          <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-lg bg-black/40 border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block">{isAr ? 'القناة المستخدمة' : 'Relay Channel'}</span>
              <span className="text-slate-200 font-semibold">{activeOp.relayUsed}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">{isAr ? 'بصمة المحاكاة المعكوسة' : 'Simulation Hash'}</span>
              <span className="text-emerald-400 font-mono text-[10px] truncate block">
                {activeOp.reverseSimulationHash.substring(0, 16)}...
              </span>
            </div>
          </div>

          {/* Step Progression Timeline */}
          <div className="space-y-3 pt-2">
            <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">
              {isAr ? 'مراحل التنفيذ والتشفير الصامت:' : 'Execution Pipeline Steps:'}
            </span>

            <div className="space-y-2.5">
              {activeOp.steps.map((step, idx) => {
                const isDone = step.status === 'done';
                const isActive = step.status === 'active';

                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border transition-all text-xs flex items-start gap-3 ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : isActive
                        ? 'bg-cyan-950/30 border-cyan-500/50 cyber-glow-cyan'
                        : 'bg-black/30 border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isActive ? (
                        <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-500" />
                      )}
                    </div>

                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isDone ? 'text-emerald-300' : isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {isAr ? step.titleAr : step.title}
                        </span>
                        {step.time && (
                          <span className="text-[10px] text-slate-500">{step.time}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {isAr ? step.detailAr : step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Escrow ZKP Certificate Note */}
          <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              {isAr
                ? 'يتم إصدار شهادة تسوية ZKP غير قابلة للنقض وتوزيع العوائد للشركاء والمحفظة الآمنة تلقائياً.'
                : 'Zero-knowledge settlement certificate issued automatically with instant trustless distribution.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
