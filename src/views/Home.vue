<script setup lang="ts">
import {useDecksStore} from "@/stores/DecksStore.ts";

const deckStore = useDecksStore();
deckStore.fetchDeckList();

</script>

<template>
  <p>Page d'accueil</p>
</template>

<style scoped>

</style>
