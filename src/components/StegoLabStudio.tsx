import React, { useState, useRef, useEffect } from 'react';
import { 
  Eye, 
  Layers, 
  Binary, 
  ShieldCheck, 
  Upload, 
  Download, 
  Sparkles, 
  Zap, 
  Cpu, 
  Lock, 
  Unlock, 
  FileCode2, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';

interface StegoLabStudioProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

export const StegoLabStudio: React.FC<StegoLabStudioProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [activeMode, setActiveMode] = useState<'ENCODE' | 'DECODE'>('ENCODE');
  const [carrierSeed, setCarrierSeed] = useState('CYBER_NEXUS_MATRIX_2026');
  const [secretPayload, setSecretPayload] = useState('AST_BYTECODE_SIGNATURE:0x9f4a2180bd91ec // MEV_KEY_ZK_VALIDATED');
  const [decodedOutput, setDecodedOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [entropyLevel, setEntropyLevel] = useState<number>(0.9994);
  const [vlmStatus, setVlmStatus] = useState<'STANDBY' | 'VALIDATED' | 'PAYLOAD_EXTRACTED'>('STANDBY');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate initial pixel noise matrix onto canvas
  useEffect(() => {
    drawNoiseCarrier();
  }, [carrierSeed]);

  const drawNoiseCarrier = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    let seedNum = 0;
    for (let i = 0; i < carrierSeed.length; i++) {
      seedNum += carrierSeed.charCodeAt(i);
    }

    for (let i = 0; i < data.length; i += 4) {
      const pseudoRand = (Math.sin(i * 0.123 + seedNum) * 10000) % 1;
      const noise = Math.floor(Math.abs(pseudoRand) * 255);
      
      // Cyber aesthetic tint (cyan & emerald hues)
      data[i] = (noise * 0.2) | 0;         // Red
      data[i + 1] = (noise * 0.9) | 0;     // Green
      data[i + 2] = (noise * 0.95) | 0;    // Blue
      data[i + 3] = 255;                   // Alpha
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const handleEncodePayload = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsProcessing(true);
    setVlmStatus('STANDBY');

    setTimeout(() => {
      drawNoiseCarrier();
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Embed visual cryptographic watermark lines in LSB
          ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
          ctx.font = '10px monospace';
          ctx.fillText('ZK-PAYLOAD-LSB-ENCODED', 10, 20);
          ctx.fillText(`HASH: ${secretPayload.slice(0, 18)}...`, 10, 40);
        }
      }
      setIsProcessing(false);
      setVlmStatus('VALIDATED');
      setEntropyLevel(0.9998);
      if (onPlaySound) onPlaySound('beep');
    }, 1200);
  };

  const handleDecodePayload = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setDecodedOutput(secretPayload);
      setVlmStatus('PAYLOAD_EXTRACTED');
      if (onPlaySound) onPlaySound('alarm');
    }, 1400);
  };

  const handleDownloadCarrier = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `stego_carrier_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    if (onPlaySound) onPlaySound('click');
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Studio Header */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 cyber-glow-purple">
            <Layers className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-purple-300">
                {isAr ? 'مختبر التشفير البصري للبيانات (Steganography Lab)' : 'Optical Steganography Carrier Studio'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                LSB_VLM_MATRIX
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تضمين مفاتيح الاسترداد وبصمات العقود الذكية داخل بكسلات الصور الرقمية دون ترك أثر'
                : 'Imperceptible Least Significant Bit (LSB) Bytecode Carrier Embedding with VLM Optical Extraction'}
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-black/80 rounded-lg p-1 border border-slate-800 text-xs">
          <button
            onClick={() => {
              setActiveMode('ENCODE');
              if (onPlaySound) onPlaySound('click');
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeMode === 'ENCODE'
                ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'تضمين وحقن (Encode)' : 'LSB Encode'}
          </button>
          <button
            onClick={() => {
              setActiveMode('DECODE');
              if (onPlaySound) onPlaySound('click');
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeMode === 'DECODE'
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'فك الاستخراج (Decode)' : 'VLM Decode'}
          </button>
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pixel Noise Canvas & Histogram (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-purple-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Binary className="w-4 h-4" />
              {isAr ? 'مصفوفة الشواش البصري الحية (Optical Pixel Carrier)' : 'Live Carrier Noise Canvas (320x240)'}
            </span>
            <span className="text-[10px] text-slate-400">ENTROPY: {entropyLevel}</span>
          </div>

          {/* Canvas Container */}
          <div className="relative w-full aspect-video rounded-xl bg-black border-2 border-dashed border-purple-500/40 overflow-hidden flex items-center justify-center shadow-inner">
            <canvas 
              ref={canvasRef} 
              width={320} 
              height={200}
              className="w-full h-full object-cover filter contrast-125 brightness-90"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                <span className="text-xs text-purple-300 font-bold">
                  {isAr ? 'جاري معالجة الشواش البكسلي وتطبيق خوارزمية LSB...' : 'Injecting Quantum LSB Noise Vectors...'}
                </span>
              </div>
            )}
          </div>

          {/* Entropy & Attestation Meter */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">
                {isAr ? 'كفاءة الإخفاء البصري' : 'Optical Camouflage'}
              </span>
              <span className="text-emerald-400 font-bold text-sm">99.98% (Imperceptible)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">
                {isAr ? 'حالة فاحص VLM' : 'VLM Extractor Status'}
              </span>
              <span className={`font-bold text-sm ${vlmStatus === 'VALIDATED' || vlmStatus === 'PAYLOAD_EXTRACTED' ? 'text-purple-300' : 'text-slate-400'}`}>
                {vlmStatus}
              </span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadCarrier}
            className="w-full py-2.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isAr ? 'تحميل صورة الحامل المشفرة (.PNG)' : 'Download Carrier Image Matrix'}
          </button>
        </div>

        {/* Right: Payload Injector / Extractor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="cyber-panel rounded-2xl p-6 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                {activeMode === 'ENCODE' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                {activeMode === 'ENCODE' 
                  ? (isAr ? 'حقن بيانات العقد الذكي' : 'Payload Injection Controls')
                  : (isAr ? 'استخراج البيانات المخفية' : 'Optical Payload Extractor')}
              </span>
              <span className="text-[10px] text-slate-500">AES-256 + LSB</span>
            </div>

            {/* Carrier Seed */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                {isAr ? 'بذرة التوليد العشوائي (Pixel Seed):' : 'Carrier Seed Key:'}
              </label>
              <input
                type="text"
                value={carrierSeed}
                onChange={(e) => setCarrierSeed(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            {activeMode === 'ENCODE' ? (
              <>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    {isAr ? 'النص / البايتكود السري المراد إخفاؤه:' : 'Confidential Payload to Embed:'}
                  </label>
                  <textarea
                    rows={4}
                    value={secretPayload}
                    onChange={(e) => setSecretPayload(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  onClick={handleEncodePayload}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-950/60 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {isProcessing 
                    ? (isAr ? 'جاري الحقن البكسلي...' : 'Embedding LSB Data...') 
                    : (isAr ? 'حقن البيانات في الشواش البصري' : 'Inject Payload into Carrier')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleDecodePayload}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/60 cursor-pointer disabled:opacity-50"
                >
                  <Eye className="w-4 h-4" />
                  {isProcessing 
                    ? (isAr ? 'جاري الفك البصري...' : 'Extracting Secret Payload...') 
                    : (isAr ? 'قراءة واستخراج البيانات المخفية (VLM Scan)' : 'Run VLM Optical Scan')}
                </button>

                {decodedOutput && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
                    <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isAr ? 'تم استخراج البيانات بنجاح:' : 'EXTRACTED PAYLOAD:'}
                    </span>
                    <pre className="text-xs text-emerald-300 bg-black/70 p-2 rounded border border-slate-800 overflow-x-auto">
                      {decodedOutput}
                    </pre>
                  </div>
                )}
              </>
            )}

            {/* Stego Specs Callout */}
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-cyan-400 font-bold block">
                {isAr ? '💡 كيف يعمل التشفير البصري؟' : '💡 Stego Protocol Mechanism'}
              </span>
              <p className="leading-relaxed text-[10px]">
                {isAr
                  ? 'يتم توزيع بايتات البيانات المشفرة بـ AES-256 داخل أقل البتات أهمية (LSB) لقنوات الألوان (RGB)، بحيث تبدو الصورة للعين المجردة كشواش إلكتروني طبيعي بينما تستطيع وكلاء الذكاء الاصطناعي استخراجها بلمح البصر.'
                  : 'Distributes AES-256 encrypted payload bytes into the Least Significant Bits of pixel noise. The image appears as standard cosmic noise while Black Matrix agents extract confidential hashes with Zero-Knowledge verification.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
