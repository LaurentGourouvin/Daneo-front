import {DaneoAxios} from "@/api/DaneoAxios.ts";
import type {FlashcardSummary} from "@/types/flashcard/FlashcardSummary.ts";
import type {FlashcardCreateRequest} from "@/types/flashcard/FlashcardCreateRequest.ts";
import type {FlashcardResponseDetail} from "@/types/flashcard/FlashcardResponseDetail.ts";

/**
 * Create flashcard
 * @param data
 */
export const createFlashcard = async (data: FlashcardCreateRequest): Promise<FlashcardSummary> => {
  const response = await DaneoAxios.post<FlashcardSummary>("/flashcards", data);
  return response.data;
}

/**
 * Get flashcard by ID
 * @param id
 */
export const getFlashcardById = async (id: number): Promise<FlashcardResponseDetail> => {
  const response = await DaneoAxios.get<FlashcardResponseDetail>(`/flashcards/${id}`);
  return response.data;
}

/**
 * Delete flashcard by ID
 * @param id
 */
export const deleteFlashcardByID = async (id: number): Promise<void> => {
  await DaneoAxios.delete<void>(`/flashcards/${id}`);
}

/**
 * Regenrate image for a flashcard
 * @param id
 */
export const regenerateImage = async (id: number): Promise<void> => {
  await DaneoAxios.post<void>(`/flashcards/${id}/regenerate-image`);
}
