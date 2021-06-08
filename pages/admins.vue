<template>
  <data-table :settings="settings"/>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass, LoginFirst } from '~/mixins';
import { Setting } from '~/components/DataTable/index.vue'

@Component
export default class App extends mixins(MyClass, LoginFirst) {
  head() {
    return {
      title: <string>this.$t('pages.admins')
    }
  };

  settings: Setting = {
    name: <string>this.$t('pages.admins'),
    path: 'users/admin',
    sortBy: 'email',
    descending: true,
    schema: [
      { 
        text: <string>this.$t('email'),
        value: 'email',
        header: {
          sortable: true,
        },
        type: 'text',
        readonly: true,
        editableWhenCreate: true,
        showOrder: '1'
      },
      { 
        text: <string>this.$t('firstName'),
        value: 'firstName',
        header: {
          sortable: true,
        },
        type: 'text',
        editable: true,
        showOrder: '2'
      },
      { 
        text: <string>this.$t('lastName'),
        value: 'lastName',
        header: {
          sortable: true,
        },
        type: 'text',
        editable: true,
        showOrder: '3'
      },
    ],
    filter: {
      role: 'admin'
    }
  }
};
</script>
