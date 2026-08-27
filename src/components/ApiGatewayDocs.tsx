import React, { useState } from 'react';
import { 
  Key, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Code, 
  BookOpen, 
  Lock, 
  Layers, 
  Server, 
  ExternalLink,
  Activity,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ApiGatewayDocsProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

export const ApiGatewayDocs: React.FC<ApiGatewayDocsProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [activeLang, setActiveLang] = useState<'curl' | 'nodejs' | 'python'>('nodejs');
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('simulate');

  const apiKey = 'bmx_live_994a28f10b2c8849e7104ad91942';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    if (onPlaySound) onPlaySound('beep');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const endpoints = [
    {
      id: 'simulate',
      method: 'POST',
      path: '/v1/preflight/simulate',
      titleAr: 'محاكاة المعاملة وكشف هجمات MEV',
      titleEn: 'Pre-flight MEV & Exploit Simulation',
      descAr: 'فحص فوري للمعاملة على فورك قبل بثها في الميمبول العام وكشف روبوتات القنص.',
      descEn: 'Execute dry-run simulation against current block state to detect sandwich exploits and drainers.'
    },
    {
      id: 'inspect_bytecode',
      method: 'POST',
      path: '/v1/bytecode/decompile-ast',
      titleAr: 'تفكيك البايتكود وتوليد شجرة AST',
      titleEn: 'Bytecode AST Decompilation & Honeypot Detection',
      descAr: 'تحويل بايتكود العقود غير الموثقة إلى شجرة تعليمات Opcodes وكشف المصائد البرمجية.',
      descEn: 'Decompiles EVM/Solana raw bytecode, builds AST graph, and flags honeypot opcodes.'
    },
    {
      id: 'trace_mixer',
      method: 'GET',
      path: '/v1/forensics/mixer-trace/:txHash',
      titleAr: 'تتبع مسار الأموال في مجمعات Tornado والجسور',
      titleEn: 'Mixer & Cross-Chain Laundering Trace',
      descAr: 'تتبع حركة المحافظ المسروقة عبر الخلاطات والجسور اللامركزية مع إشعارات CEX.',
      descEn: 'Traces multi-hop flow through Tornado Cash pools and cross-chain bridge relays.'
    },
    {
      id: 'zkp_cert',
      method: 'POST',
      path: '/v1/audit/generate-proof',
      titleAr: 'توليد برهان أمان ZKP Groth16 موثق',
      titleEn: 'Generate Groth16 ZKP Security Certificate',
      descAr: 'توليد إثبات رياضي موثق على أمان كود العقد دون كشف الخوارزميات الداخلية.',
      descEn: 'Generates zero-knowledge cryptographic proof verifying contract mathematical safety.'
    }
  ];

  const codeSnippets = {
    simulate: {
      curl: `curl -X POST https://api.blackmatrix.io/v1/preflight/simulate \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "targetContract": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "method": "swapExactTokensForETHSupportingFeeOnTransferTokens",
    "txValueETH": "4.5",
    "useFlashbotsRelay": true
  }'`,
      nodejs: `import { BlackMatrixClient } from '@blackmatrix/sdk';

const bmx = new BlackMatrixClient({
  apiKey: '${apiKey}',
  network: 'ethereum-mainnet'
});

// Run pre-flight dry-run fork simulation
const simulation = await bmx.preflight.simulate({
  targetContract: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  method: 'swapExactTokensForETH',
  valueETH: 4.5,
  useFlashbotsRelay: true
});

console.log('Front-run Risk Score:', simulation.frontrunRiskScore);
console.log('Estimated Loss Saved:', simulation.financialImpactUSD);`,
      python: `from blackmatrix import BlackMatrixClient

client = BlackMatrixClient(api_key="${apiKey}")

# Execute instant dry-run simulation
result = client.preflight.simulate(
    target_contract="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    method="swapExactTokensForETH",
    value_eth=4.5,
    use_flashbots=True
)

print(f"Safety Status: {result.execution_status}")
print(f"Funds Protected: \${result.protected_usd}")`
    },
    inspect_bytecode: {
      curl: `curl -X POST https://api.blackmatrix.io/v1/bytecode/decompile-ast \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bytecode": "0x608060405234801561001057600080fd5b50...",
    "chain": "ethereum"
  }'`,
      nodejs: `import { BlackMatrixClient } from '@blackmatrix/sdk';

const bmx = new BlackMatrixClient({ apiKey: '${apiKey}' });

const astReport = await bmx.bytecode.decompile({
  bytecode: '0x608060405234801561001057600080fd5b50...',
  detectHoneypot: true
});

console.log('AST Leaves Count:', astReport.leavesCount);
console.log('Detected Traps:', astReport.maliciousOpcodes);`,
      python: `from blackmatrix import BlackMatrixClient

client = BlackMatrixClient(api_key="${apiKey}")

report = client.bytecode.decompile(
    bytecode="0x608060405234801561001057600080fd5b50...",
    detect_honeypot=True
)

print("Honeypot Found:", report.is_honeypot)`
    },
    trace_mixer: {
      curl: `curl -X GET https://api.blackmatrix.io/v1/forensics/mixer-trace/0x994801e82b... \\
  -H "Authorization: Bearer ${apiKey}"`,
      nodejs: `const trace = await bmx.forensics.traceMixer({
  txHash: '0x994801e82b3d...',
  notifyCEXCompliance: true
});

console.log('Hop Chain Length:', trace.hops.length);
console.log('Tornado Pool Flagged:', trace.tornadoDeposits);`,
      python: `trace = client.forensics.trace_mixer(
    tx_hash="0x994801e82b3d...",
    notify_cex=True
)
print(f"Laundering Hops: {len(trace.hops)}")`
    },
    zkp_cert: {
      curl: `curl -X POST https://api.blackmatrix.io/v1/audit/generate-proof \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contractAddress": "0x8892A418E97B6a2D9f20109Ec72b01264c18091E",
    "provingScheme": "Groth16_bn254"
  }'`,
      nodejs: `const proof = await bmx.audit.generateZKPProof({
  contractAddress: '0x8892A418E97B6a2D9f20109Ec72b01264c18091E',
  provingScheme: 'Groth16_bn254'
});

console.log('ZKP Digest:', proof.zkSNARK_Digest);`,
      python: `proof = client.audit.generate_zkp(
    contract_address="0x8892A418E97B6a2D9f20109Ec72b01264c18091E"
)
print(f"Proof Hash: {proof.digest}")`
    }
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Server className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'بوابة المطورين والـ API المؤسسي (Black Matrix Enterprise Gateway)' : 'Developer API & Institutional SDK Gateway'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                REST & WEBSOCKET v1.4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'ربط وتكامل منصات التداول والبوتات والمحافظ بأنظمة الأمان وفحص البايتكود ومسارات Flashbots الخاصة'
                : 'Integrate pre-flight MEV shielding, bytecode AST decompiler & forensic mixer tracing into your DApps & bots'}
            </p>
          </div>
        </div>

        {/* API Key Box */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-cyan-500/40">
          <Key className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-slate-300 font-mono">bmx_live_994a...1942</span>
          <button
            onClick={handleCopyKey}
            className="p-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Copy API Key"
          >
            {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Gateway Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Endpoints Navigation (5 cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-5 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {isAr ? 'نقاط النهاية المتاحة (API Endpoints)' : 'Available Endpoints'}
            </span>
            <span className="text-[10px] text-slate-500">HTTPS / WSS</span>
          </div>

          <div className="space-y-2.5">
            {endpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setSelectedEndpoint(ep.id);
                  if (onPlaySound) onPlaySound('click');
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedEndpoint === ep.id
                    ? 'bg-cyan-950/40 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100">
                    {isAr ? ep.titleAr : ep.titleEn}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {ep.method}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-cyan-400">
                  {ep.path}
                </div>

                <p className="text-[10px] text-slate-400 leading-tight">
                  {isAr ? ep.descAr : ep.descEn}
                </p>
              </button>
            ))}
          </div>

          {/* Quick Rate Limit Card */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>{isAr ? 'الحد الأقصى للطلبات:' : 'Enterprise Rate Limit:'}</span>
              <span className="text-emerald-400 font-bold">10,000 req/min</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{isAr ? 'زمن الاستجابة المتوسط:' : 'Average P99 Latency:'}</span>
              <span className="text-cyan-400 font-bold">14ms</span>
            </div>
          </div>
        </div>

        {/* Right: Code Sandbox & Examples (7 cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 border border-cyan-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
          
          {/* Language selector tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">
                {isAr ? 'نموذج الكود التفاعلي' : 'Interactive Code Example'}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {(['nodejs', 'python', 'curl'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setActiveLang(l);
                    if (onPlaySound) onPlaySound('click');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    activeLang === l
                      ? 'bg-cyan-500 text-black shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l === 'nodejs' ? 'Node.js / TS' : l === 'python' ? 'Python SDK' : 'cURL'}
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer Box */}
          <div className="relative">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[380px] leading-relaxed shadow-inner">
              <code>
                {codeSnippets[selectedEndpoint as keyof typeof codeSnippets]?.[activeLang] || ''}
              </code>
            </pre>

            <button
              onClick={() => {
                const code = codeSnippets[selectedEndpoint as keyof typeof codeSnippets]?.[activeLang] || '';
                navigator.clipboard.writeText(code);
                if (onPlaySound) onPlaySound('beep');
              }}
              className="absolute top-3 right-3 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copy Code"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Integration Banner */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                {isAr 
                  ? 'متاح الآن عبر حزمة npm: @blackmatrix/sdk لتطبيقات DeFi وروبوتات التداول'
                  : 'Install via npm: npm i @blackmatrix/sdk for instant DeFi & bot integration'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold shrink-0">
              v1.4.0
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
