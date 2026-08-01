# Agent Memory Systems

A curated research taxonomy, architectural overview, and candidate repository index of **100% Fully Open-Source AI Agent Memory Systems**—classified across the 5-layer cognitive agent memory architecture.

---

## Cognitive Memory Architecture

Based on cognitive architecture research (such as the CoALA framework), LLM agents require a structured 5-layer memory stack to operate across instant execution, trajectory retention, conceptual reasoning, procedural skill execution, and enterprise context governance.

```
+-------------------------------------------------------------------+
|                     LAYER 1: WORKING MEMORY                       |
|  Baddeley Executive Model: Active context, scratchpad & tools     |
+-------------------------------------------------------------------+
                                  │
                                  ▼
+-------------------------------------------------------------------+
|                     LAYER 2: EPISODIC MEMORY                      |
|  Tulving Autobiographical: Verbatim logs, spatial/trajectory recall|
+-------------------------------------------------------------------+
                                  │
                                  ▼
+-------------------------------------------------------------------+
|                     LAYER 3: SEMANTIC MEMORY                      |
|  Tulving Semantic: Entity graphs, temporal facts, preference state|
+-------------------------------------------------------------------+
                                  │
                                  ▼
+-------------------------------------------------------------------+
|                     LAYER 4: PROCEDURAL MEMORY                    |
|  Squire Non-Declarative: Agent skills, playbooks, background rules|
+-------------------------------------------------------------------+
                                  │
                                  ▼
+-------------------------------------------------------------------+
|               LAYER 5: ORGANIZATIONAL & CONTEXT LAYER             |
|  Token compaction, prompt window caching, MCP metadata governance |
+-------------------------------------------------------------------+
```

---

## OSS Agent Memory Candidates

### 1. Working Memory (Layer 1)
*Baddeley's Executive Model: Ephemeral, active task context, scratchpads, and live agent control loops.*

