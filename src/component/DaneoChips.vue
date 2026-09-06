<script setup lang="ts">
withDefaults(defineProps<{
  variants?: "mastered" | "reviewed" | "difficult";
  text: string;
}>(), {variants: "mastered"})

const baseClass = "inline-flex items-center px-3 py-1 rounded-lg font-sans text-xs m-1";
const variantClasses: Record<string, string> = {
  mastered: "bg-mastered-bg text-mastered-text",
  reviewed: "bg-review-bg text-review-text",
  difficult: "bg-difficult-bg text-difficult-text",
};
</script>

<template>
  <span :class="[baseClass, variantClasses[variants]]">
    {{ text }}
  </span>
</template>

<style scoped>

</style>
