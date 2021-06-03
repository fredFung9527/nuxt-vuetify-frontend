<template>
  <v-container>
    <v-card rounded>
      <v-card-title>{{$t('basicInfo')}}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field 
              prepend-inner-icon="mdi-email" filled rounded readonly
              :label="$t('email')" 
              :value="$accessor.user.email"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field 
              prepend-inner-icon="mdi-email" filled rounded readonly
              :label="$t('email')" 
              :value="$accessor.user.email"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass, InputRules, LoginFirst } from '~/mixins';

@Component
export default class App extends mixins(MyClass, InputRules, LoginFirst) {
  head() {
    return {
      title: <string>this.$t('pages.profile')
    }
  }
};
</script>
