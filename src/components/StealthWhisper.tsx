import React, { useState } from 'react';
import { 
  Ear, 
  Mic, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Volume2, 
  Radio, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface StealthWhisperProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface WhisperCue {
  id: string;
  speaker: string;
  transcriptionAr: string;
  transcriptionEn: string;
  stealthAdviceAr: string;
  stealthAdviceEn: string;
  urgency: 'HIGH_OPPORTUNITY' | 'TACTICAL_DEFENSE' | 'STRATEGIC_PIVOT';
}

export const StealthWhisper: React.FC<StealthWhisperProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [isListening, setIsListening] = useState(true);

  const cues: WhisperCue[] = [
    {
      id: 'cue_1',
      speaker: 'Lead Investor (VC Partner)',
      transcriptionAr: '"نحن معجبون بالنمو، لكننا نفضل تقييم 15 مليون دولار بدلاً من 20 مليون مع خيار مقعدين بمجلس الإدارة."',
      transcriptionEn: '"We love the traction, but we prefer a $15M pre-money cap instead of $20M with 2 board seats."',
      stealthAdviceAr: '💡 نصيحة بلاك الفورية: لا تتنازل عن مقعدي المجلس. اذكر أن معدل الاحتفاظ بالعملاء 98% واقترح تسوية التقييم عند 18.5M مع مقعد استشاري واحد بدون تصويت.',
      stealthAdviceEn: '💡 Live Stealth Cue: Reject the 2nd board seat. Highlight your 98% NRR retention and counter with $18.5M cap + 1 non-voting observer seat.',
      urgency: 'HIGH_OPPORTUNITY'
    },
    {
      id: 'cue_2',
      speaker: 'Enterprise Client CTO',
      transcriptionAr: '"هل يدعم درعكم التحقق اللامركزي للـ ZKP على شبكة الاختبار؟ نحن بحاجة لإثبات رسمي قبل توقيع العقد السنوي."',
      transcriptionEn: '"Does your system support decentralized ZKP verification on testnet? We need formal proof before signing the annual SLA."',
      stealthAdviceAr: '💡 نصيحة بلاك الفورية: افتح تبويب Audit Certificates مباشرة وأظهر لهم شهادة الـ Groth16 zk-SNARK المعتمدة والموقعة على البلوكشين.',
      stealthAdviceEn: '💡 Live Stealth Cue: Direct them immediately to the ZKP Audit Certificate studio on Black Matrix; cite our 100% formal verification pass rate.',
      urgency: 'STRATEGIC_PIVOT'
    }
  ];

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Ear className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'الموجه السري والاستماع الحي (Live Stealth Whisper & Negotiation HUD)' : 'Live Stealth Whisper & Negotiation HUD'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                LOW-LATENCY WEBRTC
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'استماع لحظي للمفاوضات والاجتماعات وتوليد توجيهات تكتيكية واستراتيجية سرية تظهر للمؤسس في أجزاء من الثانية'
                : 'Real-time speech transcription & low-latency stealth strategic coaching during high-stakes founder negotiations'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsListening(!isListening);
              if (onPlaySound) onPlaySound('click');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isListening ? 'bg-emerald-500 text-black shadow-md' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isListening ? (isAr ? 'الاستماع السري نشط' : 'Stealth Ear Active') : (isAr ? 'متوقف' : 'Muted')}</span>
          </button>
        </div>
      </div>

      {/* Main Cues Stream */}
      <div className="cyber-panel rounded-2xl p-6 border border-slate-800 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-cyan-400" />
            {isAr ? 'تدفق التوجيهات اللحظية أثناء الاجتماع' : 'Real-Time Negotiation Tactical Feed'}
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">LATENCY: 42ms</span>
        </div>

        <div className="space-y-4">
          {cues.map((cue) => (
            <div
              key={cue.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="font-bold text-slate-300">
                  {cue.speaker}
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                  {cue.urgency}
                </span>
              </div>

              {/* Transcription */}
              <div className="text-xs text-slate-400 italic font-sans">
                {isAr ? cue.transcriptionAr : cue.transcriptionEn}
              </div>

              {/* Black's Secret Advice */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 font-sans leading-relaxed">
                {isAr ? cue.stealthAdviceAr : cue.stealthAdviceEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
