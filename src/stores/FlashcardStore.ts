import {defineStore} from "pinia";
import {ref} from "vue";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";
import type {TranslationResponse} from "@/types/translation/TranslationResponse.ts";
import {translate as translation} from "@/api/TranslationService.ts";
import {createFlashcard as createNewFlashcard} from "@/api/FlashcardService.ts";
import {PartOfSpeech} from "@/types/PartOfSpeech.ts";
import type {FlashcardSummary} from "@/types/flashcard/FlashcardSummary.ts";

export const useFlashcardStore = defineStore('flashcard', () => {
  const steps = ref<number>(1);
  const showModalDeck = ref<boolean>(false);
  const selectedDeck = ref<DeckListItemResponse | null>(null);
  const selectedTranslation = ref<number>(0);
  const frenchWord = ref<string>("");
  const translations = ref<TranslationResponse>({translations: []});
  const translationLoading = ref<boolean>(false);
  const generationLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const generateImage = ref<boolean>(false);
  const flashcard = ref<FlashcardSummary>();

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

  async function createFlashcard() {
    generationLoading.value = true;
    error.value = null;
    increment();
    const translation = translations.value.translations[selectedTranslation.value];

    if(!translation || !selectedDeck.value?.id) {
      error.value = "Erreur rencontrée avant la demande de création."
      return;
    }

    try {
      flashcard.value = await createNewFlashcard({
        deckId: selectedDeck.value.id,
        frenchWord: frenchWord.value,
        koreanTerm: translation.korean,
        partOfSpeech: translation.partOfSpeech,
        meaning: translation.meaning,
        generateImage: generateImage.value,
      })
    } catch (e) {
      error.value = "Erreur durant la création de la carte."
    } finally {
      generationLoading.value = false;
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
    generateImage.value = false;
  }

  return {
    steps,
    showModalDeck,
    selectedDeck,
    frenchWord,
    translationLoading,
    generationLoading,
    error,
    translations,
    generateImage,
    selectedTranslation,
    flashcard,
    toggleModalDeck,
    selectDeck,
    translate,
    reset,
    createFlashcard
  }
})
