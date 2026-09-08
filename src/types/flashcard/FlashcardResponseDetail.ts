import {PartOfSpeech} from "@/types/PartOfSpeech.ts";

export interface FlashcardResponseDetail {
  id: number;
  koreanTerm: string;
  romanization: string;
  frenchTerm: string;
  meaning: string;
  partOfSpeech: PartOfSpeech;
  imageUrl: string | null;
  reviewCount: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  createdAt: string;
}
