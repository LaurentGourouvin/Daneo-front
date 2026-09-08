import type {RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import Decks from "@/views/Decks.vue";
import FlashcardCreation from "@/views/FlashcardCreation.vue";
import Profil from "@/views/Profil.vue";
import NotFound from "@/views/NotFound.vue";
import Components from "@/views/Components.vue";
import Deck from "@/views/Deck.vue";
import DeckCreation from "@/views/DeckCreation.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/decks",
    component: Decks
  },
  {
    path: "/decks/create",
    component: DeckCreation
  },
  {
    path: "/decks/:id",
    component: Deck
  },
  {
    path: "/create-flashcard",
    component: FlashcardCreation
  },
  {
    path: "/profil",
    component: Profil
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
  {
    path: "/components",
    component: Components
  }
]
