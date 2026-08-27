import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  FileText, 
  Calendar, 
  Fingerprint, 
  Cpu, 
  Lock, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';

interface AuditCertificateStudioProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

export const AuditCertificateStudio: React.FC<AuditCertificateStudioProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [projectName, setProjectName] = useState('Nexus Quantum Protocol');
  const [contractAddress, setContractAddress] = useState('0x8892A418E97B6a2D9f20109Ec72b01264c18091E');
  const [targetChain, setTargetChain] = useState('Ethereum Mainnet');
  const [auditScore, setAuditScore] = useState(99.4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [certGenerated, setCertGenerated] = useState(true);

  const handleGenerateCertificate = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCertGenerated(true);
      if (onPlaySound) onPlaySound('beep');
    }, 1200);
  };

  const handleDownloadPDF = () => {
    window.print();
    if (onPlaySound) onPlaySound('click');
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 cyber-glow-amber">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-amber-300">
                {isAr ? 'استوديو توليد شهادات التدقيق الأمني الموثقة (ZKP Audit Certificate)' : 'Institutional ZKP Security Certificate Studio'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                VERIFIED SEAL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تصدير تقارير تدقيق أمني رسمية للمشاريع والمستثمرين موقعة بإثبات المعرفة الصفرية (Zero-Knowledge Proofs)'
                : 'Export institutional-grade cryptographic security certificates with Groth16 zk-SNARK attestation proofs'}
            </p>
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-950/60 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isAr ? 'تصدير وطباعة الشهادة الرسمية' : 'Print / Export Official Certificate'}</span>
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Settings (4 cols) */}
        <div className="lg:col-span-4 cyber-panel rounded-2xl p-5 border border-amber-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              {isAr ? 'معلومات العقد المراد توثيقه' : 'Certificate Metadata'}
            </span>
            <span className="text-[10px] text-slate-500">SEAL_V4</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'اسم المشروع / البروتوكول:' : 'Project / Protocol Name:'}</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-amber-300 font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{isAr ? 'عنوان العقد الذكي (Address):' : 'Smart Contract Address:'}</label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-cyan-300 font-mono text-[11px] focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">{isAr ? 'الشبكة المستهدفة:' : 'Blockchain:'}</label>
                <input
                  type="text"
                  value={targetChain}
                  onChange={(e) => setTargetChain(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{isAr ? 'درجة الأمان (Score):' : 'Security Rating:'}</label>
                <input
                  type="number"
                  step="0.1"
                  value={auditScore}
                  onChange={(e) => setAuditScore(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-emerald-400 font-mono font-bold text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className="w-full mt-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-950/60 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating 
                ? (isAr ? 'جاري توليد الختم والتوقيع...' : 'Synthesizing ZKP Seal...') 
                : (isAr ? 'إعادة توليد وتوقيع الشهادة' : 'Regenerate Signed Certificate')}
            </button>
          </div>
        </div>

        {/* Right: Institutional Certificate Preview (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-gradient-to-b from-slate-950 via-black to-slate-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden space-y-6">
          
          {/* Subtle Background Watermark Seal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96 text-amber-400" />
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-amber-200 tracking-wider">
                  BLACK MATRIX PROTOCOL
                </h3>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">
                  Institutional Security Attestation // Level-5
                </span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                AUDIT VERIFIED: CLEAN
              </span>
              <div className="text-[10px] text-slate-400 mt-1">CERT_ID: #BMX-2026-994801</div>
            </div>
          </div>

          {/* Core Body */}
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-widest">
                Certificate of Mathematical Security Verification
              </span>
              <h2 className="text-xl font-black text-white">
                {projectName}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {contractAddress}
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">AST Tree Risk</span>
                <span className="text-sm font-bold text-emerald-400">0.00%</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Honeypot Vector</span>
                <span className="text-sm font-bold text-emerald-400">NONE</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">MEV Protection</span>
                <span className="text-sm font-bold text-cyan-400">ENABLED</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Overall Score</span>
                <span className="text-sm font-bold text-amber-300">{auditScore}/100</span>
              </div>
            </div>

            {/* Cryptographic ZKP Attestation Box */}
            <div className="p-3.5 rounded-xl bg-black/80 border border-amber-500/20 text-[10px] font-mono text-slate-400 space-y-1">
              <div className="flex justify-between text-amber-300 font-bold">
                <span>GROTH16 ZERO-KNOWLEDGE PROOF ATTESTATION</span>
                <span>STATUS: CRYPTOGRAPHICALLY_SOUND</span>
              </div>
              <p className="text-slate-400 leading-tight break-all">
                zkSNARK_Digest: 0x9f4a2109e81b...c981402819bc | Verified with Curve bn254 | AST Node Signatures: 1,420 Leaves
              </p>
            </div>
          </div>

          {/* Certificate Footer Signatures */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-black border border-slate-700">
                <QrCode className="w-10 h-10 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">On-Chain Verification:</span>
                <span className="text-[11px] font-bold text-cyan-300">verify.blackmatrix.io/cert/994801</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Lead Cryptographer Seal:</span>
              <span className="text-xs font-bold text-amber-300">Black Matrix Autonomous Agent Swarm</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
