import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Search, 
  Download, 
  FileText, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Filter, 
  AlertTriangle,
  Code,
  Sparkles
} from 'lucide-react';
import { IntelBrief } from '../types';
import { INTEL_BRIEFS } from '../data';

interface IntelVaultProps {
  lang: 'ar' | 'en';
}

export const IntelVault: React.FC<IntelVaultProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [briefs, setBriefs] = useState<IntelBrief[]>(INTEL_BRIEFS);
  const [selectedBrief, setSelectedBrief] = useState<IntelBrief>(INTEL_BRIEFS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredBriefs = briefs.filter((b) => {
    const matchesCat = selectedCategory === 'ALL' || b.category === selectedCategory;
    const matchesSearch = 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopySignature = (sig: string) => {
    navigator.clipboard.writeText(sig);
    setCopiedId(sig);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportReport = () => {
    const reportData = {
      vault: 'BLACK_MATRIX_INTEL_VAULT_v2.7',
      exportedAt: new Date().toISOString(),
      classification: selectedBrief.classification,
      brief: selectedBrief
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BlackMatrix_${selectedBrief.id}_Report.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="cyber-panel p-5 rounded-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
              <Database className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>{isAr ? 'أرشيف الأسرار والأبحاث الاستخباراتية (Intel Vault)' : 'Classified Threat Intelligence Vault'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  ENCRYPTED REPOSITORY
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'بنك معلومات مغلق ومحمي يُغذي المنصات والشركاء بتحليلات الثغرات ونماذج الاستغلال المالي'
                  : 'Encrypted intelligence briefings, exploit post-mortems & high-priority IOC signature feeds'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-950"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? (isAr ? 'تم التصدير بنجاح!' : 'Exported!') : (isAr ? 'تصدير التقرير المشفر' : 'Export Intel JSON')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="cyber-panel p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute inset-y-0 right-3 my-auto w-4 h-4 text-emerald-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث في الأرشيف والتوقيعات...' : 'Search briefs, IOC signatures, protocols...'}
            className="w-full pl-3 pr-9 py-2 rounded-lg bg-black/60 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-slate-500 font-semibold px-1">{isAr ? 'التصنيف:' : 'Category:'}</span>
          {['ALL', 'VULNERABILITY', 'EXPLOIT_POSTMORTEM', 'FORENSICS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'VULNERABILITY' ? (isAr ? 'ثغرات' : 'Vulnerabilities') :
               cat === 'EXPLOIT_POSTMORTEM' ? (isAr ? 'تحليلات استغلال' : 'Post-Mortems') :
               cat === 'FORENSICS' ? (isAr ? 'تحريات جنائية' : 'Forensics') : (isAr ? 'الكل' : 'All')}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Intel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Briefs List (5 Columns) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredBriefs.map((brief) => {
            const isSelected = selectedBrief.id === brief.id;
            return (
              <div
                key={brief.id}
                onClick={() => setSelectedBrief(brief)}
                className={`cyber-panel p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-400 cyber-glow-emerald bg-emerald-950/20'
                    : 'border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-500">{brief.id}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      brief.classification === 'TOP_SECRET'
                        ? 'bg-red-950 text-red-300 border border-red-500/30'
                        : brief.classification === 'CONFIDENTIAL'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {brief.classification}
                  </span>
                </div>

                <h3 className="font-bold text-xs text-slate-100 mb-1.5">
                  {isAr ? brief.titleAr : brief.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {isAr ? brief.summaryAr : brief.summary}
                </p>

                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <span>{brief.category}</span>
                  <span>{brief.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Brief Full Dossier (7 Columns) */}
        <div className="lg:col-span-7 cyber-panel p-6 rounded-xl border border-emerald-500/30 space-y-5">
          {/* Dossier Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>{selectedBrief.id}</span>
                <span>•</span>
                <span>{selectedBrief.date}</span>
              </div>
              <h2 className="text-base font-bold text-emerald-400 leading-snug">
                {isAr ? selectedBrief.titleAr : selectedBrief.title}
              </h2>
            </div>
            <div className="px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-500/40 text-xs font-bold shrink-0">
              {selectedBrief.classification}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              {isAr ? 'الملخص التنفيذي للتحري:' : 'Executive Forensic Summary:'}
            </span>
            <div className="p-3.5 rounded-lg bg-black/50 border border-slate-800 text-xs text-slate-200 leading-relaxed">
              {isAr ? selectedBrief.summaryAr : selectedBrief.summary}
            </div>
          </div>

          {/* Affected Protocols */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              {isAr ? 'البروتوكولات المعرضة للمخاطر:' : 'Affected Ecosystem Targets:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedBrief.affectedProtocols.map((proto, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-black/60 border border-slate-800 text-xs text-slate-300"
                >
                  {proto}
                </span>
              ))}
            </div>
          </div>

          {/* Mitigation Rule */}
          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              {isAr ? 'قاعدة الحماية والاعتراض (Token_DNA Mitigation Rule):' : 'Token_DNA Rule:'}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr ? selectedBrief.mitigationRuleAr : selectedBrief.mitigationRule}
            </p>
          </div>

          {/* IOC Signatures */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              {isAr ? 'توقيعات الاختراق (IOC Signatures & Selectors):' : 'IOC Signatures:'}
            </span>
            <div className="space-y-1.5">
              {selectedBrief.iocSignatures.map((sig, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-black/80 border border-slate-800 text-xs text-emerald-300 flex items-center justify-between"
                >
                  <span className="font-mono text-[11px] truncate">{sig}</span>
                  <button
                    onClick={() => handleCopySignature(sig)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors ml-2 cursor-pointer"
                    title={isAr ? 'نسخ التوقيع' : 'Copy signature'}
                  >
                    {copiedId === sig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
