<template>
  <v-card>
    <client-only>
      <v-toolbar flat>
        <v-toolbar-title>{{settings.name || '-'}}</v-toolbar-title>
        <v-divider class="mx-5" inset vertical/>
        <v-spacer/>
        <v-btn icon color="primary" @click.stop="currentItem = {}; editDialog = true;"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn icon color="primary"><v-icon>mdi-export</v-icon></v-btn>
        <v-btn icon color="primary"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-toolbar>

      <v-card-text>
        <v-data-table
          multi-sort
          :headers="headers"
          :items="items"
          :options.sync="options"
          :server-items-length="total"
          :loading="loading"
          :no-data-text="$t('table.noData')"
          :no-results-text="$t('table.noData')"
          :loading-text="$t('table.loading')"
          :header-props="{
            'sort-by-text': $t('table.sortBy'),
          }"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 100, -1],
            'items-per-page-all-text': $t('table.all'),
            'items-per-page-text': $t('table.perPage'),
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              v-if="!settings.disableActions || (settings.disableActions && !settings.disableActions.edit)"
              icon color="primary" 
              @click.stop="currentItem = item; editDialog = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn 
              v-if="!settings.disableActions || (settings.disableActions && !settings.disableActions.delete)"
              icon color="error"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </client-only>

    <client-only>
      <v-dialog v-if="editDialog" v-model="editDialog">
        <DataTable-Edit 
          :item="currentItem" :settings="settings"
          @close="editDialog = false"
          @saved="editDialog = false; loadData()"
        />
      </v-dialog>
    </client-only>
  </v-card>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch  } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';
import _ from 'lodash';

export enum AlignType {
  Start = 'start',
  Center = 'center',
  End = 'end'
}

export interface HeaderObject {
  text?: string, 
  align?: AlignType,
  sortable?: boolean,
  value?: string, 
};

export interface SchemaObject {
  text?: string,
  value: string,
  default?: any,
  header?: HeaderObject,
  type?: 'text' | 'textarea' | 'number' | 'password',
  editor?: {
    editable?: boolean,
    readonly?: boolean,
    editableWhenCreate?: boolean,
    isEmail?: boolean,
    must?: boolean,
    minLength?: number
  },
  showOrder?: string
};

export interface Setting {
  name: string,
  path: string,
  sortBy?: string,
  descending?: boolean,
  schema: SchemaObject[],
  disableActions?: {
    edit?: boolean,
    delete?: boolean,
  },
  actionsAlign?: AlignType,
  filter?: {
    [key: string]: any
  }
};

@Component
export default class DataTable extends mixins(MyClass) {
  @Prop({ default: () => {} }) readonly settings!: Setting;

  editDialog: boolean = false;
  currentItem: any = {};

  options: any = {};
  items: any = [];
  total: number = -1;

  get headers(): HeaderObject[] {
    let result: HeaderObject[] = [];
    if (!this.settings.disableActions || !this.settings.disableActions.edit || !this.settings.disableActions.delete) {
      result.push({ text: <string>this.$t('table.actions'), value: 'actions',  sortable: false, align: this.settings.actionsAlign || AlignType.Start });
    }
    _.forEach(_.sortBy(this.settings.schema, 'showOrder'), (it: SchemaObject) => {
      if (it.header) {
        result.push({
          text: it.header.text || it.text || '',
          value: it.header.value || it.value || '',
          sortable: it.header.sortable === false ? false : true,
          align: it.header.align || AlignType.Start,
        })
      }
    });
    return result;
  }

  async loadData() {
    try {
      const path = this.settings?.path;
      if (!path) return;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      if (!page) return;
      this.setLoading(true);

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
    } catch (e) {
      this.$accessor.alertError(e.message);
    } finally {
      this.setLoading();
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
    await this.loadData();
  };

  @Watch('options')
  onNewOption() {
    this.loadData();
  }
};
</script>