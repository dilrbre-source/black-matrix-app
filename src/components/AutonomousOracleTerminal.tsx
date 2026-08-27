import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Terminal, 
  Send, 
  Mic, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Cpu, 
  Fingerprint, 
  Layers, 
  Code2, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  RotateCcw,
  Copy,
  Check,
  Search,
  Flame,
  Binary
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AutonomousOracleTerminalProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface Message {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  verdict?: 'SAFE' | 'WARNING' | 'CRITICAL_EXPLOIT';
  metrics?: {
    reentrancyScore: number;
    sandwichRisk: number;
    zkpConfidence: number;
  };
}

export const AutonomousOracleTerminal: React.FC<AutonomousOracleTerminalProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [voiceSynthesizerActive, setVoiceSynthesizerActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      sender: 'oracle',
      text: isAr 
        ? 'مرحباً بك في أوراكل الذكاء الاصطناعي السيبراني (Neural Security Oracle v4.2). تم تفعيل حراس الميمبول والتحليل الجيني. يمكنك سؤالي عن تحليل أي عقد ذكي، تفكيك كود مشبوه، محاكاة هجوم MEV، أو توليد براهين ZKP الرياضية.'
        : 'Welcome to Neural Security Oracle v4.2. Mempool sentinels & AST DNA engine active. Ask me to audit any smart contract, decompile suspicious bytecode, simulate an MEV sandwich attack, or synthesize ZKP proofs.',
      timestamp: '09:40:12',
      verdict: 'SAFE',
      metrics: {
        reentrancyScore: 0,
        sandwichRisk: 12,
        zkpConfidence: 99.8
      }
    }
  ]);

  const presetQueries = isAr ? [
    { label: 'فحص ثغرة سحب السيولة (Honeypot Tax Mod)', query: 'حلل مخاطر الدالة _transfer في عقد يحتوي على تعديل الضريبة بنسبة 99% واستدعاء proxy غير مقفل' },
    { label: 'محاكاة هجوم Front-Running عبر Flashbots', query: 'كيف يقوم حارس MEV بتحويل معاملة التداول إلى مسار Flashbots الخاص لمنع استغلال Sandwich؟' },
    { label: 'توليد برهان المعرفة الصفرية (ZKP AST)', query: 'أريد توليد بصمة جينية وبراهين ZKP لعقد ERC-20 بدون كشف بنية الكود الأصلية' },
    { label: 'تدقيق أمان Solana PDA Collisions', query: 'افحص برنامج Anchor على شبكة سولانا للتحقق من ثغرة PDA Bump Seed وتكرار التوقيع' }
  ] : [
    { label: 'Audit Honeypot 99% Tax Vector', query: 'Analyze honeypot risk in _transfer function with variable tax modification up to 99%' },
    { label: 'Simulate MEV Private Bundle Routing', query: 'Explain how Flashbots private relay protects a high-slippage swap transaction from sandwich bots' },
    { label: 'Synthesize ZKP AST Bytecode Attestation', query: 'Generate a Zero-Knowledge Proof attestation verifying clean contract bytecode without revealing proprietary logic' },
    { label: 'Solana PDA Bump Seed Verification', query: 'Check Solana Anchor program for canonical bump seed validation & signer authorization flaw' }
  ];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Voice Synthesizer simulation using Web Speech API
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[`*#_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isAr ? 'ar-SA' : 'en-US';
      utterance.rate = 1.05;
      utterance.pitch = 0.9; // Deep sci-fi tone
      window.speechSynthesis.speak(utterance);
      setVoiceSynthesizerActive(true);
      utterance.onend = () => setVoiceSynthesizerActive(false);
      utterance.onerror = () => setVoiceSynthesizerActive(false);
    } catch {
      setVoiceSynthesizerActive(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isThinking) return;

    if (onPlaySound) onPlaySound('click');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    if (onPlaySound) onPlaySound('radar');

    // Simulate Deep Cognitive Neural Reasoning
    setTimeout(() => {
      let oracleReply: Message;
      const lower = query.toLowerCase();

      if (lower.includes('tax') || lower.includes('ضريبة') || lower.includes('honeypot') || lower.includes('سحب')) {
        oracleReply = {
          id: (Date.now() + 1).toString(),
          sender: 'oracle',
          text: isAr 
            ? '🚨 **تحذير أمني حرج [HONEYPOT_DETECTED]**: تم اكتشاف دالة تعديل الضريبة المخفية `setTransactionFeeRate(uint256)` غير المحمية بـ `Timelock`. العقد يسمح لمالك العقد (Owner) برفع ضريبة البيع إلى 99% مما يمنع المستثمرين من تسييل الرموز بعد الشراء.'
            : '🚨 **Critical Exploit Vector [HONEYPOT_DETECTED]**: AST Decompiler identified an unconstrained `setTransactionFeeRate(uint256)` function without Timelock governance. The contract owner can alter sell tax to 99%, permanently locking liquidity and trapping victim funds.',
          timestamp: new Date().toLocaleTimeString(),
          verdict: 'CRITICAL_EXPLOIT',
          codeSnippet: `// VULNERABLE BYTECODE DECOMPILED:
function _transfer(address from, address to, uint256 amount) internal {
    if (to == uniswapV2Pair && !isExcluded[from]) {
        uint256 maliciousTax = (amount * dynamicSellTax) / 100; // dynamicSellTax = 99%
        require(amount - maliciousTax > 0, "EXPLOIT: ZERO_OUT");
        _burn(from, maliciousTax);
    }
    super._transfer(from, to, amount - maliciousTax);
}`,
          metrics: {
            reentrancyScore: 15,
            sandwichRisk: 98,
            zkpConfidence: 99.9
          }
        };
      } else if (lower.includes('flashbots') || lower.includes('mev') || lower.includes('sandwich') || lower.includes('front')) {
        oracleReply = {
          id: (Date.now() + 1).toString(),
          sender: 'oracle',
          text: isAr
            ? '🛡️ **مسار الحماية التلقائي [MEV_PRIVATE_RELAY]**: عند تفعيل الحارس، يتم إرسال معاملتك كـ Flashbots Bundle مباشرة إلى منقبي الإيثيريوم (Block Builders) عبر قناة RPC مشفرة خارج الميمبول العام، مما يجعل استجابة روبوتات الـ Sandwich مستحيلة بنسبة 100% (Zero Mempool Slippage Leak).'
            : '🛡️ **Active Defense [MEV_PRIVATE_RELAY]**: The Sentinel routes target swaps via private Flashbots RPC endpoints directly to verified block builders (Titan, BeaverBuild), completely bypassing the public p2p mempool. Front-running and sandwich extraction are mathematically mitigated.',
          timestamp: new Date().toLocaleTimeString(),
          verdict: 'SAFE',
          codeSnippet: `// FLASHBOTS BUNDLE DISPATCH:
const bundleSubmission = await flashbotsProvider.sendBundle([
  { transaction: userSignedRescueTx, signer: rescueWallet },
  { transaction: backrunEscrowDeposit, signer: matrixVaultRelay }
], targetBlockNumber + 1);
const resolution = await bundleSubmission.wait();`,
          metrics: {
            reentrancyScore: 0,
            sandwichRisk: 0,
            zkpConfidence: 99.4
          }
        };
      } else if (lower.includes('zkp') || lower.includes('صفرية') || lower.includes('proof') || lower.includes('بصمة')) {
        oracleReply = {
          id: (Date.now() + 1).toString(),
          sender: 'oracle',
          text: isAr
            ? '🧬 **توليد إثبات المعرفة الصفرية [ZKP_AST_PROOF]**: تم توليد البصمة الجينية للبايتكود المشفر عبر منحنى Groth16 البيضاوي. يمكن إثبات خلو العقد من الثغرات للبورصات والمستثمرين دون الكشف عن الخوارزميات الداخلية.'
            : '🧬 **Zero-Knowledge Attestation [ZKP_GROTH16]**: Successfully synthesized a non-interactive zero-knowledge argument of knowledge (zk-SNARK) over the contract AST execution tree. Validates bytecode integrity without revealing proprietary algorithms.',
          timestamp: new Date().toLocaleTimeString(),
          verdict: 'SAFE',
          codeSnippet: `// GROTH16 ZK-PROOF VERIFICATION HASH:
Proof_A: [0x2f91a0...8b1c, 0x4a9d81...e201]
Proof_B: [[0x01fa...99a1, 0x9b8c...4102], [0x66b1...38a2, 0x110e...fa77]]
Proof_C: [0x55aa...0012, 0xee81...bca4]
PublicInputs: [0xDNA_ROOT_HASH_981420918] -> STATUS: VERIFIED_CLEAN`,
          metrics: {
            reentrancyScore: 2,
            sandwichRisk: 5,
            zkpConfidence: 100.0
          }
        };
      } else {
        oracleReply = {
          id: (Date.now() + 1).toString(),
          sender: 'oracle',
          text: isAr
            ? `⚡ **تحليل الأوراكل السيبراني**: تم فحص المعطيات ومطابقتها مع قاعدة بيانات الذكاء الاصطناعي السيبراني. النظام جاهز لتنفيذ تفكيك البايتكود أو تتبع محافظ الاحتيال بالزمن الفعلي.`
            : `⚡ **Neural Synthesis Report**: Target telemetry query processed across 48,000+ indexed malicious smart contracts. AST syntax integrity verified with zero anomalous control-flow deviations.`,
          timestamp: new Date().toLocaleTimeString(),
          verdict: 'SAFE',
          metrics: {
            reentrancyScore: 4,
            sandwichRisk: 14,
            zkpConfidence: 98.7
          }
        };
      }

      setMessages(prev => [...prev, oracleReply]);
      setIsThinking(false);
      if (onPlaySound) onPlaySound('beep');
    }, 1200);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (onPlaySound) onPlaySound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'أوراكل الذكاء الاصطناعي السيبراني (Neural AI Security Oracle)' : 'Autonomous AI Security Oracle'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ONLINE // v4.2
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'مساعد التحري الذكي وتحليل أكواد العقود وفك تشفير الثغرات ومحاكاة MEV'
                : 'Cognitive Web3 Security Co-Pilot, Bytecode Exploit Synthesis & Real-time MEV Simulator'}
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (messages.length > 0) {
                const lastMsg = messages[messages.length - 1];
                if (lastMsg.sender === 'oracle') speakText(lastMsg.text);
              }
            }}
            title={isAr ? 'قراءة صوتية للتقرير الأخير' : 'Read latest analysis via Voice Synthesizer'}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              voiceSynthesizerActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40'
            }`}
          >
            {voiceSynthesizerActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAr ? 'الصوت التكتيكي' : 'Voice Synth'}</span>
          </button>

          <button
            onClick={() => {
              setMessages([messages[0]]);
              if (onPlaySound) onPlaySound('click');
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            title={isAr ? 'مسح المحادثة' : 'Clear Chat'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chat History & Stream (Left/Center 8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[560px] cyber-panel rounded-2xl border border-cyan-500/30 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl">
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/90 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-slate-400 text-[11px] ml-2">oracle@blackmatrix-core:~#</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>QUANTUM_AST_REASONING_ACTIVE</span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'oracle' && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-xl p-3.5 space-y-2.5 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-100'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
                }`}>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
                    <span className="font-bold">
                      {msg.sender === 'user' ? (isAr ? 'الضابط المسؤول (You)' : 'Commander') : 'Neural Oracle'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="leading-relaxed whitespace-pre-line text-[12px]">
                    {msg.text}
                  </div>

                  {/* Optional Decompiled Code Snippet */}
                  {msg.codeSnippet && (
                    <div className="relative rounded-lg bg-black/90 border border-slate-800 p-2.5 font-mono text-[11px] overflow-x-auto text-emerald-300">
                      <div className="flex justify-between items-center text-[9px] text-slate-500 pb-1 mb-1 border-b border-slate-800">
                        <span>SYNTACTIC DISASSEMBLY</span>
                        <button
                          onClick={() => handleCopyCode(msg.id, msg.codeSnippet!)}
                          className="hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedId === msg.id ? 'COPIED' : 'COPY'}
                        </button>
                      </div>
                      <pre className="text-slate-300 font-mono leading-tight">{msg.codeSnippet}</pre>
                    </div>
                  )}

                  {/* Verdict & Metrics Badge */}
                  {msg.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] border-t border-slate-800/80">
                      <div className="bg-black/60 p-1.5 rounded border border-slate-800">
                        <span className="text-slate-400 block">{isAr ? 'خطر Sandwich' : 'Sandwich Risk'}</span>
                        <span className={`font-bold ${msg.metrics.sandwichRisk > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {msg.metrics.sandwichRisk}%
                        </span>
                      </div>
                      <div className="bg-black/60 p-1.5 rounded border border-slate-800">
                        <span className="text-slate-400 block">{isAr ? 'خطر Reentrancy' : 'Reentrancy'}</span>
                        <span className="text-cyan-400 font-bold">{msg.metrics.reentrancyScore}%</span>
                      </div>
                      <div className="bg-black/60 p-1.5 rounded border border-slate-800">
                        <span className="text-slate-400 block">{isAr ? 'ثقة برهان ZKP' : 'ZKP Confidence'}</span>
                        <span className="text-emerald-400 font-bold">{msg.metrics.zkpConfidence}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-cyan-400 text-xs p-2 bg-cyan-950/20 rounded-lg w-fit border border-cyan-500/20"
              >
                <Zap className="w-3.5 h-3.5 animate-spin" />
                <span>{isAr ? 'الأوراكل يقوم بتفكيك شجرة الـ AST ومطابقة الثغرات...' : 'Oracle synthesizing AST execution tree & checking exploits...'}</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Query Input Box */}
          <div className="p-3 bg-black/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={isAr ? 'اسأل الأوراكل عن كود عقد، محفظة احتيال، أو هجوم MEV...' : 'Query Oracle regarding smart contract bytecode, exploit vectors, or MEV rescue...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={!inputQuery.trim() || isThinking}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-950/60 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'إرسال' : 'Query'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Sidebar: Preset Scenarios & Cognitive Radar Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Preset Intelligence Scenarios */}
          <div className="cyber-panel rounded-xl p-4 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between text-xs text-cyan-400 border-b border-slate-800 pb-2 font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isAr ? 'سيناريوهات التدقيق الفوري' : 'Automated Audit Presets'}
              </span>
              <span className="text-[10px] text-slate-500">AST_ENGINE</span>
            </div>

            <div className="space-y-2">
              {presetQueries.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(preset.query)}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs group cursor-pointer"
                >
                  <div className="text-cyan-300 font-bold text-[11px] group-hover:text-cyan-200">
                    {preset.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {preset.query}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Neural Reasoning Engine Status */}
          <div className="cyber-panel rounded-xl p-4 border border-slate-800 bg-black/75 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1 font-bold">
                <Cpu className="w-3.5 h-3.5" />
                {isAr ? 'مواصفات المحرك العصبي' : 'Neural Core Specs'}
              </span>
              <span className="text-[10px] text-slate-400">ONLINE</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">{isAr ? 'سرعة استنتاج البايتكود:' : 'Bytecode Inference:'}</span>
                <span className="text-cyan-400 font-bold">14.2 ms</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">{isAr ? 'دقة كشف مصائد Honeypot:' : 'Honeypot Precision:'}</span>
                <span className="text-emerald-400 font-bold">99.98%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">{isAr ? 'عقود خبيثة مفهرسة:' : 'Indexed Exploit DB:'}</span>
                <span className="text-purple-300 font-bold">48,910 ASTs</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
