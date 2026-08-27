import React, { useState } from 'react';
import { 
  Network, 
  Zap, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  Key, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { ARCHITECTURE_NODES } from '../data';

interface ArchitectureDiagramProps {
  lang: 'ar' | 'en';
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedNode, setSelectedNode] = useState(ARCHITECTURE_NODES[0]);

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="cyber-panel p-5 rounded-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
              <Network className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>{isAr ? 'المعمارية التقنية والبنية التحتية الموزعة' : 'Distributed Infrastructure Architecture'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  HYBRID EDGE + GRAPH + VECTOR
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'معمارية موزعة تجمع بين الاستشعار الحافة اللحظي، قواعد البيانات المتجهية والبيانية، وقنوات التنفيذ والتخفي'
                  : 'Low-latency edge sensing, vector similarity search, developer graph mapping & private Flashbots execution'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded bg-black/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'المفاتيح مشفرة ومحمية' : 'Keys Encrypted'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Topology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {ARCHITECTURE_NODES.map((node, idx) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`cyber-panel p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 cyber-glow-emerald bg-emerald-950/20'
                  : 'border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-500 font-bold">0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <h3 className="font-bold text-xs text-slate-100 mb-1">
                  {isAr ? node.titleAr : node.title}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">
                  {isAr ? node.descriptionAr : node.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] text-emerald-400 truncate">
                {node.tech}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive on Selected Layer (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Layer Specification (7 Columns) */}
        <div className="lg:col-span-7 cyber-panel p-6 rounded-xl border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>{isAr ? selectedNode.titleAr : selectedNode.title}</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
              ACTIVE NODE
            </span>
          </div>

          <div className="p-4 rounded-lg bg-black/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            {isAr ? selectedNode.descriptionAr : selectedNode.description}
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block">
              {isAr ? 'التقنيات والمكتبات المستخدمة:' : 'Underlying Technology Stack:'}
            </span>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
              {selectedNode.tech}
            </div>
          </div>

          {/* Environmental Keys Mapping */}
          <div className="space-y-2 pt-2">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-xs">
              {isAr ? 'إدارة المفاتيح والأمان (Environment Keys):' : 'Environment Security Config:'}
            </span>
            <div className="p-3 rounded bg-black/80 border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CONVEX_DEPLOYMENT_URL</span>
                <span className="text-emerald-400 font-mono text-[10px]">https://matrix-live.convex.cloud [CONFIGURED]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">SUPABASE_VECTOR_KEY</span>
                <span className="text-emerald-400 font-mono text-[10px]">sbp_sec_99a8... [SECURE]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CLOUDFLARE_WORKERS_TOKEN</span>
                <span className="text-emerald-400 font-mono text-[10px]">cf_tk_128_nodes [ACTIVE]</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub & Low-Code Deployment Integration Card (5 Columns) */}
        <div className="lg:col-span-5 cyber-panel p-6 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'المستودع وبيئة التحديث الذكي' : 'Repo & Low-Code Engine'}</span>
              </h3>
              <span className="text-[10px] text-emerald-400">GitHub Verified</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-black/60 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block">{isAr ? 'المستودع الرئيسي على GitHub' : 'GitHub Repository'}</span>
                <span className="text-emerald-400 font-bold block">xblack2027-ai/black-matrix</span>
              </div>

              <div className="p-3 rounded bg-black/60 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block">{isAr ? 'بيئة التطوير والترقية عبر الـ Prompts' : 'AI Prompt-Driven Low-Code Engine'}</span>
                <span className="text-slate-200 font-semibold block">Bolt.new / AI Studio Direct Interface</span>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {isAr
                    ? 'إدارة المنظومة والترقيات بالكامل عبر الأوامر المباشرة والذكاء الاصطناعي دون تعقيد برمجي يدوي.'
                    : 'Operated and upgraded via prompts and AI Low-Code pipelines without manual code burden.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isAr ? 'جاهزية المعمارية للإنتاج: 100%' : 'Production Architecture Ready'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
