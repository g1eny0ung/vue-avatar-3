<script setup lang="ts">
import { computed } from 'vue-demi'
import type { ImageOptions } from './types'
import useLoaded from './useLoaded'
import { stringAvatar, pickTextColorBasedOnBgColorSimple } from './utils'

const props = withDefaults(
  defineProps<{
    srcSet?: ImageOptions['srcset']
    sizes?: ImageOptions['sizes']
    src?: ImageOptions['src']
    alt?: ImageOptions['alt']
    imgProps?: ImageOptions
    name?: string
    bgColor?: string
    size?: string | number
    variant?: 'circular' | 'rounded' | 'square'
    round?: string | number
    fallback?: boolean
  }>(),
  {
    variant: 'circular',
    fallback: true,
  }
)

const useLoadedOptions = computed(() => ({
  crossorigin: props.imgProps?.crossorigin,
  referrerpolicy: props.imgProps?.referrerpolicy,
  src: props.src || props.imgProps?.src,
  srcset: props.srcSet || props.imgProps?.srcset,
}))

const { loading, loaded } = useLoaded(useLoadedOptions)
const showStringAvatar = computed(
  () => !loading.value && !loaded.value && props.fallback && props.name
)
const stringAvatarComputed = computed(() =>
  props.name ? stringAvatar(props.name) : undefined
)

const defaultSize = '40px'
const size = computed(() =>
  props.size
    ? typeof props.size === 'string'
      ? props.size
      : `${props.size}px`
    : defaultSize
)
</script>

<template>
  <div
    :style="{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      width: size,
      height: size,
      backgroundColor:
        bgColor ||
        (showStringAvatar ? stringAvatarComputed?.bgColor : undefined),
      color: bgColor
        ? pickTextColorBasedOnBgColorSimple(bgColor)
        : showStringAvatar
        ? stringAvatarComputed?.textColor
        : undefined,
      borderRadius:
        variant === 'circular'
          ? '50%'
          : variant === 'rounded'
          ? round
            ? typeof round === 'string'
              ? round
              : `${round}px`
            : '8px'
          : undefined,
      userSelect: 'none',
    }"
  >
    <template v-if="showStringAvatar">
      {{ stringAvatarComputed && stringAvatarComputed.children }}
    </template>
    <img
      v-if="loaded"
      :srcset="srcSet"
      :sizes="sizes"
      :src="src"
      :alt="alt"
      :style="{
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'transparent', // Hide alt text.
      }"
      v-bind="imgProps"
    />
  </div>
</template>
