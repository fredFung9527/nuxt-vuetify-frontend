<template>
  <v-text-field
    v-if="mode === 'default'"
    prepend-inner-icon="mdi-lock" filled rounded
    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showPassword ? 'text' : 'password'"
    :label="label" 
    v-model="password" 
    :rules="rules"
    @click:append.stop="showPassword = !showPassword"
    @keydown.enter="$emit('enter')"
  />
  <v-text-field
    v-else
    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    :type="showPassword ? 'text' : 'password'"
    :label="label" 
    v-model="password" 
    :rules="rules"
    @click:append.stop="showPassword = !showPassword"
    @keydown.enter="$emit('enter')"
  />
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class PasswordField extends mixins(MyClass) {
  @Prop({ default: 'default' }) readonly mode!: string;
  @Prop({ default: '' }) readonly label!: string;
  @Prop({ default: '' }) readonly value!: string;
  @Prop({ default: () => [] }) readonly rules!: object;

  showPassword: boolean = false;

  get password() {
    return this.value;
  };
  set password(v: string) {
    this.$emit('input', v);
  };
};
</script>