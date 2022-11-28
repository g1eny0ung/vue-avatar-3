import { ref, watchEffect } from 'vue-demi'
import type { Ref } from 'vue-demi'
import type { ImageOptions } from './types'

function useLoaded(options: Ref<ImageOptions>) {
  const loading = ref(true)
  const loaded = ref(false)

  function loadImage(options: ImageOptions) {
    const { crossorigin, referrerpolicy, src, srcset } = options

    if (!src && !srcset) {
      return
    }

    // Reset states.
    loading.value = true
    loaded.value = false

    let active = true
    const image = new Image()
    image.onload = () => {
      if (!active) {
        return
      }

      loaded.value = true
      loading.value = false
    }
    image.onerror = () => {
      if (!active) {
        return
      }

      loaded.value = false
      loading.value = false
    }

    if (crossorigin) {
      image.crossOrigin = crossorigin
    }
    if (referrerpolicy) {
      image.referrerPolicy = referrerpolicy
    }
    if (src) {
      image.src = src
    }
    if (srcset) {
      image.srcset = srcset
    }

    return () => {
      active = false
    }
  }

  watchEffect((onCleanup) => {
    const cancel = loadImage(options.value)

    onCleanup(() => {
      typeof cancel === 'function' && cancel()
    })
  })

  return { loading, loaded }
}

export default useLoaded
