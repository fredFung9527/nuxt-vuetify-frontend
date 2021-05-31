<template>
  <div>{{text}}</div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class SampleComponent extends Mixins(MyClass) {
  @Prop({ default: 'Hello World!' }) readonly text!: string;
};
</script>