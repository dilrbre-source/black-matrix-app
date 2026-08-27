import { ThreatRadarItem, TokenDNAProfile, AgentCell, RescueEscrowOperation, IntelBrief, RoadmapPhase, SystemStats } from './types';

export const INITIAL_SYSTEM_STATS: SystemStats = {
  mempoolTps: 4892,
  activeSensors: 128,
  dnaIndexedCount: 42890,
  totalRescuedUSD: 1845200,
  stegoEntropy: 0.9984,
  flashbotsLatencyMs: 24,
  networkStatus: {
    evm: 'OPTIMAL',
    solana: 'OPTIMAL',
    bitcoin: 'OPTIMAL'
  }
};

export const MOCK_THREAT_ITEMS: ThreatRadarItem[] = [
  {
    id: 'TR-9041',
    network: 'Ethereum',
    name: 'PepeShadow Drainer V4',
    symbol: 'PEPESHD',
    address: '0x71C8a1b269b2F0c2E29B1238D3Eb3499f57E4a9c',
    threatLevel: 'critical',
    threatScore: 96,
    statusMessage: 'Malicious Permit2 Approval Drainer Detected in Bytecode',
    liquidityLocked: false,
    lockDuration: '0 Days (Unlocked)',
    devReputation: 8,
    bytecodeHash: '0x3f4a9b2c8e119904bbff3019aa9234857ef0c19a9921',
    timestamp: 'منذ دقيقة',
    coordinates: { x: 38, y: 72, r: 18 },
    flagReasons: [
      'Bytecode contains hidden delegated transferFrom hijack',
      'Deployer funded through Tornado Cash 48h prior',
      'Ownership cannot be renounced (fake zero address override)',
      'High Honeypot trigger: 99.8% sell tax on non-whitelisted wallets'
    ],
    verifiedAudit: false
  },
  {
    id: 'TR-9042',
    network: 'Arbitrum',
    name: 'Aave L2 High-Yield Liquidity Vault',
    symbol: 'aUSDC-HY',
    address: '0x43b2C9a85B9D0F34A836798C332219Fc911aE102',
    threatLevel: 'safe',
    threatScore: 4,
    statusMessage: 'Verified OpenZeppelin Timelock & Multi-sig 5/7',
    liquidityLocked: true,
    lockDuration: '730 Days (Uncx Network)',
    devReputation: 98,
    bytecodeHash: '0x889210aaefbc223940192837bcdaea771928301827aa',
    timestamp: 'منذ 3 دقائق',
    coordinates: { x: 82, y: 35, r: 8 },
    flagReasons: [
      'Matches Canonical Aave V3 Vault Archetype (99.4% DNA match)',
      'Timelock delay of 48 hours enforced on all upgrades',
      'Audited by Trail of Bits & OpenZeppelin'
    ],
    verifiedAudit: true
  },
  {
    id: 'TR-9043',
    network: 'Solana',
    name: 'SolPulse Quantum Staking',
    symbol: 'SPULSE',
    address: 'So11111111111111111111111111111111111111112',
    threatLevel: 'warning',
    threatScore: 62,
    statusMessage: 'Temporary Liquidity Lock (14 Days) & High Dev Concentration',
    liquidityLocked: true,
    lockDuration: '14 Days (Raydium Lock)',
    devReputation: 45,
    bytecodeHash: '0x992317fae298172938172983719283019283019283aa',
    timestamp: 'منذ 6 دقائق',
    coordinates: { x: 55, y: 48, r: 14 },
    flagReasons: [
      'Top 3 wallets hold 48.2% of circulating supply',
      'Mint Authority remains active on SPL Token Metadata',
      'Short lock duration allows sudden liquidity withdrawal'
    ],
    verifiedAudit: false
  },
  {
    id: 'TR-9044',
    network: 'Base',
    name: 'BaseMoon Flash Arbitrage Token',
    symbol: 'BMOON',
    address: '0x99A8b72eD3302a9C14f34B7686523CcDbB889101',
    threatLevel: 'critical',
    threatScore: 89,
    statusMessage: 'Reentrancy Exploit Vector Found in Staking Router',
    liquidityLocked: false,
    lockDuration: 'None',
    devReputation: 12,
    bytecodeHash: '0xaa192830192830192830192830192830192830192830',
    timestamp: 'منذ 9 دقائق',
    coordinates: { x: 22, y: 85, r: 20 },
    flagReasons: [
      'External call before balance update (Checks-Effects-Interactions violated)',
      'Bytecode resembles Cream Finance Exploit Fork (89% similarity)',
      'Unprotected emergencyWithdraw() callable by arbitrary sender'
    ],
    verifiedAudit: false
  },
  {
    id: 'TR-9045',
    network: 'BSC',
    name: 'PancakeSwap Clone Safe Yield',
    symbol: 'PCSAFE',
    address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    threatLevel: 'warning',
    threatScore: 48,
    statusMessage: 'Unverified Fee Splitter Proxy & High Gas Slippage',
    liquidityLocked: true,
    lockDuration: '90 Days (PinkLock)',
    devReputation: 60,
    bytecodeHash: '0xbc182938102938471928301928371928301928301928',
    timestamp: 'منذ 12 دقيقة',
    coordinates: { x: 68, y: 60, r: 12 },
    flagReasons: [
      'Proxy upgrade implementation points to unverified bytecode',
      'Dynamic fee function can increase transfer tax up to 35%',
      'KYD trace shows 2 previous abandoned projects by same address'
    ],
    verifiedAudit: false
  },
  {
    id: 'TR-9046',
    network: 'Bitcoin',
    name: 'BRC-20 Inscription Multi-Sig Bridge',
    symbol: 'ORDI-BRG',
    address: 'bc1p5d7rjq7g6rd2ee0hn0454464qqxt4xn895428ux2ydngfdsqe5ss320',
    threatLevel: 'safe',
    threatScore: 8,
    statusMessage: 'Taproot Multi-Sig 4/6 & Chainlink CCIP Verified',
    liquidityLocked: true,
    lockDuration: 'Permanent Script Lock',
    devReputation: 95,
    bytecodeHash: '0x77192830192830192830192830192830192830192830',
    timestamp: 'منذ 15 دقيقة',
    coordinates: { x: 88, y: 18, r: 6 },
    flagReasons: [
      'Zero-knowledge attestation verified on Bitcoin L1 script',
      'Decentralized relayer set with threshold cryptography',
      'No custodial single point of failure detected'
    ],
    verifiedAudit: true
  }
];

