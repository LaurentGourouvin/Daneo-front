<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useDecksStore} from "@/stores/DecksStore.ts";
import type {DeckDetailResponse} from "@/types/deck/DeckDetailResponse.ts";
import Flashcard from "@/component/Flashcard.vue";
import {CircleArrowLeft} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const deckStore = useDecksStore();
const deck = ref<DeckDetailResponse | null>(null);

onMounted(async () => {
  const id = route.params.id as string;
  if (id) {
    deck.value = await deckStore.fetchDeckDetailById(parseInt(id, 10));
  }
});

const backToDecksList = () => {
  router.push("/decks")
}
</script>

<template>
  <div v-if="deck">
    <nav
      @click="backToDecksList"
      class="flex w-fit justify-center gap-2 m-auto mt-2 p-2 text-primary bg-surface rounded-2xl border border-gray-300 hover:cursor-pointer">
      <CircleArrowLeft/>
      <p>Retour aux decks</p>
    </nav>
    <header class="flex justify-between items-end py-2 px-3 mt-2">
      <h1 class="font-sans text-xl font-semibold">{{ deck.name }}</h1>
      <p class="font-mono text-xs text-ink-soft"> {{ deck.cards.length }} cartes</p>
    </header>
    <Flashcard v-for="card of deck.cards" :id="card.id" :french-term="card.frenchTerm"
               :image-path="card.imagePath" :korean-term="card.koreanTerm"
               :romanization="card.romanization" :key="card.id"/>
  </div>
  <p v-else>Chargement…</p>
</template>

<style scoped>

</style>
