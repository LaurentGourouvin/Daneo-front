<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}>();
</script>

<template>
  <div class="border-2 border-primary rounded-2xl px-4 py-3 bg-surface focus-within:border-primary m-2">
    <label :for="id" class="block font-mono text-xs uppercase tracking-widest text-ink-soft mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="w-full text-2xl font-sans font-semibold text-ink bg-transparent focus:outline-none"
    />
  </div>
</template>

<style scoped>

</style>
