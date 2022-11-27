import { ref, watchEffect } from 'vue-demi'
import type { UnwrapNestedRefs, ImgHTMLAttributes } from 'vue-demi'

export type UseLoadedOptions = ImgHTMLAttributes & { referrerpolicy?: string }

function useLoaded(options: UnwrapNestedRefs<UseLoadedOptions>) {
  const loaded = ref(false)

  function loadImage(options: UnwrapNestedRefs<UseLoadedOptions>) {
    const { crossorigin, referrerpolicy, src, srcset } = options

    if (!src && !srcset) {
      return
    }

    loaded.value = false

    let active = true
    const image = new Image()
    image.onload = () => {
      if (!active) {
        return
      }

      loaded.value = true
    }
    image.onerror = () => {
      if (!active) {
        return
      }

      loaded.value = false
    }

    if (crossorigin) {
      image.crossOrigin = crossorigin
    }
    if (referrerpolicy) {
      image.referrerPolicy = referrerpolicy
    }
    image.src = src ?? ''
    if (srcset) {
      image.srcset = srcset
    }

    return active
  }

  watchEffect((onCleanup) => {
    let active = loadImage(options)

    onCleanup(() => {
      active = false
    })
  })

  return loaded
}

export default useLoaded
