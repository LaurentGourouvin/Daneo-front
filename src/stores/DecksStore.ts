import {defineStore} from "pinia";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";
import {ref} from "vue";
import {
  createDeck,
  deleteDeckById,
  getDeckById,
  getDeckDetail,
  getDecks, renameDeckById
} from "@/api/DeckService.ts";
import type {DeckResponse} from "@/types/deck/DeckResponse.ts";
import type {DeckCreateRequest} from "@/types/deck/DeckCreateRequest.ts";
import type {DeckUpdateRequest} from "@/types/deck/DeckUpdateRequest.ts";

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

  async function create(data: DeckCreateRequest) {
    loading.value = true;
    error.value = null;

    try {
      const resp: DeckResponse = await createDeck(data);
      decks.value = [...decks.value, {...resp, cardCount: 0}];
    } catch (e) {
      error.value = "Impossible de crée un nouveau deck.";
    } finally {
      loading.value = false;
    }
  }

  async function deleteDeck(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await deleteDeckById(id);
      decks.value = [...decks.value.filter(deck => deck.id != id)]
    } catch (e) {
      error.value = "Impossible de supprimer le deck.";
    } finally {
      loading.value = false;
    }
  }

  async function renameDeck(id: number, data: DeckUpdateRequest) {
    loading.value = true;
    error.value = null;

    try {
      const resp = await renameDeckById(id, data);
      const oldDeckInformations = getDeckById(id);

      if(oldDeckInformations) {
        oldDeckInformations.name = data.name;
        decks.value = [...decks.value.filter(deck => deck.id != id), {...oldDeckInformations}]
      }

    } catch (e) {
      error.value = "Impossible de renommer le deck.";
    } finally {
      loading.value = false;
    }
  }

  function getDeckById(id: number) : DeckListItemResponse | undefined {
    return decks.value.find(deck => deck.id == id);
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

  return {
    decks,
    fetchDeckList,
    deleteDeck,
    renameDeck,
    fetchDeckById,
    create,
    fetchDeckDetailById,
    loading,
    error,
    totalDecks,
    totalCards
  }
})
