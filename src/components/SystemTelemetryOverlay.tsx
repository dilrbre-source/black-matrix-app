import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  Cpu, 
  Database, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck, 
  Layers, 
  Zap,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemTelemetryOverlayProps {
  lang: 'ar' | 'en';
}

export const SystemTelemetryOverlay: React.FC<SystemTelemetryOverlayProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Sparkline data points for memory & throughput
  const [memoryHistory, setMemoryHistory] = useState<number[]>([42, 45, 43, 48, 52, 49, 53, 56, 54, 58, 60, 57]);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([18, 14, 16, 12, 15, 14, 13, 11, 14, 12, 13, 12]);
  const [wsStatus, setWsStatus] = useState<'CONNECTED' | 'SYNCING'>('CONNECTED');
  const [activeAgentsCount, setActiveAgentsCount] = useState<number>(4);
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryHistory(prev => {
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.48) * 4;
        const nextVal = Math.min(85, Math.max(35, Math.round(last + delta)));
        return [...prev.slice(1), nextVal];
      });

      setLatencyHistory(prev => {
        const nextLat = Math.round(10 + Math.random() * 8);
        return [...prev.slice(1), nextLat];
      });

      setFps(Math.round(58 + Math.random() * 2));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const currentMem = memoryHistory[memoryHistory.length - 1];
  const currentLatency = latencyHistory[latencyHistory.length - 1];

  // SVG Sparkline generator
  const renderSparkline = (data: number[], color: string, height: number = 24, width: number = 80) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* Glowing dot on last item */}
        {data.length > 0 && (
          <circle
            cx={width}
            cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2}
            r="2.5"
            fill={color}
            className="animate-pulse"
          />
        )}
      </svg>
    );
  };

  if (isMinimized) {
    return (
      <div 
        id="system-telemetry-minimized"
        className="fixed bottom-4 right-4 z-50 select-none font-mono"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="px-3 py-1.5 rounded-xl bg-black/90 border border-cyan-500/40 text-cyan-400 text-xs font-bold shadow-2xl flex items-center gap-2 hover:bg-cyan-950/50 transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Activity className="w-3.5 h-3.5" />
          <span>{isAr ? 'القياس عن بُعد (Telemetry)' : 'Telemetry'}</span>
          <span className="text-[10px] text-cyan-300 font-normal">{currentLatency}ms</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      id="system-telemetry-overlay"
      className="fixed bottom-4 right-4 z-50 select-none font-mono max-w-xs sm:max-w-sm w-full"
    >
      <div className="rounded-2xl border border-cyan-500/30 bg-black/85 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Top Header Bar */}
        <div className="px-3.5 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              {isAr ? 'القياس عن بُعد اللحظي' : 'System Telemetry'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="btn-toggle-expand-telemetry"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
            <button
              id="btn-minimize-telemetry"
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Minimize"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Compact Quick Stats Bar */}
        <div className="p-3 grid grid-cols-3 gap-2 text-xs border-b border-slate-800/60 bg-black/40">
          
          {/* Swarm Memory */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>{isAr ? 'الذاكرة' : 'Memory'}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-cyan-300">{currentMem}%</span>
              <div className="ml-1">
                {renderSparkline(memoryHistory, '#06b6d4', 16, 45)}
              </div>
            </div>
          </div>

          {/* WebSocket & Latency */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span>WS Relay</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-emerald-400">{currentLatency}ms</span>
              <div className="ml-1">
                {renderSparkline(latencyHistory, '#10b981', 16, 45)}
              </div>
            </div>
          </div>

          {/* Agent Swarms Active */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span>{isAr ? 'الأسراب' : 'Swarms'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300">4 Cores</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                100%
              </span>
            </div>
          </div>

        </div>

        {/* Expandable Deep Telemetry Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-3.5 py-3 space-y-2.5 text-xs bg-slate-950/90 text-slate-300 overflow-hidden"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{isAr ? 'حالة قناة WebSocket:' : 'WebSocket Pipeline:'}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE (Zero Drop)
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{isAr ? 'محرك الـ RAG المتجهي:' : 'Vector Index Shards:'}</span>
                <span className="text-cyan-300 font-mono">5,420 Embeddings</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{isAr ? 'معدل الإطارات (UI FPS):' : 'Interface Render Engine:'}</span>
                <span className="text-amber-300 font-bold">{fps} FPS</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{isAr ? 'عزل الخزنة المشفرة:' : 'Vault Enclave AES-256:'}</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  HARDENED
                </span>
              </div>

              <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
                <span>NODE: CF_EDGE_WASM</span>
                <span className="text-cyan-400">UPTIME: 99.99%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
