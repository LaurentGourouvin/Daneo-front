<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useDecksStore} from "@/stores/DecksStore.ts";
import type {DeckDetailResponse} from "@/types/deck/DeckDetailResponse.ts";
import Flashcard from "@/component/Flashcard.vue";
import {CircleArrowLeft, Trash, Settings2} from 'lucide-vue-next';
import DaneoButton from "@/component/DaneoButton.vue";
import DaneoInputTextField from "@/component/DaneoInputTextField.vue";

enum ModalType {
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

const route = useRoute();
const router = useRouter();
const deckStore = useDecksStore();
const deck = ref<DeckDetailResponse | null>(null);
const showModalDelete = ref<boolean>(false);
const showModalUpdate = ref<boolean>(false);
const updatedName = ref<string>("");

onMounted(async () => {
  const id = route.params.id as string;
  if (id) {
    deck.value = await deckStore.fetchDeckDetailById(parseInt(id, 10));
  }
});

const toggleModal = (toggle: ModalType) => {
  if (toggle == ModalType.DELETE) {
    showModalDelete.value = !showModalDelete.value;
  }

  if (toggle == ModalType.UPDATE) {
    console.log("update")
    showModalUpdate.value = !showModalUpdate.value;
  }
}

const backToDecksList = () => {
  router.push("/decks")
}

const deleteDeck = async (id: number) => {
  await deckStore.deleteDeck(id);
  toggleModal(ModalType.DELETE);
  router.push("/decks");
}

const updateDeck = async (id: number, name: string) => {
  if (!name || !id) {
    return;
  }

  await deckStore.renameDeck(id, {name: name})
  deck.value = await deckStore.fetchDeckDetailById(id);
  toggleModal(ModalType.UPDATE)
}
</script>

<template>
  <div v-if="deck" class="pb-28">
    <nav
      class="flex justify-between py-2 px-3 text-primary bg-gray-200 rounded-b-2xl shadow-xl border-b border-b-gray-300">
      <CircleArrowLeft @click="backToDecksList"/>
      <div class="flex gap-1">
        <settings2 @click="toggleModal(ModalType.UPDATE)"/>
        <Trash class="text-danger" @click="toggleModal(ModalType.DELETE)"/>
      </div>

    </nav>
    <header class="flex justify-between items-end py-2 px-3 mt-2">
      <h1 class="font-sans text-xl font-semibold">{{ deck.name }}</h1>
      <p class="font-mono text-xs text-ink-soft"> {{ deck.cards.length }} cartes</p>
    </header>
    <Flashcard v-for="card of deck.cards" :id="card.id" :french-term="card.frenchTerm"
               :image-path="card.imagePath" :korean-term="card.koreanTerm"
               :romanization="card.romanization" :key="card.id"/>
  </div>
  <p v-else>Chargement…</p>

  <div v-if="showModalDelete && deck"
       class="flex flex-col justify-center max-h-full min-h-full max-w-full min-w-full absolute top-0 z-99 bg-surface/80">
    <section class="m-auto p-4 bg-surface border border-gray-300 shadow-2xl rounded-2xl">
      <h2>Êtes-vous sûr de vouloir supprimer ce deck ?</h2>
      <div class="flex justify-center gap-3 mt-4">
        <DaneoButton label="Oui" variant="danger" @click="deleteDeck(deck.id)"/>
        <DaneoButton label="Non" variant="secondary" @click="toggleModal(ModalType.DELETE)"/>
      </div>
    </section>
  </div>

  <div v-if="showModalUpdate && deck"
       class="flex flex-col justify-center max-h-full min-h-full max-w-full min-w-full absolute top-0 z-99 bg-surface/80">
    <section class="m-auto p-4 bg-surface border border-gray-300 shadow-2xl rounded-2xl">
      <h2>Modification du deck</h2>
      <div class="mt-4">
        <DaneoInputTextField id="name" label="nom du deck" :placeholder="deck.name"
                             v-model="updatedName"/>
      </div>
      <div class="flex justify-center gap-3 mt-4">
        <DaneoButton label="Enregistrer" variant="primary"
                     @click="updateDeck(deck.id, updatedName)"/>
        <DaneoButton label="Annuler" variant="secondary" @click="toggleModal(ModalType.UPDATE)"/>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
