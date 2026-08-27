import React, { useState } from 'react';
import { 
  HeartPulse, 
  BatteryCharging, 
  Brain, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Coffee, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';

interface CognitiveGuardrailProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

export const CognitiveGuardrail: React.FC<CognitiveGuardrailProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [energyLevel, setEnergyLevel] = useState(82); // percentage
  const [autoRescheduleActive, setAutoRescheduleActive] = useState(true);

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-emerald-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-emerald-300">
                {isAr ? 'حارس الطاقة الذهنية وإدارة الإجهاد (Cognitive Guardrail & Energy Shield)' : 'Cognitive Guardrail & Founder Energy Shield'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                BURNOUT PREVENTER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'قياس العبء الذهني وتراكم المهام، وحماية طاقة المؤسس بإعادة جدولة الاجتماعات والمهام غير العاجلة تلقائياً'
                : 'Adaptive workload balancer prioritizing high-leverage strategic decisions while pruning cognitive fatigue'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
            {isAr ? 'مؤشر التركيز: ذروة الأداء (Optimal)' : 'Focus State: Flow-State (Optimal)'}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Energy Score & Biomarker Metrics (5 cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-6 border border-emerald-500/30 bg-black/80 backdrop-blur-xl space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
              {isAr ? 'مستوى البطارية المعرفية للمؤسس' : 'Founder Cognitive Reserves'}
            </span>
            <span className="text-xs font-bold text-emerald-400">{energyLevel}%</span>
          </div>

          {/* Large Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-4 rounded-full bg-slate-900 overflow-hidden border border-slate-800 p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${energyLevel}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{isAr ? 'استنزاف منخفض' : 'Low Fatigue'}</span>
              <span className="text-emerald-400 font-bold">{isAr ? 'منطقة التدفق والإنتاجية' : 'Flow Zone'}</span>
              <span>{isAr ? 'إجهاد حاد' : 'Burnout Risk'}</span>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400">{isAr ? 'ساعات التركيز العميق:' : 'Deep Focus Blocks:'}</span>
              <div className="text-sm font-bold text-cyan-300">4.5 Hours Today</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400">{isAr ? 'المهام المؤجلة تلقائياً:' : 'Tasks Pruned by Black:'}</span>
              <div className="text-sm font-bold text-emerald-300">6 Non-Urgent Items</div>
            </div>
          </div>
        </div>

        {/* Right: Pruned & Rescheduled Workflow (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-slate-800 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              {isAr ? 'إجراءات حارس الطاقة التلقائية لهذا اليوم' : 'Automated Energy Optimization Schedule'}
            </span>
            <span className="text-[10px] text-cyan-400 font-bold">SMART RE-ROUTING</span>
          </div>

          <div className="space-y-3 text-xs">
            
            {/* Action 1 */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-white">
                  {isAr ? 'تأجيل اجتماع المتابعة الروتيني مع الموردين إلى الغد' : 'Deferred non-critical vendor sync to tomorrow morning'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isAr ? 'تم توفير 45 دقيقة طاقة لإنهاء جولة التمويل وعقد الـ SAFE' : 'Saved 45 min cognitive bandwidth for high-leverage VC term-sheet review.'}
                </div>
              </div>
            </div>

            {/* Action 2 */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-white">
                  {isAr ? 'حظر الإشعارات غير العاجلة أثناء جلسة البرمجة والتطوير' : 'Silenced non-urgent Telegram alerts during Deep Work mode'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isAr ? 'حماية التركيز من التشتت (Context Switching Protection)' : 'Eliminated context switching overhead for 2 solid hours.'}
                </div>
              </div>
            </div>

            {/* Action 3 */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <Coffee className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-white">
                  {isAr ? 'اقتراح فاصل راحة قصير (Micro-Break) بعد 20 دقيقة' : 'Recommended 10-minute restorative walk in 20 minutes'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isAr ? 'لتجديد سرعة المعالجة الذهنية قبل اجتماع الشركاء' : 'Ensures cognitive peak readiness prior to investor live call.'}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
