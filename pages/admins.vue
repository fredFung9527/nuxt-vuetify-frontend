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
    name: this.$t('pages.admins'),
    path: 'users/admin',
    sortBy: 'email',
    descending: true,
    headers: [
      { text: this.$t('email'), align: 'start', sortable: true, value: 'email' },
      { text: this.$t('firstName'), align: 'center', sortable: true, value: 'firstName' },
      { text: this.$t('lastName'), align: 'center', sortable: true, value: 'lastName' },
    ],
    filter: {
      // role: 'admin'
    }
  }
};
</script>