- **[omnigent](https://github.com/omnigent-ai/omnigent)** (`Python`, `TypeScript`) — `MIT`
  - **Focus**: Meta-harness execution and live working memory hooks manager.
  - **Key Capabilities**: Coordinates live agent sessions across multiple CLIs, maintaining active tool bindings, working memory context, and scratchpad state.

---

### 2. Episodic Memory (Layer 2)
*Tulving's Autobiographical Memory: Append-only interaction logs, verbatim transcript recall, spatial maps, and session trajectories.*

- **[mempalace](https://github.com/MemPalace/mempalace)** (`Python`, `ChromaDB`) — `Apache 2.0`
  - **Focus**: Spatial hierarchy (Wings ➔ Rooms ➔ Halls ➔ Drawers) verbatim memory.
  - **Key Capabilities**: Eliminates LLM summary drift by indexing verbatim transcripts in a spatial mental palace for exact multi-turn retrieval.
- **[memvid](https://github.com/memvid/memvid)** (`Rust`) — `MIT`
  - **Focus**: Ultra-fast single-file binary memory format (`.mv2`).
  - **Key Capabilities**: Portable, WAL-backed Rust binary engine engineered to store low-latency episodic log trails for desktop and mobile runtimes.
- **[EverMemOS](https://github.com/EverMind-AI/EverMemOS)** (`Python`, `LanceDB`) — `Apache 2.0`
  - **Focus**: Engram-inspired MemCells & thematic MemScenes in Markdown.
  - **Key Capabilities**: Groups continuous session dialog into thematic scenes and structured Markdown engrams for contextual episodic recall.
- **[TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory)** (`TypeScript`) — `MIT`
  - **Focus**: Symbolic canvas mapping & episodic memory pyramid.
  - **Key Capabilities**: Combines visual symbolic canvas representations with hierarchical episodic logs for enterprise agent stacks.

---

### 3. Semantic Memory (Layer 3)
*Tulving's Semantic Model: Distilled atomic facts, temporal context graphs, OS-inspired virtual memory paging, and long-term user profiles.*

- **[graphiti](https://github.com/getzep/graphiti)** (`Python`, `Neo4j`) — `Apache 2.0`
  - **Focus**: Temporal Context Graphs with dynamic edge evolution.
  - **Key Capabilities**: Tracks how facts change over time, maintaining historical validity and edge evolution in property graphs.
- **[mem0](https://github.com/mem0ai/mem0)** (`Python`, `TypeScript`) — `Apache 2.0`
  - **Focus**: Intelligent fact extraction & user preference layer.
  - **Key Capabilities**: Dynamically extracts facts and preference updates across sessions for low-latency personalized vector/graph retrieval.
- **[Letta](https://github.com/letta-ai/letta)** *(formerly MemGPT)* (`Python`, `TypeScript`) — `Apache 2.0`
  - **Focus**: OS-inspired virtual memory paging.
  - **Key Capabilities**: Implements explicit memory management tools operating across Core Memory (working context), Recall Memory (episodic log), and Archival Memory (long-term semantic vector database).
- **[cognee](https://github.com/topoteretes/cognee)** (`Python`, `Rust`) — `Apache 2.0`
  - **Focus**: Graph-based ECL (Extract, Cognify, Load) memory platform.
  - **Key Capabilities**: Automatically constructs knowledge graphs and vector indices with semantic search pipelines for multi-agent teams.
- **[hindsight](https://github.com/vectorize-io/hindsight)** (`Python`, `TypeScript`) — `Apache 2.0`
  - **Focus**: Cognitive category memory (Facts, Mental Models, Rules).
  - **Key Capabilities**: Segregates long-term agent experience into distinct cognitive tiers for targeted belief-updating and rule retrieval.
- **[mastra](https://github.com/mastra-ai/mastra)** (`TypeScript`) — `Apache 2.0`
  - **Focus**: Observational memory & background agent workflows.
  - **Key Capabilities**: Uses background observer agents to continuously synthesize tool output traces into high-level semantic memories.
- **[MemOS](https://github.com/MemTensor/MemOS)** (`Python`) — `Apache 2.0`
  - **Focus**: Composable memory cubes & memory scheduling.
  - **Key Capabilities**: Provides a modular memory framework with asynchronous memory schedulers for graph and vector retrieval.
- **[MemoryOS](https://github.com/BAI-LAB/MemoryOS)** (`Python`) — `MIT`
  - **Focus**: Hierarchical memory paging (Short / Mid / Long term).
  - **Key Capabilities**: Implements multi-tiered memory lifecycles with cache eviction algorithms and standard MCP server integration.
- **[basic-memory](https://github.com/basicmachines-co/basic-memory)** (`Python`) — `MIT`
  - **Focus**: Wikilinked Markdown graph notes.
  - **Key Capabilities**: Maintains a human-readable Markdown file graph using double-bracket `[[wikilinks]]` for hybrid human-agent semantic memory.

---

### 4. Procedural Memory (Layer 4)
*Squire's Non-Declarative Memory: Encodes agent skills, execution playbooks, background memory consolidation routines, and workflow rules.*

- **[langmem](https://github.com/langchain-ai/langmem)** (`Python`) — `MIT`
  - **Focus**: Framework-native state & procedural store for LangGraph.
  - **Key Capabilities**: Provides native background memory extraction, semantic topic indexing, and long-term state persistence.
- **[always-on-memory-agent](https://github.com/GoogleCloudPlatform/always-on-memory-agent)** (`Python`) — `Apache 2.0`
  - **Focus**: Scheduled background LLM memory consolidation & procedural rules.
  - **Key Capabilities**: Periodically scans agent activity to synthesize core user profiles, prune stale entries, and consolidate key learnings.

---

### 5. Organizational & Context Layer (Layer 5)
*Prompt context management, token caching, sliding window compaction, and MCP metadata governance.*

- **[context-mode](https://github.com/mksglu/context-mode)** (`TypeScript`, `SQLite FTS5`) — `MIT`
  - **Focus**: Context window token caching & sandboxed execution.
  - **Key Capabilities**: Minimizes token consumption by caching large active contexts, compacting conversation buffers, and running sandboxed local code execution.

---

### Vector Storage (Infrastructure Layer)
*Underlying open-source vector databases and embedded storage engines supporting the 5-layer memory architecture.*

- **[Qdrant](https://github.com/qdrant/qdrant)** (`Rust`) — `Apache 2.0`
  - High-performance vector database tailored for high-dimensional payload filtering and hybrid retrieval in Layer 2 & Layer 3 stores.
- **[Chroma](https://github.com/chroma-core/chroma)** (`Python`, `Rust`) — `Apache 2.0`
  - Lightweight, embedded vector store powering local episodic and semantic memory engines (e.g., MemPalace, basic-memory).

---

## Summary Matrix

| Cognitive Memory Layer | Cognitive Origin / Foundation | Key Candidate Repositories | Primary Function |
|---|---|---|---|
| **Layer 1: Working Memory** | Baddeley's Executive Model | `omnigent` | Live session execution context & tool scratchpads |
| **Layer 2: Episodic Memory** | Tulving's Autobiographical | `mempalace`, `memvid`, `EverMemOS`, `TencentDB-Agent-Memory` | Verbatim logs, spatial recall, session trajectories |
| **Layer 3: Semantic Memory** | Tulving's Semantic Model | `graphiti`, `mem0`, `Letta`, `cognee`, `hindsight`, `mastra`, `MemOS`, `MemoryOS`, `basic-memory` | Fact extraction, temporal knowledge graphs, virtual memory paging |
| **Layer 4: Procedural Memory** | Squire's Non-Declarative | `langmem`, `always-on-memory-agent` | Agent skills, playbooks, background consolidation routines |
| **Layer 5: Organizational / Context** | Corporate Governance & MCP | `context-mode` | Token compaction, prompt caching & context sandbox |
| **Storage Infrastructure** | Vector Engine Substrates | `Qdrant`, `Chroma` | Underlying vector and payload indexing backends |
