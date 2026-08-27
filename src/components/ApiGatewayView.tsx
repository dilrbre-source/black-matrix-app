import React, { useState } from 'react';
import { 
  Terminal, 
  Send, 
  Copy, 
  Check, 
  Code, 
  Play, 
  CheckCircle2, 
  Key, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface ApiGatewayViewProps {
  lang: 'ar' | 'en';
}

export const ApiGatewayView: React.FC<ApiGatewayViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [endpoint, setEndpoint] = useState('/api/matrix/token_dna/scan');
  const [method, setMethod] = useState<'GET' | 'POST'>('POST');
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(
      {
        address: '0x71C8a1b269b2F0c2E29B1238D3Eb3499f57E4a9c',
        network: 'Ethereum (ERC-20)'
      },
      null,
      2
    )
  );
  const [responseOutput, setResponseOutput] = useState<string>('// اضغط على إرسال الطلب (Send Request) لتجربة الـ API');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const handleSendRequest = async () => {
    setLoading(true);
    setStatusCode(null);

    try {
      if (method === 'GET') {
        const resp = await fetch(endpoint);
        setStatusCode(resp.status);
        const data = await resp.json();
        setResponseOutput(JSON.stringify(data, null, 2));
      } else {
        const parsedBody = JSON.parse(requestBody);
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsedBody)
        });
        setStatusCode(resp.status);
        const data = await resp.json();
        setResponseOutput(JSON.stringify(data, null, 2));
      }
    } catch (e: any) {
      setStatusCode(500);
      setResponseOutput(JSON.stringify({ error: e.message || 'Request failed' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const curlCommand = `curl -X ${method} "https://ais-dev-b5a3jdtvpjobrs2pqcrblw-88711884511.europe-west1.run.app${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "X-Matrix-Auth: HMAC_SHA256_SEC_KEY" \\
  ${method === 'POST' ? `-d '${requestBody.replace(/\n/g, '')}'` : ''}`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="cyber-panel p-5 rounded-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>{isAr ? 'بوابة واجهات برمجة التطبيقات (Edge API Gateway)' : 'High-Throughput Edge API Gateway'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  v1.0 LIVE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'واجهات برمجية مؤمنة ومحمية بتوقيعات HMAC لتزويد المحافظ ومنصات التداول بالبصمات الجينية والتحريات'
                  : 'Authenticated low-latency endpoints providing real-time Token_DNA hashes, mempool feeds & rescue telemetry'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded bg-black/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Rate Limit: 5,000 req/min</span>
            </span>
          </div>
        </div>
      </div>

      {/* Preset API Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => {
            setEndpoint('/api/matrix/token_dna/scan');
            setMethod('POST');
            setRequestBody(JSON.stringify({ address: '0x71C8a1b269b2F0c2E29B1238D3Eb3499f57E4a9c', network: 'Ethereum' }, null, 2));
          }}
          className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            endpoint === '/api/matrix/token_dna/scan'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
              : 'bg-black/40 text-slate-400 border-slate-800'
          }`}
        >
          POST /token_dna/scan
        </button>

        <button
          onClick={() => {
            setEndpoint('/api/matrix/health');
            setMethod('GET');
            setRequestBody('');
          }}
          className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            endpoint === '/api/matrix/health'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
              : 'bg-black/40 text-slate-400 border-slate-800'
          }`}
        >
          GET /health
        </button>
      </div>

      {/* Request & Response Workbench (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Request Builder (6 Columns) */}
        <div className="lg:col-span-6 cyber-panel p-5 rounded-xl border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'محرر الطلب (Request Sandbox)' : 'Request Sandbox'}</span>
            </h3>
            <button
              onClick={handleCopyCurl}
              className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? (isAr ? 'تم نسخ الـ cURL' : 'cURL Copied') : 'cURL'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Endpoint Row */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-2 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                {method}
              </span>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* JSON Body */}
            {method === 'POST' && (
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400 block">
                  {isAr ? 'حزمة بيانات الـ JSON (Request Payload):' : 'JSON Payload:'}
                </label>
                <textarea
                  rows={8}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full p-3 rounded-lg bg-black/80 border border-slate-800 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            )}

            {/* Send Request Button */}
            <button
              onClick={handleSendRequest}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950 disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? (isAr ? 'جاري الاتصال بالسحابة...' : 'Sending Request...') : (isAr ? 'إرسال الطلب وتنفيذ الاستعلام' : 'Execute API Call')}</span>
            </button>
          </div>
        </div>

        {/* Response Viewer (6 Columns) */}
        <div className="lg:col-span-6 cyber-panel p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'مخرجات الاستجابة (API Response)' : 'Live Response Output'}</span>
              </h3>
              {statusCode !== null && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    statusCode === 200
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-950 text-red-400 border border-red-500/30'
                  }`}
                >
                  STATUS: {statusCode} {statusCode === 200 ? 'OK' : 'ERROR'}
                </span>
              )}
            </div>

            <div className="mt-3">
              <pre className="p-3.5 rounded-lg bg-black/90 border border-slate-800 text-emerald-400 text-xs overflow-x-auto max-h-[300px] leading-relaxed">
                {responseOutput}
              </pre>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Latency: ~24ms // Edge CDN Cached</span>
            <span className="text-emerald-400">HMAC-SHA256 Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
