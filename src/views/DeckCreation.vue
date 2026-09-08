<script setup lang="ts">
import DaneoInputTextField from "@/component/DaneoInputTextField.vue";
import {ref} from "vue";
import type {DeckCreateRequest} from "@/types/deck/DeckCreateRequest.ts";
import {useDecksStore} from "@/stores/DecksStore.ts";
import {useRouter} from "vue-router";

const deck = ref<DeckCreateRequest>({name: "", description: ""});
const error = ref<string>("");
const deckStore = useDecksStore();
const router = useRouter();

const save = async () => {
  if (!validate()) {
    return;
  }

  await deckStore.create(deck.value);
  router.push("/decks");
}
const validate = (): boolean => {
  error.value = "";
  if (!deck.value?.name) {
    error.value = "Nom requis";
    return false;
  }
  return true;
}

const cancel = () => {
  error.value = "";
  deck.value.name = "";
  deck.value.description = "";
  router.push("/decks");
}
</script>

<template>
  <div class="m-auto p-2 flex flex-col gap-10">
    <nav class="flex gap-2 justify-between items-end text-sm mb-4">
      <p @click="cancel">Annuler</p>
      <h1 class="font-sans text-xl font-semibold text-center">Nouveau deck</h1>
      <p @click="save">Enregistrer</p>
    </nav>

    <form>
      <DaneoInputTextField id="name" label="nom du deck" placeholder="Nouveau deck"
                            v-model="deck.name"/>
      <DaneoInputTextField id="description" label="description du deck" placeholder="Description"
                            v-model="deck.description"/>
    </form>

    <div v-if="error" class="border border-danger bg-danger-light p-4 m-2 rounded-2xl">
      <p class="text-danger font-semibold py-2">{{ error }}</p>
      <p class="text-sm text-ink-soft">Merci de saisir un nom permettant la création de votre
        nouveau deck.</p>
    </div>
  </div>
</template>

<style scoped>

</style>
