<template>
  <v-app>
    <v-snackbar
      app top
      :value="$accessor.alert"
      :color="$accessor.alertType"
    >
      <v-row align="center">
        <v-col>
          {{ $accessor.alertMessage }}
        </v-col>
        <v-col cols="auto">
          <v-btn icon @click="$accessor.closeAlert()"><v-icon>mdi-close</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-snackbar>

    <v-app-bar hide-on-scroll app>
      <v-row align="center">
        <v-col>
          <v-img height="50px" width="50px" :src="require('@images/icon.png')" contain/>
        </v-col>
        <v-col cols="auto">
          <lang-switcher/>
          <dark-mode-switcher/>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absoluted app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class DefaultLayout extends mixins(MyClass) {
  mounted() {
    try {
      this.$auth.logout();
    } catch (e) {}
  };
};
</script>
