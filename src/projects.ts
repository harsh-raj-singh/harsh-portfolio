export type Project = {
  title: string
  shortTitle: string
  domain: string
  year: string
  summary: string
  impact: string
  facts: string[]
  stack: string[]
  repo?: string
  live?: string
  accent: string
}

export const projects: Project[] = [
  {
    title: 'Orange Memory Fabric',
    shortTitle: 'Orange',
    domain: 'Agent memory / graph retrieval',
    year: '2026',
    summary:
      'A memory fabric for developer and agentic workflows that captures completed sessions, extracts durable insights, and recalls prior context from graph and vector stores.',
    impact:
      'Ships a live Next.js demo, Railway FastAPI backend, Neo4j graph memory, Chroma vectors, Supabase metadata, and MCP tools for recall.',
    facts: [
      'Completed-session pipeline writes unified Insight nodes instead of brittle problem/solution fragments.',
      'Scopes private user memory and shared company knowledge separately by email and organization.',
      'Includes recall_memory, checkpoint_context, store_session, inspect_graph, and Chroma inspection routes.',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'Neo4j', 'Chroma', 'Supabase', 'MCP'],
    repo: 'https://github.com/harsh-raj-singh/orange',
    live: 'https://site-sage-eta-18.vercel.app',
    accent: '#ff5a1f',
  },
  {
    title: 'Collections Voice Bots',
    shortTitle: 'Voice Bots',
    domain: 'Speech automation / fintech operations',
    year: '2026',
    summary:
      'Automated voice agents for customer upselling and EMI reminders, tuned for the operational realities of outbound collections workflows.',
    impact:
      'Engineered an end-to-end speech pipeline that reduced operational costs by ₹2.6M annually, reached sub-800ms latency, and cut costs by 40%.',
    facts: [
      'Owned the speech loop from campaign intent through voice interaction and follow-up routing.',
      'Optimized latency across speech recognition, reasoning, text-to-speech, and telephony handoff.',
      'Designed for collections workflows where response speed, reliability, and cost per call decide viability.',
    ],
    stack: ['Speech AI', 'ASR', 'TTS', 'Telephony', 'Latency engineering', 'Automation'],
    accent: '#0bb7ff',
  },
  {
    title: 'Saarthi',
    shortTitle: 'Saarthi',
    domain: 'Voice UX / visual assistance',
    year: '2026',
    summary:
      'A drop-in website assistant that calls users through ElevenLabs, captures page context on demand, and explains confusing UI with OpenAI vision.',
    impact:
      'Turns website confusion into a phone-based support flow without continuously streaming the user screen.',
    facts: [
      'Embeds with one script tag and opens a small callback widget on customer sites.',
      'Captures viewport, cursor crops, and DOM metadata only when the caller asks for help.',
      'Redacts sensitive fields and keeps ElevenLabs/OpenAI secrets server-side.',
    ],
    stack: ['Next.js', 'ElevenLabs', 'OpenAI Vision', 'TypeScript', 'Widget SDK'],
    repo: 'https://github.com/harsh-raj-singh/saarthi',
    accent: '#38c172',
  },
  {
    title: 'Next Read',
    shortTitle: 'Next Read',
    domain: 'Recommendation systems / full stack',
    year: '2026',
    summary:
      'A production-minded article recommender that ingests Hacker News stories, learns from reading behavior, and ranks a personalized feed.',
    impact:
      'Combines Supabase auth, protected cron ingestion, TF-IDF ranking, and exploration-aware recommendation slots in a deployed product.',
    facts: [
      'Tracks likes, dislikes, ratings, and views to build an implicit preference profile.',
      'Uses a 100-article ingestion batch and 20 recommendation slots with a 30% exploration rate.',
      'Falls back to trending content until a reader has enough interaction history.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'TF-IDF', 'Vercel'],
    repo: 'https://github.com/harsh-raj-singh/next-read',
    live: 'https://next-read-theta.vercel.app',
    accent: '#2155ff',
  },
  {
    title: 'SwiftMath Sprint',
    shortTitle: 'Matiks Sprint',
    domain: 'Game systems / low latency UX',
    year: '2026',
    summary:
      'A 60-second mental math sprint where the active round stays fully local for quick input feel while Supabase powers completed attempts and leaderboards.',
    impact:
      'A compact benchmark for product polish: local-first gameplay, production deployment, and optional offline leaderboard behavior.',
    facts: [
      'Keeps the round loop local so math input remains responsive.',
      'Stores completed attempts in Supabase when credentials are present.',
      'Production build does not require Supabase credentials because clients initialize lazily.',
    ],
    stack: ['Next.js', 'React', 'Supabase', 'TypeScript', 'Vercel'],
    repo: 'https://github.com/harsh-raj-singh/matiks-sprint',
    live: 'https://matiks-sprint.vercel.app',
    accent: '#f2c94c',
  },
  {
    title: 'Pocket TTS Studio',
    shortTitle: 'Pocket TTS',
    domain: 'Local speech synthesis',
    year: '2026',
    summary:
      'A fully local neural text-to-speech studio using Kyutai PocketTTS to turn articles, documents, or raw text into natural audio on consumer hardware.',
    impact:
      'Runs without cloud dependency, uses adaptive sentence chunking, and reaches 2.5x to 4.0x real-time generation on local hardware.',
    facts: [
      'Supports direct text, file, and URL-to-speech through CLI and FastAPI routes.',
      'Uses singleton voice-state caching to reduce repeated model warm-up.',
      'Extracts article content with semantic HTML parsing and noise filtering.',
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'PocketTTS', 'BeautifulSoup', 'Audio'],
    repo: 'https://github.com/harsh-raj-singh/pocket-tts-studio',
    accent: '#e94b7a',
  },
  {
    title: 'CMoE From Scratch',
    shortTitle: 'CMoE',
    domain: 'Sparse transformers / model internals',
    year: '2026',
    summary:
      'A from-scratch Conditional Mixture of Experts implementation with noisy top-k routing, load balancing, shared experts, and GPT-2 experiments.',
    impact:
      'Demonstrates 6.4% lower perplexity than dense GPT-2 while activating only 12.1% of total parameters per forward pass.',
    facts: [
      'Implements routers, expert pools, shared experts, and benchmark scripts from first principles.',
      'Shows capacity-compute decoupling with up to 16x more total parameters at modest active compute.',
      'Measures expert utilization, entropy, collapse avoidance, and active parameter ratios.',
    ],
    stack: ['Python', 'PyTorch', 'Transformers', 'MoE', 'Routing', 'Benchmarking'],
    repo: 'https://github.com/harsh-raj-singh/CMOE',
    accent: '#111111',
  },
  {
    title: 'LoRA From Scratch',
    shortTitle: 'LoRA',
    domain: 'Efficient fine-tuning / LLM systems',
    year: '2026',
    summary:
      'A zero-dependency LoRA implementation with rank ablations, GPT-2 fine-tuning experiments, and merge-for-inference support.',
    impact:
      'Recovers 99.4% of full fine-tuning quality with under 1% trainable parameters while cutting training time by 64%.',
    facts: [
      'Implements LoRALinear, Conv1D support, adapter injection, parameter counting, and weight merging.',
      'Benchmarks rank sensitivity from r=4 through r=64 against full fine-tuning.',
      'Shows 101x fewer trainable parameters and 2.2x lower peak GPU memory at r=16.',
    ],
    stack: ['Python', 'PyTorch', 'GPT-2', 'LoRA', 'PEFT', 'Ablations'],
    repo: 'https://github.com/harsh-raj-singh/lora',
    accent: '#7c3aed',
  },
]

export const profile = {
  name: 'Rana Harshraj Singh',
  handle: 'harsh-raj-singh',
  location: 'Bangalore',
  bio: "Infrastructure | GPU kernels, distributed training | IIT Madras '25",
  github: 'https://github.com/harsh-raj-singh',
  avatar: 'https://avatars.githubusercontent.com/u/96097904?v=4',
}
