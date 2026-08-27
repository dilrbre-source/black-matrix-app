import React, { useState } from 'react';
import { 
  Swords, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Play, 
  RotateCcw, 
  Cpu, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Layers,
  ArrowRight,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

interface CyberWarGamesProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface AttackScenario {
  id: string;
  titleAr: string;
  titleEn: string;
  type: 'FLASH_LOAN' | 'ORACLE_MANIPULATION' | 'REENTRANCY_DRAIN';
  targetProtocol: string;
  exploitCapitalUSD: string;
  attackVectorDescAr: string;
  attackVectorDescEn: string;
  defenseResponseAr: string;
  defenseResponseEn: string;
  damagePreventedUSD: string;
}

export const CyberWarGames: React.FC<CyberWarGamesProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const scenarios: AttackScenario[] = [
    {
      id: 'scen_1',
      titleAr: 'هجوم القرض الخاطف (Flash Loan Attack)',
      titleEn: 'Flash Loan Multi-DEX Arbitrage Exploit',
      type: 'FLASH_LOAN',
      targetProtocol: 'Uniswap v3 / Balancer Vault',
      exploitCapitalUSD: '$24,500,000 Flash Loan',
      attackVectorDescAr: 'اقتراض 24.5 مليون دولار وتفريغ سيولة مجمع Curve لتغيير سعر الرمز وحصاد الأرباح في معاملة واحدة.',
      attackVectorDescEn: 'Borrowing $24.5M in uncollateralized loan to skew Curve invariant pool & extract liquidity.',
      defenseResponseAr: 'تدخل درع Black Matrix MEV فوراً وحظر المعاملة من بناة الكتل عبر التعتيم الرياضي.',
      defenseResponseEn: 'Black Matrix Sentinel detected invariant distortion & preemptively injected counter-bundle to nullify profits.',
      damagePreventedUSD: '$4,820,000'
    },
    {
      id: 'scen_2',
      titleAr: 'التلاعب بأسعار الأوراكل (Oracle Price Manipulation)',
      titleEn: 'Spot Oracle Manipulation & Bad Debt Injection',
      type: 'ORACLE_MANIPULATION',
      targetProtocol: 'Aave / Compound Fork Lending Protocol',
      exploitCapitalUSD: '$8,200,000 Flash Mint',
      attackVectorDescAr: 'التلاعب بسعر الأوراكل اللحظي لاقتراض أصول بقيمة تفوق الضمان الحقيقي وخلق ديون معدومة.',
      attackVectorDescEn: 'Manipulating spot TWAP oracle to borrow collateral far exceeding real asset value.',
      defenseResponseAr: 'عزل المجمع المخترق تلقائياً ورفض أسعار الـ Spot غير الموثقة بسعر Chainlink المرجعي.',
      defenseResponseEn: 'Triggered automated circuit breaker & forced multi-source Chainlink medianizer fallback.',
      damagePreventedUSD: '$8,200,000'
    },
    {
      id: 'scen_3',
      titleAr: 'هجوم إعادة الدخول (Reentrancy Exploit)',
      titleEn: 'Cross-Function Reentrancy Drain',
      type: 'REENTRANCY_DRAIN',
      targetProtocol: 'Staking Yield Vault v2',
      exploitCapitalUSD: '0.5 ETH Gas Injection',
      attackVectorDescAr: 'استدعاء دالة withdraw() بشكل متكرر قبل تحديث رصيد الحساب لسحب رصيد الخزينة بالكامل.',
      attackVectorDescEn: 'Recursive callback into withdraw() before balance state update to drain contract treasury.',
      defenseResponseAr: 'رصد تكرار الـ Call Stack وتجميد المعاملة عبر قفل الـ Mutex الدفاعي.',
      defenseResponseEn: 'AST Bytecode engine intercepted recursive CALL before state mutation and halted execution.',
      damagePreventedUSD: '$1,950,000'
    }
  ];

  const [selectedScenario, setSelectedScenario] = useState<AttackScenario>(scenarios[0]);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simComplete, setSimComplete] = useState(false);

  const handleLaunchWarSimulation = () => {
    if (onPlaySound) onPlaySound('alarm');
    setIsRunningSim(true);
    setSimComplete(false);

    setTimeout(() => {
      setIsRunningSim(false);
      setSimComplete(true);
      if (onPlaySound) onPlaySound('beep');
    }, 1600);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-purple-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 cyber-glow-purple">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-purple-300">
                {isAr ? 'غرفة محاكاة حروب الـ Web3 السيبرانية (Cyber War Games & Battle Simulator)' : 'Web3 Cyber War Games & Red-Team Arena'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                RED-TEAM VS BLUE-TEAM
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'محاكاة الهجمات السيبرانية المعقدة (Flash Loans & Oracles) واختبار قدرة دروع Black Matrix على صدها فورياً'
                : 'Interactive battle sandbox testing autonomous defense mechanisms against complex DeFi zero-day exploits'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLaunchWarSimulation}
          disabled={isRunningSim}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-950/60 cursor-pointer disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isRunningSim ? (isAr ? 'جاري الاشتباك والمحاكاة...' : 'Simulating Attack Vector...') : (isAr ? 'بدء محاكاة الهجوم والدفاع' : 'Launch Red-Team Battle')}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Scenarios Picker (4 cols) */}
        <div className="lg:col-span-4 cyber-panel rounded-2xl p-5 border border-purple-500/30 bg-black/75 backdrop-blur-md space-y-3 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              {isAr ? 'سيناريوهات الهجوم المتاحة' : 'Attack Scenarios'}
            </span>
            <span className="text-[10px] text-slate-500">LEVEL-5 SIM</span>
          </div>

          <div className="space-y-2.5">
            {scenarios.map((scen) => (
              <button
                key={scen.id}
                onClick={() => {
                  setSelectedScenario(scen);
                  setSimComplete(false);
                  if (onPlaySound) onPlaySound('click');
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedScenario.id === scen.id
                    ? 'bg-purple-950/40 border-purple-400 text-purple-100 shadow-lg shadow-purple-950/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {isAr ? scen.titleAr : scen.titleEn}
                  </span>
                  <span className="text-[10px] text-purple-300 font-bold">
                    {scen.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Target: <span className="text-cyan-300">{scen.targetProtocol}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Battle Simulation Arena (8 cols) */}
        <div className="lg:col-span-8 cyber-panel rounded-2xl p-6 border border-purple-500/30 bg-black/80 backdrop-blur-xl space-y-5 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">
                {isAr ? selectedScenario.titleAr : selectedScenario.titleEn}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              SAVED: {selectedScenario.damagePreventedUSD}
            </span>
          </div>

          {/* Attack VS Defense Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Red Team Attack Vector */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 space-y-2">
              <div className="flex items-center justify-between text-red-400 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  {isAr ? 'مسار هجوم الفريق الأحمر (Exploit Payload)' : 'Red-Team Attack Vector'}
                </span>
                <span className="text-[10px] font-mono">{selectedScenario.exploitCapitalUSD}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isAr ? selectedScenario.attackVectorDescAr : selectedScenario.attackVectorDescEn}
              </p>
            </div>

            {/* Blue Team Defense Interception */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isAr ? 'استجابة درع Black Matrix (Autonomous Defense)' : 'Black Matrix Defense Shield'}
                </span>
                <span className="text-[10px] font-mono text-emerald-300">0.08ms RESPONSE</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isAr ? selectedScenario.defenseResponseAr : selectedScenario.defenseResponseEn}
              </p>
            </div>

          </div>

          {/* Simulation Outcome */}
          {isRunningSim ? (
            <div className="h-32 flex flex-col items-center justify-center gap-2 text-purple-400">
              <Zap className="w-8 h-8 animate-spin" />
              <span className="text-xs font-bold">
                {isAr ? 'الاشتباك السيبراني جاري في ميمبول الكتلة #20,491,804...' : 'Live On-Chain Battle in Progress...'}
              </span>
            </div>
          ) : simComplete ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <div className="font-bold">
                    {isAr ? 'تم إحباط الهجوم وحماية السيولة بنجاح تام' : 'Exploit Intercepted & Treasury Fully Protected'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {isAr ? 'الخسائر المادية: $0.00 | تم حجز محفظة المهاجم' : 'Exploit Damage: $0.00 | Attacker collateral burned'}
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                DEFENSE SUCCESS
              </span>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 text-xs">
              {isAr ? 'اضغط على "بدء محاكاة الهجوم والدفاع" لمشاهدة الاستجابة في الزمن الفعلي' : 'Click "Launch Red-Team Battle" to simulate autonomous threat neutralization'}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
