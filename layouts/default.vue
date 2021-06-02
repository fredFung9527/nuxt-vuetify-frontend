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

    <v-app-bar hide-on-scroll clipped-left app>
      <v-row align="center">
        <v-col cols="auto">
          <v-app-bar-nav-icon @click="drawer = !drawer"/>
        </v-col>
        <v-col>
          <nuxt-link :to="localePath('/')">
            <v-img height="50px" width="50px" :src="require('@images/icon.png')" contain/>
          </nuxt-link>
        </v-col>
        <v-col cols="auto">
          <lang-switcher/>
          <dark-mode-switcher/>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer app fixed clipped v-model="drawer" :expand-on-hover="$vuetify.breakpoint.lgAndUp">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{$accessor.user.firstname || '-'}}, {{$accessor.user.lastname || '-'}}
            </v-list-item-title>
            <v-list-item-subtitle>{{$accessor.user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-row>
        <v-col cols="12">
          <lang-switcher/>
        </v-col>
        <v-col cols="12">
          <dark-mode-switcher/>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    
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
  drawer: boolean = false;

  mounted() {
    try {
      this.$accessor.initialiseStore();
      if (!this.$accessor.logined) {
        this.$replace('/login');
        return;
      }
    } catch (e) {}
  };
};
</script>
