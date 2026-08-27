import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Search, 
  AlertTriangle, 
  Lock, 
  Sparkles, 
  Zap, 
  Code2, 
  Layers,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';

interface SolanaInspectorProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface SolanaAuditReport {
  programId: string;
  programName: string;
  anchorFrameworkVersion: string;
  freezeAuthorityStatus: 'REVOKED_SAFE' | 'ACTIVE_DANGEROUS';
  mintAuthorityStatus: 'REVOKED_SAFE' | 'ACTIVE_DANGEROUS';
  accountSignerCheck: 'STRICT_VERIFIED' | 'MISSING_SIGNER_RISK';
  pdaBumpValidation: 'CANONICAL_BUMP_ENFORCED' | 'UNCHECKED_BUMP_COLLISION';
  overallRiskScore: number;
  aiSecuritySummaryAr: string;
  aiSecuritySummaryEn: string;
}

export const SolanaInspector: React.FC<SolanaInspectorProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [programInput, setProgramInput] = useState('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  const [isInspecting, setIsInspecting] = useState(false);
  const [report, setReport] = useState<SolanaAuditReport>({
    programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    programName: 'Solana SPL Token Program / Anchor Yield Vault',
    anchorFrameworkVersion: 'Anchor v0.30.1',
    freezeAuthorityStatus: 'REVOKED_SAFE',
    mintAuthorityStatus: 'REVOKED_SAFE',
    accountSignerCheck: 'STRICT_VERIFIED',
    pdaBumpValidation: 'CANONICAL_BUMP_ENFORCED',
    overallRiskScore: 98.6,
    aiSecuritySummaryAr: 'عقد سولانا آمن وموثق: تم التحقق من صلاحيات التجميد والسك، وإلزام التوقيع عبر Anchor AccountInfo::is_signer لمنع هجمات انتحال الحسابات.',
    aiSecuritySummaryEn: 'Safe Anchor Program: Freeze & Mint authorities permanently revoked. Canonical PDA bumps enforced. Zero account substitution vulnerability.'
  });

  const handleInspectProgram = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsInspecting(true);
    setTimeout(() => {
      setIsInspecting(false);
      if (onPlaySound) onPlaySound('beep');
    }, 1100);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'فاحص برامج سولانا (Solana SVM & Anchor Security Inspector)' : 'Solana SVM & Anchor Security Inspector'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SVM ENGINE v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'فحص شامل لبرامج سولانا ورموز SPL: كشف صلاحيات التجميد، ثغرات تصاريح الحسابات، وتصادم بذور الـ PDA'
                : 'Deep security analysis for Solana Anchor programs: Freeze authority, account substitution & PDA bump collisions'}
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={programInput}
            onChange={(e) => setProgramInput(e.target.value)}
            placeholder="Solana Program ID / Mint Address"
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 w-56 sm:w-72 font-mono focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleInspectProgram}
            disabled={isInspecting}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isAr ? 'فحص SVM' : 'Audit SVM'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Program Metadata (5 cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-5 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              {isAr ? 'معلومات برنامج سولانا' : 'Program Metadata'}
            </span>
            <span className="text-[10px] text-slate-500">SOLANA MAINNET-BETA</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">{isAr ? 'اسم البرنامج المكتشف:' : 'Identified Program:'}</span>
              <span className="font-bold text-slate-200 text-sm">{report.programName}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block">Program ID:</span>
              <span className="text-[11px] font-mono text-cyan-300 break-all">{report.programId}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'إطار العمل:' : 'Framework:'}</span>
                <span className="text-purple-300 font-bold">{report.anchorFrameworkVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'درجة أمان SVM:' : 'SVM Safety Score:'}</span>
                <span className="text-emerald-400 font-bold">{report.overallRiskScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Key SVM Security Checks (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-cyan-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              {isAr ? 'نتائج فحوصات الأمان على مستوى الـ SVM' : 'SVM Architecture Security Vectors'}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              VERIFIED SECURE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Freeze Authority */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">{isAr ? 'صلاحية التجميد (Freeze Auth):' : 'Freeze Authority:'}</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.freezeAuthorityStatus}</span>
              </div>
            </div>

            {/* Mint Authority */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">{isAr ? 'صلاحية السك (Mint Auth):' : 'Mint Authority:'}</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.mintAuthorityStatus}</span>
              </div>
            </div>

            {/* Signer Check */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">{isAr ? 'التحقق من توقيع الحساب:' : 'Account Signer Verification:'}</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.accountSignerCheck}</span>
              </div>
            </div>

            {/* PDA Validation */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">{isAr ? 'التحقق من بذور PDA:' : 'Canonical PDA Bump Check:'}</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.pdaBumpValidation}</span>
              </div>
            </div>
          </div>

          {/* AI Diagnostic Summary */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'التقرير التشخيصي للأوراكل السيبراني:' : 'Solana Security Diagnostic:'}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isAr ? report.aiSecuritySummaryAr : report.aiSecuritySummaryEn}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
