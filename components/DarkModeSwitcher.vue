<template>
  <v-btn 
    icon
    @click="$vuetify.theme.dark = !$vuetify.theme.dark"
  >
    <v-icon v-if="$vuetify.theme.dark">mdi-brightness-6</v-icon>
    <v-icon v-else>mdi-brightness-4</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class DarkModeSwitcher extends mixins(MyClass) {
};
</script>