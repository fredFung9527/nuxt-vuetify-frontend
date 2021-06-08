<template>
  <v-card class="full-width">
    <v-toolbar flat>
      <v-toolbar-title>{{settings.name || '-'}}</v-toolbar-title>
      <v-divider class="mx-4" inset vertical/>
    </v-toolbar>
    <v-card-text>
      <client-only>
        <v-data-table
          multi-sort
          :headers="headers"
          :items="items"
          :options.sync="options"
          :server-items-length="total"
          :loading="loading"
          :no-data-text="$t('table.noData')"
          :loading-text="$t('table.loading')"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 100, -1]
          }"
        ></v-data-table>
      </client-only>
    </v-card-text>
    <v-dialog/>
  </v-card>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch  } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';

interface Setting {
  name: string,
  path: string,
  sortBy: string,
  descending: boolean
};

@Component
export default class DataTable extends mixins(MyClass) {
  @Prop({ default: () => {} }) readonly settings!: Setting;

  options: any = {};
  items: any = [];
  total: number = -1;

  headers = [
    {
      text: 'Email',
      align: 'start',
      sortable: false,
      value: 'email',
    },
  ];

  async getDataFromApi () {
    const path = this.settings?.path;
    if (!path) return;

    const { sortBy, sortDesc, page, itemsPerPage } = this.options;
    const qData = await this.$feathers.service(path).find({
      query: {
        $limit: -1
      }
    })
    console.log(qData)
    this.items = qData.data || [];
  };

  async mounted() {
    await this.getDataFromApi();
  };

  @Watch('options')
  onNewOption() {
    this.getDataFromApi();
  }
};
</script>