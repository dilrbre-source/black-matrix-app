# TICKR Overview: Multi-Agent Financial Research System

## Core Architecture and Logic

TICKR operates as a dynamic, agentic research committee, moving beyond monolithic, single-pass LLM queries to distribute complex financial intelligence gathering and synthesis tasks. It leverages a dual-agent configuration, allowing users to toggle between two distinct agent modes: `gemini-3.6-flash` (Antigravity) and `perseus` (a more advanced agent paradigm). 

The logic flows across four sequential tiers of orchestration:

1. **Tier 1 (Data Gathering & Domain Analysis)**: Specialized sub-agents analyze distinct facets of the asset in parallel. These include agents for fundamentals, technical analysis, options flow, and insider trading patterns. The agents are equipped with tools such as Google Search and code execution to extract up-to-date information dynamically.
2. **Tier 2 (Case Construction & Impact Analysis)**: Agents synthesize the raw data into adversarial Bull (Upside), Bear (Downside), and Base cases. They simulate scenario impacts and conduct rigorous fact-checking against the retrieved SEC filings or broader web searches.
3. **Tier 3 (Judgment & Synthesis)**: A final executive synthesis logic evaluates the competing cases, resolves tensions, and structures the findings into a strict JSON schema (`ReportData`).
4. **Tier 4 (Media Production)**: A post-processing step converts the resulting debate script into a multi-speaker audio podcast briefing using the `gemini-3.1-flash-tts-preview` model, streaming audio directly to the user interface.

The orchestration happens within a Node.js/Express server that constructs the context for the agent, commands the simulation of this multi-agent process, and streams the execution live to the React frontend. 

---

## Detailed Data Flow

### 1. Request Initiation & Agent Bootstrapping
When a user initiates an analysis from the React frontend, they supply a stock ticker and optional custom instructions (currently disabled in the UI for consistent reporting). The frontend makes a POST request to `/api/analyze`. 

The Express server then:
- Dynamically loads specific skill files (`.md`) from the `/agent/` directory, treating them as inline instruction context to inject specific logic (e.g., guidelines for strict fact-checking, overriding pre-training hallucination for recent SEC data, avoiding assumptions about ETF synthetic derivatives, etc.).
- Assembles a rigid prompt enforcing the exact `ReportData` JSON output schema.
- Uses `@google/genai` to initialize an interaction session with either the `gemini-3.6-flash` agent or `perseus` agent depending on the user's toggle state.

### 2. Live Execution via SSE (Server-Sent Events)
The LLM interaction is handled as a stream. The agentClient maps raw managed agent stream events into frontend-friendly event types (`tool_call`, `tool_result`, `text`, `thinking`, `complete`).
- The backend streams these events (`data: {...}\n\n`) to the frontend in real-time.
- The React application parses these SSE events, mapping them to a real-time `AgentTimeline` visualization, which displays exactly what search queries the agent is running, its reasoning process, and the results it extracts from the web.

### 3. Output Exfiltration & Synthesis
Once the multi-agent reasoning completes, the agent formulates its final analysis report as a raw JSON blob matching the `ReportData` schema.
- A secondary background script is often employed to exfiltrate generated artifacts (such as the JSON output or audio podcasts) via the `/api/upload_artifact` backend endpoint, saving them in a dedicated `workspace/artifacts` directory.
- The React UI parses this JSON report and renders a rich, interactive dashboard.

### 4. Frontend Rendering Components
The React application utilizes the structured JSON to render various dynamic views:
* **Executive Verdict**: Summary, Conviction Score, and Key Takeaways.
* **Podcast Briefing**: An embedded audio player rendering the synthetic multi-speaker briefing.
* **Case Analysis**: Side-by-side grids of Upside, Downside, and Base Case theses.
* **Financial Charts**: Dynamic Recharts-based visualizers plotting price trends, fundamentals, sentiment trajectories, and options implied volatility.
* **Findings Grid**: Granular, date-stamped insights extracted directly from specific SEC filings or news reports with source URL links.

## Safeguards and Fact-Checking Logic

Because financial data requires high fidelity, specific guardrails are injected into the agent instructions:
- **Strict Grounding**: The agent is explicitly commanded to leverage findings extracted from SEC filings alongside web searches.
- **Differentiating Complex Assets**: The agent logic contains heuristics to avoid hallucinating mechanics about ETFs (e.g., distinguishing between physical replication like QQQ and synthetic/leveraged derivatives).
- **Recency Bias**: Agents are instructed to prioritize the most current figure derived from recent corporate actions or SEC documents over pre-training knowledge.
- **UI Disclaimers**: The frontend actively displays warning disclaimers stating that the system can make mistakes and should not be used as direct financial advice.

This multi-layered architecture ensures that TICKR operates as a transparent, trackable, and sophisticated financial intelligence engine, rather than just a simple chatbot wrapping an LLM.
