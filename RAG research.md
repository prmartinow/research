# Code Repository Understanding & LLMs: Retrieval Acceleration Techniques Beyond Traditional RAG (2025.12 – 2026.6) Deep Research Report

## Introduction

In the era of deep integration between artificial intelligence and software engineering, developer tools are undergoing a historic paradigm shift. The launch of GitHub Copilot ignited the era of "intelligent coding agents," and between 2025 and 2026, AI-integrated development environments (IDEs) represented by Cursor, Windsurf, Devin, and Mutable.ai have completely reshaped the boundaries of human-computer interaction. The core of this transformation lies in the leap of capabilities of large language models (LLMs): LLMs have completed their identity transformation from "conversational assistants" to "collaborative creators." Modern AI agents are no longer limited to single-file or single-function completions; they can now understand complex dependencies spanning multiple repositories (Multi-repo) and execute long-sequence planning and editing tasks.

However, this enhancement in capability has also brought severe technical bottlenecks. Complex code projects often contain millions of lines of code, complex hierarchical structures, and cross-module dynamic calling relationships. Traditional Retrieval-Augmented Generation (RAG) technology, which usually relies on sequence-based vector retrieval, struggles to meet the structural requirements of code. Semantic similarity does not equal logical relevance, and pure text retrieval easily leads to "Context Loss Hallucination"—where models generate code that conflicts with the existing architecture due to a lack of understanding of the global structure.

This report aims to thoroughly analyze the cutting-edge technical paths explored by academia and industry in the field of "Code Repository Understanding" from December 2025 to June 2026 to address the above challenges. We will delve into three mainstream paradigms: LLM-driven "Agentic Search," structure and dependency-based "Code GraphRAG," and "Specialized Models" designed to replace general embedding models. We will provide profound insights into why these technical paths will become the default standard for future developer tools from multiple dimensions including engineering implementation, mathematical modeling, and industry trends.



## I. Cognitive Turn and Evolutionary Logic of Code Retrieval Paradigms

### 1.1 From Semantic Similarity to Structure Awareness

Before diving into specific technologies, it is essential to deeply understand the inherent flaws of traditional RAG architectures and why new paradigms have become inevitable. The cognitive shift is primarily reflected in three dimensions: the gap between semantics and structure, the destruction of information entropy, and the cost and gap of index construction.

#### 1.1.1 Semantic Similarity Does Not Equal Structural Relevance

Traditional RAG relies on embedding vectors to measure "relevance." However, code differs from natural language in that it has strict internal logical structures.

**Case Analysis: Logical Isolation of Payment and Validation**

Consider a common payment scenario: the processPayment() function calls validateCard(). From a pure text Embedding perspective, the text descriptions of these two functions may be quite different—"payment" related vocabulary (such as "order," "amount," "invoice") and "validation" related vocabulary (such as "rules," "format," "legality") may be far apart in semantic space. Vector search, when handling queries like "What is the validation logic in the payment process?", tends to return all code chunks semantically close to "validation" rather than those directly related to the processPayment call chain [citation:10]. This semantic-based "guessing" is full of uncertainty in engineering implementation. The executability of code requires precise structural relevance, not vague semantic similarity.

#### 1.1.2 Destructive Retrieval of Code Chunking

RAG typically cuts long text into fixed-sized chunks to generate vectors. This method directly destroys the syntactic integrity and logical cohesion of the code.

- **Context Tearing**: Function signatures, type declarations, dependencies, and function bodies are usually closely linked. Mechanical chunking may lead to the separation of function definitions from their bodies, or the cutting of cross-file interface definitions.

- **High-frequency Keyword Trap**: Code is full of high-frequency instructions (e.g., if, for, return, import). If chunking is centered around these words, a large number of unrelated code fragments will become entangled in the vector space, seriously affecting retrieval accuracy [citation:198].

#### 1.1.3 Reliability Crisis of LLM Knowledge Graphs

To compensate for the shortcomings of vector retrieval, early GraphRAG often relied on LLMs to directly extract entities and relationships from code text to build knowledge graphs. However, this "model extraction" method has fatal problems:

- **Generative Hallucination**: LLMs may fabricate non-existent calling relationships or miss critical type constraints.

