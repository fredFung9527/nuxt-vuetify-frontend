<template>
  <v-container>
    <ChartsBar :chartData="chartData"/>
  </v-container>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass, LoginFirst } from '~/mixins';

@Component
export default class App extends mixins(MyClass, LoginFirst) {
  head() {
    return {
      title: <string>this.$t('pages.home')
    }
  };

  chartData = {
    labels:  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: this.$vuetify.theme.themes.light.primary,
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
  }
};
</script>
