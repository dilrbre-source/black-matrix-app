import React, { useState, useEffect } from 'react';
import { 
  HUDTab, 
  ThreatRadarItem, 
  TokenDNAProfile 
} from './types';
import { 
  MOCK_THREAT_ITEMS, 
  TOKEN_DNA_PRESETS 
} from './data';
import { HeaderNav } from './components/HeaderNav';
import { PasswordGate } from './components/PasswordGate';
import { CommandBridgeView } from './components/CommandBridgeView';
import { LiveThreatRadar } from './components/LiveThreatRadar';
import { TokenDNAAnalyzer } from './components/TokenDNAAnalyzer';
import { MultiAgentEngine } from './components/MultiAgentEngine';
import { SmartEscrowHub } from './components/SmartEscrowHub';
import { IntelVault } from './components/IntelVault';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { RoadmapView } from './components/RoadmapView';
import { ApiGatewayDocs } from './components/ApiGatewayDocs';
import { AutonomousOracleTerminal } from './components/AutonomousOracleTerminal';
import { StegoLabStudio } from './components/StegoLabStudio';
import { BytecodeDecompilerView } from './components/BytecodeDecompilerView';
import { PreFlightSimulator } from './components/PreFlightSimulator';
import { ForensicMixerTrace } from './components/ForensicMixerTrace';
import { AuditCertificateStudio } from './components/AuditCertificateStudio';
import { WhitehatRescueBot } from './components/WhitehatRescueBot';
import { PermitAllowanceRevoker } from './components/PermitAllowanceRevoker';
import { CyberWarGames } from './components/CyberWarGames';
import { SolanaInspector } from './components/SolanaInspector';
import { Galaxy3DKnowledge } from './components/Galaxy3DKnowledge';
import { AgentSwarmsView } from './components/AgentSwarmsView';
import { WebAgentHitl } from './components/WebAgentHitl';
import { SovereignVaultAdvanced } from './components/SovereignVaultAdvanced';
import { OmniChannelGate } from './components/OmniChannelGate';
import { StealthWhisper } from './components/StealthWhisper';
import { CognitiveGuardrail } from './components/CognitiveGuardrail';
import { SystemTelemetryOverlay } from './components/SystemTelemetryOverlay';
import { InternalBenchmarkSimulator } from './components/InternalBenchmarkSimulator';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<HUDTab>('command_bridge');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Cross-component linked state
  const [selectedThreat, setSelectedThreat] = useState<ThreatRadarItem | null>(null);
  const [activeDNAProfile, setActiveDNAProfile] = useState<TokenDNAProfile>(TOKEN_DNA_PRESETS['pepe_drainer']);
  const [escrowInitialTarget, setEscrowInitialTarget] = useState<string | undefined>(undefined);

  // Audio synthesizer for cyber HUD clicks and sweeps
  const playCyberSound = (type: 'beep' | 'radar' | 'alarm' | 'click' = 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'beep') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'radar') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.linearRampToValueAtTime(680, now + 0.15);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  const handleTabChange = (tab: HUDTab) => {
    playCyberSound('click');
    setActiveTab(tab);
  };

  const handleSelectContractFromRadar = (item: ThreatRadarItem) => {
    playCyberSound('beep');
    setSelectedThreat(item);
    // Find or generate profile
    if (item.id === 'TR-9041') {
      setActiveDNAProfile(TOKEN_DNA_PRESETS['pepe_drainer']);
    } else if (item.id === 'TR-9042') {
      setActiveDNAProfile(TOKEN_DNA_PRESETS['aave_vault']);
    } else if (item.id === 'TR-9043') {
      setActiveDNAProfile(TOKEN_DNA_PRESETS['solana_rug']);
    } else {
      setActiveDNAProfile({
        contractAddress: item.address,
        tokenName: item.name,
        symbol: item.symbol,
        network: item.network,
        dnaHash: item.bytecodeHash,
        canonicalMatch: { name: 'Standard Verified Template', similarity: 88, verdict: item.statusMessage },
        ancestorTree: [
          { node: 'Deployer Origin (EOA)', relation: 'Direct deployment from funded wallet', risk: item.threatLevel === 'critical' ? 'high' : 'low' },
          { node: item.name, relation: 'Current bytecode representation', risk: item.threatLevel === 'critical' ? 'high' : 'low' }
        ],
        trustScore: 100 - item.threatScore,
        zkpProofHash: 'ZKP-' + item.bytecodeHash.substring(0, 16),
        decompiledMetrics: {
          honeypotRisk: item.threatLevel === 'critical' ? 95 : 5,
          taxTamperRisk: item.threatLevel === 'critical' ? 88 : 2,
          hiddenMintRisk: item.threatLevel === 'warning' ? 70 : 0,
          proxyBackdoorRisk: item.threatLevel === 'critical' ? 92 : 0,
          blacklistedFunctions: item.threatLevel === 'critical' ? ['setTax(uint256)', 'drainTreasury()'] : []
        },
        steganographyEmbedding: {
          pixelMatrixSeed: item.bytecodeHash,
          carrierImageName: `${item.symbol.toLowerCase()}_carrier_v2.png`,
          payloadSizeKB: 14.8,
          embeddedEntropy: 0.9991,
          vlmDecoderStatus: 'STEGO_PAYLOAD_VALIDATED'
        }
      });
    }
    setActiveTab('token_dna');
  };

  const handleInitiateRescue = (item: ThreatRadarItem) => {
    playCyberSound('beep');
    setEscrowInitialTarget(item.address);
    setActiveTab('smart_escrow');
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative scanline-effect overflow-hidden">
        <div className="absolute inset-0 matrix-grid-bg opacity-30 pointer-events-none" />
        <PasswordGate
          onUnlock={() => {
            playCyberSound('beep');
            setIsUnlocked(true);
          }}
          lang={lang}
          onLanguageToggle={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        />
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col relative scanline-effect ${
        lang === 'ar' ? 'font-arabic' : 'font-sans'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background Matrix Grid */}
      <div className="fixed inset-0 matrix-grid-bg opacity-25 pointer-events-none z-0" />

      {/* Main Persistent Header Navigation */}
      <HeaderNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
        onLanguageToggle={() => {
          playCyberSound('click');
          setLang(lang === 'ar' ? 'en' : 'ar');
        }}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main HUD Viewport */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'command_bridge' && (
          <CommandBridgeView
            onNavigateTab={handleTabChange}
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'galaxy_3d' && (
          <Galaxy3DKnowledge
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'agent_swarms' && (
          <AgentSwarmsView
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'web_agent_hitl' && (
          <WebAgentHitl
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'sovereign_vault' && (
          <SovereignVaultAdvanced
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'omni_channel' && (
          <OmniChannelGate
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'stealth_whisper' && (
          <StealthWhisper
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'cognitive_guard' && (
          <CognitiveGuardrail
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'ai_oracle' && (
          <AutonomousOracleTerminal
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'whitehat_rescue' && (
          <WhitehatRescueBot
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'permit_revoker' && (
          <PermitAllowanceRevoker
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'war_games' && (
          <CyberWarGames
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'stress_benchmark' && (
          <InternalBenchmarkSimulator
            lang={lang}
          />
        )}

        {activeTab === 'solana_inspector' && (
          <SolanaInspector
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'preflight_sim' && (
          <PreFlightSimulator
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'forensic_mixer' && (
          <ForensicMixerTrace
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'bytecode_sandbox' && (
          <BytecodeDecompilerView
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'stego_lab' && (
          <StegoLabStudio
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'audit_cert' && (
          <AuditCertificateStudio
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}

        {activeTab === 'radar' && (
          <LiveThreatRadar
            threats={MOCK_THREAT_ITEMS}
            onSelectContract={handleSelectContractFromRadar}
            onInitiateRescue={handleInitiateRescue}
            lang={lang}
          />
        )}

        {activeTab === 'token_dna' && (
          <TokenDNAAnalyzer
            initialProfile={activeDNAProfile}
            lang={lang}
          />
        )}

        {(activeTab === 'agents' || activeTab === 'agent_engine') && (
          <MultiAgentEngine
            lang={lang}
          />
        )}

        {(activeTab === 'escrow' || activeTab === 'smart_escrow') && (
          <SmartEscrowHub
            initialTargetContract={escrowInitialTarget}
            lang={lang}
          />
        )}

        {(activeTab === 'vault' || activeTab === 'intel_vault') && (
          <IntelVault
            lang={lang}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureDiagram
            lang={lang}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            lang={lang}
          />
        )}

        {activeTab === 'api_gateway' && (
          <ApiGatewayDocs
            lang={lang}
            onPlaySound={playCyberSound}
          />
        )}
      </main>

      {/* Bottom Global Status Bar */}
      <footer className="relative z-10 border-t border-slate-900 bg-black/90 py-2.5 px-4 sm:px-8 font-mono text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>BLACK MATRIX MESH ONLINE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            {lang === 'ar' ? 'الاستشعار الصامت: نشط' : 'Silent Probing: ACTIVE'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-slate-500">
          <span>HNSW_VECTORS: 48,910</span>
          <span>FLASHBOTS_LATENCY: 24ms</span>
          <span className="text-emerald-500">ZKP_CIRCUITS_VERIFIED</span>
        </div>
      </footer>

      {/* System Telemetry Overlay (Bottom-Right) */}
      <SystemTelemetryOverlay lang={lang} />
    </div>
  );
}
