<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      aaaaaaaaaaa
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
  },
  methods: {
    test() {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    }
  }
})
</script>
