import React, { useState } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  Key, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Eye, 
  EyeOff, 
  Flame, 
  RotateCcw, 
  Sparkles,
  Smartphone,
  Mail,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SovereignVaultAdvancedProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface SecretItem {
  id: string;
  category: 'API_KEYS' | 'CRYPTO_KEYS' | 'TELEPHONY_SMS' | 'CLOUD_IDENTITY';
  labelAr: string;
  labelEn: string;
  maskedValue: string;
  realValue: string;
  lastRotated: string;
  securityTier: 'TIER_1_CRITICAL' | 'TIER_2_RESTRICTED';
}

export const SovereignVaultAdvanced: React.FC<SovereignVaultAdvancedProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [secrets, setSecrets] = useState<SecretItem[]>([
    {
      id: 'sec_1',
      category: 'API_KEYS',
      labelAr: 'مفتاح OpenAI Enterprise API Key',
      labelEn: 'OpenAI Enterprise Master Secret',
      maskedValue: 'sk-proj-••••••••••••••••••••••••••••••••9941',
      realValue: 'sk-proj-7a8f90214ebc441299908af12e3456889941',
      lastRotated: '2 days ago',
      securityTier: 'TIER_1_CRITICAL'
    },
    {
      id: 'sec_2',
      category: 'TELEPHONY_SMS',
      labelAr: 'رقم Twilio السحابي ومفتاح المصادقة (Sovereign SMS)',
      labelEn: 'Twilio Sovereign Telephony SID & Token',
      maskedValue: 'AC••••••••••••••••••••••••••••••••5812',
      realValue: 'AC982180479102847190382710385812',
      lastRotated: '10 days ago',
      securityTier: 'TIER_2_RESTRICTED'
    },
    {
      id: 'sec_3',
      category: 'CRYPTO_KEYS',
      labelAr: 'محفظة الخزينة السيادية (EVM Safe Multi-Sig)',
      labelEn: 'Cold Storage Multi-Sig Private Secret',
      maskedValue: '0x••••••••••••••••••••••••••••••••881b',
      realValue: '0x4488A92cE97B6a2D9f20109Ec72b01264c18881b',
      lastRotated: '30 days ago',
      securityTier: 'TIER_1_CRITICAL'
    },
    {
      id: 'sec_4',
      category: 'CLOUD_IDENTITY',
      labelAr: 'بريد Cloudflare السحابي والتوجيه الآمن',
      labelEn: 'Cloudflare Zero-Trust Email Router Secret',
      maskedValue: 'CF-SEC-••••••••••••••••••••••••0192',
      realValue: 'CF-SEC-4910284091823091820391820192',
      lastRotated: '5 days ago',
      securityTier: 'TIER_2_RESTRICTED'
    }
  ]);

  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [decoyModeActive, setDecoyModeActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    if (onPlaySound) onPlaySound('click');
    setRevealedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopy = (id: string, val: string) => {
    if (onPlaySound) onPlaySound('click');
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const triggerDecoyEmergency = () => {
    if (onPlaySound) onPlaySound('alarm');
    setDecoyModeActive(true);
    setRevealedIds([]);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className={`p-4 rounded-xl cyber-panel border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
        decoyModeActive ? 'border-amber-500/50 bg-amber-950/30' : 'border-cyan-500/30 bg-black/60'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
            decoyModeActive ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 cyber-glow-cyan'
          }`}>
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-lg font-bold ${decoyModeActive ? 'text-amber-300' : 'text-cyan-300'}`}>
                {decoyModeActive
                  ? (isAr ? 'وضع التمويه النشط (Decoy Honeypot Active)' : 'Decoy Honeypot Mode Engaged')
                  : (isAr ? 'الخزنة السيادية ونظام التمويه (Sovereign Vault & Anti-Tamper Decoy)' : 'Sovereign Vault & Anti-Tamper Decoy')}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AES-256 ZERO-KNOWLEDGE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تخزين مشفر وفصل كامل لمفاتيح الـ API، أرقام Twilio، والمحافظ مع زر الإخلاء والتمويه الفوري (Honeypot)'
                : 'Isolated zero-trace vault storing API credentials, Twilio SMS tokens & private keys with instant panic decoy switch'}
            </p>
          </div>
        </div>

        {/* Emergency Decoy Switch */}
        <button
          onClick={decoyModeActive ? () => setDecoyModeActive(false) : triggerDecoyEmergency}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
            decoyModeActive 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/60'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>{decoyModeActive ? (isAr ? 'إعادة ضبط واستعادة الخزنة الحقيقية' : 'Restore Real Vault') : (isAr ? 'تفعيل وضع التمويه والإخلاء الطارئ' : 'Emergency Decoy / Panic')}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="cyber-panel rounded-2xl p-6 border border-slate-800 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            {isAr ? 'سجلات الخزنة المشفرة' : 'Encrypted Sovereign Credentials'}
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">CLIENT-SIDE ENCRYPTION</span>
        </div>

        <div className="space-y-3">
          {secrets.map((item) => {
            const isRevealed = revealedIds.includes(item.id);
            const displayValue = decoyModeActive 
              ? 'DECOY_HONEYPOT_STRING_99948210348' 
              : isRevealed 
              ? item.realValue 
              : item.maskedValue;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    {item.category === 'API_KEYS' && <Key className="w-5 h-5" />}
                    {item.category === 'TELEPHONY_SMS' && <Smartphone className="w-5 h-5" />}
                    {item.category === 'CRYPTO_KEYS' && <Coins className="w-5 h-5" />}
                    {item.category === 'CLOUD_IDENTITY' && <Mail className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{isAr ? item.labelAr : item.labelEn}</span>
                      <span className="px-2 py-0.2 rounded text-[9px] bg-slate-800 text-cyan-300">
                        {item.category}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-cyan-300 mt-1 bg-black/60 px-2.5 py-1 rounded border border-slate-800 inline-block">
                      {displayValue}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => toggleReveal(item.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title={isRevealed ? 'Mask' : 'Reveal'}
                  >
                    {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleCopy(item.id, displayValue)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Copy"
                  >
                    {copiedId === item.id ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
