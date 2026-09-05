import type {FlashcardSummary} from "@/types/flashcard/FlashcardSummary.ts";

export interface DeckDetailResponse {
  id: number;
  name: string;
  description: string | null;
  cards: FlashcardSummary[];
  createdAt: string;
  updatedAt: string;
}
