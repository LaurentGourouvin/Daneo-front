<script setup lang="ts">
import DaneoButton from "@/component/DaneoButton.vue";
import DaneoIntputTextField from "@/component/DaneoIntputTextField.vue";
import {ref} from "vue";
import DaneoChips from "@/component/DaneoChips.vue";
import DeckCard from "@/component/DeckCard.vue";
import Flashcard from "@/component/Flashcard.vue";
const frenchWord = ref<string>("");
</script>

<template>
  <div class="relative">
    <DaneoButton label="Générer une carte"></DaneoButton>
    <DaneoIntputTextField v-model="frenchWord" label="Quel mot veux-tu apprendre ?"
                          id="french-word"/>
    <DaneoChips text="Maitrisé" variants="mastered"/>
    <DaneoChips text="A revoir" variants="reviewed"/>
    <DaneoChips text="Difficile" variants="difficult"/>
    <deck-card deck-title="Nourriture"></deck-card>
    <deck-card deck-title="Météo" :cardCount="9"></deck-card>
    <flashcard :id="1" korean-term="사과" romanization="sagwa" french-term="pomme"
               image-path="http://localhost:8080/images/optimized-pomme.webp"></flashcard>
    <flashcard :id="2" korean-term="아보카도" romanization="abokado" french-term="avocat"
               image-path="http://localhost:8080/images/b3d34c8d-26cc-4055-98f6-8b748d1b03a2.webp"></flashcard>
    <flashcard :id="3" korean-term="먹다" romanization="meokda" french-term="manger"
               image-path=""></flashcard>
  </div>
</template>
<style scoped>

</style>
