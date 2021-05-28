<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-img :src="require('@images/icon.png')" @click="test()"/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { MyPage } from '~/mixins'

@Component
export default class App extends mixins(MyPage) {
  mounted() {
    this.setLoading(true);
    setTimeout(() => {this.setLoading()}, 5000)
  }

  test() {
    this.setLoading(true);
    setTimeout(() => {this.setLoading()}, 5000)
  }
}
</script>