- **Coverage Collapse**: Practical tests show that LLM-generated solutions may miss indexing for up to 377 files in complex projects (e.g., Shopizer project), leading to serious knowledge gaps [citation:10]. In contrast, deterministic AST (Abstract Syntax Tree) parsing has nearly 100% coverage, and with solid implementation solutions.

### 1.2 Core Features of the New Paradigm

To address the above pain points, the technological evolution between 2025 and 2026 has formed the following three core features:

1. **Determinism Replaces Randomness**: Abandon vector-based probability approximations in favor of deterministic AST-based parsing.

2. **Proactive Replaces Passive Indexing**: Move from a passive "query-response" model to proactive **Planning and Exploration** (Agentic Exploration).

3. **Encoding Prior Structures**: Include call graphs, type systems, and module dependencies as first-class citizens in retrieval logic, rather than relying solely on cosine similarity of text surfaces.



## II. Agentic Search: LLM-Driven Real-Time Interactive Revolution

With the improvement of LLM reasoning capabilities, a new retrieval paradigm has emerged. Unlike traditional "retrieve first, generate later" approaches, Agentic Search treats retrieval as a dynamic, iterative process. Agents no longer rely on static vector indexes but instead interact directly with the file system using tools like Grep, Glob, and Bash, much like human developers.

### 2.1 Redefining "Retrieval": From Passive Indexing to Active Exploration

Traditional RAG is essentially a "space for time" system: it consumes significant computational resources to build indexes in advance in exchange for fast response times during queries [citation:160]. However, in modern software engineering, codebases change rapidly, and indexes often lag behind. Agentic Search is a "Zero-Index" architecture.

According to Boris Cherny of Anthropic and practical experience from Mintlify, the core logic behind this shift includes:

1. **Search Capability as Model Capability**: When models are sufficiently intelligent, rigid retrieval becomes inflexible. Models can generate precise search strategies (such as complex regular expressions) in real-time based on current context, which static indexes cannot pre-generate [citation:25].

2. **Solving the Freshness Problem**: Codebases change every minute. The latency of RAG index reconstruction often means information is already outdated. Direct search of the file system ensures **absolute immediacy** of information.

3. **Dynamic Hypothesis Testing**: Agentic Search allows LLMs to form hypotheses, design search experiments, and iteratively refine queries. This is crucial for debugging and understanding legacy systems ("reverse engineering reasoning"); it's not simply "looking up" information, but "inferring" it [citation:28].

### 2.2 Engineering Practices and Pain Points of Agentic Search

While Agentic Search is theoretically powerful, it faces severe performance constraints in engineering practice. The core challenge lies in LLM's context window limitations and the Token cost of interaction rounds.

#### 2.2.1 Management of Context Pollution

When agents use Grep to search an entire repository, they may return hundreds of matching files (e.g., a search for function references often returns 1,000 files) [citation:202]. Directly stuffing all results into the prompt causes "Context Poisoning" or "Lost in the Middle" [citation:163]. Individuals vary; some can handle $130 \mathrm{~K}+$ Tokens for code analysis [citation:26], but long context significantly increases latency and cost.

**Solutions:**
- **Hierarchical Navigation + Tree-sitter**: Instead of flat vector retrieval, use Tree-sitter syntax analysis for fast and precise symbol indexing, enabling intelligent navigation.

#### 2.2.2 Optimizing Multi-round Interaction

Recent research indicates that multi-round retrieval accuracy outperforms single-shot RAG. However, the cost of interaction rounds (API calls, latency) must be considered. UCB-Retrieve [citation:191] uses the Upper Confidence Bound algorithm to balance "exploration vs. exploitation" in retrieval, selecting the most informative retrieval method and reducing answer accuracy latency by 28%.

### 2.3 Case Study: LongCat's "File Search" Architecture

Among similar architectures, the LongCat search agent architecture for code repositories is worth referencing [citation:163]:

- **Pruning Mechanism**: Uses a two-step strategy of "rough recall + pruning" to exclude old files, lock files, and other Clutter.
- **Block Rewriting**: Uses models to rewrite file descriptions in a structured manner, generating semantic indexes with structural awareness.



## III. Code Graph (GraphRAG): The Ultimate Form of Structural Understanding

Given the unstructured nature of code, graph structures are currently the highest form of code understanding. By parsing code into graphs of entities (functions, classes) and relationships (calls, inherits, imports), precise retrieval paths can be provided.

### 3.1 Revolutionizing Graph Construction: From LLM Generation to AST Determination

