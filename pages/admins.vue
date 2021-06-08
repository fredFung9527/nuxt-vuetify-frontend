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
        editor: {
          readonly: true,
          editableWhenCreate: true,
          isEmail: true,
          must: true
        },
        showOrder: '1'
      },
      { 
        text: <string>this.$t('firstName'),
        value: 'firstName',
        header: {
          sortable: true,
        },
        type: 'text',
        editor: {},
        showOrder: '2'
      },
      { 
        text: <string>this.$t('lastName'),
        value: 'lastName',
        header: {
          sortable: true,
        },
        type: 'text',
        editor: {},
        showOrder: '3'
      },
      { 
        text: <string>this.$t('password'),
        value: 'password',
        type: 'password',
        editor: {},
        showOrder: '4'
      },
      { 
        value: 'role',
        default: 'admin'
      },
    ],
    filter: {
      role: 'admin'
    }
  }
};
</script>
