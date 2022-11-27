# vue-avatar-3

A useful avatar component for Vue 2&3, with support for letter avatars. Inspired by [react-avatar](https://github.com/ambassify/react-avatar).

## Installation

```bash
npm install vue-avatar-3
```

### yarn

```bash
yarn add vue-avatar-3
```

### pnpm

```bash
pnpm add vue-avatar-3
```

## Usage

```vue
<script setup>
import { ref } from 'vue'
import Avatar from 'vue-avatar-3'

const src = ref('https://fakeimg.pl/300/')
const name = ref('Yue Yang')
</script>

<template>
  <Avatar :src="src" :name="name" />
</template>
```

## License

Released under the [MIT License](https://github.com/g1eny0ung/vue-avatar-3/blob/main/LICENSE).