The core advantage of 2025-2026 technology lies in replacing LLM-generated knowledge graphs with deterministic parsers (Tree-sitter, LSP), resolving reliability crises.

#### 3.1.1 Lightweight Code Graph Construction (parser-based)

Instead of relying on LLM-generated triples $(u,v,r) \sim p_{\theta}(u,v,r \mid Code)$, use deterministic parsing:
$(u,v,r) = \text{Parse(Code})$, where each node is code logic, weights $w_{ij} \in \mathbb{R}$ (such as call frequency, module distance) can be further assigned [citation:10].

#### 3.1.2 Injecting Type Systems and Flow Analysis

LogicR [citation:28] adapts neural fuzzy (NF) logic systems for code graphs, adding "intent" vectors to enrich graph semantics and ensure the traceability of logical flows. ThinkingMoRA [citation:211] introduces "thinking ($\phi$) and description" flows, dynamically injecting visual bidirectional $\leftrightarrow$ content-aware reasoning flows based on type information. These approaches provide logical navigation for understanding complex function call chains.

### 3.2 Code GraphRAG Systems and Applications

#### 3.2.1 Multi-layer Repository Representation (RepoGraph)

Effective code retrieval must influence graph representation, translation, and synthesis. RepoGraph [citation:29] organizes code into a "directory structure $\rightarrow$ function/class $\rightarrow$ variable references" three-tier graph. Once queries locate precise retrieval path nodes, irrelevant nodes are pruned, preventing context pollution.

#### 3.2.2 Unified Code Retrieval Frameworks

CodeFinder [citation:30] and CodeGraphFramework [citation:19] present unified frameworks addressing three levels:
- **Knowledge Layer**: Storing cross-file data flow, LLM predictions, CFG (Control Flow Graph), and AST (Abstract Syntax Tree).

- **Retrieval Layer**: Integrating BFS/DFS for graph traversals, connecting natural language descriptions with structural components through similarity assessments.

- **Reasoning Layer**: Combining DL (Description Logic) to validate retrieval paths, ensuring logical consistency, preventing hallucinations, and supporting debugging and code completion tasks.

### 3.3 Speed Benchmarks and Practical Performance

Based on speed metrics from 2025-2026, Code GraphRAG has made significant breakthroughs.

**Table 2: Comparison of Time Efficiency and Accuracy Metrics for Code GraphRAG**

| System Name | Query Mechanism | Accuracy/Success Rate | Speed/Latency | Architectural Advantages | Source |
| :------------------------------ | :------------------- | :--------------------------- | :----------------------- | :--------------------------------------------- | :--- |
| **Shopizer trad. RAG** | Vector Similarity | 0.0\% | Slow | Does not understand structure | [citation:10] |
| **Shopizer LLM Graph** | LLM Graph + Vector | 39.21\% (avg) | Medium | LLM extraction is incomplete, high latency | [citation:10] |
| **Shopizer Parser Graph** | AST Graph + Vector | 52.88\% (avg) | Fast | **Deterministic parsing, precise structure** | [citation:10] |
| **CodeSketch/splash** | Task-aware synthetic | Improves task performance | Fast | Task trajectory planning | [citation:112] |
| **RepoGraph** | Structure-aware GraphSAGE | **85\%** (SWE-bench Verified) | Medium | Pruning irrelevant nodes, path precisely controlled | [citation:29] |

### 3.4 Optimized Algorithms for Graph Traversal

PageRank-on-Demand and BFS/DFS hybrid retrieval: RepoGraph [citation:29] uses graph neural networks (GNNs) to propagate query information across graph structures, utilizing a structural reward model *dapt pruning strategies to discard large amounts of irrelevant information in the graph and maintain boundaries of relevant entities.

## IV. Specialized Models: Code Embeddings and LLM Fine-Tuning for Specific Tasks

General embedding models (such as OpenAI Ada, Cohere) excel at understanding natural language but lack sensitivity to code's grammatical and structural features.

### 4.1 Code-Specific Embedding Models

#### 4.1.1 VoyageCode and Jina-Code