export const TOKEN_DNA_PRESETS: Record<string, TokenDNAProfile> = {
  'pepe_drainer': {
    contractAddress: '0x71C8a1b269b2F0c2E29B1238D3Eb3499f57E4a9c',
    tokenName: 'PepeShadow Drainer V4',
    symbol: 'PEPESHD',
    network: 'Ethereum (ERC-20)',
    dnaHash: 'DNA-0x7F9A228B10C4-DRAINER-AST-v4',
    canonicalMatch: {
      name: 'Inferno Drainer Core Template',
      similarity: 94.7,
      referenceContract: '0x999900000000000000000000000000000000beef',
      verdict: 'تطابق عالي مع برمجية تصيد واحتيال مصنفة دولياً'
    },
    ancestorTree: [
      { node: '0xDeployer (Tornado Cash Funded)', relation: 'Deployer Origin (48h ago)', risk: 'high', timestamp: '2026-08-25 14:22:01' },
      { node: '0xProxyImplementation (Permit2 Hijack)', relation: 'Hidden Logic Slot [0x360894...]', risk: 'high', timestamp: '2026-08-25 14:25:30' },
      { node: 'Fake Uniswap V2 Router (Sandwich Injector)', relation: 'Liquidity Pair Target', risk: 'high', timestamp: '2026-08-25 14:30:12' },
      { node: 'Multi-Victim Approval Collector', relation: 'Sweeper Wallet', risk: 'high', timestamp: '2026-08-26 09:12:44' }
    ],
    trustScore: 7,
    zkpProofHash: 'ZKP-PROOF-0xFA88192083B1092837A8B7C9102938AA',
    decompiledMetrics: {
      honeypotRisk: 99.2,
      taxTamperRisk: 98.5,
      hiddenMintRisk: 88.0,
      proxyBackdoorRisk: 95.4,
      blacklistedFunctions: [
        'permit2BypassHook()',
        'emergencyDrainOwner()',
        'setDynamicFeeMax(uint256)',
        'lockUserTransfer(address)'
      ]
    },
    steganographyEmbedding: {
      carrierImageName: 'matrix_payload_pepe_stego.png',
      embeddedEntropy: 0.9992,
      payloadSizeKB: 48.6,
      vlmDecoderStatus: 'VERIFIED',
      pixelMatrixSeed: '0x71C8A1B2_NOISE_VECTOR_SHA256'
    }
  },
  'aave_vault': {
    contractAddress: '0x43b2C9a85B9D0F34A836798C332219Fc911aE102',
    tokenName: 'Aave L2 High-Yield Liquidity Vault',
    symbol: 'aUSDC-HY',
    network: 'Arbitrum (ERC-4626)',
    dnaHash: 'DNA-0x43B2C9A85B9D-AAVE-CANONICAL-v3',
    canonicalMatch: {
      name: 'Aave V3 Official ERC-4626 Vault',
      similarity: 99.4,
      referenceContract: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
      verdict: 'مطابق بنسبة شبه تامة للعقود المعتمدة من OpenZeppelin'
    },
    ancestorTree: [
      { node: 'Aave Governance Timelock 48h', relation: 'Admin Controller', risk: 'low', timestamp: '2026-01-10 10:00:00' },
      { node: 'Circle Verified USDC Reservoir', relation: 'Underlying Collateral Asset', risk: 'low', timestamp: '2026-01-10 10:15:00' },
      { node: 'Chainlink Price Feed Oracle (USDC/USD)', relation: 'Price Sentinel', risk: 'low', timestamp: '2026-01-10 10:20:00' }
    ],
    trustScore: 98,
    zkpProofHash: 'ZKP-PROOF-0x01192837192837192837192837192837',
    decompiledMetrics: {
      honeypotRisk: 0.0,
      taxTamperRisk: 0.0,
      hiddenMintRisk: 0.0,
      proxyBackdoorRisk: 1.2,
      blacklistedFunctions: []
    },
    steganographyEmbedding: {
      carrierImageName: 'matrix_payload_aave_safe.png',
      embeddedEntropy: 0.9981,
      payloadSizeKB: 32.1,
      vlmDecoderStatus: 'VERIFIED',
      pixelMatrixSeed: '0x43B2C9A8_SAFE_VECTOR_SHA256'
    }
  },
  'solana_rug': {
    contractAddress: 'So11111111111111111111111111111111111111112',
    tokenName: 'SolPulse Quantum Staking',
    symbol: 'SPULSE',
    network: 'Solana (SPL Token)',
    dnaHash: 'DNA-0x992317FA-SOL-RUG-MINT-v2',
    canonicalMatch: {
      name: 'Pump.fun Fast-Fork Deployer',
      similarity: 88.2,
      referenceContract: '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P',
      verdict: 'تشابه مع قوالب الرموز سريعة الإطلاق غير منزوعة الصلاحيات'
    },
    ancestorTree: [
      { node: 'Solana Ephemeral Creator Wallet', relation: 'Creator (Funded by FixedFloat)', risk: 'medium', timestamp: '2026-08-20 04:12:00' },
      { node: 'Raydium Liquidity Pool Account', relation: 'DEX Market Maker', risk: 'medium', timestamp: '2026-08-20 04:15:30' },
      { node: 'Unrevoked Mint Authority Account', relation: 'Privileged Key', risk: 'high', timestamp: '2026-08-20 04:18:00' }
    ],
    trustScore: 42,
    zkpProofHash: 'ZKP-PROOF-0x99281729837192837192837192837192',
    decompiledMetrics: {
      honeypotRisk: 40.0,
      taxTamperRisk: 65.0,
      hiddenMintRisk: 85.0,
      proxyBackdoorRisk: 50.0,
      blacklistedFunctions: [
        'spl_token::instruction::mint_to',
        'freeze_account_authority'
      ]
    },
    steganographyEmbedding: {
      carrierImageName: 'matrix_payload_sol_rug.png',
      embeddedEntropy: 0.9942,
      payloadSizeKB: 24.5,
      vlmDecoderStatus: 'VERIFIED',
      pixelMatrixSeed: '0x992317FA_SOL_VECTOR_SHA256'
    }
  }
};

