<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-img :src="require('@images/icon.png')"/>
      <sample-component/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class App extends Mixins(MyClass) {
  mounted() {
    this.setLoading(true);
    setTimeout(() => {this.setLoading()}, 2000);
  }
};
</script>
