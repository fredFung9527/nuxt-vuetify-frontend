<template>
  <v-container>
    
  </v-container>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class App extends mixins(MyClass) {
  head() {
    return {
      title: <string>this.$t('pages.profile')
    }
  }
};
</script>
