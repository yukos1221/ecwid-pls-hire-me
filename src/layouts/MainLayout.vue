<template>
  <div class="w-full flex justify-center">
    <div
      class="w-full max-w-[1200px] mt-6 tablet:mt-10 p-4 bg-neutral-800 rounded mx-6 tablet:mx-10"
    >
      <div class="items-center h-20 -mt-4 justify-between hidden tablet:flex">
        <div class="flex gap-4">
          <router-link to="/">
            <v-btn size="large" variant="tonal"> Главная </v-btn>
          </router-link>
          <v-btn
            v-if="withBackButton"
            size="large"
            variant="tonal"
            @click="router.back()"
          >
            Назад
          </v-btn>
        </div>
        <router-link to="/cart">
          <v-badge color="error" :content="numberOfItemsInCart">
            <v-btn size="large" variant="tonal" class="w-40">
              корзина
              <v-icon class="ml-2" icon="shopping_cart" />
            </v-btn>
          </v-badge>
        </router-link>
      </div>
      <div class="flex items-center h-20 -mt-4 justify-between tablet:hidden">
        <router-link to="/">
          <v-btn size="small" variant="tonal"> Главная </v-btn>
        </router-link>
        <v-btn
          v-if="withBackButton"
          size="small"
          variant="tonal"
          @click="router.back()"
        >
          Назад
        </v-btn>
        <router-link to="/cart">
          <v-badge color="error" :content="numberOfItemsInCart">
            <v-btn size="small" variant="tonal" class="w-28">
              корзина
              <v-icon class="ml-2" icon="shopping_cart" />
            </v-btn>
          </v-badge>
        </router-link>
      </div>
      <v-divider class="mb-4" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  withBackButton?: boolean
}>()

const { numberOfItemsInCart } = storeToRefs(useCartStore())
</script>
