import {defineStore} from "pinia";
import {ref} from "vue";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";

export const useFlashcardStore = defineStore('flashcard', () => {
  const steps = ref<number>(1);
  const showModalDeck = ref<boolean>(false);
  const selectedDeck = ref<DeckListItemResponse | null>(null);
  const frenchTerm = ref<string>("");
  const translationLoading = ref<boolean>(false);

  function increment() {
    steps.value += 1;
  }

  function toggleModalDeck() {
    showModalDeck.value = !showModalDeck.value;
  }

  function selectDeck(deck: DeckListItemResponse) {
    selectedDeck.value = deck;
    showModalDeck.value = !showModalDeck.value;
  }

  // TODO contacter l'API pour la traduction
  function translate() {
    // utiliser frenchterm pour l'appel API
    translationLoading.value = true;
    setTimeout(() => {
      translationLoading.value = false;
    }, 3000)
  }

  // TODO faire la fonction pour la création de la carte avec la génération de l'image

  return {
    steps,
    showModalDeck,
    selectedDeck,
    frenchTerm,
    translationLoading,
    increment,
    toggleModalDeck,
    selectDeck,
    translate,
  }
})
