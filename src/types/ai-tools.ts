export interface AITool {
  id: string;
  name: string;
  description: string;
  category: AIToolCategory;
  url: string;
  logo?: string;
  pricing: 'free' | 'paid' | 'freemium';
  rank?: number; // 1-10, undefined면 랭크 없음
  isNew?: boolean;
  tags: string[];
  features?: string[];
}

export type AIToolCategory =
  | 'search'
  | 'reasoning'
  | 'agent'
  | 'image'
  | 'video'
  | 'audio'
  | 'code'
  | 'writing'
  | 'productivity'
  | 'design'
  | string;

export interface AIToolCategoryOption {
  id: AIToolCategory;
  name: string;
  icon: string;
  color: string;
}

export const AI_TOOL_CATEGORIES: AIToolCategoryOption[] = [
  { id: 'search', name: '뉴스/검색', icon: 'Search', color: 'bg-blue-100 border-blue-300' },
  { id: 'reasoning', name: '추론/LLM', icon: 'Brain', color: 'bg-purple-100 border-purple-300' },
  { id: 'agent', name: 'Agent 강화', icon: 'Bot', color: 'bg-green-100 border-green-300' },
  { id: 'image', name: '이미지 생성', icon: 'Image', color: 'bg-pink-100 border-pink-300' },
  { id: 'video', name: '비디오 생성', icon: 'Video', color: 'bg-red-100 border-red-300' },
  { id: 'audio', name: '음성/음악', icon: 'Music', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'code', name: '코딩/개발', icon: 'Code', color: 'bg-gray-100 border-gray-300' },
  { id: 'writing', name: '글쓰기', icon: 'Pen', color: 'bg-indigo-100 border-indigo-300' },
  { id: 'productivity', name: '생산성', icon: 'Zap', color: 'bg-orange-100 border-orange-300' },
  { id: 'design', name: '디자인', icon: 'Palette', color: 'bg-teal-100 border-teal-300' },
];

export const PRICING_LABELS: Record<string, { label: string; color: string; textColor: string }> = {
  free: { label: '묣료', color: 'bg-green-500/10 border-green-500/30', textColor: 'text-green-600' },
  paid: { label: '유료', color: 'bg-red-500/10 border-red-500/30', textColor: 'text-red-600' },
  freemium: { label: 'Freemium', color: 'bg-amber-500/10 border-amber-500/30', textColor: 'text-amber-600' },
};

