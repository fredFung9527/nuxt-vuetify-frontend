<template>
  <v-app>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      {{ $t('homePage') }}
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class ErrorLayout extends mixins(MyClass) {
  layout () { return 'empty' };

  @Prop({ default: {} }) readonly error!: {[key: string]: any};

  pageNotFound = <string>this.$t('pageNotFound');
  otherError = <string>this.$t('unknownError');

  head () {
    return {
      title: this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    }
  };
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
