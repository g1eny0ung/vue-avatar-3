# vue-avatar-3

[![CI](https://github.com/g1eny0ung/vue-avatar-3/actions/workflows/ci.yaml/badge.svg)](https://github.com/g1eny0ung/vue-avatar-3/actions/workflows/ci.yaml)
![npm](https://img.shields.io/npm/v/vue-avatar-3)

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
const name = ref('Foo Bar')
</script>

<template>
  <Avatar :src="src" :name="name" />
</template>
```

The priority of displaying avatars is as follows:

1. If `src` is set, then `src` will have the highest priority.
2. If `src` is not set or the load fails, then the `name` will be used to generate a letter avatar (You can use `fallback` to control this behavior).

## Options

| Name       | Type                              | Default    | Description                                                                                                                                                |
| ---------- | --------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`      | `string`                          |            | The image source.                                                                                                                                          |
| `alt`      | `string`                          |            | The image alt.                                                                                                                                             |
| `srcSet`   | `string`                          |            | The image srcSet.                                                                                                                                          |
| `sizes`    | `string`                          |            | The image sizes.                                                                                                                                           |
| `imgProps` | `object`                          |            | The image attributes that will be applied to the image. This option will **override above options**.                                                       |
| `name`     | `string`                          |            | Specify a name to generate a letter avatar. This option will only take effect if the image is not loaded successfully and the `fallback` option is `true`. |
| `bgColor`  | `string`                          |            | Specify a background color for the letter avatar (must be a 6-value hex color).                                                                            |
| `size`     | `string` / `number`               | `40px`     | The size of the avatar. You can use a number or a string with a unit.                                                                                      |
| `variant`  | `circular` / `rounded` / `square` | `circular` | The variant of the avatar.                                                                                                                                 |
| `round`    | `string` / `number`               | `8px`      | The radius of the avatar. Take effect when `variant` is `rounded`. You can use a number or a string with a unit.                                           |
| `fallback` | `boolean`                         | `true`     | Whether to show the letter avatar when the image is not loaded successfully.                                                                               |

## Credits

This project is inspired by the following projects:

- [react-avatar](https://github.com/ambassify/react-avatar)
- <https://mui.com/material-ui/react-avatar/>

## License

Released under the [MIT License](https://github.com/g1eny0ung/vue-avatar-3/blob/main/LICENSE).
