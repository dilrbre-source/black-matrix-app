import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  ShieldAlert, 
  Radio, 
  Zap, 
  Eye, 
  Key, 
  Send, 
  CheckCircle2, 
  Terminal, 
  RefreshCw,
  Layers,
  Fingerprint
} from 'lucide-react';
import { AgentCell } from '../types';
import { AGENT_CELLS } from '../data';
import { PixelNoiseCanvas } from './PixelNoiseCanvas';

interface MultiAgentEngineProps {
  lang: 'ar' | 'en';
}

export const MultiAgentEngine: React.FC<MultiAgentEngineProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [agents, setAgents] = useState<AgentCell[]>(AGENT_CELLS);
  const [selectedAgent, setSelectedAgent] = useState<AgentCell>(AGENT_CELLS[0]);
  const [executingTask, setExecutingTask] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Mempool Sentinel Cluster spawned across 128 Cloudflare Edge nodes.',
    '[STEGO] Token_DNA Encoder pipeline calibrated to 0.9984 entropy density.',
    '[KYD] Forensics Engine established zero-knowledge proof circuit on Sepolia/Base.',
    '[RESCUE] Flashbots private bundle builder channel listening with 24ms round-trip.',
    '[READY] Multi-Agent Autonomous Mesh online and monitoring EVM, Solana, Bitcoin.'
  ]);

  const handleTriggerAgentAction = (agent: AgentCell) => {
    setExecutingTask(agent.id);
    const logTime = new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US');

    setTimeout(() => {
      let newLog = '';
      if (agent.id === 'AGENT-01') {
        newLog = `[${logTime}] [MEMPOOL] Scanned 1,420 unconfirmed transactions. Encoded query payload into Pixel Noise Matrix #0x99A.`;
      } else if (agent.id === 'AGENT-02') {
        newLog = `[${logTime}] [TOKEN_DNA] Extracted AST byte-vector for target contract. Tamper-proof hash DNA-0x88F registered to Supabase Vector DB.`;
      } else if (agent.id === 'AGENT-03') {
        newLog = `[${logTime}] [KYD] Traced 5-hop developer fund origin to Tornado Cash. Computed Trust Score: 12/100 (High Risk) + Sealed with ZKP.`;
      } else {
        newLog = `[${logTime}] [RESCUE] Assembled Private Flashbots MEV Bundle. Simulated 15% escrow split with $42,000 USD rescued.`;
      }

      setTerminalLogs((prev) => [newLog, ...prev]);
      setExecutingTask(null);

      // increment task count
      setAgents((prev) =>
        prev.map((a) => (a.id === agent.id ? { ...a, metrics: { ...a.metrics, tasksCompleted: a.metrics.tasksCompleted + 1 } } : a))
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Overview Header */}
      <div className="cyber-panel p-5 rounded-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>{isAr ? 'منظومة الوكلاء الأربعة والتشفير البصري' : 'Multi-Agent Engine & Steganographic Cells'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  4 CELLS ACTIVE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'خلايا ذكية موزعة تعمل بتناغم تام للرصد، التشفير البصري، التحري الجنائي، واسترداد الأصول'
                  : 'Coordinated autonomous agents for silent mempool probing, DNA encoding, KYD forensics & private escrow rescue'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Mesh Sync: 100%</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const isSelected = selectedAgent.id === agent.id;
          const isBusy = executingTask === agent.id;

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`cyber-panel p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 cyber-glow-emerald bg-emerald-950/20'
                  : 'border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-500 font-bold">{agent.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {agent.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-100 mb-1">
                  {isAr ? agent.nameAr : agent.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {isAr ? agent.roleAr : agent.role}
                </p>

                {/* Encryption Style Badge */}
                <div className="p-2 rounded bg-black/50 border border-emerald-500/20 text-[10px] text-emerald-300 mb-3 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{isAr ? agent.encryptionModeAr : agent.encryptionMode}</span>
                </div>
              </div>

              <div>
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-3 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">{isAr ? 'الإنتاجية' : 'Throughput'}</span>
                    <span className="text-slate-200 font-bold">{agent.metrics.throughput}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{isAr ? 'المهام المنجزة' : 'Tasks'}</span>
                    <span className="text-emerald-400 font-bold">{agent.metrics.tasksCompleted.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerAgentAction(agent);
                  }}
                  disabled={isBusy}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-black font-bold text-xs border border-emerald-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBusy ? 'animate-spin' : ''}`} />
                  <span>{isBusy ? (isAr ? 'جاري التنفيذ...' : 'Executing...') : (isAr ? 'إرسال إشارة للخلية' : 'Signal Cell')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Agent Deep Dive & Stego Pixel Stream (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agent Inspector & Encryption Substrate (7 Columns) */}
        <div className="lg:col-span-7 cyber-panel p-5 rounded-xl border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-bold text-sm text-slate-100">
                {isAr ? selectedAgent.nameAr : selectedAgent.name} // {selectedAgent.id}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Signal: {selectedAgent.metrics.lastSignal}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-black/50 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {isAr ? selectedAgent.descriptionAr : selectedAgent.description}
          </div>

          {/* Stego Noise Matrix Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                {isAr ? 'مصفوفة التمويه والتشفير الصامت المباشرة:' : 'Real-time Stego Noise Carrier Stream:'}
              </span>
              <span className="text-emerald-400 font-bold">
                Entropy: {selectedAgent.metrics.entropyScore}
              </span>
            </div>

            <PixelNoiseCanvas
              seed={`CELL_${selectedAgent.id}_${selectedAgent.metrics.tasksCompleted}`}
              height={140}
              entropy={parseFloat(selectedAgent.metrics.entropyScore)}
              showOverlayText={`SEC_PAYLOAD // ${selectedAgent.encryptionMode} // ENCRYPTED`}
            />
          </div>
        </div>

        {/* Live Multi-Agent Command Terminal Logs (5 Columns) */}
        <div className="lg:col-span-5 cyber-panel p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                {isAr ? 'سجل الاتصال المباشر للوكلاء (Mesh Terminal):' : 'Agent Mesh Telemetry:'}
              </span>
              <span className="text-[10px] text-slate-500">P2P Channel Encrypted</span>
            </div>

            <div className="space-y-2 text-[11px] max-h-[220px] overflow-y-auto pr-1">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-black/60 border border-slate-800 text-slate-300 font-mono leading-relaxed"
                >
                  <span className="text-emerald-400 mr-1">❯</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Mesh Topology: Asynchronous Zero-Lag</span>
            <span className="text-emerald-400 font-bold">100% OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
