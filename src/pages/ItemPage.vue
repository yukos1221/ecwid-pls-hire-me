<template>
  <MainLayout with-back-button>
    <div class="flex flex-col tablet:flex-row">
      <v-img
        :lazy-src="itemInto?.imageUrl"
        :src="itemInto?.imageUrl"
        class="tablet:w-[40%] tablet:mb-0 mb-4 w-full rounded-lg object-cover"
      />
      <div
        class="flex flex-col tablet:ml-4 p-4 bg-[#323232] rounded-lg"
        v-if="itemInto"
      >
        <h1 class="text-xl">{{ itemInto.name }}</h1>
        <div class="mt-2" v-html="itemInto.description"></div>

        <div class="relative h-10 w-44 mt-4">
          <Transition name="fade">
            <v-btn
              v-if="!itemsInCart[itemInto.id]"
              @click="() => addItemToCart(itemInto.id)"
              class="absolute w-full"
              >В корзину</v-btn
            >
            <div
              v-else
              class="flex w-full items-center justify-between absolute"
            >
              <v-btn @click="removeItemFromCart(itemInto.id)"> - </v-btn>
              <p>
                {{ itemsInCart[itemInto.id] }}
              </p>
              <v-btn @click="addItemToCart(itemInto.id)"> + </v-btn>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import { useRoute } from 'vue-router'
import getProducts from '../api/getProducts'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const { itemsInCart } = storeToRefs(cartStore)
const { addItemToCart, removeItemFromCart } = cartStore

const route = useRoute()

const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
})

const itemInto = computed(() =>
  products.value?.items?.find((item: any) => item.id == route.params.id)
)
</script>
