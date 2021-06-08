<template>
  <v-card>
    <v-card-title>{{tableName}} - {{ item._id ? $t('edit') : $t('create') }}</v-card-title>
    <v-card-text>
      <div>{{item}}</div>
    </v-card-text>
    <v-row justify="end" no-gutters class="py-5 px-5">
      <v-btn large text color="accent" :loading="loading" class="mr-2" @click.stop="$emit('close')">{{$t('close')}}</v-btn>
      <v-btn rounded large color="primary" :loading="loading">{{$t('save')}}</v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';
import { Setting } from './index.vue'

@Component
export default class DataTableEdit extends mixins(MyClass) {
  @Prop({ default: () => {} }) readonly settings!: Setting;
  @Prop({ default: '' }) readonly tableName!: string;
  @Prop({ default: () => {} }) readonly item!: object;
};
</script>