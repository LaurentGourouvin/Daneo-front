<script setup lang="ts">
import DaneoButton from "@/component/DaneoButton.vue";
import DaneoIntputTextField from "@/component/DaneoIntputTextField.vue";
import {ref} from "vue";

const frenchWord = ref<string>("");
</script>

<template>
  <DaneoButton label="Générer une carte"></DaneoButton>
  <DaneoIntputTextField v-model="frenchWord" label="Quel mot veux-tu apprendre ?" id="french-word" /></template>

<style scoped>

</style>
