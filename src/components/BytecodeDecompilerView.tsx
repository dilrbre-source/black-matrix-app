import React, { useState } from 'react';
import { 
  Code2, 
  Binary, 
  Cpu, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Layers, 
  Search, 
  Play, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  GitCommit
} from 'lucide-react';
import { motion } from 'motion/react';

interface BytecodeDecompilerViewProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface ContractSample {
  id: string;
  name: string;
  chain: string;
  threatVerdict: 'CRITICAL_HONEYPOT' | 'VERIFIED_SAFE' | 'PROXY_HIJACK_RISK';
  rawBytecode: string;
  opcodes: Array<{ offset: string; opcode: string; comment?: string; risk?: 'high' | 'safe' }>;
  decompiledAst: string;
}

export const BytecodeDecompilerView: React.FC<BytecodeDecompilerViewProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const samples: ContractSample[] = [
    {
      id: 'honeypot_tax',
      name: 'PepeDrainer_v4 (99% Tax Trap)',
      chain: 'Ethereum / Base',
      threatVerdict: 'CRITICAL_HONEYPOT',
      rawBytecode: '0x608060405234801561001057600080fd5b50600436106100365760003560e01c8063a9059cbb1461003b57806323b872dd14610077575b600080fd',
      opcodes: [
        { offset: '0x00', opcode: 'PUSH1 0x80', comment: 'Allocate free memory pointer' },
        { offset: '0x02', opcode: 'MSTORE', comment: 'Store 0x80 to memory' },
        { offset: '0x03', opcode: 'CALLVALUE', comment: 'Check msg.value == 0' },
        { offset: '0x04', opcode: 'DUP1' },
        { offset: '0x05', opcode: 'ISZERO' },
        { offset: '0x06', opcode: 'PUSH2 0x0010' },
        { offset: '0x09', opcode: 'JUMPI', comment: 'Jump if non-payable' },
        { offset: '0x1A', opcode: 'SLOAD', comment: 'Load dynamicSellTax from slot 0x04', risk: 'high' },
        { offset: '0x1B', opcode: 'PUSH1 0x63', comment: '0x63 = 99 decimal (99% Tax)', risk: 'high' },
        { offset: '0x1D', opcode: 'EQ', comment: 'Compare tax rate modifier', risk: 'high' },
        { offset: '0x1E', opcode: 'REVERT', comment: 'Trap victim transfers if amount > 0', risk: 'high' }
      ],
      decompiledAst: `// AST Decompiled by Black Matrix AST-Engine v4.2
contract PepeDrainer_v4 {
    address private _owner;
    uint256 public dynamicSellTax = 99; // ⚠️ UNPROTECTED TAX OVERRIDE
    mapping(address => uint256) private _balances;

    // EXPLOIT DETECTED: Function modifies tax dynamically to 99%
    function setTax(uint256 newTax) external {
        // Missing onlyRole / Timelock modifier
        dynamicSellTax = newTax; 
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
        uint256 tax = (amount * dynamicSellTax) / 100;
        _balances[sender] -= amount;
        _balances[recipient] += (amount - tax);
        _balances[_owner] += tax; // Diverts 99% of victim swaps to attacker
    }
}`
    },
    {
      id: 'uniswap_v4_canonical',
      name: 'UniswapV4_Hook_Canonical',
      chain: 'Ethereum / Arbitrum',
      threatVerdict: 'VERIFIED_SAFE',
      rawBytecode: '0x608060405234801561001057600080fd5b506004361061002b5760003560e01c806306fd168e14610030578063095ea7b31461005e575b600080fd',
      opcodes: [
        { offset: '0x00', opcode: 'PUSH1 0x80', comment: 'Setup memory offset' },
        { offset: '0x02', opcode: 'MSTORE' },
        { offset: '0x08', opcode: 'STATICCALL', comment: 'Immutable pure math validation', risk: 'safe' },
        { offset: '0x12', opcode: 'SLOAD', comment: 'Verify pool liquidity tick' },
        { offset: '0x18', opcode: 'RETURN', comment: 'Clean contract execution', risk: 'safe' }
      ],
      decompiledAst: `// AST Decompiled by Black Matrix AST-Engine v4.2
contract UniswapV4_Hook_Canonical is IHooks {
    bytes32 public constant POOL_ID = 0x8f4a...2109;

    function beforeSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, bytes calldata)
        external
        pure
        returns (bytes4, BeforeSwapDelta, uint24)
    {
        // Verified deterministic math with zero side-effects
        return (IHooks.beforeSwap.selector, BeforeSwapDeltaLibrary.ZERO_DELTA, 0);
    }
}`
    }
  ];

  const [selectedSample, setSelectedSample] = useState<ContractSample>(samples[0]);
  const [isDecompiling, setIsDecompiling] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'AST' | 'OPCODES' | 'CFG'>('AST');

  const handleSelectSample = (sample: ContractSample) => {
    if (onPlaySound) onPlaySound('radar');
    setIsDecompiling(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsDecompiling(false);
      if (onPlaySound) onPlaySound('beep');
    }, 600);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Code2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'مفكك البايتكود التفاعلي وشجرة الـ AST' : 'Bytecode Decompiler & AST Control Flow Sandbox'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                EVM_SVM_DISASSEMBLER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تحويل البايتكود الخام إلى كود مقروء، واكتشاف ثغرات الـ Reentrancy والتلاعب بالضرائب'
                : 'Raw Bytecode Disassembly, Control-Flow Graph Generation & Exploit Signature Matching'}
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-black/80 rounded-lg p-1 border border-slate-800 text-xs">
          <button
            onClick={() => {
              setActiveView('AST');
              if (onPlaySound) onPlaySound('click');
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeView === 'AST'
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'كود الـ AST' : 'AST Source'}
          </button>
          <button
            onClick={() => {
              setActiveView('OPCODES');
              if (onPlaySound) onPlaySound('click');
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeView === 'OPCODES'
                ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'تعليمات Opcodes' : 'Opcodes'}
          </button>
          <button
            onClick={() => {
              setActiveView('CFG');
              if (onPlaySound) onPlaySound('click');
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeView === 'CFG'
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'شجرة التدفق (CFG)' : 'Flow Graph'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Preset Bytecode Samples (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="cyber-panel rounded-2xl p-5 border border-cyan-500/30 bg-black/75 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between text-xs text-cyan-400 border-b border-slate-800 pb-2 font-bold">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {isAr ? 'نماذج العقود المفحوصة' : 'Analyzed Contracts'}
              </span>
              <span className="text-[10px] text-slate-500">AST_INDEX</span>
            </div>

            <div className="space-y-2">
              {samples.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer ${
                    selectedSample.id === s.id
                      ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{s.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                      s.threatVerdict === 'CRITICAL_HONEYPOT'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {s.threatVerdict === 'CRITICAL_HONEYPOT' ? 'EXPLOIT' : 'SAFE'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>{s.chain}</span>
                    <span>{s.opcodes.length} Opcodes</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Bytecode Box */}
          <div className="cyber-panel rounded-2xl p-4 border border-slate-800 bg-black/75 backdrop-blur-md space-y-2">
            <span className="text-[11px] text-slate-400 font-bold block">
              {isAr ? 'البايتكود الخام (Hex Bytecode):' : 'Raw Bytecode Stream:'}
            </span>
            <div className="p-2.5 rounded-lg bg-black/90 border border-slate-800 text-[10px] text-cyan-400 break-all font-mono max-h-24 overflow-y-auto">
              {selectedSample.rawBytecode}
            </div>
          </div>
        </div>

        {/* Right: Decompiled Code / Opcode Inspector (8 cols) */}
        <div className="lg:col-span-8 cyber-panel rounded-2xl p-6 border border-cyan-500/30 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl min-h-[500px]">
          
          {/* Top Panel Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">
                {selectedSample.name}
              </span>
              <span className="text-[10px] text-slate-500">[{selectedSample.chain}]</span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                selectedSample.threatVerdict === 'CRITICAL_HONEYPOT'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {selectedSample.threatVerdict}
              </span>
            </div>
          </div>

          {/* View Content */}
          {isDecompiling ? (
            <div className="h-64 flex flex-col items-center justify-center gap-2 text-cyan-400">
              <Zap className="w-8 h-8 animate-spin" />
              <span className="text-xs font-bold">
                {isAr ? 'جاري فك البايتكود وتوليد شجرة الـ AST...' : 'Decompiling Bytecode & Synthesizing AST Tree...'}
              </span>
            </div>
          ) : (
            <>
              {activeView === 'AST' && (
                <div className="relative p-4 rounded-xl bg-black/90 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[400px]">
                  <pre className="text-slate-200">{selectedSample.decompiledAst}</pre>
                </div>
              )}

              {activeView === 'OPCODES' && (
                <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                  {selectedSample.opcodes.map((op, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono border ${
                        op.risk === 'high'
                          ? 'bg-red-950/30 border-red-500/40 text-red-300'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500 w-10">{op.offset}</span>
                        <span className="font-bold text-cyan-300">{op.opcode}</span>
                      </div>
                      {op.comment && (
                        <span className="text-[10px] text-slate-400">{op.comment}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeView === 'CFG' && (
                <div className="p-6 rounded-xl bg-black/90 border border-slate-800 flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs">
                    <GitCommit className="w-4 h-4" />
                    <span>[ENTRYPOINT: 0x00] -&gt; PUSH1 0x80 -&gt; MSTORE</span>
                  </div>
                  <div className="w-0.5 h-6 bg-cyan-500/50" />
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-300 text-xs">
                    <span>[DISPATCHER: 0x04] -&gt; CALLDATALOAD -&gt; SELECTOR_CHECK</span>
                  </div>
                  <div className="w-0.5 h-6 bg-purple-500/50" />
                  <div className={`flex items-center gap-2 p-3 rounded-lg border text-xs ${
                    selectedSample.threatVerdict === 'CRITICAL_HONEYPOT'
                      ? 'bg-red-950/50 border-red-500 text-red-300'
                      : 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                  }`}>
                    <ShieldAlert className="w-4 h-4" />
                    <span>
                      {selectedSample.threatVerdict === 'CRITICAL_HONEYPOT'
                        ? '[VULNERABILITY DETECTED]: SLOAD dynamicSellTax (99%) -> REVERT_ON_USER_SWAP'
                        : '[VERIFIED LEAF]: CLEAN_EXECUTION -> RETURN(0x00)'}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
