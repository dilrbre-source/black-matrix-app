import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Filter, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Dna, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Flame,
  Radio,
  Share2,
  ChevronRight
} from 'lucide-react';
import { ThreatRadarItem, NetworkType } from '../types';
import { PixelNoiseCanvas } from './PixelNoiseCanvas';

interface LiveThreatRadarProps {
  threats: ThreatRadarItem[];
  onSelectContract: (item: ThreatRadarItem) => void;
  onInitiateRescue: (item: ThreatRadarItem) => void;
  lang: 'ar' | 'en';
}

export const LiveThreatRadar: React.FC<LiveThreatRadarProps> = ({
  threats,
  onSelectContract,
  onInitiateRescue,
  lang
}) => {
  const isAr = lang === 'ar';
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<'ALL' | 'safe' | 'warning' | 'critical'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<ThreatRadarItem | null>(threats[0] || null);
  const [liveStreamLogs, setLiveStreamLogs] = useState<Array<{ id: string; time: string; text: string; level: 'safe' | 'warning' | 'critical' }>>([]);

  // Filtered list
  const filteredThreats = threats.filter((item) => {
    const matchesNetwork = 
      selectedNetwork === 'ALL' ||
      (selectedNetwork === 'EVM' && ['Ethereum', 'Arbitrum', 'Base', 'BSC'].includes(item.network)) ||
      (selectedNetwork === 'SOLANA' && item.network === 'Solana') ||
      (selectedNetwork === 'BITCOIN' && item.network === 'Bitcoin');

    const matchesSeverity = selectedSeverity === 'ALL' || item.threatLevel === selectedSeverity;

    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesNetwork && matchesSeverity && matchesSearch;
  });

  // Simulated live mempool events
  useEffect(() => {
    const initialLogs = [
      { id: '1', time: '09:21:40', text: '[MEMPOOL] Bytecode broadcast from 0x71C8...4a9c (EVM)', level: 'critical' as const },
      { id: '2', time: '09:21:42', text: '[RADAR] Pixel Noise Matrix encoded for TR-9041', level: 'warning' as const },
      { id: '3', time: '09:21:45', text: '[CANONICAL] Aave V3 Liquidity Vault verified (Arbitrum)', level: 'safe' as const },
      { id: '4', time: '09:21:48', text: '[SOLANA] SPL Token Mint authority active: SPULSE', level: 'warning' as const }
    ];
    setLiveStreamLogs(initialLogs);

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * threats.length);
      const target = threats[randomIdx];
      const timeStr = new Date().toTimeString().split(' ')[0];
      const newLog = {
        id: Math.random().toString(),
        time: timeStr,
        text: `[SENTINEL] Scanned ${target.symbol} on ${target.network} (Score: ${target.threatScore})`,
        level: target.threatLevel
      };
      setLiveStreamLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [threats]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        <div className="cyber-panel p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">{isAr ? 'العقود الآمنة الموثقة' : 'Verified Safe Contracts'}</span>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{threats.filter(t => t.threatLevel === 'safe').length}</span>
            </div>
            <span className="text-[10px] text-emerald-500/80">{isAr ? 'نمط ضوئي أخضر' : 'Green Tri-Pattern'}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="cyber-panel-warning p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-300/80">{isAr ? 'عقود تحت الملاحظة المؤقتة' : 'Temporary Lock / Warning'}</span>
            <div className="text-2xl font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>{threats.filter(t => t.threatLevel === 'warning').length}</span>
            </div>
            <span className="text-[10px] text-amber-400/80">{isAr ? 'نمط ضوئي أصفر' : 'Yellow Tri-Pattern'}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="cyber-panel-danger p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-red-300/80">{isAr ? 'تهديدات حرجة ومحاولات احتيال' : 'Critical Exploit / Fake Mints'}</span>
            <div className="text-2xl font-bold text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
              <span>{threats.filter(t => t.threatLevel === 'critical').length}</span>
            </div>
            <span className="text-[10px] text-red-400/80">{isAr ? 'نمط ضوئي أحمر' : 'Red Tri-Pattern'}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="cyber-panel p-4 rounded-xl border border-cyan-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">{isAr ? 'مستشعرات أطراف الشبكة' : 'Active Edge Probes'}</span>
            <div className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>128</span>
            </div>
            <span className="text-[10px] text-cyan-400/80">EVM + SOL + BTC</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Radar Screen & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Map & Filter (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="cyber-panel p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-slate-500 font-semibold px-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {isAr ? 'الشبكة:' : 'Chain:'}
              </span>
              {(['ALL', 'EVM', 'SOLANA', 'BITCOIN'] as NetworkType[]).map((net) => (
                <button
                  key={net}
                  onClick={() => setSelectedNetwork(net)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    selectedNetwork === net
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold px-1">{isAr ? 'التصنيف:' : 'Severity:'}</span>
              {(['ALL', 'safe', 'warning', 'critical'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-2 py-1 rounded-md capitalize transition-all cursor-pointer ${
                    selectedSeverity === sev
                      ? sev === 'safe'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : sev === 'warning'
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                        : sev === 'critical'
                        ? 'bg-red-950 text-red-400 border border-red-500/40'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev === 'safe' ? (isAr ? 'آمن' : 'Safe') :
                   sev === 'warning' ? (isAr ? 'تحذير' : 'Warn') :
                   sev === 'critical' ? (isAr ? 'حرج' : 'Crit') : (isAr ? 'الكل' : 'All')}
                </button>
              ))}
            </div>
          </div>

          {/* Radar Visual Canvas Container */}
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl cyber-panel border border-emerald-500/30 overflow-hidden flex items-center justify-center radar-grid">
            {/* Concentric Radar Rings */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-emerald-500/15 pointer-events-none" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-emerald-500/20 pointer-events-none" />
            <div className="absolute w-[40%] h-[40%] rounded-full border border-emerald-500/25 pointer-events-none" />
            <div className="absolute w-[20%] h-[20%] rounded-full border border-emerald-500/30 pointer-events-none" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/20 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/20 pointer-events-none" />

            {/* Animated Radar Sweep Beam */}
            <div className="absolute w-full h-full animate-radar-sweep pointer-events-none">
              <div 
                className="w-1/2 h-1/2 absolute top-0 left-0 origin-bottom-right"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.05) 60%, transparent 100%)'
                }}
              />
            </div>

            {/* Radar Nodes / Targets */}
            {filteredThreats.map((item) => {
              const isSelected = activeItem?.id === item.id;
              const isSafe = item.threatLevel === 'safe';
              const isWarn = item.threatLevel === 'warning';
              const isCrit = item.threatLevel === 'critical';

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  style={{
                    left: `${item.coordinates.x}%`,
                    top: `${item.coordinates.y}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10 cursor-pointer ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  {/* Ping Animation Ring */}
                  <span
                    className={`absolute -inset-2 rounded-full opacity-75 animate-ping ${
                      isCrit ? 'bg-red-500/40' : isWarn ? 'bg-amber-500/40' : 'bg-emerald-500/30'
                    }`}
                  />

                  {/* Core Node Circle */}
                  <div
                    className={`relative w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-black border-2 transition-all ${
                      isCrit
                        ? 'bg-red-950 border-red-500 text-red-300 shadow-lg shadow-red-500/50'
                        : isWarn
                        ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/50'
                        : 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/50'
                    }`}
                  >
                    {item.threatScore}
                  </div>

                  {/* Tooltip Label */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
                    <div className="px-2 py-1 rounded bg-black/90 border border-slate-700 text-[10px] font-mono text-slate-200 shadow-xl">
                      <span className="font-bold text-emerald-400">{item.symbol}</span> | {item.network} ({item.threatScore}%)
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Radar Coordinates HUD Watermark */}
            <div className="absolute bottom-3 right-3 font-mono text-[10px] text-emerald-500/50 pointer-events-none">
              GRID: 38.8951° N, 77.0364° W // SENSORS: 128 ACTIVE
            </div>
            <div className="absolute top-3 left-3 font-mono text-[10px] text-emerald-400/70 pointer-events-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE MEMPOOL HEATMAP
            </div>
          </div>

          {/* Live Sentinels Telemetry Feed */}
          <div className="cyber-panel p-3 rounded-xl font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-950">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {isAr ? 'بث خلايا الاستشعار الحي (Sentinel Stream):' : 'Live Sentinel Stream:'}
              </span>
              <span className="text-[10px] text-slate-500">Auto-Refreshed (Zero Lag)</span>
            </div>

            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {liveStreamLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{log.time}</span>
                    <span
                      className={
                        log.level === 'critical'
                          ? 'text-red-400'
                          : log.level === 'warning'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {log.text}
                    </span>
                  </div>
                  <span className="text-[9px] px-1 rounded bg-black/60 border border-slate-800 text-slate-400 uppercase">
                    {log.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Inspector Drawer (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {activeItem ? (
            <div
              className={`cyber-panel rounded-xl p-5 border transition-all ${
                activeItem.threatLevel === 'critical'
                  ? 'border-red-500/40 cyber-glow-red'
                  : activeItem.threatLevel === 'warning'
                  ? 'border-amber-500/40 cyber-glow-amber'
                  : 'border-emerald-500/40 cyber-glow-emerald'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-100 font-mono">
                      {activeItem.name}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 border border-slate-700 text-emerald-400">
                      ${activeItem.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{activeItem.network}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-mono font-bold uppercase ${
                    activeItem.threatLevel === 'critical'
                      ? 'bg-red-950 text-red-300 border border-red-500/50'
                      : activeItem.threatLevel === 'warning'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                  }`}
                >
                  {activeItem.threatLevel === 'critical'
                    ? (isAr ? 'تهديد حرج' : 'CRITICAL')
                    : activeItem.threatLevel === 'warning'
                    ? (isAr ? 'تحذير أصفر' : 'WARNING')
                    : (isAr ? 'آمن وموثق' : 'SAFE')}
                </div>
              </div>

              {/* Status Message */}
              <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 text-xs font-mono text-slate-300 mb-4 leading-relaxed">
                {activeItem.statusMessage}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs mb-4">
                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">{isAr ? 'درجة الخطورة' : 'Threat Score'}</span>
                  <span
                    className={`font-bold text-sm ${
                      activeItem.threatScore > 70
                        ? 'text-red-400'
                        : activeItem.threatScore > 30
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {activeItem.threatScore} / 100
                  </span>
                </div>

                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">{isAr ? 'قفل السيولة' : 'Liquidity Lock'}</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    {activeItem.liquidityLocked ? (
                      <>
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">{activeItem.lockDuration}</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3 h-3 text-red-400" />
                        <span className="text-red-400">{isAr ? 'غير مقفلة' : 'Unlocked'}</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">{isAr ? 'تقييم المطور (KYD)' : 'Dev Reputation'}</span>
                  <span className="font-bold text-slate-200">{activeItem.devReputation}%</span>
                </div>

                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">{isAr ? 'رصد البث' : 'Broadcast Seen'}</span>
                  <span className="text-slate-300">{activeItem.timestamp}</span>
                </div>
              </div>

              {/* Pixel Noise Steganography Preview */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-slate-400 mb-1 block uppercase tracking-wider">
                  {isAr ? 'التشفير البصري (Pixel Noise Matrix):' : 'Stego Pixel Noise Matrix:'}
                </span>
                <PixelNoiseCanvas
                  seed={activeItem.bytecodeHash}
                  height={90}
                  showOverlayText={activeItem.bytecodeHash.substring(0, 24) + '...'}
                  entropy={0.999}
                />
              </div>

              {/* Flag Reasons */}
              <div className="mb-5 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'أسباب التقييم والمطابقة:' : 'Forensic Indicators:'}
                </span>
                {activeItem.flagReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] font-mono text-slate-300 p-1.5 rounded bg-black/30 border border-slate-800/80 flex items-start gap-1.5"
                  >
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 font-mono">
                <button
                  onClick={() => onSelectContract(activeItem)}
                  className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950"
                >
                  <Dna className="w-4 h-4" />
                  {isAr ? 'فحص البصمة الجينية (Token_DNA)' : 'Analyze Token_DNA'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {activeItem.threatLevel === 'critical' && (
                  <button
                    onClick={() => onInitiateRescue(activeItem)}
                    className="w-full py-2.5 px-3 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 text-red-300 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    {isAr ? 'بدء محاكاة الإنقاذ والضمان (Escrow Rescue)' : 'Simulate Escrow Rescue'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="cyber-panel rounded-xl p-8 text-center text-slate-500 font-mono text-xs">
              {isAr ? 'حدد أي عقد على الرادار لعرض التحريات التفصيلية' : 'Select any radar target to inspect forensics'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
