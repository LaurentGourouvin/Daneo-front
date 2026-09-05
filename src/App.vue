<script setup lang="ts">
import { ref, onMounted } from "vue";
import { DaneoApi } from "@/api/daneoApi";

interface Deck {
  id: number;
  name: string;
  description: string;
  cardCount: number;
}

const decks = ref<Deck[]>([]);

onMounted(async () => {
  const response = await DaneoApi.get<Deck[]>("/decks");
  decks.value = response.data;
});
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p class="font-hangul text-ink-soft">사과, 학교</p>

  <p v-for="value of decks.values()" :key="value.id">
    {{ value.id}} - {{ value.name }} - {{ value.description }}
  </p>
</template>

<style scoped></style>
