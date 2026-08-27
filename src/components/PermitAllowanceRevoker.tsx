import React, { useState } from 'react';
import { 
  ShieldX, 
  ShieldCheck, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Key, 
  Coins, 
  Lock,
  RotateCcw,
  Sparkles,
  Layers,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

interface PermitAllowanceRevokerProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface AllowanceItem {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  spenderName: string;
  spenderAddress: string;
  type: 'PERMIT2_OFFCHAIN' | 'ERC20_INFINITE' | 'NFT_ALL_APPROVAL';
  allowanceValue: string;
  riskLevel: 'CRITICAL_SUSPICIOUS' | 'SAFE_DEX' | 'INACTIVE_LEGACY';
  riskScore: number;
}

export const PermitAllowanceRevoker: React.FC<PermitAllowanceRevokerProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [walletInput, setWalletInput] = useState('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  const [isScanning, setIsScanning] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const [allowances, setAllowances] = useState<AllowanceItem[]>([
    {
      id: 'allw_1',
      tokenName: 'Tether USD',
      tokenSymbol: 'USDT',
      spenderName: 'Fake Permit2 Claim Portal (Phishing Drainer)',
      spenderAddress: '0xDead...6666',
      type: 'PERMIT2_OFFCHAIN',
      allowanceValue: 'UNLIMITED (2^256 - 1)',
      riskLevel: 'CRITICAL_SUSPICIOUS',
      riskScore: 98
    },
    {
      id: 'allw_2',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      spenderName: 'Uniswap Universal Router v3',
      spenderAddress: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
      type: 'ERC20_INFINITE',
      allowanceValue: 'UNLIMITED',
      riskLevel: 'SAFE_DEX',
      riskScore: 12
    },
    {
      id: 'allw_3',
      tokenName: 'Bored Ape Yacht Club',
      tokenSymbol: 'BAYC #4910',
      spenderName: 'Unknown Staking Proxy (Inactive 180d)',
      spenderAddress: '0x88bb...3321',
      type: 'NFT_ALL_APPROVAL',
      allowanceValue: 'setApprovalForAll(true)',
      riskLevel: 'CRITICAL_SUSPICIOUS',
      riskScore: 92
    },
    {
      id: 'allw_4',
      tokenName: 'Dai Stablecoin',
      tokenSymbol: 'DAI',
      spenderName: 'Old 1inch v4 Router',
      spenderAddress: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      type: 'ERC20_INFINITE',
      allowanceValue: 'UNLIMITED',
      riskLevel: 'INACTIVE_LEGACY',
      riskScore: 45
    }
  ]);

  const handleScanWallet = () => {
    if (onPlaySound) onPlaySound('radar');
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (onPlaySound) onPlaySound('beep');
    }, 1000);
  };

  const handleRevokeSingle = (id: string) => {
    if (onPlaySound) onPlaySound('click');
    setRevokingId(id);
    setTimeout(() => {
      setAllowances(prev => prev.filter(a => a.id !== id));
      setRevokingId(null);
      if (onPlaySound) onPlaySound('beep');
    }, 1200);
  };

  const handleRevokeAllRisky = () => {
    if (onPlaySound) onPlaySound('alarm');
    setIsScanning(true);
    setTimeout(() => {
      setAllowances(prev => prev.filter(a => a.riskLevel === 'SAFE_DEX'));
      setIsScanning(false);
      if (onPlaySound) onPlaySound('beep');
    }, 1400);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-red-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400 cyber-glow-red">
            <ShieldX className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-red-300">
                {isAr ? 'فاحص تصاريح Permit2 والتواقيع الخبيثة (Permit2 & Allowance Revoker)' : 'Permit2 & Infinite Allowance Revoker'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30">
                OFF-CHAIN SIGNATURE SCAN
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'كشف وإلغاء تصاريح السحب المفتوحة وتواقيع Permit2 و eth_sign المخفية لمنع استنزاف المحافظ'
                : 'Scans and revokes open token allowances, off-chain Permit2 signatures, and dangerous NFT approvals'}
            </p>
          </div>
        </div>

        {/* Emergency Revoke All Button */}
        <button
          onClick={handleRevokeAllRisky}
          disabled={isScanning}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-950/60 cursor-pointer disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          <span>{isAr ? 'إلغاء جميع التصاريح الخطرة فوراً' : 'Emergency Revoke All Dangerous'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="cyber-panel rounded-2xl p-6 border border-slate-800 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl">
        
        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="0x... Target Address"
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 w-64 sm:w-80 font-mono focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleScanWallet}
              disabled={isScanning}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isAr ? 'فحص' : 'Scan'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">{isAr ? 'التصاريح النشطة:' : 'Active Approvals:'} <strong className="text-white">{allowances.length}</strong></span>
            <span className="text-slate-400">{isAr ? 'تصاريح عالية الخطورة:' : 'High Risk:'} <strong className="text-red-400">{allowances.filter(a => a.riskLevel === 'CRITICAL_SUSPICIOUS').length}</strong></span>
          </div>
        </div>

        {/* Allowances Table / List */}
        <div className="space-y-3">
          {allowances.map((item) => (
            <div 
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                item.riskLevel === 'CRITICAL_SUSPICIOUS'
                  ? 'bg-red-950/20 border-red-500/40 text-red-200'
                  : item.riskLevel === 'INACTIVE_LEGACY'
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  item.riskLevel === 'CRITICAL_SUSPICIOUS'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : item.riskLevel === 'INACTIVE_LEGACY'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {item.tokenSymbol.slice(0, 3)}
                </div>

                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{item.tokenName} ({item.tokenSymbol})</span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                      item.riskLevel === 'CRITICAL_SUSPICIOUS' ? 'bg-red-500/30 text-red-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Spender: <span className="text-cyan-300">{item.spenderName}</span> ({item.spenderAddress})
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Allowance: <span className="text-amber-300">{item.allowanceValue}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 justify-end">
                <div className="text-right">
                  <div className={`text-xs font-bold ${
                    item.riskScore > 75 ? 'text-red-400' : item.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    Risk: {item.riskScore}/100
                  </div>
                </div>

                <button
                  onClick={() => handleRevokeSingle(item.id)}
                  disabled={revokingId === item.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{revokingId === item.id ? (isAr ? 'جاري الإلغاء...' : 'Revoking...') : (isAr ? 'إلغاء التصريح' : 'Revoke')}</span>
                </button>
              </div>
            </div>
          ))}

          {allowances.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
              <span>{isAr ? 'المحفظة نظيفة تماماً ولا تحتوي على أي تصاريح مفتوحة خطرة.' : 'All dangerous allowances revoked. Wallet is 100% secured.'}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
