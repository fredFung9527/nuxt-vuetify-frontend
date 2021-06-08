<template>
  <data-table :settings="settings">
    <!-- <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template> -->
  </data-table>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass, LoginFirst } from '~/mixins';

@Component
export default class App extends mixins(MyClass, LoginFirst) {
  head() {
    return {
      title: <string>this.$t('pages.admins')
    }
  };

  settings = {
    name: 'Admins',
    path: 'users/admin'
  }
};
</script>
