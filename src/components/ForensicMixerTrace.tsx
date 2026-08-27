import React, { useState } from 'react';
import { 
  GitMerge, 
  Search, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  RotateCcw, 
  Zap, 
  Cpu, 
  AlertTriangle,
  Building2,
  DollarSign,
  Activity,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

interface ForensicMixerTraceProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface TraceNode {
  id: string;
  label: string;
  type: 'VICTIM' | 'DRAINER' | 'MIXER' | 'BRIDGE' | 'CEX_CASH_OUT';
  address: string;
  chain: string;
  amountETH: number;
  timestamp: string;
  flaggedStatus: 'CONFIRMED_ILLICIT' | 'MONITORED' | 'BLOCKED_BY_OFAC';
}

export const ForensicMixerTrace: React.FC<ForensicMixerTraceProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [searchTarget, setSearchTarget] = useState('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  const [isTracing, setIsTracing] = useState(false);
  const [selectedHop, setSelectedHop] = useState<TraceNode | null>(null);

  const sampleHops: TraceNode[] = [
    {
      id: 'hop_1',
      label: isAr ? 'المحفظة المستهدفة (Victim)' : 'Target Exploit Origin',
      type: 'VICTIM',
      address: '0x194a...e201',
      chain: 'Ethereum Mainnet',
      amountETH: 142.5,
      timestamp: '10:02:14 UTC',
      flaggedStatus: 'MONITORED'
    },
    {
      id: 'hop_2',
      label: isAr ? 'محفظة تصريف الاستنزاف (Drainer Contract)' : 'Phishing Permit2 Drainer',
      type: 'DRAINER',
      address: '0xDead...6666',
      chain: 'Ethereum Mainnet',
      amountETH: 142.5,
      timestamp: '10:02:45 UTC',
      flaggedStatus: 'CONFIRMED_ILLICIT'
    },
    {
      id: 'hop_3',
      label: isAr ? 'مجمع خلط الأموال (Tornado Cash Pool)' : 'Tornado.Cash 100 ETH Mixer',
      type: 'MIXER',
      address: '0xd90e...7719',
      chain: 'Ethereum Mainnet',
      amountETH: 100.0,
      timestamp: '10:14:02 UTC',
      flaggedStatus: 'BLOCKED_BY_OFAC'
    },
    {
      id: 'hop_4',
      label: isAr ? 'جسر التحويل اللامركزي (ChainHop Bridge)' : 'Stargate / Synapse Cross-Chain Bridge',
      type: 'BRIDGE',
      address: '0x88bb...3321',
      chain: 'Avalanche / Arbitrum',
      amountETH: 42.5,
      timestamp: '10:18:22 UTC',
      flaggedStatus: 'MONITORED'
    },
    {
      id: 'hop_5',
      label: isAr ? 'محاولة التسييل بالبورصة المركزية (CEX Off-Ramp)' : 'Binance / OKX Deposit Alert (Frozen)',
      type: 'CEX_CASH_OUT',
      address: '0x33aa...9910',
      chain: 'Binance Smart Chain',
      amountETH: 42.1,
      timestamp: '10:29:50 UTC',
      flaggedStatus: 'CONFIRMED_ILLICIT'
    }
  ];

  const handleRunTrace = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsTracing(true);
    setTimeout(() => {
      setIsTracing(false);
      setSelectedHop(sampleHops[1]);
      if (onPlaySound) onPlaySound('beep');
    }, 1000);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 cyber-glow-purple">
            <GitMerge className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-purple-300">
                {isAr ? 'مخطط التحقيق الجنائي وتتبع الخلاطات (Mixer & Bridge Forensic Trace)' : 'Cross-Chain Forensic & Mixer Graph'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ON-CHAIN FORENSICS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تتبع مسار الأموال المسروقة عبر مجمعات Tornado Cash والجسور اللامركزية حتى منصات التسييل'
                : 'Multi-hop graph analytics tracing laundered funds through privacy pools, bridges & exchange deposits'}
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="0x... Wallet or Tx Hash"
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 w-48 sm:w-64 font-mono focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleRunTrace}
            disabled={isTracing}
            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isAr ? 'تتبع' : 'Trace'}</span>
          </button>
        </div>
      </div>

      {/* Main Forensic Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Node Hop Pipeline (8 cols) */}
        <div className="lg:col-span-8 cyber-panel rounded-2xl p-6 border border-purple-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {isAr ? 'شجرة مسار انتقال الأموال (Laundering Graph Path)' : 'Dispersal & Hop Pipeline (5 Nodes)'}
            </span>
            <span className="text-[10px] text-slate-400">TOTAL FLAGGED: $498,750 USD</span>
          </div>

          {/* Nodes Visual Chain */}
          <div className="space-y-3 relative">
            {sampleHops.map((hop, idx) => (
              <div key={hop.id} className="relative">
                <button
                  onClick={() => {
                    setSelectedHop(hop);
                    if (onPlaySound) onPlaySound('click');
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer ${
                    selectedHop?.id === hop.id
                      ? 'bg-purple-950/40 border-purple-400 text-purple-100 shadow-lg shadow-purple-950/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      hop.type === 'MIXER'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                        : hop.type === 'CEX_CASH_OUT'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    }`}>
                      {idx + 1}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                        <span>{hop.label}</span>
                        <span className="text-[10px] text-slate-500 font-normal">[{hop.chain}]</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {hop.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                    <div>
                      <div className="text-xs font-bold text-emerald-400">
                        {hop.amountETH} ETH
                      </div>
                      <div className="text-[9px] text-slate-500">{hop.timestamp}</div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      hop.flaggedStatus === 'CONFIRMED_ILLICIT' || hop.flaggedStatus === 'BLOCKED_BY_OFAC'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {hop.flaggedStatus}
                    </span>
                  </div>
                </button>

                {idx < sampleHops.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="w-0.5 h-3 bg-purple-500/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Right: Hop Deep Intelligence Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="cyber-panel rounded-2xl p-5 border border-purple-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {isAr ? 'بيانات العقدة المحددة' : 'Node Forensics Dossier'}
              </span>
              <span className="text-[10px] text-slate-500">LEVEL-5 INTEL</span>
            </div>

            {selectedHop ? (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'نوع الكيان / المحفظة:' : 'Entity Classification:'}</span>
                  <span className="font-bold text-cyan-300 text-sm">{selectedHop.label}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'الشبكة:' : 'Chain:'}</span>
                    <span className="text-slate-200">{selectedHop.chain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'المبلغ المرصود:' : 'Tracked Amount:'}</span>
                    <span className="text-emerald-400 font-bold">{selectedHop.amountETH} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isAr ? 'التصنيف الرقابي:' : 'Regulatory Risk:'}</span>
                    <span className="text-red-400 font-bold">{selectedHop.flaggedStatus}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-[11px] text-red-200 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {isAr ? 'إشعار تجميد ومصادرة آلي:' : 'Automated Freeze Alert:'}
                  </span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {isAr
                      ? 'تم إرسال إشعار تتبع فوري إلى شبكة التبادل المعتمدة (CEX Compliance API) للتحفظ على الرصيد عند محاولة التسييل.'
                      : 'Real-time telemetry payload dispatched to affiliated CEX compliance desks to flag & freeze incoming deposit txs.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center py-8">
                {isAr ? 'حدد أي عقدة من المسار لعرض تفاصيل التحقيق' : 'Select any node from the graph to inspect forensic telemetry'}
              </div>
            )}

          </div>

          {/* Quick Stats */}
          <div className="cyber-panel rounded-2xl p-4 border border-slate-800 bg-black/75 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>{isAr ? 'نسبة الاسترداد المحتملة:' : 'Recovery Probability:'}</span>
              <span className="text-emerald-400 font-bold">78.4%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{isAr ? 'زمن الاستجابة للحدث:' : 'Incident Latency:'}</span>
              <span className="text-cyan-400 font-bold">18 seconds</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
