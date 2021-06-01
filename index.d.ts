import { accessorType } from '~/store';
import { Framework } from 'vuetify';

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType,
    $vuetify: Framework

  }
}