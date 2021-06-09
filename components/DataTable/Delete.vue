<template>
  <v-card>
    <v-card-title>{{settings.name}} - {{ $t('delete') }}</v-card-title>
    <v-card-text>
      <v-data-table
        disable-sort
        hide-default-footer
        :headers="headers"
        :items="items"
        :options="{
          'itemsPerPage': -1
        }"
        :no-data-text="$t('table.noData')"
        :no-results-text="$t('table.noData')"
      />
    </v-card-text>
    <v-row justify="end" no-gutters class="py-5 px-5">
      <v-btn large text color="accent" :loading="loading" class="mr-2" @click.stop="$emit('close')">{{$t('close')}}</v-btn>
      <v-btn rounded large color="error" :loading="loading" @click.stop="confirmDelete()">{{$t('delete')}}</v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator';
import { MyClass, InputRules } from '~/mixins';
import { Setting, SchemaObject, HeaderObject, AlignType } from './index.vue';
import _ from 'lodash';

@Component
export default class DataTableDelete extends mixins(MyClass, InputRules) {
  @Prop({ default: () => {} }) readonly settings!: Setting;
  @Prop({ default: () => [] }) readonly items!: any;

  get headers(): HeaderObject[] {
    let result: HeaderObject[] = [];
    _.forEach(_.sortBy(this.settings.schema, 'showOrder'), (it: SchemaObject) => {
      if (it.header) {
        result.push({
          text: it.header.text || it.text || '',
          value: it.header.value || it.value || '',
          sortable: false,
          align: it.header.align || AlignType.Start,
        })
      }
    });
    return result;
  }

  async confirmDelete() {
    try {
      this.setLoading(true);
      for (let item of this.items) {
        await this.$feathers.service(this.settings.path).remove(item._id);
      }
      this.$emit('deleted');
      this.$accessor.alertSuccess(<string>this.$t('deleted'));
    } catch (e) {
      this.$accessor.alertError(e.message);
    } finally {
      this.setLoading();
    }
  };
};
</script>