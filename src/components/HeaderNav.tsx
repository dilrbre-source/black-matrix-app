import React from 'react';
import { 
  Radar, 
  Dna, 
  Bot, 
  ShieldAlert, 
  Database, 
  Network, 
  CalendarClock, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Languages, 
  Lock, 
  Activity,
  Cpu,
  Orbit,
  Sparkles,
  Code2,
  Layers,
  Zap,
  GitMerge,
  Award,
  LifeBuoy,
  ShieldX,
  Swords,
  Globe,
  Radio,
  Ear,
  Brain,
  Users,
  Flame
} from 'lucide-react';
import { HUDTab, SystemStats } from '../types';

interface HeaderNavProps {
  activeTab: HUDTab;
  onTabChange: (tab: HUDTab) => void;
  lang: 'ar' | 'en';
  onLanguageToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  stats?: SystemStats;
  onLock?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onTabChange,
  lang,
  onLanguageToggle,
  soundEnabled,
  onSoundToggle,
  stats = {
    mempoolTps: 18450,
    activeSensors: 128,
    dnaIndexedCount: 48910,
    totalRescuedUSD: 1845200,
    stegoEntropy: 0.9994,
    flashbotsLatencyMs: 24,
    networkStatus: { evm: 'OPTIMAL', solana: 'OPTIMAL', bitcoin: 'OPTIMAL' }
  },
  onLock
}) => {
  const isAr = lang === 'ar';

  const tabs: Array<{ id: HUDTab; labelAr: string; labelEn: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'command_bridge', labelAr: 'جسر القيادة الفضائي', labelEn: 'Command Bridge', icon: <Orbit className="w-4 h-4 text-cyan-400" />, badge: 'HQ' },
    { id: 'galaxy_3d', labelAr: 'المجرة المعرفية (GraphRAG)', labelEn: '3D Galaxy RAG', icon: <Network className="w-4 h-4 text-cyan-300" />, badge: '3D' },
    { id: 'agent_swarms', labelAr: 'أسراب الوكلاء الأربعة', labelEn: 'Agent Swarms', icon: <Users className="w-4 h-4 text-cyan-400" />, badge: 'SWARM' },
    { id: 'web_agent_hitl', labelAr: 'وكيل المتصفح (HITL)', labelEn: 'Web Agent HITL', icon: <Globe className="w-4 h-4 text-amber-400" />, badge: 'AUTO' },
    { id: 'sovereign_vault', labelAr: 'الخزنة السيادية والتمويه', labelEn: 'Sovereign Vault', icon: <Lock className="w-4 h-4 text-emerald-400" />, badge: 'AES' },
    { id: 'omni_channel', labelAr: 'بوابة تيليجرام وواتساب', labelEn: 'Omni-Channel', icon: <Radio className="w-4 h-4 text-cyan-400" /> },
    { id: 'stealth_whisper', labelAr: 'الموجه السري (Stealth)', labelEn: 'Stealth Whisper', icon: <Ear className="w-4 h-4 text-cyan-300" /> },
    { id: 'cognitive_guard', labelAr: 'حارس الطاقة الذهنية', labelEn: 'Cognitive Guard', icon: <Brain className="w-4 h-4 text-emerald-400" /> },
    { id: 'ai_oracle', labelAr: 'أوراكل الذكاء الاصطناعي', labelEn: 'AI Oracle', icon: <Sparkles className="w-4 h-4 text-cyan-300" />, badge: 'AI' },
    { id: 'whitehat_rescue', labelAr: 'قناص الإنقاذ (Whitehat)', labelEn: 'Rescue Bot', icon: <LifeBuoy className="w-4 h-4 text-emerald-400" />, badge: 'MEV' },
    { id: 'permit_revoker', labelAr: 'فاحص تواقيع Permit2', labelEn: 'Permit2 Revoker', icon: <ShieldX className="w-4 h-4 text-red-400" /> },
    { id: 'war_games', labelAr: 'غرفة محاكاة الحروب', labelEn: 'War Games', icon: <Swords className="w-4 h-4 text-purple-400" /> },
    { id: 'stress_benchmark', labelAr: 'محاكي الإجهاد والتحمل', labelEn: 'Stress Benchmark', icon: <Flame className="w-4 h-4 text-rose-400" />, badge: 'SOAK' },
    { id: 'solana_inspector', labelAr: 'فاحص برامج سولانا (SVM)', labelEn: 'Solana SVM', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { id: 'preflight_sim', labelAr: 'محاكي المعاملات الاستباقي', labelEn: 'Pre-Flight Sim', icon: <Zap className="w-4 h-4 text-amber-400" />, badge: 'SIM' },
    { id: 'forensic_mixer', labelAr: 'مخطط تتبع الخلاطات الجنائي', labelEn: 'Mixer Forensics', icon: <GitMerge className="w-4 h-4 text-purple-400" /> },
    { id: 'radar', labelAr: 'الرادار الحي للمخاطر', labelEn: 'Threat Radar', icon: <Radar className="w-4 h-4" />, badge: 'LIVE' },
    { id: 'token_dna', labelAr: 'فحص البصمة (Token DNA)', labelEn: 'Token DNA', icon: <Dna className="w-4 h-4" /> },
    { id: 'bytecode_sandbox', labelAr: 'مفكك البايتكود (AST)', labelEn: 'Bytecode AST', icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'stego_lab', labelAr: 'مختبر التشفير البصري', labelEn: 'Stego Lab', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'agents', labelAr: 'منظومة الوكلاء والتشفير', labelEn: 'Agent Engine', icon: <Bot className="w-4 h-4" />, badge: '4' },
    { id: 'escrow', labelAr: 'مركز الاسترداد والضمان', labelEn: 'Smart Escrow Hub', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'audit_cert', labelAr: 'شهادات التدقيق (ZKP Seal)', labelEn: 'Audit Certs', icon: <Award className="w-4 h-4 text-amber-400" />, badge: 'PDF' },
    { id: 'vault', labelAr: 'أرشيف الأسرار (Intel Vault)', labelEn: 'Intel Vault', icon: <Database className="w-4 h-4" /> },
    { id: 'architecture', labelAr: 'المعمارية التقنية', labelEn: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'roadmap', labelAr: 'خارطة الطريق (90 يوم)', labelEn: '90-Day Roadmap', icon: <CalendarClock className="w-4 h-4" /> },
    { id: 'api_gateway', labelAr: 'بوابة الـ API', labelEn: 'API Gateway', icon: <Terminal className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#04080e]/95 backdrop-blur-md border-b border-emerald-500/20">
      {/* Top Telemetry Strip */}
      <div className="hidden lg:flex items-center justify-between px-4 py-1.5 bg-black/60 border-b border-emerald-950/60 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">BLACK MATRIX CLUSTER:</span>
            <span className="text-slate-300">ONLINE [128 Edge Nodes]</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mempool TPS:</span>
            <span className="text-cyan-300 font-bold">{stats.mempoolTps.toLocaleString()} tx/s</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Indexed DNA:</span>
            <span className="text-purple-300 font-bold">{stats.dnaIndexedCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Stego Entropy:</span>
            <span className="text-emerald-400 font-bold">{(stats.stegoEntropy * 100).toFixed(2)}%</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Flashbots Relay:</span>
            <span className="text-emerald-400">{stats.flashbotsLatencyMs}ms</span>
          </div>
          <div className="text-slate-500">|</div>
          <div className="text-slate-400">
            {new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour12: false })} UTC
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
            <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black tracking-wider text-emerald-400">
                BLACK MATRIX
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-950 border border-emerald-500/30 text-emerald-300 uppercase">
                HUD v2.7
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              {isAr ? 'مركز القيادة والاستخبارات البصرية للبلوكشين' : 'Web3 Visual Threat Command Center'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-950/50 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-slate-500'}>
                  {tab.icon}
                </span>
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      tab.badge === 'LIVE'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onSoundToggle}
            title={isAr ? 'تفعيل / كتم المؤثرات الصوتية' : 'Toggle Audio Feedback'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Lock Screen Button */}
          {onLock && (
            <button
              onClick={onLock}
              title={isAr ? 'قفل لوحة التحكم' : 'Lock Command HUD'}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
