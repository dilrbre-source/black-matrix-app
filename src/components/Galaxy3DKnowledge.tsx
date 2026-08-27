import React, { useState, useEffect, useRef } from 'react';
import { 
  Orbit, 
  Sparkles, 
  Search, 
  Database, 
  Layers, 
  Maximize2, 
  Network, 
  Cpu, 
  Share2, 
  Zap,
  BookOpen,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Galaxy3DKnowledgeProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface KnowledgeNode {
  id: string;
  labelAr: string;
  labelEn: string;
  type: 'CORE_STRATEGY' | 'SMART_CONTRACT' | 'DEAL_NEGOTIATION' | 'AI_MODEL' | 'SECURITY_INCIDENT';
  x: number; // percentage coordinates 0-100
  y: number;
  connections: string[]; // ids of connected nodes
  vectorEmbeddingSize: string;
  lastUpdated: string;
  summaryAr: string;
  summaryEn: string;
  tags: string[];
}

export const Galaxy3DKnowledge: React.FC<Galaxy3DKnowledgeProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const nodes: KnowledgeNode[] = [
    {
      id: 'node_core',
      labelAr: 'المصفوفة التنفيذية للمؤسس',
      labelEn: 'Founder Sovereign Matrix',
      type: 'CORE_STRATEGY',
      x: 50,
      y: 50,
      connections: ['node_crypto', 'node_contracts', 'node_deals', 'node_sec'],
      vectorEmbeddingSize: '1536-dim (Text-Embedding-3-Large)',
      lastUpdated: '10s ago',
      summaryAr: 'النواة المركزية الموجهة لكافة القرارات الاستراتيجية واستثمار الموارد وخطط النمو.',
      summaryEn: 'Primary central knowledge nexus governing resource allocation, deal strategy and enterprise milestones.',
      tags: ['Sovereign', 'Strategy', 'HighPriority']
    },
    {
      id: 'node_crypto',
      labelAr: 'محفظة الأصول السحابية والسيادة',
      labelEn: 'Sovereign Treasury & EVM Vaults',
      type: 'SMART_CONTRACT',
      x: 28,
      y: 35,
      connections: ['node_core', 'node_sec'],
      vectorEmbeddingSize: '1536-dim Vector',
      lastUpdated: '2m ago',
      summaryAr: 'سجلات المحافظ اللامركزية وتفاصيل عقود الضمان الذكي والسيولة المودعة في الخزائن.',
      summaryEn: 'Multi-sig safe configurations, Flashbots MEV protection routes, and automated escrow contracts.',
      tags: ['Crypto', 'MultiSig', 'Treasury']
    },
    {
      id: 'node_deals',
      labelAr: 'مفاوضات الشراكات وصناديق الاستثمار',
      labelEn: 'VC Deals & Strategic Partnerships',
      type: 'DEAL_NEGOTIATION',
      x: 72,
      y: 38,
      connections: ['node_core'],
      vectorEmbeddingSize: '1536-dim Vector',
      lastUpdated: '15m ago',
      summaryAr: 'ملخصات الاجتماعات الأخيرة، مسودات التقييم، وشروط اتفاقيات الـ SAFE الاستثمارية.',
      summaryEn: 'Executive negotiation notes, term sheet revisions, and live Stealth Whisper conversation cues.',
      tags: ['Negotiation', 'TermSheet', 'VC']
    },
    {
      id: 'node_contracts',
      labelAr: 'معمارية النظم والعقود الذكية',
      labelEn: 'Solidity/Rust Security Architecture',
      type: 'SMART_CONTRACT',
      x: 32,
      y: 70,
      connections: ['node_core', 'node_sec'],
      vectorEmbeddingSize: '1536-dim Vector',
      lastUpdated: '1h ago',
      summaryAr: 'مخططات تدفق البيانات، تدقيق كود Solidity، وشهادات إثباتات المعرفة الصفرية ZK-SNARK.',
      summaryEn: 'Audited smart contracts bytecode, AST graph representations and formal verification proofs.',
      tags: ['Solidity', 'ZKP', 'Audits']
    },
    {
      id: 'node_sec',
      labelAr: 'سجلات الرادار والاستخبارات السيبرانية',
      labelEn: 'Cyber Threat Intel & Mempool Logs',
      type: 'SECURITY_INCIDENT',
      x: 68,
      y: 72,
      connections: ['node_core', 'node_crypto', 'node_contracts'],
      vectorEmbeddingSize: '1536-dim Vector',
      lastUpdated: 'Just Now',
      summaryAr: 'بيانات التهديدات المحظورة، تتبع مسارات الخلاطات، والتنبيهات الاستباقية للثغرات الصفرية.',
      summaryEn: 'Cross-chain mixer forensic traces, permit2 phishing revoker telemetry, and honeypot alerts.',
      tags: ['Defense', 'Forensics', 'Realtime']
    }
  ];

  const [selectedNode, setSelectedNode] = useState<KnowledgeNode>(nodes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredNodes = nodes.filter(n => {
    const matchesSearch = n.labelAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.labelEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'ALL' || n.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Orbit className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'المجرة المعرفية ثلاثية الأبعاد (GraphRAG 3D Galaxy & Vector Nexus)' : '3D Knowledge Galaxy & GraphRAG Nexus'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                NEO4J + PINECONE RAG
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'استرجاع فوري للذاكرة الاستراتيجية والملفات والكيانات برسم بياني ثلاثي الأبعاد وربط سياقي متعدد الأبعاد'
                : 'Interactive spatial memory graph connecting executive decisions, code audits, VC negotiations, and threat intelligence'}
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث في الذاكرة المتجهية...' : 'Search Vector Memory...'}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 w-52 sm:w-64 font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive 3D Galaxy Canvas (8 cols) */}
        <div className="lg:col-span-8 cyber-panel rounded-2xl p-5 border border-cyan-500/30 bg-black/85 backdrop-blur-xl relative min-h-[440px] flex flex-col justify-between overflow-hidden shadow-2xl">
          
          {/* Subtle Grid Background & Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

          {/* Top Bar on Canvas */}
          <div className="flex items-center justify-between z-10 text-xs border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200">{isAr ? 'مجرة الكيانات المعرفية الحية' : 'Live Spatial Entity Graph'}</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                5,420 VECTORS INDEXED
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              ROTATION: <span className="text-emerald-400">STABLE</span>
            </div>
          </div>

          {/* Galaxy Interactive Stage */}
          <div className="relative flex-1 w-full my-4 min-h-[300px]">
            
            {/* SVG Connecting Lines between Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map(node => (
                node.connections.map(targetId => {
                  const target = nodes.find(n => n.id === targetId);
                  if (!target) return null;
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke="rgba(6, 182, 212, 0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                  );
                })
              ))}
            </svg>

            {/* Render Celestial Nodes */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNode(node);
                    if (onPlaySound) onPlaySound('click');
                  }}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute cursor-pointer group transition-all z-20 flex flex-col items-center`}
                >
                  <motion.div
                    animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-cyan-500/30 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.8)]'
                        : 'bg-slate-900/90 border-slate-700 hover:border-cyan-400 hover:scale-110'
                    }`}
                  >
                    <Sparkles className={`w-5 h-5 ${isSelected ? 'text-cyan-200' : 'text-cyan-400'}`} />
                  </motion.div>

                  <div className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-colors ${
                    isSelected ? 'bg-cyan-400 text-black shadow-md' : 'bg-slate-900/90 text-slate-300 group-hover:text-cyan-300 border border-slate-800'
                  }`}>
                    {isAr ? node.labelAr : node.labelEn}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Stage Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10 text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>{isAr ? 'انقر على أي جرم لاستدعاء السياق المتجهي الفوري' : 'Click any celestial nexus node to retrieve live Vector & Graph context'}</span>
            <span className="text-cyan-400 font-mono">LATENCY: 14ms (Supabase Vector)</span>
          </div>

        </div>

        {/* Right: Selected Node Vector & Graph Insights (4 cols) */}
        <div className="lg:col-span-4 cyber-panel rounded-2xl p-5 border border-cyan-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              {isAr ? 'بيانات العقدة المسترجعة (RAG Context)' : 'Retrieved Vector Context'}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">{selectedNode.lastUpdated}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">{isAr ? 'العقدة النشطة:' : 'Selected Nexus Node:'}</span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                {isAr ? selectedNode.labelAr : selectedNode.labelEn}
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="text-[10px] text-slate-400">{isAr ? 'ملخص الاسترجاع المعرفي (Synthesized Context):' : 'Synthesized Knowledge Summary:'}</div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                {isAr ? selectedNode.summaryAr : selectedNode.summaryEn}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 block">{isAr ? 'البيانات التقنية للمتجه:' : 'Vector Embedding Specs:'}</span>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] space-y-1 text-slate-400">
                <div>Dimension: <span className="text-cyan-300">{selectedNode.vectorEmbeddingSize}</span></div>
                <div>Graph Links: <span className="text-purple-300">{selectedNode.connections.length} Direct Entities</span></div>
                <div>Similarity Score: <span className="text-emerald-400">0.9942 Cosine High</span></div>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block mb-1">{isAr ? 'الوسوم المصنفة:' : 'Indexed Tags:'}</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onPlaySound) onPlaySound('beep');
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-cyan-950/50 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isAr ? 'تغذية الوكلاء بهذا السياق' : 'Inject Context into Agent Swarm'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
