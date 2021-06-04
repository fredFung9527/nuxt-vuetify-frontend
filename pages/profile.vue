<template>
  <v-container>
    <v-card rounded>
      <v-card-title>{{$t('basicInfo')}}</v-card-title>
      <v-card-text>
        <v-form ref="infoForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field 
                prepend-inner-icon="mdi-folder-account" filled rounded
                :label="$t('firstName')" 
                v-model="firstName"
                :rules="[checkRequired(firstName)]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                prepend-inner-icon="mdi-folder-account" filled rounded
                :label="$t('lastName')" 
                v-model="lastName"
                :rules="[checkRequired(lastName)]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-row justify="end" no-gutters class="my-5">
      <v-btn rounded large color="primary" @click.stop="updateInfo()" :loading="loading">{{$t('update')}}</v-btn>
    </v-row>

    <v-card rounded>
      <v-card-title>{{$t('changePassword')}}</v-card-title>
      <v-card-text>
        <v-form ref="passwordForm">
          <v-row>
            <v-col cols="12" sm="6">
              <password-field
                :label="$t('oldPassword')" 
                v-model="oldPassword" 
                :rules="[checkLengthMin(oldPassword)]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <password-field
                :label="$t('newPassword')" 
                v-model="newPassword" 
                :rules="[checkLengthMin(newPassword)]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <password-field
                :label="$t('confirmPassword')" 
                v-model="confirmPassword" 
                :rules="[checkLengthMin(confirmPassword), checkPasswords(newPassword, confirmPassword)]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-row justify="end" no-gutters class="my-5">
      <v-btn rounded large color="primary" @click.stop="changePassword()" :loading="loading">{{$t('update')}}</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator';
import { MyClass, InputRules, LoginFirst } from '~/mixins';

@Component
export default class App extends mixins(MyClass, InputRules, LoginFirst) {
  @Ref('infoForm') readonly infoForm!: HTMLFormElement;
  @Ref('passwordForm') readonly passwordForm!: HTMLFormElement;

  head() {
    return {
      title: <string>this.$t('pages.profile')
    }
  };

  firstName: string = '';
  lastName: string = '';

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  mounted() {
    this.firstName = this.$accessor.user.firstName || '';
    this.lastName = this.$accessor.user.lastName || '';
  };

  async updateInfo() {
    if (this.loading || !this.infoForm.validate()) return;
    try {
      this.setLoading(true);
      const newUser = await this.$feathers.service('users').patch(this.$accessor.user._id, {
        firstName: this.firstName,
        lastName: this.lastName
      })
      this.$accessor.setUser(newUser);
      this.$accessor.alertSuccess(<string>this.$t('updated'));
    } catch (e) {
      this.$accessor.alertError(e.message);
    } finally {
      this.setLoading();
    }
  };

  async changePassword() {
    if (this.loading || !this.passwordForm.validate()) return;
    try {
      this.setLoading(true);
      await this.$feathers.service('change-password').create({
        oldPassword: this.oldPassword,
        password: this.newPassword
      })
      this.$accessor.alertSuccess(<string>this.$t('updated'));
    } catch (e) {
      this.$accessor.alertError(e.data?.message ? this.$helper.td(e.data.message) : e.message);
    } finally {
      this.setLoading();
    }
  };
};
</script>
