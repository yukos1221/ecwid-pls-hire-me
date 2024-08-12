<template>
  <MainLayout>
    <div class="flex flex-col tablet:flex-row">
      <div class="flex flex-col min-w-[180px] mb-2 tablet:mb-0">
        <p class="mb-2 text-gray-300">Категории</p>
        <router-link to="/">
          <div
            class="flex gap-4 items-center hover:bg-neutral-600 w-full p-2 tablet:p-3 rounded cursor-pointer duration-300"
            :class="{ 'bg-neutral-700': !activeCategoryId }"
          >
            <v-avatar size="36px">
              <v-img src="/kitten.jpeg"></v-img>
            </v-avatar>
            <p>Всё сразу)</p>
          </div>
        </router-link>
        <router-link
          v-for="category in categories?.items ?? []"
          :key="category.id"
          :to="`/category/${category.id}`"
        >
          <div
            class="flex gap-4 items-center hover:bg-neutral-600 w-full p-2 tablet:p-3 rounded cursor-pointer duration-300"
            :class="{ 'bg-neutral-700': activeCategoryId == category.id }"
          >
            <v-avatar size="36px">
              <v-img :src="category.thumbnailUrl"></v-img>
            </v-avatar>
            <p>{{ category.name }}</p>
          </div>
        </router-link>
      </div>
      <v-divider class="ml-4" vertical />
      <div class="flex flex-col w-full">
        <h1 class="tablet:ml-4 mb-2 text-3xl">
          {{ activeCategoryName }}
        </h1>
        <div
          class="grid grid-cols-1 min-[530px]:grid-cols-2 min-[950px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-4 col-span-3 tablet:pl-4 w-full"
        >
          <div
            v-for="item in filteredItems"
            class="flex flex-col w-full min-w-[200px] bg-neutral-700 rounded overflow-hidden"
          >
            <router-link :to="`/item/${item.id}`">
              <img :src="item.thumbnailUrl" class="w-full h-100 object-cover" />
            </router-link>
            <div class="p-2 flex flex-col gap-2 h-full">
              <router-link :to="`/item/${item.id}`">
                <h3 class="text-center w-fit mx-auto">
                  {{ item.name }}
                </h3>
              </router-link>

              <div class="relative h-7 mt-auto">
                <Transition name="fade">
                  <v-btn
                    v-if="!itemsInCart[item.id]"
                    size="small"
                    @click="() => addItemToCart(item.id)"
                    class="absolute w-full"
                    >В корзину</v-btn
                  >
                  <div
                    v-else
                    class="flex w-full items-center justify-between absolute"
                  >
                    <v-btn size="small" @click="removeItemFromCart(item.id)">
                      -
                    </v-btn>
                    <p>
                      {{ itemsInCart[item.id] }}
                    </p>
                    <v-btn size="small" @click="addItemToCart(item.id)">
                      +
                    </v-btn>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import getProducts from '../api/getProducts'
import getCategories from '../api/getCategories'
import { useCartStore } from '../stores/cartStore'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const activeCategoryId = ref(route.params.id ?? '')

const cartStore = useCartStore()
const { itemsInCart } = storeToRefs(cartStore)
const { addItemToCart, removeItemFromCart } = cartStore

const activeCategoryName = computed(() => {
  return (
    categories.value?.items.find(
      (category: any) => category.id == activeCategoryId.value
    )?.name || 'Всё сразу)'
  )
})

const filteredItems = computed(() => {
  if (!activeCategoryId.value) return products.value?.items

  return products.value?.items.filter((item: any) =>
    item.categoryIds.includes(Number(activeCategoryId.value))
  )
})

const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
})
const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: getCategories,
})

watch(
  () => route.params.id,
  (id) => {
    activeCategoryId.value = id
  }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
