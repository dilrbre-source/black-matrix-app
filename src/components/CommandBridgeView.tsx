import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Radar, 
  Dna, 
  Bot, 
  ShieldAlert, 
  Database, 
  Activity, 
  Cpu, 
  Radio, 
  Zap, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Eye, 
  Terminal, 
  Orbit, 
  Fingerprint, 
  Flame, 
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Code2,
  GitMerge,
  Award,
  LifeBuoy,
  ShieldX,
  Swords
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HUDTab, SystemStats, ThreatRadarItem } from '../types';

interface CommandBridgeViewProps {
  onNavigateTab: (tab: HUDTab) => void;
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
  systemStats?: SystemStats;
}

export const CommandBridgeView: React.FC<CommandBridgeViewProps> = ({
  onNavigateTab,
  lang,
  onPlaySound,
  systemStats
}) => {
  const isAr = lang === 'ar';

  const [coreActive, setCoreActive] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'panoramic' | 'tactical' | 'cyber_wireframe'>('panoramic');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [scanStream, setScanStream] = useState<Array<{ id: string; msg: string; chain: string; status: 'SAFE' | 'ALERT' | 'CRITICAL' }>>([
    { id: '1', msg: 'Mempool Sentinel: EVM block 19842091 analyzed', chain: 'Ethereum', status: 'SAFE' },
    { id: '2', msg: 'Token DNA: AST AST_DECOMPILER matched PEPE_DRAINER bytecode', chain: 'Base', status: 'CRITICAL' },
    { id: '3', msg: 'Stego Carrier: 14.8KB entropy payload verified by VLM decoder', chain: 'Solana', status: 'SAFE' },
    { id: '4', msg: 'MEV Relay: Private Flashbots bundle queued (Zero Front-running)', chain: 'Arbitrum', status: 'ALERT' }
  ]);

  const [scanRunning, setScanRunning] = useState<boolean>(false);

  // Trigger Holographic Touch Node
  const handleTouchCore = () => {
    if (onPlaySound) onPlaySound('alarm');
    setCoreActive(true);
    setPulseCount(prev => prev + 1);

    // Add live scan packet
    const newItems: Array<{ id: string; msg: string; chain: string; status: 'SAFE' | 'ALERT' | 'CRITICAL' }> = [
      { id: Date.now().toString(), msg: 'Orbital Bridge: Global Mempool Quantum Sweep Dispatched', chain: 'Cosmic Node', status: 'ALERT' },
      { id: (Date.now() + 1).toString(), msg: 'ZK-Proof Attestation: Bytecode 0x9fa1... verified safe', chain: 'Polygon', status: 'SAFE' }
    ];
    setScanStream(prev => [newItems[0], newItems[1], ...prev.slice(0, 3)]);

    setTimeout(() => {
      setCoreActive(false);
    }, 1800);
  };

  const handleTriggerDeepSweep = () => {
    if (onPlaySound) onPlaySound('radar');
    setScanRunning(true);
    setTimeout(() => {
      setScanRunning(false);
      if (onPlaySound) onPlaySound('beep');
    }, 2200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full text-slate-100 overflow-hidden select-none pb-12">
      {/* Deep Space Panoramic Command Deck Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/matrix_command_bridge_1787848586257.jpg"
          alt="Space Command Bridge"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            viewMode === 'cyber_wireframe' 
              ? 'filter invert hue-rotate-180 brightness-75 contrast-150 opacity-40' 
              : viewMode === 'tactical'
                ? 'brightness-60 contrast-125 opacity-70 scale-105'
                : 'brightness-75 opacity-85'
          }`}
          onError={(e) => {
            // Fallback to dark cyber grid if image loading delayed
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Futuristic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020509] via-[#020509]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020509]/90 via-transparent to-[#020509]/90" />
        
        {/* Animated Laser Grid & Ambient Star Dust */}
        <div className="absolute inset-0 matrix-grid-bg opacity-30 pointer-events-none" />
      </div>

      {/* Floating Tactical Heads-Up Display (HUD) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Top Command Banner & View Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl shadow-cyan-950/40">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Orbit className="w-6 h-6 animate-spin-slow text-cyan-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold font-mono tracking-wider text-cyan-300 flex items-center gap-2">
                  <span>BLACK MATRIX</span>
                  <span className="text-emerald-400">//</span>
                  <span className="text-white text-base font-normal">
                    {isAr ? 'مركز القيادة المداري الفضائي' : 'Orbital Command Deck'}
                  </span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  CLASS-5 OVERSIGHT
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                {isAr 
                  ? 'مراقبة الميمبول والتحليل الجيني للعقود الذكية والاسترداد السيبراني بالزمن الفعلي'
                  : 'Deep-Space Telemetry, AST Bytecode Forensics & Autonomous MEV Asset Rescue'}
              </p>
            </div>
          </div>

          {/* Controls & Mode Selector */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <div className="flex items-center bg-black/80 rounded-lg p-1 border border-slate-700/80 text-xs font-mono">
              <button
                onClick={() => {
                  setViewMode('panoramic');
                  if (onPlaySound) onPlaySound('click');
                }}
                className={`px-3 py-1 rounded transition-all cursor-pointer ${
                  viewMode === 'panoramic' 
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isAr ? 'بانوراما القيادة' : 'Panoramic'}
              </button>
              <button
                onClick={() => {
                  setViewMode('tactical');
                  if (onPlaySound) onPlaySound('click');
                }}
                className={`px-3 py-1 rounded transition-all cursor-pointer ${
                  viewMode === 'tactical' 
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isAr ? 'الرصد التكتيكي' : 'Tactical'}
              </button>
              <button
                onClick={() => {
                  setViewMode('cyber_wireframe');
                  if (onPlaySound) onPlaySound('click');
                }}
                className={`px-3 py-1 rounded transition-all cursor-pointer ${
                  viewMode === 'cyber_wireframe' 
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50 font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isAr ? 'مصفوفة الشفافية' : 'Wireframe'}
              </button>
            </div>

            <button
              onClick={handleTriggerDeepSweep}
              disabled={scanRunning}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-950/60 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scanRunning ? 'animate-spin' : ''}`} />
              {scanRunning ? (isAr ? 'جاري المسح...' : 'Sweeping...') : (isAr ? 'مسح شامل' : 'Deep Sweep')}
            </button>
          </div>
        </div>

        {/* Hero Interactive Cockpit Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Wing: Commander Security Identity & Live Orbital Telemetry */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Commander Holographic Profile Card */}
            <div className="cyber-panel rounded-xl p-4 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-3 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5" />
                  {isAr ? 'هوية الضابط المسؤول' : 'Commander Identity'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full border-2 border-cyan-400 p-0.5 bg-slate-900 overflow-hidden shrink-0 shadow-md shadow-cyan-500/30">
                  <img 
                    src="/images/cyber_circuit_node_1787848597068.jpg"
                    alt="Commander Neural Node"
                    className="w-full h-full object-cover rounded-full animate-pulse-glow"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay" />
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-white">CMD. OMAR DILR</div>
                  <div className="text-[11px] font-mono text-cyan-300">Chief Forensics Lead</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">AUTH: 0x9F4A...B82E</div>
                </div>
              </div>

              {/* Neural Synapse & Clearance Meters */}
              <div className="space-y-2 pt-1 text-[11px] font-mono">
                <div>
                  <div className="flex justify-between text-slate-400 text-[10px] mb-1">
                    <span>{isAr ? 'المزامنة العصبية للرادار' : 'Neural Radar Sync'}</span>
                    <span className="text-cyan-400 font-bold">{coreActive ? '100% (PEAK)' : '99.4%'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: coreActive ? '100%' : '94%' }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[10px] text-cyan-300 flex items-center justify-between">
                  <span>{isAr ? 'مستوى التصريح السيبراني:' : 'Clearance Level:'}</span>
                  <span className="font-bold text-white bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-400/40">
                    COSMIC-5 SEC
                  </span>
                </div>
              </div>
            </div>

            {/* Cross-Chain Orbital Feeds */}
            <div className="cyber-panel rounded-xl p-4 border border-slate-800 bg-black/75 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Activity className="w-3.5 h-3.5" />
                  {isAr ? 'عقد الشبكات النشطة' : 'Active Network Relays'}
                </span>
                <span>3 CHAINS</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-slate-200">EVM Relays (Base / Eth)</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold">18,450 TPS</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-slate-200">Solana SVM Cluster</span>
                  </div>
                  <span className="text-[10px] text-purple-400 font-bold">2,850 TPS</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-slate-200">Bitcoin Inscriptions</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">MEMPOOL 4.2MB</span>
                </div>
              </div>
            </div>

          </div>

          {/* Center Arena: Interactive Holographic Biometric Touch Matrix Core */}
          <div className="lg:col-span-6 flex flex-col justify-between cyber-panel rounded-2xl p-6 border border-cyan-500/40 bg-black/70 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-cyan-950/60 min-h-[480px]">
            
            {/* Top Core Header */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-300 font-bold tracking-widest uppercase">
                  {isAr ? 'نواة التشفير الهولوغرافية التفاعلية' : 'Holographic Quantum Energy Nexus'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-slate-800">
                PULSE INTENSITY: #{pulseCount}
              </span>
            </div>

            {/* Center Biometric Holographic Touch Mechanism (Matches Video) */}
            <div className="relative flex flex-col items-center justify-center my-8 z-10">
              
              {/* Outer Circuit Rings */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                
                {/* Concentric Rotating Holographic Disks */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-dashed animate-spin-slow pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-amber-500/20 border-dotted animate-spin-reverse-slow pointer-events-none" />
                <div className="absolute inset-10 rounded-full border-2 border-cyan-400/30 pointer-events-none" />

                {/* Energy Shockwave when touched */}
                <AnimatePresence>
                  {coreActive && (
                    <>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-cyan-400 bg-cyan-500/20 pointer-events-none"
                      />
                      <motion.div
                        initial={{ scale: 0.6, opacity: 1 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-amber-400 bg-amber-500/20 pointer-events-none"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Interactive Center Orb / Fingerprint Touch Node */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleTouchCore}
                  title={isAr ? 'المس النواة لتنشيط الرنين الهولوغرافي والموجات السيبرانية' : 'Touch to activate Holographic Pulse Matrix'}
                  className="group relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-cyan-600 via-cyan-400 to-amber-400 p-1 flex items-center justify-center cursor-pointer shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/80 transition-all duration-300 z-20"
                >
                  {/* Glowing Core Background */}
                  <div className="w-full h-full rounded-full bg-[#030a14] flex flex-col items-center justify-center p-4 relative overflow-hidden border border-cyan-300">
                    <img 
                      src="/images/cyber_circuit_node_1787848597068.jpg"
                      alt="Cyber Nexus"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/80 via-transparent to-transparent" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <Zap className={`w-8 h-8 text-cyan-300 ${coreActive ? 'text-amber-300 animate-bounce' : 'animate-pulse'}`} />
                      <span className="text-[11px] font-mono font-bold text-white mt-1 uppercase tracking-wider">
                        {coreActive ? (isAr ? 'نبضة نشطة!' : 'PULSING!') : (isAr ? 'انقر للتفعيل' : 'TOUCH CORE')}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-300/80">
                        {isAr ? 'رنين هولوغرافي' : 'Quantum Shockwave'}
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Action Hint */}
              <p className="text-xs font-mono text-slate-300 text-center mt-4 bg-black/60 px-4 py-1.5 rounded-full border border-cyan-500/20">
                {isAr 
                  ? '👆 انقر فوق النواة الكونية لإطلاق موجة المسح السيبراني وإعادة تفعيل مصفوفة الوكلاء'
                  : '👆 Touch the core to radiate laser circuit shocks & awaken the autonomous agent swarm'}
              </p>
            </div>

            {/* Bottom Real-time Stream Terminal */}
            <div className="z-10 bg-black/80 rounded-xl p-3 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Terminal className="w-3 h-3" />
                  {isAr ? 'بث الإشارات السيبرانية الحية' : 'Live Quantum Intercept Stream'}
                </span>
                <span className="text-emerald-400">ENCRYPTED // ACTIVE</span>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto pr-1">
                {scanStream.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 truncate">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        item.status === 'CRITICAL' ? 'bg-red-400 animate-ping' : item.status === 'ALERT' ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} />
                      <span className="text-slate-300 truncate">{item.msg}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0 ml-2">[{item.chain}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Wing: Quick Access Mission Terminals & Modules */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Quick Mission Portals */}
            <div className="cyber-panel rounded-xl p-4 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAr ? 'منصات المهام والتحليل' : 'Mission Consoles'}
                </span>
                <span className="text-slate-400 text-[10px]">DIRECT ACCESS</span>
              </div>

              <div className="space-y-2 font-mono">
                
                {/* 0. AI Oracle Console */}
                <button
                  onClick={() => onNavigateTab('ai_oracle')}
                  className="w-full text-left p-2.5 rounded-lg bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/50 hover:border-cyan-400 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-200 group-hover:text-white transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'أوراكل الذكاء الاصطناعي' : 'Autonomous AI Oracle'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-cyan-500/30 text-cyan-300 border border-cyan-400/40">AI v4</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Cognitive Web3 Copilot & Auditing</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 3D Galaxy Button */}
                <button
                  onClick={() => onNavigateTab('galaxy_3d')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Orbit className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'المجرة المعرفية (GraphRAG)' : '3D Knowledge Galaxy'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-cyan-500/30 text-cyan-300 border border-cyan-400/40">3D</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Spatial Vector memory graph</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Sub-Agent Swarms Button */}
                <button
                  onClick={() => onNavigateTab('agent_swarms')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'أسراب الوكلاء الأربعة' : 'Sub-Agent Swarms'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-cyan-500/30 text-cyan-300 border border-cyan-400/40">SWARM</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Researcher, Coder, Sentinel, Synthesizer</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Web Agent HITL Button */}
                <button
                  onClick={() => onNavigateTab('web_agent_hitl')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'وكيل المتصفح وبوابة HITL' : 'Web Agent & HITL'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-amber-500/30 text-amber-300 border border-amber-400/40">AUTO</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Playwright stealth & 2FA approval</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Sovereign Vault Button */}
                <button
                  onClick={() => onNavigateTab('sovereign_vault')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'الخزنة السيادية ونظام التمويه' : 'Sovereign Vault & Decoy'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">AES</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Isolated secrets & panic decoy switch</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Whitehat Rescue Bot Button */}
                <button
                  onClick={() => onNavigateTab('whitehat_rescue')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <LifeBuoy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'قناص إنقاذ الأصول العالقة' : 'Whitehat Rescue Bot'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">MEV</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Atomic batch frontrunning sweeper bots</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Permit2 Revoker Button */}
                <button
                  onClick={() => onNavigateTab('permit_revoker')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                      <ShieldX className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-red-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'فاحص تصاريح Permit2' : 'Permit2 Allowance Revoker'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-red-500/30 text-red-300 border border-red-400/40">SCAN</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Off-chain signatures & infinite approvals</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Cyber War Games Button */}
                <button
                  onClick={() => onNavigateTab('war_games')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      <Swords className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'غرفة محاكاة الحروب السيبرانية' : 'Cyber War Games Arena'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-purple-500/30 text-purple-300 border border-purple-400/40">SIM</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Flash loans & Oracle manipulation tests</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Solana SVM Inspector Button */}
                <button
                  onClick={() => onNavigateTab('solana_inspector')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'فاحص برامج سولانا (SVM)' : 'Solana SVM & Anchor Inspector'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-cyan-500/30 text-cyan-300 border border-cyan-400/40">SVM</span>
                      </div>
                      <div className="text-[10px] text-slate-400">PDA bump collisions & freeze authority</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* PreFlight Simulator Button */}
                <button
                  onClick={() => onNavigateTab('preflight_sim')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'محاكي المعاملات الاستباقي' : 'Pre-Flight MEV Simulator'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-amber-500/30 text-amber-300 border border-amber-400/40">FORK</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Dry-run state trace & sandwich exploit check</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Mixer Forensic Trace Button */}
                <button
                  onClick={() => onNavigateTab('forensic_mixer')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      <GitMerge className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'مخطط تتبع الخلاطات الجنائي' : 'Forensic Mixer Trace'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-purple-500/30 text-purple-300 border border-purple-400/40">ZKP</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Tornado Cash & Cross-Chain Laundering Graph</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Audit Certificate Studio Button */}
                <button
                  onClick={() => onNavigateTab('audit_cert')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                        <span>{isAr ? 'شهادات التدقيق الموثقة' : 'ZKP Audit Certificate Studio'}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] bg-amber-500/30 text-amber-300 border border-amber-400/40">SEAL</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Institutional Groth16 zkSNARK PDF Reports</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 1. Radar Console */}
                <button
                  onClick={() => onNavigateTab('radar')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <Radar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'رادار الميمبول المباشر' : 'Live Threat Radar'}
                      </div>
                      <div className="text-[10px] text-slate-400">EVM & Solana Scanning</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 2. Bytecode Sandbox Console */}
                <button
                  onClick={() => onNavigateTab('bytecode_sandbox')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'مفكك البايتكود (AST Tree)' : 'Bytecode Decompiler'}
                      </div>
                      <div className="text-[10px] text-slate-400">Control-Flow Graph & Opcodes</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 3. Token DNA Console */}
                <button
                  onClick={() => onNavigateTab('token_dna')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      <Dna className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'البصمة الجينية للعقود' : 'Token DNA Forensics'}
                      </div>
                      <div className="text-[10px] text-slate-400">AST Bytecode & Backdoors</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 4. Stego Lab Console */}
                <button
                  onClick={() => onNavigateTab('stego_lab')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'مختبر التشفير البصري' : 'Optical Stego Lab'}
                      </div>
                      <div className="text-[10px] text-slate-400">LSB Canvas Carrier Embedding</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 5. Multi-Agent Engine */}
                <button
                  onClick={() => onNavigateTab('agents')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'منظومة الوكلاء والتشفير' : 'Agent Swarm & Stegano'}
                      </div>
                      <div className="text-[10px] text-slate-400">4 Coordinated AI Cells</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 6. Smart Escrow Rescue */}
                <button
                  onClick={() => onNavigateTab('escrow')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'الاسترداد والضمان الذكي' : 'Flashbots MEV Rescue'}
                      </div>
                      <div className="text-[10px] text-slate-400">10-20% Conditional Escrow</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 7. Intel Vault */}
                <button
                  onClick={() => onNavigateTab('vault')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {isAr ? 'أرشيف الأسرار والأبحاث' : 'Classified Intel Vault'}
                      </div>
                      <div className="text-[10px] text-slate-400">Zero-Day Vulnerabilities</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Stego Noise Matrix Mini Card */}
            <div className="cyber-panel rounded-xl p-4 border border-slate-800 bg-black/75 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">{isAr ? 'تضمين الشواش البصري:' : 'Optical Stego Matrix:'}</span>
                <span className="text-emerald-400 font-bold">0.9994 ENTROPY</span>
              </div>
              <div className="w-full h-12 rounded bg-black/80 border border-slate-800 overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10" />
                <span className="text-[10px] font-mono text-cyan-300/80 z-10">
                  MATRIX_STEGO_PAYLOAD_VALIDATED [256-BIT ZKP]
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Planetary Telemetry & System Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl cyber-panel border border-slate-800 bg-black/60 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'زمن استجابة MEV' : 'MEV Latency'}</span>
            <span className="text-emerald-400 font-bold text-sm">24 ms (Flashbots)</span>
          </div>
          <div className="p-3 rounded-xl cyber-panel border border-slate-800 bg-black/60 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'عقود مفحوصة جينياً' : 'Indexed Bytecodes'}</span>
            <span className="text-purple-300 font-bold text-sm">48,910 Contracts</span>
          </div>
          <div className="p-3 rounded-xl cyber-panel border border-slate-800 bg-black/60 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'أموال مستردة للمحافظ' : 'Rescued Capital'}</span>
            <span className="text-cyan-300 font-bold text-sm">$1,845,200 USD</span>
          </div>
          <div className="p-3 rounded-xl cyber-panel border border-slate-800 bg-black/60 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'حالة التشفير' : 'Attestation Status'}</span>
            <span className="text-emerald-400 font-bold text-sm">VERIFIED ZKP</span>
          </div>
        </div>

      </div>
    </div>
  );
};
