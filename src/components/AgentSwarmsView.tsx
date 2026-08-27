import React, { useState } from 'react';
import { 
  Users, 
  Bot, 
  Cpu, 
  Search, 
  Code2, 
  ShieldCheck, 
  FileText, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface AgentSwarmsViewProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface SubAgent {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  iconType: 'RESEARCHER' | 'CODER' | 'SECURITY' | 'SYNTHESIZER';
  status: 'ACTIVE_WORKING' | 'IDLE_STANDBY' | 'SYNCING';
  currentTaskAr: string;
  currentTaskEn: string;
  efficiencyScore: number;
  completedTasksCount: number;
  latencyMs: number;
  primaryModel: string;
}

export const AgentSwarmsView: React.FC<AgentSwarmsViewProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [agents, setAgents] = useState<SubAgent[]>([
    {
      id: 'agent_res',
      nameAr: 'وكيل الاستخبارات والبحث المتقدم',
      nameEn: 'Deep Intelligence & Research Agent',
      roleAr: 'مسح الويب، تحليل وثائق الاستثمار، وجمع تقارير السوق والمنافسين',
      roleEn: 'Web crawler, VC pitch analyzer, competitor signals & market intelligence',
      iconType: 'RESEARCHER',
      status: 'ACTIVE_WORKING',
      currentTaskAr: 'استخراج شروط التقييم من مسودة SAFE وتلخيص الفروقات القانونية...',
      currentTaskEn: 'Extracting valuation terms from SAFE note draft and calculating dilution curve...',
      efficiencyScore: 99.4,
      completedTasksCount: 142,
      latencyMs: 180,
      primaryModel: 'Claude 3.5 Sonnet / Gemini Pro'
    },
    {
      id: 'agent_coder',
      nameAr: 'وكيل البرمجة والمعمارية الهندسية',
      nameEn: 'Autonomous Coder & Systems Architect',
      roleAr: 'كتابة وتدقيق الأكواد، محاكاة العقود الذكية، وتطوير الأدوات المصغرة Micro-SaaS',
      roleEn: 'Solidity & Rust smart contract builder, Micro-SaaS synthesizer, AST refactoring',
      iconType: 'CODER',
      status: 'ACTIVE_WORKING',
      currentTaskAr: 'بناء واجهة برمجية مصغرة لنظام التنبيهات ونشرها على Cloudflare Workers...',
      currentTaskEn: 'Compiling micro-service endpoint to Cloudflare Edge Worker with zero-cold start...',
      efficiencyScore: 98.9,
      completedTasksCount: 389,
      latencyMs: 120,
      primaryModel: 'Gemini 1.5 Pro / DeepSeek V3'
    },
    {
      id: 'agent_sec',
      nameAr: 'وكيل الحراسة والإنقاذ السيبراني',
      nameEn: 'Security Sentinel & MEV Guardian',
      roleAr: 'حماية المحافظ، صد هجمات الساندوتش، وفحص تصاريح التوقيع المشبوهة',
      roleEn: 'Compromised wallet sweeper interceptor, Permit2 revoker, mempool scanner',
      iconType: 'SECURITY',
      status: 'ACTIVE_WORKING',
      currentTaskAr: 'مراقبة الميمبول لمنع تسرب معاملات الخزينة وتوجيهها عبر Flashbots Private...',
      currentTaskEn: 'Monitoring mempool for sandwich bots and routing txs via Flashbots private relay...',
      efficiencyScore: 100,
      completedTasksCount: 512,
      latencyMs: 14,
      primaryModel: 'Local Custom WASM Rule Engine'
    },
    {
      id: 'agent_synth',
      nameAr: 'وكيل التجميع التنفيذي والمبادئ الأولى',
      nameEn: 'Executive Synthesizer & First-Principles',
      roleAr: 'تصفية التشويش، إعداد الإيجاز اليومي للمؤسس، وحماية طاقته وتركيزه',
      roleEn: 'Signal-to-noise filter, daily executive briefs, cognitive fatigue guardrail',
      iconType: 'SYNTHESIZER',
      status: 'ACTIVE_WORKING',
      currentTaskAr: 'إعداد جدول أعمال اليوم ذي الأولوية القصوى وتأجيل 4 مهام غير عاجلة...',
      currentTaskEn: 'Synthesizing top 3 needle-moving decisions and deferring low-priority meetings...',
      efficiencyScore: 97.8,
      completedTasksCount: 88,
      latencyMs: 95,
      primaryModel: 'GPT-4o Omni / Anthropic Opus'
    }
  ]);

  const [swarmState, setSwarmState] = useState<'AUTONOMOUS_RUNNING' | 'PAUSED'>('AUTONOMOUS_RUNNING');

  const toggleSwarmState = () => {
    if (onPlaySound) onPlaySound('click');
    setSwarmState(prev => prev === 'AUTONOMOUS_RUNNING' ? 'PAUSED' : 'AUTONOMOUS_RUNNING');
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Users className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'أسراب الوكلاء المتوازية (Sub-Agent Swarms & Autonomous Orchestra)' : 'Autonomous Sub-Agent Swarms Engine'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                4 AUTONOMOUS CORES
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'فريق من الوكلاء الأذكياء المتخصصين يعملون بتزامن تام لتنفيذ أهداف المؤسس (بحث، برمجة، أمان، وتلخيص)'
                : 'Orchestrated multi-agent architecture executing parallel high-order cognitive workflows with LLM router fallback'}
            </p>
          </div>
        </div>

        {/* Global Action Button */}
        <button
          onClick={toggleSwarmState}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
            swarmState === 'AUTONOMOUS_RUNNING'
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-950/60'
              : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-950/60'
          }`}
        >
          {swarmState === 'AUTONOMOUS_RUNNING' ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>{isAr ? 'إيقاف السرب مؤقتاً' : 'Pause Swarm Execution'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{isAr ? 'استئناف السرب الآلي' : 'Resume Autonomous Swarm'}</span>
            </>
          )}
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div 
            key={agent.id}
            className="cyber-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  {agent.iconType === 'RESEARCHER' && <Search className="w-5 h-5" />}
                  {agent.iconType === 'CODER' && <Code2 className="w-5 h-5" />}
                  {agent.iconType === 'SECURITY' && <ShieldCheck className="w-5 h-5" />}
                  {agent.iconType === 'SYNTHESIZER' && <Sparkles className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    {isAr ? agent.nameAr : agent.nameEn}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Model: <strong className="text-cyan-300">{agent.primaryModel}</strong>
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            {/* Role & Objective */}
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {isAr ? agent.roleAr : agent.roleEn}
            </p>

            {/* Current Real-time Task */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-cyan-400 font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-spin" />
                <span>{isAr ? 'المهمة الجارية اللحظية:' : 'Live Execution Payload:'}</span>
              </div>
              <div className="text-[11px] text-slate-200 font-mono">
                {isAr ? agent.currentTaskAr : agent.currentTaskEn}
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] text-slate-400">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-center">
                <div className="text-slate-500">{isAr ? 'الكفاءة:' : 'Efficiency:'}</div>
                <div className="text-emerald-400 font-bold mt-0.5">{agent.efficiencyScore}%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-center">
                <div className="text-slate-500">{isAr ? 'المنجزات:' : 'Completed:'}</div>
                <div className="text-cyan-300 font-bold mt-0.5">{agent.completedTasksCount} Tasks</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-center">
                <div className="text-slate-500">{isAr ? 'التأخير:' : 'Latency:'}</div>
                <div className="text-purple-300 font-bold mt-0.5">{agent.latencyMs}ms</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
