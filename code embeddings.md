# Code Embeddings Models

The primary and most widely accepted standard for benchmarking code embedding models is the MTEB Code Leaderboard (Massive Text Embedding Benchmark), specifically utilizing the sub-frameworks MTEB-CoIR (Code Information Retrieval) and CodeSearchNet. These standardized evaluations assess how effectively an embedding model represents programming languages for tasks like text-to-code retrieval, code-to-code search, and semantic code analysis. [1, 2]  
Core Benchmarks for Code Embeddings 
When evaluating a code embedding model, the AI community relies on a few critical, comprehensive benchmark suites: 

• MTEB-CoIR (Code Information Retrieval): Built into the global MTEB Leaderboard, this framework consists of 10+ distinct tasks assessing text-to-code, code-to-text, and code-to-code retrieval capabilities. 
• CodeSearchNet (CSN): A foundational dataset mapping natural language queries to relevant code snippets across multiple programming languages (Go, Java, JavaScript, PHP, Python, and Ruby). 
• Syntactic & Functional Code Tests: High-quality code reasoning datasets often integrated into embedding benchmarks to test deep semantic comprehension: 

	• HumanEval & MBPP: Benchmarks traditionally used for code generation, but repurposed to evaluate how well an embedding maps functional requirements to identical solutions. 
	• SWE-bench: Evaluates the model’s competency in mapping long-form issue descriptions to complex codebase structures. 
	• IdBench: A specialized benchmark specifically designed for evaluating how well a model embeds source code identifiers and variable names. [2, 8]  

Leading Code Embedding Models Compared 
Based on performances recorded across the MTEB Code evaluations, models are divided into specialized open-weights models and generalized proprietary APIs. [2]  

| Model Type [2, 9, 10, 11, 12] | Model Name | Key Strengths / Benchmark Context | Cost / Availability  |
| --- | --- | --- | --- |
| Specialized Code | Jina Code Embeddings (0.5B / 1.5B) | Top-tier performance on MTEB-CoIR, heavily beating general models like Gemini-001 on code retrieval. | Open weights  |
| Specialized Code | Nomic Embed Code | Specifically fine-tuned for codebase chunking and local developer tools (like Cursor or Claude Code). | Open weights  |
| Proprietary API | Voyage AI (voyage-3-large) | Frequently cited as the best commercial API optimized specifically for code, technical documentation, and long contexts. | $0.18 per 1M tokens  |
| General Purpose | Qwen3-Embedding (8B) | Exceptional multilingual and text-to-code hybrid capability, dominating general open-source leaderboards. | Open weights  |

Key Evaluation Metrics 
Code embedding benchmarks evaluate models using specialized information retrieval (IR) metrics: 

• NDCG@10 (Normalized Discounted Cumulative Gain): Measures the relevance of code snippets in the top 10 returned results, heavily penalizing models that place highly relevant code lower in the stack. 
• MRR (Mean Reciprocal Rank): Vital for code search engines; it measures how quickly the exact target code block appears in the search results. 
• Spearman's Rho (ρ): Used in semantic similarity datasets (like IdBench) to evaluate if the model's calculated vector proximity matches human-annotated similarity. [8, 19]  

[1] https://modal.com/blog/6-best-code-embedding-models-compared
[2] https://arxiv.org/html/2508.21290v1
[3] https://huggingface.co/spaces/mteb/leaderboard
[4] https://arxiv.org/html/2402.01935v1
[5] https://gangiswag.github.io/cornstack/
[6] https://arxiv.org/html/2405.19032v1
[7] https://arxiv.org/html/2411.17538v2
[8] https://github.com/sola-st/IdBench
[9] https://pecollective.com/tools/best-embedding-models/
[10] https://www.morphllm.com/ollama-embedding-models
[11] https://www.baseten.co/blog/the-best-open-source-embedding-models/
[12] https://arxiv.org/html/2508.21290v1
[13] https://arxiv.org/html/2506.08354v1
[14] https://zeroentropy.dev/articles/best-embedding-model-overall-2026/
[15] https://towardsdatascience.com/how-to-find-the-best-multilingual-embedding-model-for-your-rag-40325c308ebb/
[16] https://arxiv.org/html/2402.16829v1
[17] https://dl.acm.org/doi/10.1145/3701228
[18] https://arxiv.org/html/2410.22240v1
[19] https://milvus.io/blog/choose-embedding-model-rag-2026.md
[20] https://www.youtube.com/watch?v=7G9q_5q82hY
[21] https://medium.com/open-intelligence/semble-the-semantic-code-search-library-that-gives-ai-coding-agents-94-recall-at-2-000-tokens-3fbd8031622f
[22] https://medium.com/google-cloud/mastering-agentic-development-with-gemini-and-roo-code-660a44e545c5

