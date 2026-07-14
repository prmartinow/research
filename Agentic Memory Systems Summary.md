# Agentic Memory Systems Summary

## 1. Cognitive and Temporal Taxonomies

- **Temporal Horizons**:
  - **Working Memory**: Context window buffer. Overloading it causes "context rot" or context defocus.
  - **Episodic Memory**: Raw, timestamped, append-only records of actions, tool logs, and conversations.
  - **Semantic Memory**: De-contextualized rules, preferences, and facts abstracted from episodic history.
  - **Procedural Memory**: How the agent acts (evolving system instructions, cached function logic, or tool schemas).

- **The "Semantic Drift" Problem**:
  - When memory is managed as a black-box, external database pipeline (chunking, embedding, graph extraction), it often diverges from the agent’s actual epistemic intent.
  - Modern systems resolve this by exposing memory operations as first-class tools (e.g. Letta, LangMem) that the agent controls directly via an internal monologue.

---

## 2. Deep Deconstruction of Tool Paradigms

### A. Fact Extraction & Preference Layers

- **mem0**: Distills atomic facts in a vector store but suffers from "ADD-only" constraints. It does not invalidate outdated facts, leading to conflicting records (e.g., storing both "prefers Messi" and "prefers Ronaldo") that the model must resolve at runtime.
- **Mastra (Observational Memory)**: Runs Observer and Reflector background agents. Offloads conversation history to stable observation logs (compressing context 5x to 40x) and applies temporal gap markers to handle elapsed time.
- **Hindsight**: Uses Retain/Recall/Reflect operations across World, Experience, and Mental Model networks. However, it requires a massive retrieval budget (~8,192 tokens) and lacks granular deletion, requiring a database wipe to remove noise.
- **LangMem**: Optimized for LangGraph. Uniquely evolves procedural memory by automatically proposing prompt refinements based on task success or failure.

### B. Graph & Temporal Memory Engines

- **Graphiti / Zep**: Utilizes a temporal knowledge graph with bi-temporal modeling—distinguishing valid time (when the fact was true) and transaction time (when ingested)—ensuring Point-in-Time querying to prevent hallucinations from evolved facts.
- **Cognee**: Self-evolving memory pipeline (Extract, Consolidate, Link) housed entirely inside a single Postgres instance (RDF ontologies). It relies on accessed/ignored/corrected events as implicit feedback signals to prune graph nodes.
- **MAGMA**: Decouples memory into 4 orthogonal graphs: Semantic, Temporal, Causal, and Entity. Uses an adaptive traversal policy based on query intent (e.g., topological sorting on the causal graph for root-cause analysis).
- **A-MEM**: Inspired by Zettelkasten. Learns link generation and updates older memories retroactively as new experiences occur.

### C. OS-Inspired Runtimes

- **Letta (formerly MemGPT)**: Maps working context to Core (RAM), Recall (disk/cache), and Archival (vector DB) tiers. The agent uses system calls to swap pages, but this requires continuous heartbeat loops and inner monologue, raising token costs.
- **MemoryOS (BAI-LAB)**: Implements an access-driven promotion system. Summarized dialogue sessions are ranked by a dynamic "heat" metric (access frequency, recency, length); only hot pages are promoted to long-term memory.
- **EverMemOS**: Local-first, Markdown-native memory. Tracks engrams as versioned Markdown files synced to SQLite/LanceDB. Implements space isolation (projects/personal) and strict sensitive content guards.

### D. Local & Offloading Tools

- **TencentDB-Agent-Memory**: Combats context bloat via "Symbolic Short-Term Memory." It offloads verbose tool dumps to external Markdown files (`refs/*.md`) and replaces them in-context with a compact, dynamic Mermaid execution graph, reducing token usage by 61% and improving task success rates.
- **Context-Mode**: An MCP server that intercepts large tool outputs, caches them in SQLite FTS5, and returns a reference token.
- **Basic-Memory**: Obsidian-inspired markdown notes with ChromaDB, decaying memories via a weighted formula: `(relevance × 0.5) + (recency × 0.3) + (importance × 0.2)`.
- **MemPalace (Debunked)**: Independent audit shows the "Palace" is actually a flat ChromaDB collection managed via metadata filters, and its "lossless AAAK compression" is a lossy regex summarizer that drops text and degrades retrieval accuracy by 12.4%.
- **Memvid**: Single-file, Rust-embedded WAL-backed `.mv2` format. Bundles HNSW vectors, BM25 lexical, B-tree temporal indices, and WAL in one file. Allows instant startup (~145ms) and time-travel debugging.

---

## 3. Core Structural Challenges & Strategic Outlook

- **The Context Saturation Gap**: Windows up to 1M tokens allow benchmarks to be bypassed simply by dumping raw history in-context. True evaluation must prioritize the Cost-Latency-Accuracy triad over accuracy alone.
- **Active Forgetting**: The frontier of agent memory. No system has resolved dynamic, policy-learned memory decay and deletion, which leads to precision decay over millions of tokens.
- **The Three Paradigm Shifts**:
  1. From Flat Vector to Graph/Temporal Topologies (bi-temporal versioning).
  2. From Lossy Compression to Context Offloading (Symbolic maps replacing raw logs).
  3. From Pipeline to Tool (Agent-controlled memory mutation).
