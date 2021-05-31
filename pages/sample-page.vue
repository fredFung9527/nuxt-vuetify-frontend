<template>
  
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class App extends Mixins(MyClass) {
};
</script>