export const AGENT_CELLS: AgentCell[] = [
  {
    id: 'AGENT-01',
    name: 'Mempool Sentinels',
    nameAr: 'حراس الميمبول (Mempool Sentinels)',
    role: 'Real-time On-Chain Transaction & Pending Contract Probing',
    roleAr: 'رصد التحويلات والعقود المبثوثة فوراً على الشبكة قبل التضمين في الكتل',
    status: 'ACTIVE',
    metrics: {
      throughput: '14,800 Tx/sec',
      entropyScore: '0.9998',
      lastSignal: 'منذ 1.2 ثانية',
      tasksCompleted: 1420880
    },
    encryptionMode: 'Pixel Noise Matrix Encoding',
    encryptionModeAr: 'تحويل بيانات الاستعلام الحية إلى ضوضاء بكسلية تشفيرية',
    description: 'Autonomous asynchronous sensor cells deployed on Cloudflare Edge nodes globally, capturing pending bytecode in unconfirmed blocks.',
    descriptionAr: 'خلايا استشعار لاتزامنية منشورة على أطراف شبكة Cloudflare العالمية لالتقاط أكواد العقود فور بثها بالـ Mempool.'
  },
  {
    id: 'AGENT-02',
    name: 'Token DNA Encoder',
    nameAr: 'مشفّر البصمة الجينية (Token DNA Encoder)',
    role: 'Decompilation, AST Vectorization & Unique Tamper-proof Hash Generation',
    roleAr: 'توليد التوقيع البرمجي الفريد كـ Hash غير قابل للتزوير وفهرسة السلالات',
    status: 'PROCESSING',
    metrics: {
      throughput: '340 Contracts/min',
      entropyScore: '0.9985',
      lastSignal: 'منذ 0.4 ثانية',
      tasksCompleted: 48920
    },
    encryptionMode: 'Optical Matrix Steganography',
    encryptionModeAr: 'تضمين البصمة الجينية داخل مصفوفات صور بصرية غير مشبوهة',
    description: 'Extracts opcodes, function selectors, and inheritance trees to map contract lineage against Supabase Vector DB & Neo4j graph nodes.',
    descriptionAr: 'تفكيك الـ Bytecode واستخراج المحددات وشجرة النسب ومطابقتها متجهياً مع قواعد بيانات Supabase و Neo4j.'
  },
  {
    id: 'AGENT-03',
    name: 'KYD Forensics Agent',
    nameAr: 'وكيل التحري الجنائي (KYD Forensics Agent)',
    role: 'Developer Ancestry, Fund Origin Tracing & Liquidity Lock Validation',
    roleAr: 'فحص تاريخ المطور، مصادر التمويل الأولى، وقفل السيولة والتقييم السلوكي',
    status: 'ACTIVE',
    metrics: {
      throughput: '92 Audits/min',
      entropyScore: '0.9991',
      lastSignal: 'منذ 2.1 ثانية',
      tasksCompleted: 18450
    },
    encryptionMode: 'ZKP Visual Report Seals',
    encryptionModeAr: 'تشفير تقرير التقييم (Trust Score) بتوقيعات ZKP داخل الملفات البصرية',
    description: 'Traces initial funding hops across mixers, bridges, and cross-chain relays to compute deterministic Developer Trust Scores.',
    descriptionAr: 'تتبع مسار الأموال الأولى عبر الجسور والخلاطات لحساب مؤشر ثقة المطور وتوليد إثباتات المعرفة الصفرية.'
  },
  {
    id: 'AGENT-04',
    name: 'Rescue & Escrow Agent',
    nameAr: 'وكيل الإنقاذ والضمان (Rescue & Escrow Agent)',
    role: 'Private Flashbots MEV Execution, Bounty Settlement & Asset Extraction',
    roleAr: 'تنفيذ عمليات السحب والإنقاذ واقتطاع نسبة (10-20%) وضمان استرداد الأصول',
    status: 'DEPLOYED',
    metrics: {
      throughput: '24ms MEV Relay Latency',
      entropyScore: '1.0000',
      lastSignal: 'منذ 3.8 ثواني',
      tasksCompleted: 342
    },
    encryptionMode: 'P2P Asynchronous Silent Decryption',
    encryptionModeAr: 'إرسال إشارات التنفيذ عبر قنوات P2P لاتزامنية معتمدة على مفتاح فك التشفير الصامت',
    description: 'Submits bundled private transactions to Flashbots relays and Chainlink CCIP to front-run drainers and rescue trapped user funds.',
    descriptionAr: 'تمرير حزم المعاملات الخاصة عبر Flashbots و Chainlink CCIP لاستباق المخترقين وإنقاذ أموال الضحايا بنجاح مشروط.'
  }
];

