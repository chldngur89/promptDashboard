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
    title: "[테스트] Supabase 연결 테스트 프롬프트",
    description: "이 프롬프트는 Supabase 연결이 정상적으로 작동하는지 확인하기 위한 테스트용입니다. 이 메시지가 보인다면 아직 Supabase 데이터가 로드되지 않은 것입니다.",
    category: "코딩",
    categoryColor: "bg-[#e0f4bf] border-[#cbec95]",
    tags: ["테스트", "Supabase", "연결확인"],
    content: `Supabase 연결 테스트

이 프롬프트가 보인다면:
1. Supabase에 아직 데이터가 없는 경우
2. 환경변수 설정이 안 된 경우

해결 방법:
1. Supabase SQL Editor에서 migration.sql 실행
2. .env.local 파일 확인
3. 브라우저 새로고침

정상 연결 시 이 메시지 대신 실제 데이터가 표시됩니다.`,
    difficulty: "초급"
  }
];

export interface ExportData {
  prompts: Prompt[];
  exportDate: string;
  version: string;
}
