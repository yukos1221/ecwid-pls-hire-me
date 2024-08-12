import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // itemId: numberOfItems
    const itemsInCart = ref<Record<string, number>>({})

    const addItemToCart = (itemId: string) => {
      if (itemsInCart.value[itemId]) {
        itemsInCart.value[itemId]++
      } else {
        itemsInCart.value[itemId] = 1
      }
    }

    const removeItemFromCart = (itemId: string) => {
      if (itemsInCart.value[itemId] > 1) {
        itemsInCart.value[itemId]--
      } else {
        delete itemsInCart.value[itemId]
      }
    }

    const removeAllItemsById = (itemId: string) => {
      delete itemsInCart.value[itemId]
    }

    const clearCart = () => {
      itemsInCart.value = {}
    }

    const numberOfItemsInCart = computed(() =>
      Object.values(itemsInCart.value).reduce((i, acc) => i + acc, 0)
    )

    return {
      itemsInCart,
      numberOfItemsInCart,
      addItemToCart,
      removeItemFromCart,
      clearCart,
      removeAllItemsById,
    }
  },
  {
    persist: {
      afterRestore: (ctx) => {
        window.addEventListener('storage', ({ newValue }) => {
          ctx.store.$patch(JSON.parse(newValue as string))
        })
      },
    },
  }
)
