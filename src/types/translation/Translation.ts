import type {PartOfSpeech} from "@/types/PartOfSpeech.ts";

export interface Translation {
  korean: string;
  partOfSpeech: PartOfSpeech;
  meaning: string;
}
