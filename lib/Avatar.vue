<script setup lang="ts">
import { computed, reactive } from 'vue'
import useLoaded from './useLoaded'
import type { UseLoadedOptions } from './useLoaded'
import { stringAvatar } from './utils'

const props = withDefaults(
  defineProps<{
    srcSet?: UseLoadedOptions['srcset']
    sizes?: UseLoadedOptions['sizes']
    src?: UseLoadedOptions['src']
    alt?: UseLoadedOptions['alt']
    imgProps?: UseLoadedOptions
    name?: string
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

const useLoadedOptions = reactive({
  crossorigin: props.imgProps?.crossorigin,
  referrerpolicy: props.imgProps?.referrerpolicy,
  src: props.src || props.imgProps?.src,
  srcset: props.srcSet || props.imgProps?.srcset,
})
const loaded = useLoaded(useLoadedOptions)

const showStringAvatar = computed(
  () => !loaded.value && props.fallback && props.name
)

const defaultSize = '40px'
const size = computed(() =>
  props.size
    ? typeof props.size === 'string'
      ? props.size
      : `${props.size}px`
    : defaultSize
)
const stringAvatarComputed = computed(() =>
  props.name ? stringAvatar(props.name) : undefined
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
      backgroundColor: showStringAvatar
        ? stringAvatarComputed && stringAvatarComputed.backgroundColor
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
