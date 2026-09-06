<script setup lang="ts">
import DaneoButton from "@/component/DaneoButton.vue";
import DaneoIntputTextField from "@/component/DaneoIntputTextField.vue";
import {ref} from "vue";
import DaneoChips from "@/component/DaneoChips.vue";
import DeckCard from "@/component/DeckCard.vue";

const frenchWord = ref<string>("");
</script>

<template>
  <DaneoButton label="Générer une carte"></DaneoButton>
  <DaneoIntputTextField v-model="frenchWord" label="Quel mot veux-tu apprendre ?" id="french-word" />
  <DaneoChips text="Maitrisé" variants="mastered"/>
  <DaneoChips text="A revoir" variants="reviewed"/>
  <DaneoChips text="Difficile" variants="difficult"/>
  <deck-card deck-title="Nourriture"></deck-card>
  <deck-card deck-title="Météo" :cardCount="9"></deck-card>
</template>
<style scoped>

</style>
