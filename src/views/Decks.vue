<script setup lang="ts">
import {useDecksStore} from "@/stores/DecksStore.ts";
import DeckCard from "@/component/DeckCard.vue";

const deckStore = useDecksStore();
deckStore.fetchDeckList();
</script>

<template>
  <header class="flex justify-between items-end py-2 px-3 mt-2">
    <h1 class="font-sans text-xl font-semibold">Mes Decks</h1>
    <p class="font-mono text-xs text-ink-soft">{{ deckStore.totalDecks() }} decks -
      {{ deckStore.totalCards() }} cartes</p>
  </header>

  <div v-for="deck of deckStore.decks" :key="deck.id">
    <DeckCard :deck-id="deck.id" :deck-title="deck.name" :card-count="deck.cardCount" :key="deck.id"/>
  </div>
</template>

<style scoped>

</style>