export const MOCK_RESCUE_OPERATIONS: RescueEscrowOperation[] = [
  {
    id: 'RESCUE-8821',
    targetAddress: '0x39B8...44a1',
    targetAsset: 'USDC / WETH LP (Uniswap V3)',
    network: 'Ethereum Mainnet',
    victimBalanceUSD: 145000,
    bountyPercentage: 15,
    rescueFeeUSD: 21750,
    status: 'COMPLETED',
    relayUsed: 'Flashbots Private Relay',
    reverseSimulationHash: '0x99f81a27b8401928371928371928371928371928371928371928371928371928',
    createdAt: '2026-08-27 08:14:22',
    steps: [
      { id: '1', title: 'Sweeper Bot Intercepted', titleAr: 'اعتراض روبوت المسح في الـ Mempool', detail: 'Identified malicious drain signature in mempool queue', detailAr: 'رصد توقيع محاولة السحب الخبيثة في طابور المعاملات', status: 'done', time: '08:14:22' },
      { id: '2', title: 'Private Bundle Assembled', titleAr: 'تجهيز حزمة المعاملات الخاصة', detail: 'Zero-gas transfer + bribed miner bundle via Flashbots builder', detailAr: 'إنشاء حزمة معاملات صفرية الغاز مع تحفيز المعدن', status: 'done', time: '08:14:24' },
      { id: '3', title: 'Conditional ZKP Validated', titleAr: 'التحقق من إثبات ZKP المشروط', detail: 'Verified victim entitlement proof without exposing private keys', detailAr: 'التحقق من ملكية الضحية للأموال دون كشف المفاتيح', status: 'done', time: '08:14:25' },
      { id: '4', title: '15% Escrow Split Settled', titleAr: 'تسوية نسبة الضمان (15%) وتحويل الصافي', detail: 'Transferred $123,250 USD to Safe Vault & $21,750 USD to Escrow', detailAr: 'تحويل 123,250 دولار للمحفظة الآمنة واقتطاع 15% للضمان', status: 'done', time: '08:14:27' }
    ]
  },
  {
    id: 'RESCUE-8822',
    targetAddress: '0x7A11...90f2',
    targetAsset: 'Compromised Staked SOL (Marinade)',
    network: 'Solana',
    victimBalanceUSD: 68000,
    bountyPercentage: 12,
    rescueFeeUSD: 8160,
    status: 'ZKP_VERIFIED',
    relayUsed: 'Chainlink CCIP',
    reverseSimulationHash: '0x33b8a19283719283719283719283719283719283719283719283719283719283',
    createdAt: '2026-08-27 09:05:10',
    steps: [
      { id: '1', title: 'Leaked Authority Key Detected', titleAr: 'اكتشاف تسريب مفتاح الصلاحيات', detail: 'Key published in malicious repo detected by VLM Decoder', detailAr: 'رصد المفتاح المسرب عبر مستودع مكشوف', status: 'done', time: '09:05:10' },
      { id: '2', title: 'De-stake & Fast Unstake Bundle', titleAr: 'حزمة فك الرهن الفوري السريع', detail: 'Routed unstake through Jito MEV Private Bundle', detailAr: 'تمرير المعاملة عبر حزمة Jito الخاصة', status: 'done', time: '09:05:12' },
      { id: '3', title: 'Cross-Chain CCIP Bridge to Cold Vault', titleAr: 'جسر CCIP إلى المحفظة الباردة', detail: 'Executing bridge relay to secure multi-sig cold address', detailAr: 'جاري تمرير الأصول المحررة للمحفظة الباردة متعددة التوقيع', status: 'active', time: '09:05:14' },
      { id: '4', title: 'Final Escrow Settlement', titleAr: 'التسوية النهائية للضمان', detail: 'Pending final block confirmation', detailAr: 'بانتظار تأكيد الكتلة النهائية', status: 'pending' }
    ]
  }
];

