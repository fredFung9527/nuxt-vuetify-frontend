<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-translate</v-icon>
        <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(locale, idx) in $i18n.locales"
        :key="idx"
        :to="switchLocalePath(locale.code)"
      >
        <v-list-item-title>{{ localeNames[locale.code] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class LangSwitcher extends mixins(MyClass) {
  localeNames: {[key: string]: string} = {
    'en': 'English',
    'cht': '繁體中文',
    'chs': '简体中文'
  };
};
</script>