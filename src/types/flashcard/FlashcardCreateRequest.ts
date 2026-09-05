import type {PartOfSpeech} from "@/types/PartOfSpeech.ts";

export interface FlashcardCreateRequest {
  deckId: number;
  frenchWord: string;
  koreanTerm: string;
  partOfSpeech: PartOfSpeech;
  meaning: string;
  generateImage: boolean;
}
