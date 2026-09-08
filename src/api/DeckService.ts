import {DaneoAxios} from "@/api/DaneoAxios.ts";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";
import type {DeckResponse} from "@/types/deck/DeckResponse.ts";
import type {DeckDetailResponse} from "@/types/deck/DeckDetailResponse.ts";
import type {DeckUpdateRequest} from "@/types/deck/DeckUpdateRequest.ts";
import type {DeckCreateRequest} from "@/types/deck/DeckCreateRequest.ts";

/*
 * Create Deck
 */
export const createDeck = async (data: DeckCreateRequest): Promise<DeckResponse> => {
  const response = await DaneoAxios.post<DeckResponse>("/decks", data);
  return response.data;
}

/**
 * Get a list of all decks
 */
export const getDecks = async (): Promise<DeckListItemResponse[]> => {
  const response = await DaneoAxios.get<DeckListItemResponse[]>("/decks");
  return response.data;
}

/**
 * Get deck by ID
 * @param id
 */
export const getDeckById = async (id: number): Promise<DeckResponse> => {
  const response = await DaneoAxios.get<DeckResponse>(`/decks/${id}`);
  return response.data;
}

/**
 * Get detail from a deck
 * @param id
 */
export const getDeckDetail = async (id: number): Promise<DeckDetailResponse> => {
  const response = await DaneoAxios.get<DeckDetailResponse>(`/decks/${id}/detail`);
  return response.data;
}

/**
 * Rename a deck
 * @param id
 * @param data
 */
export const renameDeck = async (id: number, data: DeckUpdateRequest): Promise<DeckResponse> => {
  const response = await DaneoAxios.patch<DeckResponse>(`/decks/${id}`, data);
  return response.data;
}

/**
 * Delete a deck
 */
export const deleteDeckById = async (id: number) => {
  await DaneoAxios.delete(`/decks/${id}`);
}
