<template>
  <v-form ref="loginForm" class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" sm="8" md="6">
        <div class="title my-5">{{$t('loginTitle')}}</div>
        <v-text-field outlined :label="$t('email')" v-model="email" :rules="[checkReuqired(email), checkEmail(email)]"/>
        <v-text-field outlined :label="$t('password')" v-model="password" :rules="[checkLengthMin(password)]" @keydown.enter="login()"/>
        <v-row justify="end" no-gutters>
          <v-btn color="primary" @click.stop="login()" :loading="loading">{{$t('login')}}</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator';
import { MyClass, InputRules } from '~/mixins';

@Component
export default class App extends mixins(MyClass, InputRules) {
  @Ref('loginForm') readonly loginForm!: HTMLFormElement;

  layout() { return 'authentication' };

  head() {
    return {
      title: <string>this.$t('login')
    }
  };

  email: string = '';
  password: string = '';

  async login() {
    if (this.loading || !this.loginForm.validate()) return;
    try {
      this.setLoading(true);
      await this.$auth.login({
        email: this.email,
        password: this.password
      });
      this.$replace(this.localePath('/'));
    } catch (e) {
      if (e.message === 'Invalid login') {
        this.$accessor.alertError(<string>this.$t('errors.wrongPassword'));
      } else {
        this.$accessor.alertError(<string>this.$t('errors.timeout'))
      }
    } finally {
      this.setLoading();
    }
  }
};
</script>
