import type {RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import Deck from "@/views/Deck.vue";
import FlashcardCreation from "@/views/FlashcardCreation.vue";
import Profil from "@/views/Profil.vue";
import NotFound from "@/views/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/deck",
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
  }
]
