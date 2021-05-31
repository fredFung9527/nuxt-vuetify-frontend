<template>
  <div>
    <nuxt-link
      v-for="(locale, idx) in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ `${idx === 0 ? '' : '/ '}${localeNames[locale.code]}` }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';
import { LocaleObject } from 'nuxt-i18n';

@Component
export default class LangSwitcher extends mixins(MyClass) {
  localeNames: {[key: string]: string} = {
    'en': 'English',
    'cht': '繁體中文',
    'chs': '简体中文'
  };

  get availableLocales(): LocaleObject[] {
    const all = <LocaleObject[]>this.$i18n.locales || [];
    return all.filter(i => i.code !== this.$i18n.locale);
  };
};
</script>