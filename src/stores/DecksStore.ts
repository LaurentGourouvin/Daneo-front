import {defineStore} from "pinia";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";
import {ref} from "vue";
import {getDeckById, getDeckDetail, getDecks} from "@/api/DeckService.ts";
import type {DeckResponse} from "@/types/deck/DeckResponse.ts";

export const useDecksStore = defineStore('decks', () => {
  const decks = ref<DeckListItemResponse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchDeckList() {
    loading.value = true;
    error.value = null;
    try {
      decks.value = await getDecks();
    } catch (e) {
      error.value = "Impossible de charger les decks.";
    } finally {
      loading.value = false;
    }
  }

  async function fetchDeckById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      return await getDeckById(id);
    } catch (e) {
      error.value = `Impossible de charger le deck ${id}.`;
      return null
    } finally {
      loading.value = false;
    }
  }

  async function fetchDeckDetailById(id: number) {
    loading.value = true;
    error.value = null;

    try {
      return await getDeckDetail(id);
    } catch (e) {
      error.value = `Impossible de charger le deck ${id}`;
      return null;
    } finally {
      loading.value = false;
    }
  }

  function totalDecks() {
    return decks.value.length;
  }

  function totalCards() {
    let totalCards = 0;
    for (const deck of decks.value) {
      totalCards += deck.cardCount
    }

    return totalCards;
  }

  return {decks, fetchDeckList, fetchDeckById, fetchDeckDetailById, loading, error, totalDecks, totalCards}
})
