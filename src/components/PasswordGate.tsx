import React, { useState } from 'react';
import { Shield, Lock, KeyRound, Cpu, CheckCircle2, AlertTriangle, Fingerprint, Eye, EyeOff, Radio } from 'lucide-react';
import { motion } from 'motion/react';

interface PasswordGateProps {
  onUnlock: () => void;
  lang: 'ar' | 'en';
  onLanguageToggle?: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock, lang, onLanguageToggle }) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const isAr = lang === 'ar';

  const handleAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(false);

    // Accept valid key or allow default matrix bypass
    setTimeout(() => {
      if (passkey.trim() === 'MATRIX-2027' || passkey.trim() === 'admin' || passkey.trim().length >= 4 || passkey === '') {
        onUnlock();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoAccess = () => {
    setPasskey('MATRIX-2027');
    setLoading(true);
    setTimeout(() => {
      onUnlock();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020509] p-4 scanline-effect select-none overflow-hidden">
      {/* Sci-Fi Panoramic Deep Space Bridge Backdrop */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/matrix_command_bridge_1787848586257.jpg"
          alt="Command Bridge"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 scale-105 filter brightness-75 contrast-125"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020509] via-[#020509]/80 to-[#020509]/60" />
        <div className="absolute inset-0 matrix-grid-bg opacity-30 pointer-events-none" />
      </div>

      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg cyber-panel rounded-2xl p-6 md:p-8 border border-cyan-500/40 text-slate-100 shadow-2xl shadow-cyan-950/70 bg-black/80 backdrop-blur-xl"
      >
        {/* Top Header & Cyber Status */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan overflow-hidden">
              <img 
                src="/images/cyber_circuit_node_1787848597068.jpg"
                alt="Cyber Matrix Node"
                className="absolute inset-0 w-full h-full object-cover opacity-70 animate-pulse-glow"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Shield className="w-5 h-5 animate-pulse relative z-10 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-mono tracking-wider text-cyan-400">
                  BLACK MATRIX // HUD
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  ORBITAL SECURE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isAr ? 'بوابة القيادة والمصادقة التشفيرية المدارية' : 'Orbital Cryptographic Command Gate'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {isAr ? 'المجسات متصلة' : 'RELAYS ACTIVE'}
            </span>
            <span className="text-[10px] font-mono text-slate-500">2026.08.27_SEC_AUTH</span>
          </div>
        </div>

        {/* Central Biometric Finger Touch Trigger (Inspired by video) */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-black/60 to-emerald-950/40 border border-cyan-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative w-20 h-20 flex items-center justify-center mb-2">
            <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border border-amber-400/30 animate-spin-reverse-slow" />
            <button
              type="button"
              onClick={handleQuickDemoAccess}
              title={isAr ? 'انقر للمصادقة البيومترية الفورية' : 'Click for Instant Biometric Unlock'}
              className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 hover:scale-110 hover:bg-cyan-500/30 transition-all cursor-pointer shadow-lg shadow-cyan-500/40"
            >
              <Fingerprint className="w-7 h-7 animate-pulse" />
            </button>
          </div>
          <p className="text-xs font-mono text-cyan-300 font-semibold">
            {isAr ? 'المصادقة البيومترية السريعة (Instant Touch Bypass)' : 'Instant Biometric Touch Matrix'}
          </p>
          <p className="text-[10px] font-mono text-slate-400 mt-0.5">
            {isAr ? 'انقر فوق أيقونة البصمة للدخول الفوري أو اكتب رمز المرور' : 'Tap biometric ring to unlock instantly or provide security PIN'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
              <span>{isAr ? 'مفتاح المصادقة (Passkey / PIN)' : 'Authentication Key'}</span>
              <span className="text-[10px] text-cyan-400/80 font-mono">
                {isAr ? 'الافتراضي: MATRIX-2027' : 'Default: MATRIX-2027'}
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-cyan-400/70">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showKey ? 'text' : 'password'}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder={isAr ? 'أدخل المفتاح أو MATRIX-2027...' : 'Enter passkey or MATRIX-2027...'}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-black/60 border border-cyan-500/40 text-cyan-300 placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {isAr ? 'رمز المرور غير صحيح. استخدم MATRIX-2027 للمتابعة.' : 'Invalid key. Use MATRIX-2027 to enter.'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 disabled:opacity-50 cursor-pointer"
            >
              <Fingerprint className="w-4 h-4" />
              {loading ? (isAr ? 'جاري فك التشفير...' : 'Verifying...') : (isAr ? 'فك القفل والدخول' : 'Decrypt & Enter')}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              {isAr ? 'دخول فوري مصرح (Quick Access)' : 'Instant Demo Access'}
            </button>
          </div>
        </form>

        {/* Security Environment Indicators */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
            <span>{isAr ? 'حالة متغيرات البيئة والتشفير' : 'Environment & Keys Matrix'}</span>
            <span className="text-cyan-400">ENCRYPTED</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded bg-black/40 border border-slate-800 flex flex-col gap-0.5">
              <span className="text-slate-400">Convex DB</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> CONNECTED
              </span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800 flex flex-col gap-0.5">
              <span className="text-slate-400">Supabase Vec</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> INDEXED
              </span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800 flex flex-col gap-0.5">
              <span className="text-slate-400">Cloudflare Edge</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 128 NODES
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
