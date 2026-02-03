export interface Prompt {
  id: number;
  title: string;
  description: string;
  category: CategoryType;
  categoryColor: string;
  tags: string[];
  content: string;
  difficulty: DifficultyType;
  createdAt?: string;
  updatedAt?: string;
  isFavorite?: boolean;
}

export type CategoryType = 
  | "이미지 생성" 
  | "코딩" 
  | "글쓰기" 
  | "데이터 분석" 
  | "번역" 
  | string;

export type DifficultyType = "초급" | "중급" | "고급";

export interface CategoryOption {
  name: CategoryType;
  color: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { name: "이미지 생성", color: "bg-[#cae3ff] border-[#a6d1ff]" },
  { name: "코딩", color: "bg-[#e0f4bf] border-[#cbec95]" },
  { name: "글쓰기", color: "bg-[#feec91] border-[#fedf47]" },
  { name: "데이터 분석", color: "bg-[#dddbfd] border-[#c6c3fb]" },
  { name: "번역", color: "bg-[#fadcbb] border-[#f7c48d]" }
];

export const DIFFICULTY_OPTIONS: DifficultyType[] = ["초급", "중급", "고급"];

export const INITIAL_PROMPTS: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "사실적인 이미지 생성을 위한 프롬프트 작성법",
    description: "고퀄리티의 사실적인 이미지를 생성하기 위해서는 조명, 카메라 각도, 렌즈 타입을 구체적으로 명시해야 합니다. 예: 'soft natural lighting', '85mm portrait lens', 'shallow depth of field'를 활용하세요.",
    category: "이미지 생성",
    categoryColor: "bg-[#cae3ff] border-[#a6d1ff]",
    tags: ["사실적", "조명", "카메라"],
    content: `사실적인 이미지를 생성하기 위한 프롬프트 템플릿:

[주제] + [스타일/분위기] + [조명] + [카메라 설정] + [품질 키워드]

예시:
"A professional portrait of a woman in her 30s, natural soft lighting from window, shot with 85mm lens, shallow depth of field, photorealistic, 8k uhd, high quality"`,
    difficulty: "초급"
  },
  {
    title: "코드 리뷰 요청 프롬프트",
    description: "효과적인 코드 리뷰를 받기 위해서는 코드의 목적, 사용된 기술 스택, 특별히 검토받고 싶은 부분을 명확히 제시해야 합니다. 보안, 성능, 가독성 등 검토 포인트를 구체화하세요.",
    category: "코딩",
    categoryColor: "bg-[#e0f4bf] border-[#cbec95]",
    tags: ["리뷰", "디버깅", "최적화"],
    content: `코드 리뷰 요청 프롬프트 템플릿:

"다음 [언어/프레임워크] 코드를 리뷰해주세요. 이 코드는 [목적]을 위한 것입니다.

[코드 삽입]

특히 다음 사항을 중점적으로 검토해주세요:
1. [보안/성능/가독성 등]
2. [구체적인 우려사항]
3. [개선 가능한 부분]"`,
    difficulty: "중급"
  },
  {
    title: "블로그 글 작성 프롬프트",
    description: "SEO 친화적이고 독자의 관심을 끄는 블로그 글을 작성하려면 타겟 독자, 톤앤매너, 글의 목적을 명확히 설정하세요. 키워드, 글자 수, 구조도 함께 제시하면 더욱 효과적입니다.",
    category: "글쓰기",
    categoryColor: "bg-[#feec91] border-[#fedf47]",
    tags: ["블로그", "SEO", "콘텐츠"],
    content: `블로그 글 작성 프롬프트 템플릿:

"[주제]에 대한 블로그 포스트를 작성해주세요.

- 타겟 독자: [초보자/전문가/일반인 등]
- 톤앤매너: [친근한/전문적인/유머러스한 등]
- 글자 수: [1000-1500자 등]
- 포함할 키워드: [키워드1, 키워드2]
- 구조: 서론-본론(3개 섹션)-결론
- 목적: [정보 제공/설득/교육 등]"`,
    difficulty: "초급"
  },
  {
    title: "데이터 분석 및 시각화 요청",
    description: "데이터 분석을 요청할 때는 데이터의 형태, 분석 목적, 원하는 인사이트를 구체적으로 설명하세요. 시각화가 필요한 경우 차트 유형과 강조할 메트릭을 명시하면 더 정확한 결과를 얻을 수 있습니다.",
    category: "데이터 분석",
    categoryColor: "bg-[#dddbfd] border-[#c6c3fb]",
    tags: ["데이터", "통계", "시각화"],
    content: `데이터 분석 프롬프트 템플릿:

"다음 데이터를 분석해주세요:

[데이터 설명 또는 샘플]

분석 목적: [트렌드 파악/상관관계 분석/예측 등]
찾고자 하는 인사이트: [구체적인 질문들]
시각화 요청: [차트 유형: 막대그래프/선그래프/히트맵 등]
강조할 메트릭: [핵심 지표들]"`,
    difficulty: "고급"
  },
  {
    title: "정확한 번역을 위한 프롬프트",
    description: "번역의 품질을 높이려면 문맥, 대상 독자, 번역의 톤을 명확히 하세요. 전문 용어가 있다면 해당 분야를 명시하고, 직역보다 의역이 필요한지 여부도 함께 전달하세요.",
    category: "번역",
    categoryColor: "bg-[#fadcbb] border-[#f7c48d]",
    tags: ["언어", "현지화", "문맥"],
    content: `번역 프롬프트 템플릿:

"다음 [출발어]를 [도착어]로 번역해주세요:

[번역할 텍스트]

- 분야: [기술/의료/법률/일반 등]
- 대상 독자: [전문가/일반인 등]
- 톤: [격식/비격식]
- 요청사항: [직역/의역, 문화적 맥락 고려 등]
- 용어 통일: [특정 용어에 대한 번역 지침]"`,
    difficulty: "중급"
  },
  {
    title: "창의적인 컨셉 아트 생성",
    description: "판타지, SF 등 창의적인 컨셉 아트를 만들 때는 분위기, 색상 팔레트, 아트 스타일을 구체적으로 설명하세요. 유명 아티스트 스타일을 레퍼런스로 제시하는 것도 효과적입니다.",
    category: "이미지 생성",
    categoryColor: "bg-[#cae3ff] border-[#a6d1ff]",
    tags: ["컨셉아트", "판타지", "스타일"],
    content: `컨셉 아트 프롬프트 템플릿:

"[주제/장면] concept art, [분위기: dark/bright/mysterious 등], [색상 팔레트: warm/cool/vibrant 등], in the style of [아티스트 이름 또는 아트 스타일], [추가 디테일], highly detailed, digital painting, artstation, concept art"

예시:
"Ancient magical library concept art, mysterious atmosphere, warm golden lighting, in the style of Marc Simonetti, floating books, intricate architecture, highly detailed, digital painting"`,
    difficulty: "중급"
  },
  {
    title: "효율적인 디버깅 프롬프트",
    description: "버그를 해결하기 위해 AI의 도움을 받을 때는 에러 메시지, 코드 컨텍스트, 시도해본 해결 방법을 모두 포함하세요. 환경 정보(OS, 버전 등)도 함께 제공하면 더 정확한 답변을 얻을 수 있습니다.",
    category: "코딩",
    categoryColor: "bg-[#e0f4bf] border-[#cbec95]",
    tags: ["디버깅", "에러", "문제해결"],
    content: `디버깅 프롬프트 템플릿:

"다음 에러를 해결하고 싶습니다:

에러 메시지: [정확한 에러 메시지]
발생 상황: [언제, 어떤 동작에서 발생하는지]
환경: [OS, 프레임워크 버전, 라이브러리 버전]

관련 코드:
[에러가 발생하는 코드 블록]

시도해본 해결 방법:
1. [시도1]
2. [시도2]

예상 원인: [있다면 추가]"`,
    difficulty: "중급"
  },
  {
    title: "설득력 있는 마케팅 카피 작성",
    description: "제품이나 서비스의 마케팅 카피를 작성할 때는 타겟 고객의 페인 포인트, 제품의 핵심 가치, USP를 명확히 하세요. 원하는 톤, 길이, CTA도 함께 명시하면 효과적입니다.",
    category: "글쓰기",
    categoryColor: "bg-[#feec91] border-[#fedf47]",
    tags: ["마케팅", "카피", "설득"],
    content: `마케팅 카피 프롬프트 템플릿:

"[제품/서비스]에 대한 마케팅 카피를 작성해주세요.

제품 정보:
- 핵심 기능: [주요 기능들]
- USP: [경쟁사 대비 차별점]
- 타겟 고객: [구체적인 고객 프로필]
- 고객의 페인 포인트: [해결하는 문제]

카피 요구사항:
- 톤앤매너: [전문적인/친근한/유머러스한]
- 길이: [짧은 헤드라인/중간 길이/긴 설명문]
- CTA: [원하는 행동 유도]
- 채널: [소셜미디어/웹사이트/이메일 등]"`,
    difficulty: "고급"
  },
  {
    title: "데이터 클리닝 및 전처리 가이드",
    description: "데이터 전처리를 요청할 때는 데이터의 현재 상태, 결측치 처리 방법, 이상치 탐지 기준을 명확히 하세요. 원하는 최종 데이터 형태와 사용할 분석 방법도 함께 제시하면 좋습니다.",
    category: "데이터 분석",
    categoryColor: "bg-[#dddbfd] border-[#c6c3fb]",
    tags: ["전처리", "클리닝", "정제"],
    content: `데이터 전처리 프롬프트 템플릿:

"다음 데이터셋의 전처리를 도와주세요:

데이터 정보:
- 크기: [행/열 수]
- 주요 컬럼: [컬럼명과 데이터 타입]
- 현재 문제점: [결측치, 이상치, 중복 등]

처리 요청사항:
1. 결측치 처리: [삭제/평균값 대체/예측값 대체]
2. 이상치 탐지 및 처리: [IQR/Z-score 기준]
3. 데이터 정규화/표준화: [필요 여부]
4. 카테고리 인코딩: [원핫/라벨 인코딩]

최종 목표: [회귀분석/분류/클러스터링 등에 사용]"`,
    difficulty: "고급"
  }
];

export interface ExportData {
  prompts: Prompt[];
  exportDate: string;
  version: string;
}
