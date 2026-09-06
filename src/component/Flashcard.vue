<script setup lang="ts">
import type {FlashcardSummary} from "@/types/flashcard/FlashcardSummary.ts";

const props = defineProps<FlashcardSummary>()
</script>

<template>
  <div
    class="deck-card-container flex border border-gray-200 bg-surface p-4 m-2 rounded-2xl hover:cursor-pointer">
    <div class="flex gap-8 w-full">
      <aside class="flex items-center">
        <div class="w-16">
          <img
            v-if="props.imagePath"
            :src="props.imagePath"
            :alt="'image représentant ' + props.frenchTerm"
          />
          <div
            v-else
            class="w-16 h-16 rounded-2xl bg-[repeating-linear-gradient(135deg,#f5f3ef_0px,#f5f3ef_12px,#ebe7df_12px,#ebe7df_24px)]"
          >
          </div>
        </div>
      </aside>
      <section class="w-full">
        <p class="font-hangul text-2xl">{{ props.koreanTerm }}</p>
        <p class="font-mono text-primary text-lg">{{ props.romanization }}</p>
      </section>
      <section class="flex items-center">
        <p class="font-sans text-sm text-ink-soft">{{ props.frenchTerm }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
