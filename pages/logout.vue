<template>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class App extends mixins(MyClass) {
  async mounted() {
    try {
      await this.$auth.logout();
      console.log('Logouted')
      this.$replace('/login');
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
