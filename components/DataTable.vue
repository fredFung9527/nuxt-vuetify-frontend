<template>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

@Component
export default class DataTable extends mixins(MyClass) {
};
</script>