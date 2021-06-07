<template>
  <div>
    {{settings}}
    <slot name="header"></slot>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

interface Setting {
  tableName: string,
  
};

@Component
export default class DataTable extends mixins(MyClass) {
  @Prop({ default: () => {} }) readonly settings!: Setting;
};
</script>