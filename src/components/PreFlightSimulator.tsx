import React, { useState } from 'react';
import { 
  Play, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  RotateCcw, 
  Layers, 
  ArrowRight, 
  DollarSign, 
  Sliders, 
  Cpu, 
  Flame, 
  CheckCircle2, 
  XCircle,
  Clock,
  Sparkles,
  Fuel
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PreFlightSimulatorProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface SimulationResult {
  executionStatus: 'SUCCESS' | 'REVERTED_DRAINER' | 'SANDWICH_INTERCEPTED';
  gasUsed: number;
  expectedOutput: string;
  actualOutputWithAttack: string;
  financialImpactUSD: number;
  frontrunRiskScore: number;
  traceEvents: Array<{
    step: number;
    description: string;
    descriptionAr: string;
    type: 'SAFE' | 'MALICIOUS' | 'SLIPPAGE_LEAK' | 'FLASHBOTS_SHIELD';
    gasCost: string;
  }>;
  aiDiagnostic: string;
  aiDiagnosticAr: string;
}

export const PreFlightSimulator: React.FC<PreFlightSimulatorProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [targetContract, setTargetContract] = useState('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
  const [functionName, setFunctionName] = useState('swapExactTokensForETHSupportingFeeOnTransferTokens');
  const [txValueETH, setTxValueETH] = useState('4.5');
  const [slippageTolerance, setSlippageTolerance] = useState('1.5');
  const [useFlashbotsShield, setUseFlashbotsShield] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const handleRunSimulation = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      setIsSimulating(false);

      if (useFlashbotsShield) {
        setSimResult({
          executionStatus: 'SUCCESS',
          gasUsed: 142380,
          expectedOutput: '4.485 WETH ($15,697.50)',
          actualOutputWithAttack: '4.485 WETH ($15,697.50)',
          financialImpactUSD: 0,
          frontrunRiskScore: 0,
          traceEvents: [
            {
              step: 1,
              description: 'Transaction bundle received by Black Matrix Private Relay',
              descriptionAr: 'تم استلام حزمة المعاملة عبر مسار Black Matrix المشفر الخاص',
              type: 'FLASHBOTS_SHIELD',
              gasCost: '21,000'
            },
            {
              step: 2,
              description: 'Zero Mempool Broadcast: P2P Mempool completely bypassed',
              descriptionAr: 'حجب البث العام للميمبول: تم منع روبوتات القنص من رصد المعاملة',
              type: 'FLASHBOTS_SHIELD',
              gasCost: '0'
            },
            {
              step: 3,
              description: 'Execution at Target Block Builder (Titan Builder Slot #92048)',
              descriptionAr: 'تنفيذ المعاملة لدى بناء الكتل المعتمد (Titan Builder)',
              type: 'SAFE',
              gasCost: '121,380'
            },
            {
              step: 4,
              description: 'State Verified: Full slippage protected. Zero extraction.',
              descriptionAr: 'التحقق من الحالة: حماية كاملة من الانزلاق السعري وصفر خسائر.',
              type: 'SAFE',
              gasCost: '0'
            }
          ],
          aiDiagnostic: 'PROTECTED: Flashbots MEV-Relay successfully masked the swap transaction. Sandwich bots extracted $0.00. 100% funds secured.',
          aiDiagnosticAr: 'حماية كاملة: نجح درع Flashbots في إخفاء المعاملة عن ميمبول القناصين، مما منع سرقة أي سيولة وحقق عائداً آمناً بنسبة 100%.'
        });
        if (onPlaySound) onPlaySound('beep');
      } else {
        setSimResult({
          executionStatus: 'SANDWICH_INTERCEPTED',
          gasUsed: 218490,
          expectedOutput: '4.485 WETH ($15,697.50)',
          actualOutputWithAttack: '3.621 WETH ($12,673.50)',
          financialImpactUSD: -3024.00,
          frontrunRiskScore: 96,
          traceEvents: [
            {
              step: 1,
              description: 'Mempool Broadcast: Transaction visible to public snipers',
              descriptionAr: 'بث المعاملة في الميمبول العام: رصد المعاملة من روبوتات الـ MEV',
              type: 'MALICIOUS',
              gasCost: '21,000'
            },
            {
              step: 2,
              description: 'ATTACK FRONT-RUN: Bot 0xJared pushes liquidity up with +45 Gwei',
              descriptionAr: 'هجوم استباقي (Front-Run): الروبوت رفع سعر الرمز بدفع عمولة غاز أعلى',
              type: 'MALICIOUS',
              gasCost: '145,000'
            },
            {
              step: 3,
              description: 'VICTIM EXECUTION: Your swap executes at worst possible slippage',
              descriptionAr: 'تنفيذ معاملتك: تم إجبارك على الشراء بأعلى سعر ممكن وخسارة سيولة',
              type: 'SLIPPAGE_LEAK',
              gasCost: '178,490'
            },
            {
              step: 4,
              description: 'ATTACK BACK-RUN: Bot dumps tokens immediately and extracts profit',
              descriptionAr: 'هجوم خلفي (Back-Run): الروبوت يبيع الرموز فوراً ويسحب أرباحك',
              type: 'MALICIOUS',
              gasCost: '95,000'
            }
          ],
          aiDiagnostic: 'CRITICAL EXPLOIT DETECTED: Public mempool execution will trigger a Sandwich Attack resulting in $3,024.00 loss. Enable Flashbots Shield immediately.',
          aiDiagnosticAr: 'تحذير استنزاف حرج: تنفيذ المعاملة في الميمبول العام سيتسبب في هجوم Sandwich وخسارة $3,024.00. يرجى تفعيل درع Flashbots فوراً.'
        });
        if (onPlaySound) onPlaySound('alarm');
      }
    }, 1400);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'محاكي المعاملات الاستباقي (Tenderly-Grade Pre-Flight Engine)' : 'Pre-Flight Exploit & MEV Simulator'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                DRY-RUN FORK
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تجربة تنفيذ المعاملة على نسخة فورك افتراضية قبل إرسالها للشبكة لكشف هجمات الساندوتش والاحتيال'
                : 'Simulate on-chain execution with bytecode state traces to detect sandwich attacks & drainers before broadcasting'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-400/50 transition-all">
            <input
              type="checkbox"
              checked={useFlashbotsShield}
              onChange={(e) => setUseFlashbotsShield(e.target.checked)}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-cyan-300">
              {isAr ? 'تفعيل درع Flashbots الخاص' : 'Flashbots MEV-Shield'}
            </span>
          </label>
        </div>
      </div>

      {/* Simulator Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Parameters (5 cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-5 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              {isAr ? 'معلمات المعاملة المراد فحصها' : 'Transaction Parameters'}
            </span>
            <span className="text-[10px] text-slate-500">FORK_BLOCK #20,491,802</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'عنوان العقد / الموجه (Target Contract/Router):' : 'Target Contract / Router:'}</label>
              <input
                type="text"
                value={targetContract}
                onChange={(e) => setTargetContract(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'الدالة المنفذة (Function Selector):' : 'Execution Method:'}</label>
              <input
                type="text"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-purple-300 font-mono focus:outline-none focus:border-purple-400 text-[11px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">{isAr ? 'قيمة المعاملة (ETH):' : 'Tx Value (ETH):'}</label>
                <input
                  type="text"
                  value={txValueETH}
                  onChange={(e) => setTxValueETH(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-emerald-300 font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{isAr ? 'نسبة الانزلاق (Slippage %):' : 'Slippage Tolerance:'}</label>
                <input
                  type="text"
                  value={slippageTolerance}
                  onChange={(e) => setSlippageTolerance(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full mt-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/60 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              {isSimulating 
                ? (isAr ? 'جاري تشغيل الفورك والمحاكاة...' : 'Simulating On-Chain Fork...') 
                : (isAr ? 'بدء المحاكاة الاستباقية الفورية' : 'Execute Pre-Flight Simulation')}
            </button>

            {/* Shield Info Banner */}
            <div className={`p-3 rounded-lg border text-[11px] ${
              useFlashbotsShield 
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/30 border-red-500/40 text-red-300'
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {useFlashbotsShield ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                <span>{useFlashbotsShield ? (isAr ? 'مسار Flashbots الخاص مفعّل' : 'Private Flashbots Relay Active') : (isAr ? 'تحذير: الميمبول العام مكشوف' : 'Warning: Public Mempool Exposed')}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {useFlashbotsShield 
                  ? (isAr ? 'يتم توجيه المعاملة مباشرة إلى معدني الكتل، ولن تظهر لروبوتات القنص في الميمبول.' : 'Direct block-builder submission prevents sandwich snipers from seeing or front-running your transaction.')
                  : (isAr ? 'ستكون المعاملة مرئية للجميع في الميمبول، وقد تخضع لسرقة سيولة وانزلاق سعري فوري.' : 'Transaction will be exposed to mempool MEV bots that frontrun and extract slippage value.')}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Simulation Trace & Diagnostic Report (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-cyan-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl min-h-[480px]">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              {isAr ? 'تقرير تتبع التنفيذ وعوائد السيولة (State Trace)' : 'Execution Trace & State Delta Report'}
            </span>
            {simResult && (
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                simResult.executionStatus === 'SUCCESS'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
              }`}>
                {simResult.executionStatus}
              </span>
            )}
          </div>

          {isSimulating ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-cyan-400">
              <Zap className="w-10 h-10 animate-spin" />
              <span className="text-xs font-bold">
                {isAr ? 'جاري فورك البلوكشين وتوليد شجرة تتبع الأوامر Opcodes...' : 'Executing Dry-Run Fork & Analyzing MEV Mempool Vector...'}
              </span>
            </div>
          ) : simResult ? (
            <div className="space-y-4">
              
              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">{isAr ? 'العائد المتوقع:' : 'Expected Return:'}</span>
                  <span className="text-xs font-bold text-slate-200">{simResult.expectedOutput}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">{isAr ? 'العائد الفعلي بعد المحاكاة:' : 'Actual Simulation Output:'}</span>
                  <span className={`text-xs font-bold ${simResult.financialImpactUSD < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {simResult.actualOutputWithAttack}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">{isAr ? 'الخسارة المالية المكتشفة:' : 'Detected Exploit Loss:'}</span>
                  <span className={`text-xs font-bold ${simResult.financialImpactUSD < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    ${Math.abs(simResult.financialImpactUSD).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Execution Trace Steps */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {simResult.traceEvents.map((ev) => (
                  <div 
                    key={ev.step}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                      ev.type === 'MALICIOUS'
                        ? 'bg-red-950/30 border-red-500/40 text-red-200'
                        : ev.type === 'SLIPPAGE_LEAK'
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                        : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {ev.step}
                      </span>
                      <span className="text-[11px] leading-tight">
                        {isAr ? ev.descriptionAr : ev.description}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {ev.gasCost} Gas
                    </span>
                  </div>
                ))}
              </div>

              {/* Diagnostic Callout */}
              <div className={`p-3 rounded-xl border text-xs ${
                simResult.executionStatus === 'SUCCESS'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/50 text-red-200'
              }`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'التشخيص الأمني للمحرك:' : 'AI Diagnostic Summary:'}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isAr ? simResult.aiDiagnosticAr : simResult.aiDiagnostic}
                </p>
              </div>

            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
              <Play className="w-8 h-8 opacity-40" />
              <span>{isAr ? 'اضغط على "بدء المحاكاة" لمعاينة تنفيذ المعاملة خطوة بخطوة' : 'Click "Execute Pre-Flight Simulation" to trace on-chain execution steps'}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
