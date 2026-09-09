<script setup lang="ts">
import {useDecksStore} from "@/stores/DecksStore.ts";
import {CirclePlus} from "lucide-vue-next";
import {useRouter} from "vue-router";

const deckStore = useDecksStore();
deckStore.fetchDeckList();

const router = useRouter();
</script>

<template>
  <p>Page d'accueil</p>
  <div class="flex border-dashed border-2 border-primary bg-surface p-4 m-2 gap-3
  rounded-2xl hover:cursor-pointer justify-center text-primary">
    <circle-plus @click="router.push('/create-flashcard')"/>
    <p @click="router.push('/create-flashcard')">Nouvelle carte</p>
  </div>
</template>

<style scoped>

</style>
