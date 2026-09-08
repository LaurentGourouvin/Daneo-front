<script setup lang="ts">
import { RouterLink } from "vue-router";
import { House, Layers, User } from "lucide-vue-next";

const items = [
  { to: "/", label: "Accueil", icon: House },
  { to: "/decks", label: "Decks", icon: Layers },
  { to: "/settings", label: "Profil", icon: User },
];
</script>

<template>
  <nav
    class="fixed bottom-4 left-4 right-4 flex justify-around items-center border border-gray-100
           bg-surface rounded-3xl shadow-lg px-2 py-2 z-99"
  >
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      v-slot="{ isActive }"
      class="flex flex-col items-center gap-1 no-underline"
    >
      <span
        :class="[
          'flex items-center justify-center w-4 h-4 rounded-xl transition-colors',
          isActive ? ' text-primary' : 'text-ink-soft',
        ]"
      >
        <component :is="item.icon" :size="24" />
      </span>
      <span
        :class="[
          'text-xs transition-colors',
          isActive ? 'text-primary font-medium' : 'text-ink-soft',
        ]"
      >
        {{ item.label }}
      </span>
    </RouterLink>
  </nav>
</template>
