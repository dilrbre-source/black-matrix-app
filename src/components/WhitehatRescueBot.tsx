import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  RotateCcw, 
  Flame, 
  Send, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Layers,
  Fuel,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';

interface WhitehatRescueBotProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

export const WhitehatRescueBot: React.FC<WhitehatRescueBotProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [compromisedWallet, setCompromisedWallet] = useState('0x91F0A4eC39F93F460838682e705bC11756Dce6fB');
  const [safeRecipient, setSafeRecipient] = useState('0x4488A92cE97B6a2D9f20109Ec72b01264c18091E');
  const [assetType, setAssetType] = useState<'ERC20' | 'ERC721' | 'STAKED_ETH'>('ERC20');
  const [assetAmount, setAssetAmount] = useState('85,000 USDT ($85,000)');
  const [bribeGwei, setBribeGwei] = useState('45');
  const [isExecuting, setIsExecuting] = useState(false);
  const [rescueSuccess, setRescueSuccess] = useState<boolean | null>(null);

  const handleLaunchRescueBundle = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsExecuting(true);
    setRescueSuccess(null);

    setTimeout(() => {
      setIsExecuting(false);
      setRescueSuccess(true);
      if (onPlaySound) onPlaySound('beep');
    }, 1500);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-emerald-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
            <LifeBuoy className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-emerald-300">
                {isAr ? 'نظام القناص المضاد لإنقاذ الأصول العالقة (Whitehat Rescue Bot)' : 'Autonomous Whitehat Rescue Bundle Dispatcher'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ATOMIC BATCH MEV
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'استرداد الرموز والـ NFTs من المحافظ المخترقة وتجاوز روبوتات السرقة (Sweeper Bots) عبر حزم Flashbots الفورية'
                : 'Atomic bundle frontrunning sweeper bots to extract tokens & NFTs from compromised wallets without public mempool leak'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {isAr ? 'حالة المسار: مشفر ومحمي' : 'Relay: Encrypted Flashbots Private'}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Rescue Bundle Parameters (5 cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-5 border border-emerald-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              {isAr ? 'إعدادات حزمة الإنقاذ الفورية' : 'Rescue Bundle Config'}
            </span>
            <span className="text-[10px] text-slate-500">TITAN_BUILDER #9902</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'المحفظة المخترقة (Compromised Target):' : 'Compromised Target Wallet:'}</label>
              <input
                type="text"
                value={compromisedWallet}
                onChange={(e) => setCompromisedWallet(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-red-300 font-mono text-[11px] focus:outline-none focus:border-red-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'المحفظة الآمنة للاستلام (Safe Destination):' : 'Safe Cold Destination:'}</label>
              <input
                type="text"
                value={safeRecipient}
                onChange={(e) => setSafeRecipient(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-emerald-300 font-mono text-[11px] focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">{isAr ? 'نوع الأصول:' : 'Asset Class:'}</label>
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-slate-500"
                >
                  <option value="ERC20">ERC20 Tokens</option>
                  <option value="ERC721">ERC721 NFTs</option>
                  <option value="STAKED_ETH">Staked LP / Vaults</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{isAr ? 'مكافأة المنقب (Miner Tip Gwei):' : 'Priority Tip (Gwei):'}</label>
                <input
                  type="text"
                  value={bribeGwei}
                  onChange={(e) => setBribeGwei(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'الأصول المستهدفة بالإنقاذ:' : 'Target Asset Value:'}</label>
              <input
                type="text"
                value={assetAmount}
                onChange={(e) => setAssetAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={handleLaunchRescueBundle}
              disabled={isExecuting}
              className="w-full mt-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isExecuting 
                ? (isAr ? 'جاري إطلاق حزمة الـ Atomic Flashbots...' : 'Broadcasting Private Atomic Bundle...') 
                : (isAr ? 'إطلاق حزمة الإنقاذ الفوري' : 'Dispatch Instant Rescue Bundle')}
            </button>
          </div>
        </div>

        {/* Right: Atomic Bundle Sequence & Telemetry (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-emerald-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              {isAr ? 'تسلسل المعاملات الذري (Atomic Bundle Steps)' : 'Flashbots Multi-Tx Atomic Execution Sequence'}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">ALL-OR-NOTHING GUARANTEE</span>
          </div>

          <div className="space-y-3">
            {/* Step 1: Sponsor Gas Injection */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                  Tx1
                </div>
                <div>
                  <div className="font-bold text-slate-200">
                    {isAr ? 'حقن غاز مباشر من المحفظة الراعية (Sponsor Gas)' : 'Zero-Balance Gas Injection from Sponsor Wallet'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isAr ? 'تمويل رسوم التحويل دون تمكين روبوت السارق من السحب' : 'Funds exactly 0.0082 ETH required for next transfer without balance exposure'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 shrink-0">PRIVATE_PIPE</span>
            </div>

            {/* Step 2: Instant Asset Extraction */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  Tx2
                </div>
                <div>
                  <div className="font-bold text-slate-200">
                    {isAr ? 'سحب الأصول الفوري إلى المحفظة الآمنة (Transfer Out)' : 'Atomic Asset Extraction to Cold Vault'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isAr ? 'تنفيذ transfer() فورياً في نفس الكتلة قبل أي معاملة أخرى' : 'Executes ERC20/NFT transfer strictly on identical block slot'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 shrink-0">SAFE_ROUTED</span>
            </div>

            {/* Step 3: Miner Priority Tip */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                  Tx3
                </div>
                <div>
                  <div className="font-bold text-slate-200">
                    {isAr ? 'دفع مكافأة التضمين المباشر لمنقب الكتلة (Block Builder Bribe)' : 'Block Builder Direct Coinbase Transfer'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isAr ? 'ضمان إدراج الحزمة في قمة الكتلة (Top of Block #20,491,803)' : 'Guarantees execution priority over public mempool transactions'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-400 shrink-0">45 GWEI</span>
            </div>
          </div>

          {/* Outcome Status */}
          {rescueSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'نجاح عملية الإنقاذ بنسبة 100%' : 'Rescue Bundle Successfully Mined on Block #20,491,803'}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isAr
                  ? 'تم نقل 85,000 USDT بنجاح إلى المحفظة الآمنة دون أن يتمكن روبوت المخترق من رصد أو اعتراض المعاملة.'
                  : 'Assets successfully extracted and verified in safe destination. Sweeper bot failed to intercept due to private relay insulation.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
