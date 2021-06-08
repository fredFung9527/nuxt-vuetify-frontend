<template>
  <client-only>
    <v-card class="full-width">
      <v-toolbar flat>
        <v-toolbar-title>{{settings.name || '-'}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical/>
        <v-spacer/>
        <v-btn icon color="primary"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn icon color="primary"><v-icon>mdi-export</v-icon></v-btn>
        <v-btn icon color="primary"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          multi-sort
          :headers="settings.headers || []"
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
      </v-card-text>
      <v-dialog/>
    </v-card>
  </client-only>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch  } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';
import _ from 'lodash';

interface HeaderObject {
  text: string, 
  align?: string, // start center end
  sortable?: boolean, 
  value: string
};

interface Setting {
  name: string,
  path: string,
  sortBy?: string,
  descending?: boolean,
  headers: HeaderObject[],
  filter: {
    [key: string]: any
  }
};

@Component
export default class DataTable extends mixins(MyClass) {
  @Prop({ default: () => {} }) readonly settings!: Setting;

  options: any = {};
  items: any = [];
  total: number = -1;

  async getDataFromApi () {
    const path = this.settings?.path;
    if (!path) return;

    const { sortBy, sortDesc, page, itemsPerPage } = this.options;
    if (!page) return;

    let sortObject: any = {};
    let idx = 0;
    while (idx < sortBy.length) {
      sortObject[sortBy[idx]] = sortDesc[idx] ? -1 : 1;
      idx += 1;
    }
    const skip = itemsPerPage === -1 ? 0 : itemsPerPage * (page - 1);
    
    const qData = await this.$feathers.service(path).find({
      query: {
        ...this.settings.filter,
        $skip: skip,
        $limit: itemsPerPage,
        $sort: sortObject
      }
    });
    if (itemsPerPage === -1) {
      this.items = qData || [];
      this.total = qData.length || 0;
    } else {
      this.items = qData.data || [];
      this.total = qData.total || 0;
    }
  };

  async mounted() {
    if (this.settings.sortBy) {
      this.options.sortBy = [this.settings.sortBy];
      this.options.sortDesc = [this.settings.descending || false];
    } else if (this.settings.descending) {
      this.options.sortBy = ['_id'];
      this.options.sortDesc = [true];
    }
    await this.getDataFromApi();
  };

  @Watch('options')
  onNewOption() {
    this.getDataFromApi();
  }
};
</script>