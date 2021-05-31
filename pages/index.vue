<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-img :src="require('@images/icon.png')"/>
      <lang-switcher/>
      {{$t('welcome')}}
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class App extends mixins(MyClass) {
  head() {
    return {
      title: 'Home Page'
    }
  };
  mounted() {
    console.log('aaaaaaa')
    console.log(process.env.port)
  }
};
</script>
