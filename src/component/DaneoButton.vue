<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  label: string;
}>(), {
  variant: 'primary'
});
const baseClasses = "font-sans px-4 py-2 rounded-lg transition-colors cursor-pointer";

const variantClasses: Record<string, string> = {
  primary: "bg-primary text-surface hover:bg-primary-pressed",
  secondary: "bg-surface text-primary border border-primary hover:bg-primary-tint",
  ghost: "text-primary hover:bg-primary-tint",
  danger: "bg-danger text-surface hover:opacity-90",
};
</script>

<template>
  <div class="w-full p-2">
    <button :class="[baseClasses, variantClasses[variant]]">
      {{ label }}
    </button>
  </div>
</template>

<style scoped>

</style>