export const INTEL_BRIEFS: IntelBrief[] = [
  {
    id: 'INTEL-2026-089',
    title: 'Permit2 Signature Hijacking via Phantom Frontends',
    titleAr: 'اختطاف توقيعات Permit2 عبر واجهات وهمية متطورة',
    category: 'VULNERABILITY',
    classification: 'TOP_SECRET',
    date: '2026-08-26',
    summary: 'New breed of drainer contracts using obfuscated EIP-712 typed data hashing to drain ERC-20 allowances across multiple DEX routers simultaneously.',
    summaryAr: 'سلالة جديدة من عقود الاستنزاف تستغل تشفير بيانات EIP-712 لتمرير تفويضات السحب الجماعي دون تنبيه محافظ المستخدمين.',
    affectedProtocols: ['Uniswap V3 Routers', 'SushiSwap Trident', 'PancakeSwap V3'],
    mitigationRule: 'Enforce EIP-712 domain separator verification & strict non-zero nonce checks in Token_DNA AST analyzer.',
    mitigationRuleAr: 'تطبيق فحص فاصل المجال EIP-712 ومطابقة تسلسل الـ Nonce الصارم في محرك تحليل البصمة الجينية.',
    iocSignatures: [
      '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
      'SELECTOR: 0xd505accf (permit2BatchTransferFrom)'
    ]
  },
  {
    id: 'INTEL-2026-088',
    title: 'Solana Program Derived Address (PDA) Bump Seed Collision Attack',
    titleAr: 'هجوم اصطدام بذور PDA على برامج سولانا المالية',
    category: 'EXPLOIT_POSTMORTEM',
    classification: 'CONFIDENTIAL',
    date: '2026-08-24',
    summary: 'Analysis of a $4.2M liquidity exploit where unvalidated bump seeds allowed an attacker to substitute a fake vault PDA authority.',
    summaryAr: 'تحليل استغلال مالي بقيمة 4.2 مليون دولار نتج عن عدم التحقق من بذور الـ Bump مما أتاح استبدال عنوان الخزينة المعتمد.',
    affectedProtocols: ['Raydium Custom AMMs', 'Orca Whirlpool Forks'],
    mitigationRule: 'Verify find_program_address canonical bump and reject custom user-supplied bump arguments in bytecode scanner.',
    mitigationRuleAr: 'التحقق من صحة استدعاء find_program_address المعياري ورفض المعاملات التي تمرر معاملات bump خارجية.',
    iocSignatures: [
      'PDA_HASH: 0x99b82194819283719283719283719283',
      'INSTRUCTION: 0x04 (initialize_custom_vault)'
    ]
  },
  {
    id: 'INTEL-2026-087',
    title: 'Cross-Chain Bridge Message Replay via CCIP Fallback Loops',
    titleAr: 'إعادة بث رسائل الجسور عبر مسارات CCIP الاحتياطية',
    category: 'FORENSICS',
    classification: 'ECOSYSTEM_ALERT',
    date: '2026-08-21',
    summary: 'Forensic breakdown of replay vulnerability in multi-token bridge relay contracts omitting chainId hashing in cross-chain payloads.',
    summaryAr: 'تقرير جنائي يوضح ثغرة إعادة البث في عقود الجسور نتيجة إغفال تضمين معرف السلسلة chainId في حزم البيانات المنقولة.',
    affectedProtocols: ['LayerZero Endpoint V1 Adapters', 'Custom Axelar Relayers'],
    mitigationRule: 'Mandate deterministic chain-scoped keccak256 message hashing on all bridge receipts.',
    mitigationRuleAr: 'إلزامية تشفير الرسائل برمز السلسلة المقيد في كافة إيصالات المعاملات العابرة للسلاسل.',
    iocSignatures: [
      'TOPIC0: 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ]
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 1,
    days: 'الأيام 1 - 30',
    title: 'بناء النواة والرصد الصامت',
    titleAr: 'المرحلة الأولى: بناء النواة والرصد الصامت (Core Engine & Silent Probing)',
    status: 'completed',
    progress: 100,
    weeks: [
      {
        week: 'الأسبوع 1 - 2',
        weekAr: 'الأسبوع 1 - 2: خوارزميات البصمة الجينية ومحرك فك التشفير',
        goals: [
          'برمجة خوارزميات البصمة الجينية (Token_DNA) وتحويل الـ AST إلى متجهات',
          'تدريب محرك فك التشفير البصري الصامت (VLM Steganography Decoder)',
          'بناء بنك التوقيعات الأولية للعقود الخبيثة وقوالب الاحتيال المعروفة'
        ],
        goalsAr: [
          'برمجة خوارزميات البصمة الجينية (Token_DNA) وتحويل الـ AST إلى متجهات',
          'تدريب محرك فك التشفير البصري الصامت (VLM Steganography Decoder)',
          'بناء بنك التوقيعات الأولية للعقود الخبيثة وقوالب الاحتيال المعروفة'
        ],
        deliverables: [
          'Token_DNA AST Vectorizer (Accuracy: 99.4%)',
          'VLM Optical Pixel Noise Encoder / Decoder',
          '10,000+ Pre-indexed Exploit Signatures in Supabase Vector'
        ],
        deliverablesAr: [
          'محرك تجزئة الرموز وتوليد البصمة الجينية بدقة 99.4%',
          'محرك التشفير البصري والتمويه البكسلي الصامت',
          'أكثر من 10,000 توقيع خبيث مفهرس في Supabase Vector DB'
        ],
        completed: true
      },
      {
        week: 'الأسبوع 3 - 4',
        weekAr: 'الأسبوع 3 - 4: نشر خلايا الاستشعار والتجميع الصامت',
        goals: [
          'نشر خلايا الاستشعار على سحب موزعة (Cloudflare Edge Workers)',
          'بدء التجميع الصامت لبصمات العقود والمحافظ دون تصريح علني',
          'ربط قنوات الاستعلام الفائقة لشبكات EVM و Solana و Bitcoin'
        ],
        goalsAr: [
          'نشر خلايا الاستشعار على سحب موزعة (Cloudflare Edge Workers)',
          'بدء التجميع الصامت لبصمات العقود والمحافظ دون تصريح علني',
          'ربط قنوات الاستعلام الفائقة لشبكات EVM و Solana و Bitcoin'
        ],
        deliverables: [
          '128 Globally Distributed Edge Sensor Nodes',
          'Mempool ingestion rate > 14,000 tx/sec',
          'Live Neo4j Graph DB mapping developer funding trees'
        ],
        deliverablesAr: [
          '128 عقدة استشعار موزعة عالمياً على أطراف الشبكة',
          'معدل التقاط معاملات يفوق 14,000 معاملة/ثانية',
          'رسم خرائط العلاقات التفاعلية لمصادر تمويل المطورين في Neo4j'
        ],
        completed: true
      }
    ]
  },
  {
    phase: 2,
    days: 'الأيام 31 - 60',
    title: 'المحاكاة والتجربة الميدانية',
    titleAr: 'المرحلة الثانية: المحاكاة والتجربة الميدانية (Simulation & Field Trial)',
    status: 'in_progress',
    progress: 68,
    weeks: [
      {
        week: 'الأسبوع 5 - 6',
        weekAr: 'الأسبوع 5 - 6: إطلاق لوحة التحكم المغلقة وتمرير تقييم KYD',
        goals: [
          'إطلاق لوحة التحكم المغلقة (Internal Beta HUD) للمختبرين المعتمدين',
          'تمرير بيانات التقييم الملونة (KYD Forensics) في بيئة افتراضية تفاعلية',
          'تأمين بوابة الحماية (Password Gate) وعزل مفاتيح الـ API المشفرة'
        ],
        goalsAr: [
          'إطلاق لوحة التحكم المغلقة (Internal Beta HUD) للمختبرين المعتمدين',
          'تمرير بيانات التقييم الملونة (KYD Forensics) في بيئة افتراضية تفاعلية',
          'تأمين بوابة الحماية (Password Gate) وعزل مفاتيح الـ API المشفرة'
        ],
        deliverables: [
          'Visual Command HUD with Live Threat Radar',
          'Interactive Token_DNA Genetic Lineage Analyzer',
          'Hardware-accelerated Cyber Matrix Visual Dashboard'
        ],
        deliverablesAr: [
          'لوحة تحكم تفاعلية مع رادار حي ثلاثي الألوان لرصد المخاطر',
          'محلل البصمة الجينية مع شجرة النسب التفاعلية ومطابقة العقود',
          'واجهة استخدام سيبرانية فائقة السرعة مع دعم كامل للغة العربية'
        ],
        completed: true
      },
      {
        week: 'الأسبوع 7 - 8',
        weekAr: 'الأسبوع 7 - 8: إجراء 10 عمليات استرداد أخلاقي حية على شبكات الاختبار',
        goals: [
          'إجراء أول 10 عمليات استرداد أخلاقي حية على شبكات الاختبار (Testnets)',
          'التحقق من دقة التشفير البصري ومحاكاة التنفيذ المعكوس عبر Flashbots',
          'اختبار اقتطاع نسبة الضمان (10-20%) وتوزيع العوائد تلقائياً'
        ],
        goalsAr: [
          'إجراء أول 10 عمليات استرداد أخلاقي حية على شبكات الاختبار (Testnets)',
          'التحقق من دقة التشفير البصري ومحاكاة التنفيذ المعكوس عبر Flashbots',
          'اختبار اقتطاع نسبة الضمان (10-20%) وتوزيع العوائد تلقائياً'
        ],
        deliverables: [
          '10/10 Successful Testnet Rescue Proofs with Zero Slippage',
          'Flashbots Private Bundle latency benchmarked at < 30ms',
          'ZKP Conditional Escrow Smart Contracts deployed on Sepolia & Base Testnet'
        ],
        deliverablesAr: [
          '10 عمليات استرداد ناجحة بنسبة 100% وبدون انزلاق سعري على شبكات الاختبار',
          'سرعة استجابة حزم Flashbots الخاصة أقل من 30 مللي ثانية',
          'نشر عقود الضمان المشروط بـ ZKP على شبكتي Sepolia و Base Testnet'
        ],
        completed: false
      }
    ]
  },
  {
    phase: 3,
    days: 'الأيام 61 - 90',
    title: 'التوثيق والعرض المؤسسي',
    titleAr: 'المرحلة الثالثة: التوثيق والعرض المؤسسي (Packaging & Institutional Adoption)',
    status: 'upcoming',
    progress: 15,
    weeks: [
      {
        week: 'الأسبوع 9 - 10',
        weekAr: 'الأسبوع 9 - 10: حزم النتائج وتأمين واجهات الربط البرمجية',
        goals: [
          'حزم نتائج الأداء وتوثيق الأرقام ونسب النجاح في تقرير استثماري رسمي',
          'تأمين واجهات الربط البرمجية (APIs) وتوفير بوابات الاعتماد المؤسسي',
          'إطلاق أرشيف الأسرار والأبحاث (Intel Vault) لتغذية الشركاء لحظياً'
        ],
        goalsAr: [
          'حزم نتائج الأداء وتوثيق الأرقام ونسب النجاح في تقرير استثماري رسمي',
          'تأمين واجهات الربط البرمجية (APIs) وتوفير بوابات الاعتماد المؤسسي',
          'إطلاق أرشيف الأسرار والأبحاث (Intel Vault) لتغذية الشركاء لحظياً'
        ],
        deliverables: [
          'Institutional Institutional Security Audit Dossier',
          'High-Throughput Edge API Gateway with Rate Limiting & HMAC Auth',
          'Intel Vault Encrypted Feed Subscriptions'
        ],
        deliverablesAr: [
          'الملف الاستثماري والتقييم الأمني المؤسسي المعتمد',
          'بوابة واجهات برمجة التطبيقات (API Gateway) فائقة السرعة مع توثيق HMAC',
          'نظام اشتراكات بنك المعلومات الاستخباراتي المشفر'
        ],
        completed: false
      },
      {
        week: 'الأسبوع 11 - 12',
        weekAr: 'الأسبوع 11 - 12: تقديم العروض الرسمية وتوقيع عقود الدمج مع CEXs والمحافظ',
        goals: [
          'تقديم العروض الرسمية للمنصات المركزية (CEXs) والمحافظ الكبرى (Wallets)',
          'توقيع عقود الدمج والاعتماد الشامل للبصمة الجينية كمعيار أمان',
          'توسيع شبكة الإنقاذ والضمان الذكي لتغطية 20+ سلسلة بلوكشين'
        ],
        goalsAr: [
          'تقديم العروض الرسمية للمنصات المركزية (CEXs) والمحافظ الكبرى (Wallets)',
          'توقيع عقود الدمج والاعتماد الشامل للبصمة الجينية كمعيار أمان',
          'توسيع شبكة الإنقاذ والضمان الذكي لتغطية 20+ سلسلة بلوكشين'
        ],
        deliverables: [
          'CEX Ingestion SDK & Wallet Plug-and-Play Security Widget',
          'Partnership Pilot Agreements with Tier-1 Web3 Entities',
          'Multi-Chain CCIP Autonomous Rescue Network'
        ],
        deliverablesAr: [
          'حزمة SDK مخصصة للمنصات المركزية والودجات الجاهزة للمحافظ',
          'اتفاقيات تجريبية وشراكات استراتيجية مع كبرى كيانات الويب 3',
          'شبكة إنقاذ ذاتية عابرة للسلاسل تغطي أكثر من 20 شبكة'
        ],
        completed: false
      }
    ]
  }
];

export const ARCHITECTURE_NODES = [
  {
    id: 'edge',
    title: 'Cloudflare Edge Workers',
    titleAr: 'طبقة المعالجة الفائقة (Edge Layer)',
    description: '128 asynchronous sensor nodes listening to EVM, Solana & Bitcoin mempools at sub-millisecond latency.',
    descriptionAr: 'شبكة خلايا استشعار لاتزامنية على أطراف الشبكة لتمرير واستقبال استعلامات EVM و Solana و Bitcoin بسرعة فائقة.',
    tech: 'Cloudflare Workers / WASM / V8 Isolates',
    color: 'emerald',
    icon: 'Zap'
  },
  {
    id: 'convex',
    title: 'Convex Live State Engine',
    titleAr: 'محرك الجلسات والمزامنة اللحظية (Convex)',
    description: 'Zero-latency WebSocket data synchronization for active HUD telemetry, logs, and user security sessions.',
    descriptionAr: 'إدارة الجلسات ومزامنة البيانات الحية والملفات وسجلات النظام فورياً وبدون أي تأخير مع لوحة التحكم.',
    tech: 'Convex Database / Real-time Sync',
    color: 'cyan',
    icon: 'Radio'
  },
  {
    id: 'vector',
    title: 'Supabase Vector DB',
    titleAr: 'قاعدة البيانات المتجهية (Vector DB)',
    description: 'High-dimensional HNSW vector index storing Token_DNA embeddings and AST decompilation hashes for sub-second similarity queries.',
    descriptionAr: 'الفهرسة المتجهية لتخزين واستدعاء البصمات التشفيرية (Token_DNA) ومطابقة الأكواد في أجزاء من الثانية.',
    tech: 'Supabase pgvector / OpenAI Ada / Gemini Embeddings',
    color: 'purple',
    icon: 'Cpu'
  },
  {
    id: 'graph',
    title: 'Neo4j Graph Database',
    titleAr: 'قاعدة البيانات البيانية (Neo4j Graph)',
    description: 'Mapping deep developer ancestry, funding mixer hops, cross-wallet clustering, and liquidity pool relations.',
    descriptionAr: 'رسم الخرائط التفاعلية للعلاقات بين محافظ المطورين، مصادر التمويل الأولى، ومسارات التداول عبر الشبكات.',
    tech: 'Neo4j Cypher / Graph Data Science',
    color: 'amber',
    icon: 'Network'
  },
  {
    id: 'execution',
    title: 'Flashbots & Chainlink CCIP',
    titleAr: 'قنوات التنفيذ والتخفي (Execution Relays)',
    description: 'Private MEV bundles bypassing public mempools and cross-chain interoperability protocol for instant asset rescue.',
    descriptionAr: 'تمرير المعاملات والأوامر بعيداً عن المراقبة العامة في الـ Mempool ولضمان التنفيذ الفوري بين الشبكات.',
    tech: 'Flashbots Builder / Chainlink CCIP / ZK-Snarks',
    color: 'red',
    icon: 'ShieldCheck'
  }
];