// 샘플 AI 도구 데이터
export const AI_TOOLS_DATA: AITool[] = [
  // 뉴스/검색 - Free
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: '실시간 검색과 AI 결합한 대화형 검색 엔진. 출처를 바로 확인 가능',
    category: 'search',
    url: 'https://perplexity.ai',
    pricing: 'freemium',
    rank: 1,
    tags: ['검색', 'Q&A', '실시간정보'],
    features: ['실시간 검색', '출처 표시', 'Pro 모드'],
  },
  {
    id: 'andi',
    name: 'Andi Search',
    description: 'AI 기반 시각적 검색 엔진. 깨끗하고 광고 없는 인터페이스',
    category: 'search',
    url: 'https://andisearch.com',
    pricing: 'free',
    rank: 2,
    tags: ['검색', '시각적', '광고없음'],
    features: ['AI 요약', '시각적 답변', '프라이버시 중시'],
  },
  {
    id: 'you',
    name: 'You.com',
    description: '개인화된 AI 검색. YouChat, YouCode 등 다양한 모드 제공',
    category: 'search',
    url: 'https://you.com',
    pricing: 'freemium',
    rank: 3,
    tags: ['검색', '개인화', '다양한모드'],
    features: ['YouChat', 'YouCode', '개인화 결과'],
  },
  {
    id: 'phind',
    name: 'Phind',
    description: '개발자를 위한 AI 검색 엔진. 코딩 문제 해결에 특화',
    category: 'search',
    url: 'https://phind.com',
    pricing: 'freemium',
    rank: 4,
    tags: ['개발자', '코딩', '검색'],
    features: ['코드 검색', '기술 문서 검색', 'Pair Programming'],
  },
  {
    id: 'exa',
    name: 'Exa AI',
    description: '의미론적 검색 엔진. 키워드가 아닌 의미로 검색',
    category: 'search',
    url: 'https://exa.ai',
    pricing: 'freemium',
    rank: 5,
    tags: ['의미검색', 'AI', '고급검색'],
    features: ['의미론적 검색', '유사 콘텐츠 찾기', 'API 제공'],
  },

  // 추론/LLM - Mixed
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI의 대표적인 대화형 AI. GPT-4o, o1 등 다양한 모델 제공',
    category: 'reasoning',
    url: 'https://chat.openai.com',
    pricing: 'freemium',
    rank: 1,
    isNew: false,
    tags: ['챗봇', 'GPT', 'OpenAI'],
    features: ['GPT-4o', 'o1 Reasoning', '코드 인터프리터', '플러그인'],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic의 AI 어시스턴트. 긴 컨텍스트와 안전성 강조',
    category: 'reasoning',
    url: 'https://claude.ai',
    pricing: 'freemium',
    rank: 2,
    isNew: false,
    tags: ['Anthropic', '긴컨텍스트', '안전성'],
    features: ['200K 컨텍스트', 'Artifacts', 'Claude 3.5 Sonnet'],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google의 최신 AI 모델. 멀티모달 능력과 Google 서비스 통합',
    category: 'reasoning',
    url: 'https://gemini.google.com',
    pricing: 'freemium',
    rank: 3,
    isNew: false,
    tags: ['Google', '멀티모달', '2M 컨텍스트'],
    features: ['2M 토큰 컨텍스트', 'Google 통합', '멀티모달'],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: '중국 스타트업의 오픈소스 LLM. 높은 성능과 저렴한 가격',
    category: 'reasoning',
    url: 'https://deepseek.com',
    pricing: 'free',
    rank: 4,
    isNew: true,
    tags: ['오픈소스', '중국', '성능좋음'],
    features: ['DeepSeek-V3', 'DeepSeek-R1', '오픈소스', 'API'],
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'xAI의 AI 모델. X(Twitter) 실시간 데이터 접근',
    category: 'reasoning',
    url: 'https://grok.x.ai',
    pricing: 'paid',
    rank: 5,
    isNew: false,
    tags: ['xAI', 'Musk', '실시간데이터'],
    features: ['X 통합', '실시간 정보', '유머러스한 톤'],
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: '유럽의 오픈소스 LLM. Mixture of Experts 아키텍처',
    category: 'reasoning',
    url: 'https://mistral.ai',
    pricing: 'freemium',
    rank: 6,
    isNew: false,
    tags: ['유럽', '오픈소스', 'MoE'],
    features: ['Mixtral', 'Mistral Large', 'Le Chat'],
  },
  {
    id: 'llama',
    name: 'Llama',
    description: 'Meta의 오픈소스 LLM. Llama 3.3까지 버전업',
    category: 'reasoning',
    url: 'https://llama.meta.com',
    pricing: 'free',
    rank: 7,
    isNew: false,
    tags: ['Meta', '오픈소스', '로컬실행'],
    features: ['Llama 3.3', '405B 모델', '오픈소스', '로컬 실행'],
  },

  // Agent 강화
  {
    id: 'kimi',
    name: 'Kimi AI',
    description: 'Moonshot AI의 Agent. 200만 글자 컨텍스트와 자동화 기능',
    category: 'agent',
    url: 'https://kimi.moonshot.cn',
    pricing: 'freemium',
    rank: 1,
    isNew: false,
    tags: ['Agent', '긴컨텍스트', '중국'],
    features: ['200만 글자 입력', '파일 분석', '웹 검색', 'Agent 기능'],
  },
  {
    id: 'autogpt',
    name: 'AutoGPT',
    description: '자율적으로 목표를 달성하는 AI Agent. 반복 작업 자동화',
    category: 'agent',
    url: 'https://agpt.co',
    pricing: 'free',
    rank: 2,
    tags: ['Agent', '자율', '오픈소스'],
    features: ['자율 목표 달성', '반복 작업', '오픈소스'],
  },
  {
    id: 'dify',
    name: 'Dify',
    description: 'LLM 기반 AI Agent 및 워크플로우 빌더. 오픈소스',
    category: 'agent',
    url: 'https://dify.ai',
    pricing: 'freemium',
    rank: 3,
    tags: ['Agent', '워크플로우', '오픈소스'],
    features: ['Agent 빌더', '워크플로우', '로컬 배포'],
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: '워크플로우 자동화 툴. AI 노드와 통합으로 Agent 구축',
    category: 'agent',
    url: 'https://n8n.io',
    pricing: 'freemium',
    rank: 4,
    tags: ['자동화', '워크플로우', '노코드'],
    features: ['워크플로우', 'AI 통합', 'Self-hosted'],
  },
  {
    id: 'zapier',
    name: 'Zapier AI',
    description: '5,000+ 앱 연동 자동화. AI 기능 추가로 Agent 강화',
    category: 'agent',
    url: 'https://zapier.com/ai',
    pricing: 'paid',
    rank: 5,
    tags: ['자동화', '앱연동', '워크플로우'],
    features: ['5,000+ 앱', 'AI 워크플로우', 'Zaps'],
  },

  // 이미지 생성
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '예술적이고 고품질의 AI 이미지 생성. Discord 기반',
    category: 'image',
    url: 'https://midjourney.com',
    pricing: 'paid',
    rank: 1,
    tags: ['이미지생성', '예술', '고품질'],
    features: ['v6.1', '아트 스타일', 'Discord'],
  },
  {
    id: 'dalle',
    name: 'DALL-E 3',
    description: 'OpenAI의 이미지 생성 모델. ChatGPT에 내장',
    category: 'image',
    url: 'https://openai.com/dall-e-3',
    pricing: 'paid',
    rank: 2,
    tags: ['OpenAI', '이미지생성', 'ChatGPT'],
    features: ['프롬프트 이해', '텍스트 렌더링', 'ChatGPT 통합'],
  },
  {
    id: 'flux',
    name: 'FLUX',
    description: 'Black Forest Labs의 오픈소스 이미지 생성. Midjourney급 품질',
    category: 'image',
    url: 'https://blackforestlabs.ai',
    pricing: 'free',
    rank: 3,
    isNew: true,
    tags: ['오픈소스', '고품질', 'FLUX'],
    features: ['FLUX.1', '오픈소스', '프롬프트 정확도'],
  },
  {
    id: 'kling',
    name: 'Kling AI',
    description: 'Kwai의 이미지/비디오 생성 AI. Kling 2.0 출시',
    category: 'image',
    url: 'https://klingai.com',
    pricing: 'freemium',
    rank: 4,
    isNew: true,
    tags: ['중국', '이미지', '비디오', 'Kling'],
    features: ['Kling 2.0', '이미지 생성', '비디오 생성'],
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description: '텍스트가 포함된 이미지 생성에 특화. 포스터, 로고 제작',
    category: 'image',
    url: 'https://ideogram.ai',
    pricing: 'freemium',
    rank: 5,
    tags: ['텍스트이미지', '포스터', '로고'],
    features: ['텍스트 렌더링', '로고', '포스터', '타이포그래피'],
  },
  {
    id: 'recraft',
    name: 'Recraft',
    description: '전문적인 벡터 그래픽 생성. UI/디자인에 최적화',
    category: 'image',
    url: 'https://recraft.ai',
    pricing: 'freemium',
    rank: 6,
    tags: ['벡터', '디자인', 'UI'],
    features: ['SVG 생성', '브랜드 일관성', 'UI 요소'],
  },
  {
    id: 'leonardo',
    name: 'Leonardo AI',
    description: '게임/엔터테인먼트 특화 이미지 생성. Fine-tuned 모델',
    category: 'image',
    url: 'https://leonardo.ai',
    pricing: 'freemium',
    rank: 7,
    tags: ['게임', '에셋', '파인튜닝'],
    features: ['게임 에셋', '캐릭터', 'Fine-tune'],
  },
  {
    id: 'playground',
    name: 'Playground',
    description: 'Mixed Image Editing. 기존 이미지 편집과 생성 결합',
    category: 'image',
    url: 'https://playgroundai.com',
    pricing: 'freemium',
    rank: 8,
    tags: ['이미지편집', 'mixed', '캔버스'],
    features: ['Mixed Editing', '캔버스', '필터'],
  },

  // 비디오 생성
  {
    id: 'runway',
    name: 'Runway ML',
    description: 'Gen-3 Alpha 출시. 고품질 비디오 생성과 편집 도구',
    category: 'video',
    url: 'https://runwayml.com',
    pricing: 'paid',
    rank: 1,
    tags: ['비디오', 'Gen-3', '편집'],
    features: ['Gen-3 Alpha', '비디오 편집', 'Motion Brush'],
  },
  {
    id: 'pika',
    name: 'Pika Labs',
    description: 'Pika 2.0 출시. 캐릭터 일관성과 스타일 강화',
    category: 'video',
    url: 'https://pika.art',
    pricing: 'freemium',
    rank: 2,
    isNew: true,
    tags: ['비디오', 'Pika 2.0', '캐릭터'],
    features: ['Pika 2.0', 'Scene Ingredients', 'Lip Sync'],
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    description: 'AI 아바타와 음성으로 프로페셔널한 비디오 생성',
    category: 'video',
    url: 'https://heygen.com',
    pricing: 'paid',
    rank: 3,
    tags: ['아바타', '음성', '마케팅'],
    features: ['AI 아바타', '음성 클론', '번역'],
  },
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI의 비디오 생성 모델. 2024년 말 공개 예정',
    category: 'video',
    url: 'https://openai.com/sora',
    pricing: 'paid',
    rank: 4,
    isNew: true,
    tags: ['OpenAI', '비디오', '텍스트투비디오'],
    features: ['텍스트 투 비디오', '1분 길이', '물리 엔진'],
  },
  {
    id: 'luma',
    name: 'Luma Dream Machine',
    description: '빠르고 고품질의 비디오 생성. 물리 정확성 우수',
    category: 'video',
    url: 'https://lumalabs.ai/dream-machine',
    pricing: 'freemium',
    rank: 5,
    tags: ['비디오', '빠름', '물리'],
    features: ['Dream Machine', '빠른 생성', '물리 정확성'],
  },

  // 음성/음악
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: '최고 품질의 AI 음성 합성. 29개 언어 지원',
    category: 'audio',
    url: 'https://elevenlabs.io',
    pricing: 'freemium',
    rank: 1,
    tags: ['음성', 'TTS', '클론'],
    features: ['Voice Cloning', '29 언어', 'Projects', 'Sound Effects'],
  },
  {
    id: 'suno',
    name: 'Suno AI',
    description: '텍스트로 완전한 노래 생성. 가사와 멜로디 모두 AI',
    category: 'audio',
    url: 'https://suno.ai',
    pricing: 'freemium',
    rank: 2,
    tags: ['음악', '작곡', '노래'],
    features: ['완전한 노래', '가사 생성', '다양한 스타일'],
  },
  {
    id: 'udio',
    name: 'Udio',
    description: '고품질 AI 음악 생성. 세밀한 컨트롤 제공',
    category: 'audio',
    url: 'https://udio.com',
    pricing: 'freemium',
    rank: 3,
    tags: ['음악', '작곡', '컨트롤'],
    features: ['고음질', '세밀한 조정', 'Remix'],
  },
  {
    id: 'whisper',
    name: 'Whisper',
    description: 'OpenAI의 오픈소스 음성 인식. 99개 언어 지원',
    category: 'audio',
    url: 'https://openai.com/whisper',
    pricing: 'free',
    rank: 4,
    tags: ['STT', '오픈소스', '인식'],
    features: ['99 언어', '오픈소스', '로컬 실행'],
  },

  // 코딩/개발
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'GitHub의 AI 페어 프로그래머. 코드 자동완성과 채팅',
    category: 'code',
    url: 'https://github.com/copilot',
    pricing: 'paid',
    rank: 1,
    tags: ['코딩', '자동완성', 'GitHub'],
    features: ['코드 완성', 'Copilot Chat', 'PR 설명'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI 기반 코드 에디터. Claude, GPT 통합. 코드베이스 이해',
    category: 'code',
    url: 'https://cursor.sh',
    pricing: 'freemium',
    rank: 2,
    isNew: false,
    tags: ['에디터', 'AI', '코드베이스'],
    features: ['코드베이스 채팅', '자동 수정', 'Composer'],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'Codeium의 AI IDE. Cascade 기능으로 자연어로 코딩',
    category: 'code',
    url: 'https://codeium.com/windsurf',
    pricing: 'freemium',
    rank: 3,
    isNew: true,
    tags: ['IDE', 'Cascade', 'Codeium'],
    features: ['Cascade', 'AI IDE', 'Supercomplete'],
  },
  {
    id: 'v0',
    name: 'v0.dev',
    description: 'Vercel의 UI 생성 AI. React/Tailwind 코드 생성',
    category: 'code',
    url: 'https://v0.dev',
    pricing: 'freemium',
    rank: 4,
    tags: ['UI', 'React', '생성'],
    features: ['UI 생성', 'React 코드', 'Tailwind', 'shadcn'],
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    description: 'StackBlitz의 AI 풀스택 개발. 프롬프트로 앱 생성',
    category: 'code',
    url: 'https://bolt.new',
    pricing: 'freemium',
    rank: 5,
    isNew: true,
    tags: ['풀스택', '앱생성', 'WebContainer'],
    features: ['풀스택 생성', 'WebContainer', '배포'],
  },
  {
    id: 'lovable',
    name: 'Lovable',
    description: 'AI 풀스택 개발자. 디자인부터 배포까지 한 번에',
    category: 'code',
    url: 'https://lovable.dev',
    pricing: 'freemium',
    rank: 6,
    isNew: true,
    tags: ['풀스택', '개발', '배포'],
    features: ['풀스택', 'GitHub 통합', 'Supabase 연결'],
  },

  // 글쓰기
  {
    id: 'notionai',
    name: 'Notion AI',
    description: 'Notion에 내장된 AI. 문서 작성과 정리 자동화',
    category: 'writing',
    url: 'https://notion.so/product/ai',
    pricing: 'paid',
    rank: 1,
    tags: ['노션', '문서', '정리'],
    features: ['문서 작성', '요약', '번역', '워크스페이스'],
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI 기반 문법 및 스타일 체크. 영문 작성 필수 도구',
    category: 'writing',
    url: 'https://grammarly.com',
    pricing: 'freemium',
    rank: 2,
    tags: ['문법', '영작', '체크'],
    features: ['문법 검사', '스타일 개선', '톤 조정'],
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: '마케팅 및 브랜드 콘텐츠 생성 AI. SEO 최적화',
    category: 'writing',
    url: 'https://jasper.ai',
    pricing: 'paid',
    rank: 3,
    tags: ['마케팅', '콘텐츠', 'SEO'],
    features: ['마케팅 카피', 'SEO', '브랜드 보이스'],
  },

  // 생산성
  {
    id: 'gamma',
    name: 'Gamma',
    description: 'AI 프레젠테이션 생성. 텍스트로 슬라이드 자동 생성',
    category: 'productivity',
    url: 'https://gamma.app',
    pricing: 'freemium',
    rank: 1,
    tags: ['프레젠테이션', 'PPT', '슬라이드'],
    features: ['텍스트 투 PPT', '템플릿', '실시간 협업'],
  },
  {
    id: 'tome',
    name: 'Tome',
    description: 'AI 스토리텔링 플랫폼. 프레젠테이션과 스토리 결합',
    category: 'productivity',
    url: 'https://tome.app',
    pricing: 'freemium',
    rank: 2,
    tags: ['스토리텔링', '프레젠테이션', 'AI'],
    features: ['AI 스토리', '인터랙티브', '이미지 생성'],
  },
  {
    id: 'replit',
    name: 'Replit Agent',
    description: 'Replit의 AI 개발 Agent. 앱 아이디어를 작동하는 코드로',
    category: 'productivity',
    url: 'https://replit.com',
    pricing: 'freemium',
    rank: 3,
    tags: ['코딩', '클라우드', '에이전트'],
    features: ['Replit Agent', '클라우드 IDE', '배포'],
  },
  {
    id: 'fireflies',
    name: 'Fireflies',
    description: '미팅 녹음 및 AI 요약. 회의 자동 기록',
    category: 'productivity',
    url: 'https://fireflies.ai',
    pricing: 'freemium',
    rank: 4,
    tags: ['회의', '녹음', '요약'],
    features: ['자동 녹음', 'AI 요약', 'Action Items'],
  },

  // 디자인
  {
    id: 'figma-ai',
    name: 'Figma AI',
    description: 'Figma에 내장된 AI. 디자인 생성과 작업 자동화',
    category: 'design',
    url: 'https://figma.com/ai',
    pricing: 'freemium',
    rank: 1,
    tags: ['디자인', 'UI/UX', 'Figma'],
    features: ['디자인 생성', '이미지 편집', '프로토타입'],
  },
  {
    id: 'canva',
    name: 'Canva AI',
    description: 'Canva의 Magic Studio. 디자인부터 비디오까지 AI로',
    category: 'design',
    url: 'https://canva.com/magic',
    pricing: 'freemium',
    rank: 2,
    tags: ['디자인', 'Canva', '쉬움'],
    features: ['Magic Design', 'Magic Write', 'Magic Edit'],
  },
  {
    id: 'framer',
    name: 'Framer AI',
    description: 'AI 웹사이트 빌더. 텍스트로 완성된 사이트 생성',
    category: 'design',
    url: 'https://framer.com',
    pricing: 'freemium',
    rank: 3,
    tags: ['웹사이트', '노코드', '디자인'],
    features: ['AI 웹사이트', '애니메이션', 'CMS'],
  },
];

// 랭킹 유틸리티 함수
export function getRankedTools(tools: AITool[], limit: number = 10): AITool[] {
  return tools
    .filter(tool => tool.rank !== undefined)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999))
    .slice(0, limit);
}

export function getFreeTools(tools: AITool[], limit: number = 10): AITool[] {
  return tools
    .filter(tool => tool.pricing === 'free' || tool.pricing === 'freemium')
    .sort((a, b) => (a.rank || 999) - (b.rank || 999))
    .slice(0, limit);
}

export function getToolsByCategory(tools: AITool[], category: AIToolCategory, limit: number = 10): AITool[] {
  return tools
    .filter(tool => tool.category === category)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999))
    .slice(0, limit);
}

export function getTopToolsOverall(tools: AITool[], limit: number = 10): AITool[] {
  return tools
    .filter(tool => tool.rank && tool.rank <= 3)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999))
    .slice(0, limit);
}
