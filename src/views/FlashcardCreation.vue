<script setup lang="ts">
import DaneoInputTextField from "@/component/DaneoInputTextField.vue";
import DaneoButton from "@/component/DaneoButton.vue";
import {useFlashcardStore} from "@/stores/FlashcardStore.ts";
import {useDecksStore} from "@/stores/DecksStore.ts";
import DeckCard from "@/component/DeckCard.vue";
import {LoaderCircle} from 'lucide-vue-next';
import {ref} from "vue";

const flashcardStore = useFlashcardStore();
const deckStore = useDecksStore();
const jamos = ["가", "나", "다"];
const isOn = ref<boolean>(false);

enum STEPPER {
  FIRST_PAGE = 1,
  SECOND_PAGE = 2,
}

const translate = () => {
  flashcardStore.increment();
  flashcardStore.translate();
}
</script>

<template>
  <div class="p-2 min-h-dvh flex flex-col pb-28">
    <nav class="flex justify-between items-end text-sm mb-4">
      <p>Annuler</p>
      <h1 class="font-sans text-sm font-semibold text-center">Nouvelle carte</h1>
    </nav>

    <div v-if="flashcardStore.steps == STEPPER.FIRST_PAGE"
         class="flex-1 flex flex-col justify-between">
      <div class="w-full">
        <h2 class="font-sans font-semibold text-xl text-center">Quel mot veux-tu apprendre ?</h2>
        <DaneoInputTextField id="word" label="français" v-model="flashcardStore.frenchTerm"/>
        <div v-if="flashcardStore.selectedDeck == null" class="flex border-dashed border-2 border-primary bg-surface p-4 m-2 gap-3
              rounded-2xl hover:cursor-pointer justify-center text-primary"
             @click="flashcardStore.toggleModalDeck()">
          <p>Choisir un deck</p>
        </div>
        <div v-else @click="flashcardStore.toggleModalDeck()">
          <DeckCard :deck-title="flashcardStore.selectedDeck.name"
                    :deck-id="flashcardStore.selectedDeck.id"
                    :cardCount="flashcardStore.selectedDeck.cardCount" selectMode/>
        </div>
      </div>

      <div class="flex justify-center">
        <DaneoButton label="Traduire" variant="primary" @click="translate"/>
      </div>
    </div>

    <div v-if="flashcardStore.steps == STEPPER.SECOND_PAGE" class="flex-1 flex flex-col justify-between">
      <div class="w-full flex flex-col justify-between">
        <h2 class="font-sans font-semibold text-xl text-center">Quel mot veux-tu apprendre ?</h2>
        <div
          class="relative flex flex-col border border-gray-200 bg-surface p-4 m-2 rounded-2xl hover:cursor-pointer">
          <p class="font-mono text-xs text-ink-soft">{{ "Français".toUpperCase() }}</p>
          <p class="font-sans font-semibold pl-2 text-sm">{{ flashcardStore.frenchTerm }}</p>
        </div>

        <div v-if="flashcardStore.translationLoading"
             class="relative flex flex-col items-center gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
          <LoaderCircle class="animate-spin text-primary"/>
          <p class="text-sm">Recherche de la traduction...</p>
          <div>
            <span v-for="(jamo, index) in jamos" :key="jamo"
                  class="font-hangul text-3xl text-ink-soft animate-glow"
                  :style="{ animationDelay: `${index * 0.2}s` }"
            >
              {{ jamo }}
            </span>
          </div>
        </div>
        <div v-else>
          <div
            class="relative flex flex-col gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
            <section class="flex justify-between ">
              <p class="font-mono text-xs text-ink-soft">{{ "Coréen".toUpperCase() }}</p>
              <p class="text-primary bg-primary/15 rounded-2xl text-[10px] p-1.5">proposé par
                l'IA</p>
            </section>
            <section class="flex flex-col items-center mt-4 gap-3">
              <p class="font-hangul font-semibold text-5xl">다가</p>
              <p class="font-mono text-primary">sagwa</p>
            </section>
          </div>

          <section
            class="relative flex justify-between items-center gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
            <p class="font-sans text-sm">Générer avec une image</p>
            <button
              type="button"
              role="switch"
              :aria-checked="isOn"
              @click="isOn = !isOn"
              :class="['relative inline-flex w-12 h-7 rounded-full transition-colors duration-200',
            isOn ? 'bg-primary' : 'bg-ink-soft/30']"
            >
            <span
              :class="[
                'absolute top-1 left-1 w-5 h-5 rounded-full bg-surface shadow transition-transform duration-200',
                isOn ? 'translate-x-5' : 'translate-x-0'
              ]"
            />
            </button>
          </section>

        </div>
      </div>
      <div class="flex justify-center">
         <!-- TODO effectuer l'appel API -->
        <DaneoButton label="Générer la carte" />
      </div>
    </div>


    <div v-if="flashcardStore.showModalDeck" class="modal-select-deck flex flex-col justify-center max-h-full min-h-full max-w-full
    min-w-full absolute top-0 z-99 bg-surface/95">
      <div v-for="deck of deckStore.decks" :key="deck.id">
        <DeckCard :deck-id="deck.id" :deck-title="deck.name" :card-count="deck.cardCount"
                  :key="deck.id" @click="flashcardStore.selectDeck(deck)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0%, 100% {
    color: var(--color-ink-soft);
    opacity: 0.3;
  }
  50% {
    color: var(--color-primary);
    opacity: 1;
  }
}

.animate-glow {
  animation: glow 1.2s ease-in-out infinite;
}
</style>
