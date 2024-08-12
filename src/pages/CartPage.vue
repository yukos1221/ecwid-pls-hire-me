<template>
  <MainLayout>
    <div class="text-2xl" v-if="!numberOfItemsInCart">Ваша корзина пуста</div>
    <div v-else class="flex flex-col gap-4">
      <h2 class="text-2xl">Ваша корзина</h2>

      <div class="flex w-full flex-col gap-3 tablet:flex-row justify-between">
        <v-btn color="red" class="w-52" @click="clearCart"
          >очистить корзину</v-btn
        >
        <ConfettiExplosion v-if="isConfettiShown" :particleCount="200" />
        <v-btn color="blue" class="w-52" @click="makeOrder"
          >сделать заказ</v-btn
        >
      </div>
      <div class="flex flex-col mt-4 gap-4" v-if="products">
        <div
          class="flex bg-neutral-700 p-4 rounded items-center"
          v-for="[item, numberOfItems] in parsedItems"
        >
          <router-link :to="`/item/${item?.id}`" class="flex items-center">
            <v-avatar size="80px">
              <v-img :src="item?.thumbnailUrl" />
            </v-avatar>
            <p class="ml-4 text-sm tablet:text-lg pr-4">
              {{ item?.name }}
            </p>
          </router-link>
          <div class="ml-auto flex flex-col -mb-6">
            <div class="flex w-40 justify-between">
              <v-btn
                size="small"
                :disabled="numberOfItems === 1"
                @click="removeItemFromCart(item.id)"
              >
                -
              </v-btn>
              <p>
                {{ numberOfItems }}
              </p>
              <v-btn size="small" @click="addItemToCart(item.id)"> + </v-btn>
            </div>
            <v-btn
              size="small"
              variant="text"
              class="w-8 min-w-[36px] mx-auto mt-2"
              @click="removeAllItemsById(item.id)"
            >
              <v-icon color="red" icon="delete" />
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'

import { storeToRefs } from 'pinia'
import getProducts from '../api/getProducts'
import ConfettiExplosion from 'vue-confetti-explosion'
import { useToast } from 'vue-toast-notification'
import { useCartStore } from '../stores/cartStore'
import { useQuery } from '@tanstack/vue-query'
import { computed, nextTick, ref } from 'vue'

const cartStore = useCartStore()
const toast = useToast()
const isConfettiShown = ref(false)
const { itemsInCart, numberOfItemsInCart } = storeToRefs(cartStore)
const { addItemToCart, removeItemFromCart, removeAllItemsById, clearCart } =
  cartStore

const parsedItems = computed(() =>
  Object.entries(itemsInCart.value).map(([itemId, numberOfItems]) => [
    products.value?.items.find((item: any) => item.id == itemId),
    numberOfItems,
  ])
)

const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
})

const makeOrder = async () => {
  isConfettiShown.value = false
  await nextTick()
  toast.success('Поздравляем, вы успешно сделали заказ!', {
    position: 'top-right',
  })
  isConfettiShown.value = true
}
</script>