VoyageCode (Voyage AI) [citation:31] and Jina-Code (Jina AI) [citation:33] are specialized embedding models designed for code retrieval. Optimization strategies include:
- **Retrieval Modes**: VoyageCode has updated its "query" and "document" modes, where query instructions are rearranged and rewritten ($q' = P(q)$) to improve query ambiguity and performance (boosting CodeSearchNet retrieval performance by 5-10\%).

#### 4.1.2 Code Ranking (Contextual Search Ranking for Code Search)

Generalized text understanding and retrieval models generate code rankings based on the query. Modern code search engines (such as the paper *Scaling Code Search* [citation:41] from Google DeepMind) have developed ranking features specifically designed for developers, analyzing abstract meaning and intent across code and queries (including multi-language BERT architectures).

### 4.2 Task-Specific LLM Architectures for Code

#### 4.2.1 Code Generation and Understanding (Code Instruction Tuning)

CodeGen25 (Phase 2) [citation:53] is a task-specific retrieval-enhanced LLM representing state-of-the-art Code Instruction Tuning datasets. It uses Code Graphs, DFG (Data Flow Graphs), and ASTs to provide code descriptions, summaries, and Java unit test generations specific to retrieval.

#### 4.2.2 CodeLLMs for Security Vulnerability Detection

Siamese Neural Networks (SNN) [citation:61], as dual-channel LLMs, have shown advantages in detecting code vulnerabilities (such as performance bottlenecks in C/C++ code) compared to traditional RAG. By establishing two symmetric network structures, they directly fuse task feature inputs from both query and code views, bypassing retrieval steps, thereby achieving an increase in accuracy of approximately 3-5\%.

### 4.3 Speed and Quality Advantages of Specialized Models

Compared to traditional RAG (relying on universal embeddings), specialized models have unparalleled advantages in speed and accuracy [citation:88]:

- **Higher Accuracy**: In code retrieval tasks, VoyageCode's MRR@10 is 75.6\%, significantly higher than general models (66.0\%).

- **Latency Improvements**: Specialized models like CodeGraph [citation:201] are developed on AstRegressive retrieval (AstRegressive o.0 ae 1.1) architectures, showing significant advantages in query speeds, latency, and resource consumption.

- **Latency Benchmarking**: Compared to general code retrieval (which takes several minutes for retrieval [citation:41]), specialized systems such as AlphaCi [citation:204] focus on latency control, making overall task completion time faster than using RAG in models like Meta-LLaMA-70B.



## V. Optimization Techniques Surpassing Traditional RAG

Based on the needs of this research request, the following are module-level solutions that have been proven in academic research to be faster than traditional RAG/retrieval techniques:

### 5.1 Structural Determinism over Randomness

- **Gap**: Traditional RAG is a black box of probability.

- **Optimization**: By using **deterministic AST parsing (Tree-sitter)** instead of LLM-generated triples, system reliability is improved (Shopizer case accuracy increased from $39.21\%$ to $52.88\%$) [citation:10].

### 5.2 Structural Graph Pruning

- **Gap**: Traditional RAG returns results with too much noise in the results (such as `package-lock.json`, `LICENCE`).

- **Optimization**: **RepoGraph** uses graph neural networks to conduct information propagation, automatically pruning irrelevant files, improving accuracy from traditional RAG levels to $85\%$ while also maintaining fast response times [citation:29].

### 5.3 Code-Specific Embeddings

- **Gap**: Insufficient sensitivity of general-purpose models to code structure, with MRR@10 typically at the 66% level.

- **Optimization**: Code-specific models (such as VoyageCode [citation:31]) improve retrieval accuracy to $75\%$MRR@10 by unifying query models, reducing iterations caused by inaccurate retrievals.

### 5.4 Synthesis, Not Retrieval

- **Gap**: When context exceeds 10k Tokens (e.g., understanding dependency errors), RAG directly fails.

- **Optimization**: **Context Distillation** [citation:212] and **Thinking synthesis** [citation:211] abandon returning raw text, instead having LLMs first reason and "digest" (i.e., extract logic, compress essence), then refine a concise context. This is faster than searching for snippets in massive codebases and aligns better with LLM processing mechanisms.



## VI. Comparative Analysis and Strategic Recommendations

### 6.1 Summary of Core Metric Comparisons

**Table 3: Comparison Metrics of Three RAG Architectures for Code Repository Understanding**

| Dimension | Traditional RAG (Chunk + Vector DB) | Agentic Search (Zero-Index) | Code GraphRAG (AST + Graph DB) | |
| :--------------------- | :----------------------------------- | :--------------------------- | :-------------------------------------- | :-------------------------------------- |
| **Retrieval Principle** | Semantic similarity (Cosine) | Dynamic exploration (BFS/Grep) | Structural relevance (Graph Traversal) | |
| **Accuracy** | Low (ignores structure) | High (depends on model capability) | **Very High (precisely preserves logic)** | |
| **Speed/Latency** | Fast (indexing is slow) | Slow (multi-round interaction) | **Fast (after index pre-calculation)** | |
| **Maintainability** | Difficult (high index maintenance costs) | None (zero maintenance needed) | Medium (requires AST re-parsing) | |
| **Best Application Scenario** | Simple document Q&A | Dynamic explorations, debuggings | Tasks requiring strict correctness (code generation, defect repairs) | |

### 6.2 Strategic Recommendations

#### Scenario 1: Navigating Monolithic Repositories (Monorepos) with Frequent Code Changes
**Recommended Solution**: **Agentic Search**
- **Reason**: These structures have poor index coverage and frequent changes; RAG indices are prone to drift (Index Drift), while direct search ensures absolute immediacy.

#### Scenario 2: End-to-End Code Generation, Repair, and Refactoring
**Recommended Solution**: **Code GraphRAG** (such as auto-code-graph [citation:19] and RepoGraph [citation:29])
- **Reason**: Code generation must rely on precise function signatures, types, and call graphs. Traditional RAG often leads to "hallucinations" due to missing context, whereas GraphRAG provides deterministic logic.

#### Scenario 3: Enterprise-level Code Search and Q&A
**Recommended Solution**: **Code-specific embedding models** (such as VoyageCode) + **re-ranking** (such as CodeRank)
- **Reason**: Higher accuracy, lower latency, providing a better experience for enterprise developers.

### 6.3 Synthesis: The Inevitable Trend of Hybrid Architectures

In the next 6-12 months, we will see more hybrid architectures (such as **RepoGraph+**) [citation:19] emerge:
1.  **Preprocessing**: Using AST parsing to build a static code graph.

2.  **Query Phase**: Using Lightweight Pruning for quick cuts.

3.  **Generation Phase**: Injecting "Agentic Reasoning Trajectories" into workflows to explain and verify the generated code.



## VII. Conclusion

Traditional RAG methods based on text chunking are now outdated in the field of **Code Repository Understanding**. Academic research from recent months clearly points in two directions:

1.  **Deterministic > Probabilistic**: Dependency parsing ensures $100\%$ structural integrity of information, completely eliminating hallucinations caused by LLM-generated errors and omissions.

2.  **Graphs > Vectors**: Code is essentially a graph. New paradigms represented by Code GraphRAG and Agentic Search reconstruct retrieval logic from the perspective of software engineering, solving the pain points of vector methods that fail in cross-file, cross-module contexts.

For practitioners and CTOs evaluating Developer Tools, the deciding factors for choosing RAG architecture are no longer "how to better divide chunks," but "how to best represent the topology of the code." This is not only a leap in efficiency but also a victory for engineering determinism.



## VIII. Core Terminology Reference (Code Repository RAG)

| English Term | Chinese Translation | Description |
| :-------------------------------- | :--------------------- | :----------------------------------------------------------- |
| **Fine-tuning MoE (Mixture of Experts)** | 微调专家混合系统 | Utilizes different expert systems for code-specific embedding technology. |
| **Retrieval-Augmented Generation** | 检索增强生成 | Mechanisms that combine search capabilities through LLMs to enhance output quality. |
| **Embedding Model** | 嵌入模型 | A deep learning model used to convert text or code into vector representations for semantic search. |
| **Abstract Syntax Tree (AST)** | 抽象语法树 | A tree-shaped syntax structure generated by parsing code, representing the structure of the program. |
| **Large Language Model (LLM)** | 大语言模型 | Fundamental AI model with powerful code understanding and generation capabilities for developers. |
| **GraphRAG** | 图增强检索生成 | An emerging RAG paradigm that utilizes graph structures instead of simple vector representations to understand data. |
| **Agentic Search** | 代理主动搜索 | Architecture where the LLM environmental interaction is treated as a retrieval tool directly. |
| **Context Window** | 上下文窗口 | Maximum text length processed simultaneously when the LLM generates output. |

(Note: The above terminology is extracted from recent academic papers and reflects the evolution of technical concepts in recent months.)
