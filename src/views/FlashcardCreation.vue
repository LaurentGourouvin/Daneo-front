<script setup lang="ts">
import DaneoInputTextField from "@/component/DaneoInputTextField.vue";
import DaneoButton from "@/component/DaneoButton.vue";
import {useFlashcardStore} from "@/stores/FlashcardStore.ts";
import {useDecksStore} from "@/stores/DecksStore.ts";
import DeckCard from "@/component/DeckCard.vue";
import {LoaderCircle, CircleCheckBig} from 'lucide-vue-next';
import {onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";

const flashcardStore = useFlashcardStore();
const deckStore = useDecksStore();
const router = useRouter();
const jamos = ["가", "나", "다"];
const isOn = ref<boolean>(false);
const selectedIndex = ref<number>(0);
enum STEPPER {
  FIRST_PAGE = 1,
  SECOND_PAGE = 2,
  FINAL_PAGE = 3
}


onUnmounted(() => {
  flashcardStore.reset();
})
</script>

<template>
  <div class="p-2 min-h-dvh flex flex-col pb-28">
    <nav class="flex justify-between items-end text-sm mb-4">
      <p @click="flashcardStore.reset(); router.back()">Annuler</p>
      <h1 class="font-sans text-sm font-semibold text-center">Nouvelle carte</h1>
    </nav>

    <div v-if="flashcardStore.steps == STEPPER.FIRST_PAGE"
         class="flex-1 flex flex-col justify-between">
      <div class="w-full">
        <h2 class="font-sans font-semibold text-xl text-center">Quel mot veux-tu apprendre ?</h2>
        <DaneoInputTextField id="word" label="français" v-model="flashcardStore.frenchWord"/>
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
        <div v-if="flashcardStore.error"
             class="relative border border-danger bg-danger-light text-danger p-4 m-2 rounded-2xl ">
          <p class="font-sans text-lg">La traduction n'a pas aboutie.</p>
          <p class="font-sans text-sm text-ink-soft">Le service n'a pas répondu. Tu peux réessayer
            ou saisir le coréen toi-même.</p>
          <DaneoButton label="Réssayer" variant="danger" class="mt-4"
                       @click="flashcardStore.translate()"/>
        </div>
      </div>

      <div v-if="flashcardStore.error == null" class="flex justify-center">
        <DaneoButton label="Traduire" variant="primary" @click="flashcardStore.translate()"/>
      </div>
    </div>

    <div v-if="flashcardStore.steps == STEPPER.SECOND_PAGE"
         class="flex-1 flex flex-col justify-between">
      <div class="w-full flex flex-col justify-between">
        <h2 class="font-sans font-semibold text-xl text-center">Quel mot veux-tu apprendre ?</h2>
        <div
          class="relative flex flex-col border border-gray-200 bg-surface p-4 m-2 rounded-2xl hover:cursor-pointer">
          <p class="font-mono text-xs text-ink-soft">{{ "Français".toUpperCase() }}</p>
          <p class="font-sans font-semibold pl-2 text-sm">{{ flashcardStore.frenchWord }}</p>
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
          <div v-if="flashcardStore.translations.translations.length == 1"
               class="relative flex flex-col gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
            <section class="flex justify-between ">
              <p class="font-mono text-xs text-ink-soft">{{ "Coréen".toUpperCase() }}</p>
              <p class="text-primary bg-primary/15 rounded-sm text-[9px] p-1">proposé par
                l'IA</p>
            </section>
            <section class="flex flex-col items-center mt-4 gap-3">
              <p class="font-hangul text-4xl">{{ flashcardStore.translations?.translations[0]?.korean }}</p>
              <p class="text-ink-soft text-sm">{{ flashcardStore.frenchWord }} - {{ flashcardStore.translations?.translations[0]?.meaning }}</p>
            </section>
          </div>
          <div v-else-if="flashcardStore.translations.translations.length > 1">
            <div
              v-for="(translation, index) in flashcardStore.translations.translations"
              :key="index"
              @click="flashcardStore.selectedTranslation = index"
              :class="['relative flex justify-between bg-surface items-center gap-2 p-4 m-2 rounded-2xl border cursor-pointer transition-colors',
              flashcardStore.selectedTranslation === index ? 'border-primary' : 'border-gray-200'
              ]"
            >
              <p class="text-primary absolute top-1 right-3 bg-primary/15 rounded-sm text-[9px] p-1">proposé par
                l'IA</p>
              <div>
                <p class="font-hangul text-4xl">{{ translation.korean }}</p>
                <p class="text-ink-soft text-sm">{{ flashcardStore.frenchWord }} - {{ translation.meaning }}</p>
              </div>

              <div
                :class="['w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0',
                flashcardStore.selectedTranslation === index ? 'bg-surface text-surface' : 'border-2 border-gray-300'
                ]"
              >
                <CircleCheckBig v-if="flashcardStore.selectedTranslation === index" :size="32" class="text-primary"/>
              </div>
            </div>
          </div>

          <section
            class="relative flex justify-between items-center gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
            <p class="font-sans text-sm">Générer avec une image</p>
            <button
              type="button"
              role="switch"
              :aria-checked="flashcardStore.generateImage"
              @click="flashcardStore.generateImage = !flashcardStore.generateImage"
              :class="['relative inline-flex w-12 h-7 rounded-full transition-colors duration-200',
            flashcardStore.generateImage ? 'bg-primary' : 'bg-ink-soft/30']"
            >
            <span
              :class="[
                'absolute top-1 left-1 w-5 h-5 rounded-full bg-surface shadow transition-transform duration-200',
                flashcardStore.generateImage ? 'translate-x-5' : 'translate-x-0'
              ]"
            />
            </button>
          </section>

        </div>
      </div>
      <div class="flex justify-center">
        <DaneoButton label="Générer la carte" @click="flashcardStore.createFlashcard()"/>
      </div>
    </div>

    <div v-if="flashcardStore.steps == STEPPER.FINAL_PAGE" class="flex-1 flex flex-col justify-between">
      <div v-if="flashcardStore.generationLoading" class="relative flex flex-col items-center gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
        <LoaderCircle class="animate-spin text-primary"/>
        <p class="text-sm">Génération de la carte...</p>
        <p class="text-xs italic text-ink-soft">Si la génération d'image a été demandé, cela peut prendre plus de temps.</p>
      </div>
      <div v-else class="relative flex flex-col items-center gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
        <div class="w-42">
          <img
            v-if="flashcardStore.flashcard?.imagePath"
            :src="flashcardStore.flashcard?.imagePath"
            :alt="'image représentant ' + flashcardStore.flashcard?.frenchTerm"
          />
          <div
            v-else
            class="w-42 h-42 rounded-2xl bg-[repeating-linear-gradient(135deg,#f5f3ef_0px,#f5f3ef_12px,#ebe7df_12px,#ebe7df_24px)]"
          >
          </div>
        </div>
        <div class="flex flex-col gap-4 justify-center items-center">
          <p class="font-hangul text-ink font-extrabold text-6xl">{{ flashcardStore.flashcard?.koreanTerm }}</p>
          <p class="font-mono font-semibold text-xl text-primary">{{ flashcardStore.flashcard?.romanization}}</p>
          <hr class="w-full text-ink-soft/20">
          <p class="font-sans text-lg text-ink-soft">{{ flashcardStore.flashcard?.frenchTerm}}</p>
        </div>
      </div>

      <div
        v-if="!flashcardStore.generationLoading && flashcardStore.flashcard?.id"
        class="relative flex flex-col items-center gap-2 border border-gray-200 bg-surface p-4 m-2 rounded-2xl">
        <p>La carte a été créee avec succès.</p>
        <DaneoButton label="Quitter" variant="secondary" @click="flashcardStore.reset(); router.push('/home')"/>
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
