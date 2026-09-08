import {defineStore} from "pinia";
import {ref} from "vue";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";
import type {TranslationResponse} from "@/types/translation/TranslationResponse.ts";
import {translate as translation} from "@/api/TranslationService.ts";

export const useFlashcardStore = defineStore('flashcard', () => {
  const steps = ref<number>(1);
  const showModalDeck = ref<boolean>(false);
  const selectedDeck = ref<DeckListItemResponse | null>(null);
  const frenchWord = ref<string>("");
  const translations = ref<TranslationResponse>({translations: []});
  const translationLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

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

  async function translate() {
    translationLoading.value = true;
    error.value = null;
    try {
      increment();
      translations.value = await translation({frenchTerm: frenchWord.value});
    } catch (e) {
      error.value = "Impossible d'effectuer la traduction en coréen.";
    } finally {
      translationLoading.value = false;
    }
  }

  function reset() {
    steps.value = 1;
    showModalDeck.value = false;
    selectedDeck.value = null;
    frenchWord.value = "";
    translations.value = {translations: []};
    translationLoading.value = false;
    error.value = null;
  }

  // TODO faire la fonction pour la création de la carte avec la génération de l'image

  return {
    steps,
    showModalDeck,
    selectedDeck,
    frenchWord,
    translationLoading,
    error,
    translations,
    toggleModalDeck,
    selectDeck,
    translate,
    reset
  }
})
