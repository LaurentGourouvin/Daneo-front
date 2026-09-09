<script setup lang="ts">
import {computed} from "vue";
import { CircleChevronDown } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  cardCount?: number;
  deckTitle: string;
  deckId: number;
  selectMode?: boolean
}>(), {
  cardCount: 0,
  selectMode: false
});

const cards = computed(() =>
  props.cardCount <= 1 ? "carte" : "cartes"
);


</script>

<template>
  <div
    class="deck-card-container relative flex border border-gray-200 bg-surface p-4 m-2 rounded-2xl hover:cursor-pointer">
    <CircleChevronDown v-if="selectMode" class="absolute right-2 top-2 text-primary"/>
    <div class="flex gap-6">
      <aside class="m-auto bg-primary-tint px-4 py-3 rounded-lg font-hangul text-primary font-bold">
        나
      </aside>
      <section>
        <p class="font-sans font-bold text-lg">{{ deckTitle }}</p>
        <p class="text-ink-soft text-sm">{{ cardCount }} {{ cards }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
