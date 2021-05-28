<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-img :src="require('@images/icon.png')"/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    document.title = 'Home'
  },
  methods: {
    test() {
      console.log(this.$accessor.email)
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    }
  }
})
</script>
