export type ThreatLevel = 'safe' | 'warning' | 'critical';
export type NetworkType = 'ALL' | 'EVM' | 'SOLANA' | 'BITCOIN';

export interface ThreatRadarItem {
  id: string;
  network: 'Ethereum' | 'Solana' | 'Arbitrum' | 'Base' | 'Bitcoin' | 'BSC';
  name: string;
  symbol: string;
  address: string;
  threatLevel: ThreatLevel;
  threatScore: number; // 0-100 (100 = critical threat, 0 = safe)
  statusMessage: string;
  liquidityLocked: boolean;
  lockDuration: string;
  devReputation: number; // 0-100
  bytecodeHash: string;
  timestamp: string;
  coordinates: { x: number; y: number; r?: number }; // Radar coordinates
  flagReasons: string[];
  pixelNoiseMatrix?: string;
  verifiedAudit?: boolean;
}

export interface TokenDNAProfile {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  network: string;
  dnaHash: string;
  canonicalMatch: {
    name: string;
    similarity: number;
    referenceContract?: string;
    verdict: string;
  };
  ancestorTree: Array<{
    node: string;
    relation: string;
    risk: 'low' | 'medium' | 'high';
    timestamp?: string;
    txHash?: string;
  }>;
  trustScore: number; // 0 - 100
  zkpProofHash: string;
  decompiledMetrics: {
    honeypotRisk: number; // 0-100%
    taxTamperRisk: number; // 0-100%
    hiddenMintRisk: number; // 0-100%
    proxyBackdoorRisk: number; // 0-100%
    blacklistedFunctions: string[];
  };
  steganographyEmbedding: {
    carrierImageName: string;
    embeddedEntropy: number;
    payloadSizeKB: number;
    vlmDecoderStatus: 'VERIFIED' | 'ENCODED' | 'STANDBY' | 'STEGO_PAYLOAD_VALIDATED';
    pixelMatrixSeed: string;
  };
}

export interface AgentCell {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  status: 'ACTIVE' | 'PROCESSING' | 'STEALTH_IDLE' | 'DEPLOYED';
  metrics: {
    throughput: string;
    entropyScore: string;
    lastSignal: string;
    tasksCompleted: number;
  };
  encryptionMode: string;
  encryptionModeAr: string;
  description: string;
  descriptionAr: string;
}

export interface RescueEscrowOperation {
  id: string;
  targetAddress: string;
  targetAsset: string;
  network: string;
  victimBalanceUSD: number;
  bountyPercentage: number; // 10% - 20%
  rescueFeeUSD: number;
  status: 'PENDING_SIG' | 'PRIVATE_RELAY_BROADCAST' | 'CCIP_BRIDGING' | 'ZKP_VERIFIED' | 'COMPLETED' | 'FAILED';
  relayUsed: 'Flashbots Private Relay' | 'Eden Network' | 'Chainlink CCIP' | 'Mempool MEV Bundle';
  reverseSimulationHash: string;
  steps: Array<{
    id: string;
    title: string;
    titleAr: string;
    detail: string;
    detailAr: string;
    status: 'done' | 'active' | 'pending';
    time?: string;
  }>;
  createdAt: string;
}

export interface IntelBrief {
  id: string;
  title: string;
  titleAr: string;
  category: 'VULNERABILITY' | 'FORENSICS' | 'EXPLOIT_POSTMORTEM' | 'ACTOR_PROFILING';
  classification: 'CONFIDENTIAL' | 'TOP_SECRET' | 'ECOSYSTEM_ALERT';
  date: string;
  summary: string;
  summaryAr: string;
  affectedProtocols: string[];
  mitigationRule: string;
  mitigationRuleAr: string;
  iocSignatures: string[];
}

export interface RoadmapPhase {
  phase: number;
  days: string;
  title: string;
  titleAr: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progress: number;
  weeks: Array<{
    week: string;
    weekAr: string;
    goals: string[];
    goalsAr: string[];
    deliverables: string[];
    deliverablesAr: string[];
    completed: boolean;
  }>;
}

export type HUDTab = 
  | 'command_bridge'
  | 'galaxy_3d'
  | 'agent_swarms'
  | 'web_agent_hitl'
  | 'sovereign_vault'
  | 'omni_channel'
  | 'stealth_whisper'
  | 'cognitive_guard'
  | 'radar' 
  | 'preflight_sim'
  | 'forensic_mixer'
  | 'whitehat_rescue'
  | 'permit_revoker'
  | 'war_games'
  | 'stress_benchmark'
  | 'solana_inspector'
  | 'token_dna' 
  | 'bytecode_sandbox'
  | 'stego_lab'
  | 'ai_oracle'
  | 'agents' 
  | 'agent_engine'
  | 'escrow' 
  | 'smart_escrow'
  | 'audit_cert'
  | 'vault' 
  | 'intel_vault'
  | 'architecture' 
  | 'roadmap' 
  | 'api_gateway';

export interface SystemStats {
  mempoolTps: number;
  activeSensors: number;
  dnaIndexedCount: number;
  totalRescuedUSD: number;
  stegoEntropy: number;
  flashbotsLatencyMs: number;
  networkStatus: {
    evm: 'OPTIMAL' | 'DEGRADED';
    solana: 'OPTIMAL' | 'CONGESTED';
    bitcoin: 'OPTIMAL';
  };
}
