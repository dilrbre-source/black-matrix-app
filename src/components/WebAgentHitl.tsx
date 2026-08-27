import React, { useState } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Key, 
  Terminal, 
  ExternalLink, 
  Send, 
  Play, 
  Sparkles, 
  Lock, 
  AlertTriangle,
  RotateCcw,
  Smartphone,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WebAgentHitlProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface AutomationStep {
  id: number;
  labelAr: string;
  labelEn: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'WAITING_HITL_APPROVAL' | 'PENDING';
  url: string;
  actionDetail: string;
}

export const WebAgentHitl: React.FC<WebAgentHitlProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [steps, setSteps] = useState<AutomationStep[]>([
    {
      id: 1,
      labelAr: 'فتح متصفح Headless والتنقل إلى البوابة',
      labelEn: 'Launch Headless Browser via Playwright & Stealth Plugin',
      status: 'COMPLETED',
      url: 'https://cloud.digitalocean.com/registrations/new',
      actionDetail: 'Bypassed Cloudflare turnstile with browser biometric fingerprint synthesis.'
    },
    {
      id: 2,
      labelAr: 'تعبئة بيانات الحساب والبريد الإلكتروني السحابي',
      labelEn: 'Autofill Encrypted Identity & Ephemeral Mail Routing',
      status: 'COMPLETED',
      url: 'https://cloud.digitalocean.com/registrations/new',
      actionDetail: 'Generated sovereign email alias: founder.ops@blackmatrix.network'
    },
    {
      id: 3,
      labelAr: 'انتظار موافقة المؤسس (Human-in-the-Loop - OTP / 2FA)',
      labelEn: 'HITL Intervention Gate: 2FA Verification & SMS OTP Approval',
      status: 'WAITING_HITL_APPROVAL',
      url: 'https://cloud.digitalocean.com/auth/challenge',
      actionDetail: 'SMS code 942-810 received via Twilio Sovereign Phone Hub. Awaiting approval.'
    },
    {
      id: 4,
      labelAr: 'استخراج مفاتيح الـ API وتخزينها بالخزنة السيادية',
      labelEn: 'API Token Extraction & Sovereign Vault AES-256 Storage',
      status: 'PENDING',
      url: 'https://cloud.digitalocean.com/account/api/tokens',
      actionDetail: 'Store DO_PAT token into Sovereign Vault with zero public memory trace.'
    }
  ]);

  const [hitlApproved, setHitlApproved] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleApproveHitl = () => {
    if (onPlaySound) onPlaySound('beep');
    setHitlApproved(true);
    setIsExecuting(true);

    setTimeout(() => {
      setSteps(prev => prev.map(step => {
        if (step.id === 3) return { ...step, status: 'COMPLETED' };
        if (step.id === 4) return { ...step, status: 'COMPLETED' };
        return step;
      }));
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-amber-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 cyber-glow-amber">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-amber-300">
                {isAr ? 'وكيل المتصفح وبوابة التدخل البشري (Playwright Web Agent & HITL)' : 'Autonomous Web Agent & HITL Gateway'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                STAGEHAND + WEBSOCKETS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'أتمتة فتح الحسابات والتعامل مع المواقع المعقدة، مع إيقاف التشغيل التلقائي وطلب موافقة المؤسس عند العمليات الحساسة'
                : 'Stealth headless browser automating web tasks, pausing strictly for Human-in-the-loop 2FA/OTP or financial confirmation'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {isAr ? 'حالة المتصفح: متخفي وغير قابل للرصد' : 'Fingerprint: Stealth Chromium'}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Execution Steps & Live Automation (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-slate-800 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              {isAr ? 'سلسلة خطوات الأتمتة الجارية' : 'Live Browser Action Pipeline'}
            </span>
            <span className="text-[10px] text-amber-400 font-bold">TASK_ID: #AUT-9921</span>
          </div>

          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  step.status === 'COMPLETED'
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                    : step.status === 'WAITING_HITL_APPROVAL'
                    ? 'bg-amber-950/30 border-amber-500/50 text-amber-200 shadow-lg shadow-amber-950/50'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${
                      step.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                      step.status === 'WAITING_HITL_APPROVAL' ? 'bg-amber-500 text-black animate-pulse' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {step.id}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">
                        {isAr ? step.labelAr : step.labelEn}
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                        {step.url}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-sans">
                        {step.actionDetail}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                    step.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300' :
                    step.status === 'WAITING_HITL_APPROVAL' ? 'bg-amber-500/30 text-amber-300 border border-amber-400/50' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {step.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Human-In-The-Loop Live Mobile Authorization Modal (5 cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-6 border border-amber-500/40 bg-black/85 backdrop-blur-xl space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                {isAr ? 'شاشة الموافقة اللحظية (HITL Device)' : 'Instant HITL Biometric Gate'}
              </span>
              <span className="text-[9px] text-emerald-400 font-bold">WEBSOCKET REALTIME</span>
            </div>

            <div className="my-4 p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{isAr ? 'تنبيه أمان: مطلوب موافقة المؤسس' : 'Intervention Trigger: 2FA Challenge'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                {isAr 
                  ? 'طلب الوكيل استكمال التحقق برمز الـ SMS المرسل إلى خط Twilio السحابي المشفر: (942-810).'
                  : 'Playwright agent paused execution before OTP submit. Review payload details and grant single-use approval.'}
              </p>

              <div className="p-2.5 rounded-lg bg-black/80 border border-slate-800 text-[11px] space-y-1">
                <div>Action: <span className="text-cyan-300">Submit Verification OTP</span></div>
                <div>Risk Tier: <span className="text-amber-400">Tier-2 Account Creation</span></div>
                <div>Origin: <span className="text-slate-400">DigitalOcean Sovereign Node</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {!hitlApproved ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleApproveHitl}
                  disabled={isExecuting}
                  className="py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-emerald-950/50 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? 'موافقة وتمرير' : 'Authorize & Pass'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onPlaySound) onPlaySound('alarm');
                  }}
                  className="py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-red-950/50 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{isAr ? 'رفض وإلغاء' : 'Reject Action'}</span>
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تمت الموافقة بنجاح واستكمال العملية' : 'HITL Authorized & Resumed Pipeline'}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
