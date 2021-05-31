<template>
  <div>{{text}}</div>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class SampleComponent extends mixins(MyClass) {
  @Prop({ default: 'Hello World!' }) readonly text!: string;
};
</script>