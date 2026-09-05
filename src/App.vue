<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {DeckListItemResponse} from "@/types/deck/DeckListItemResponse.ts";
import {getDecks} from "@/api/DeckService.ts";

const decks = ref<DeckListItemResponse[]>([]);

onMounted(async () => {
  decks.value = await getDecks();
});
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p class="font-hangul text-ink-soft">사과, 학교</p>

  <p v-for="deck of decks.values()" :key="deck.id">
    {{ deck.id }} | {{ deck.name }} | {{ deck.cardCount }}
  </p>
</template>

<style scoped></style>
