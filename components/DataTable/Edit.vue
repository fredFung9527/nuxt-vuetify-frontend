<template>
  <v-card>
    <v-card-title>{{settings.name}} - {{ isEdit ? $t('edit') : $t('create') }}</v-card-title>
    <v-card-text>
      <v-form ref="editForm">
        <v-row>
          <v-col cols="12" sm="6" v-for="field in (isEdit ? editFileds : createFileds)" :key="field.value">
            <v-text-field
              v-if="field.type === 'text' || field.type === 'number'"
              :label="field.text"
              :type="field.type"
              v-model="newItem[field.value]"
              :rules="getRules(field)"
              :disabled="isEdit && field.editor && field.editor.readonly"
            />
            <password-field
              v-if="field.type === 'password'"
              :label="field.text"
              mode="simple"
              v-model="newItem[field.value]"
              :rules="getRules(field)"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-row justify="end" no-gutters class="py-5 px-5">
      <v-btn large text color="accent" :loading="loading" class="mr-2" @click.stop="$emit('close')">{{$t('close')}}</v-btn>
      <v-btn rounded large color="primary" :loading="loading" @click.stop="save()">{{$t('save')}}</v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, mixins, Prop, Ref } from 'nuxt-property-decorator';
import { MyClass, InputRules } from '~/mixins';
import { Setting, SchemaObject } from './index.vue';
import _ from 'lodash';
import Vue from 'vue';

@Component
export default class DataTableEdit extends mixins(MyClass, InputRules) {
  @Ref('editForm') readonly editForm!: HTMLFormElement;

  @Prop({ default: () => {} }) readonly settings!: Setting;
  @Prop({ default: () => {} }) readonly item!: any;

  newItem: any = {};

  get isEdit(): boolean {
    return this.item?._id?.length > 0 || false;
  };

  get createFileds(): SchemaObject[] {
    return _.filter(_.sortBy(this.settings.schema, 'showOrder'), (it: SchemaObject) => {
      if (!it.editor) return false;
      return !it.editor.readonly || it.editor.editableWhenCreate || false;
    })
  };

  get editFileds(): SchemaObject[] {
    return _.filter(_.sortBy(this.settings.schema, 'showOrder'), (it: SchemaObject) => {
      return it.editor ? true : false;
    })
  };

  getRules(field: SchemaObject) {
    var result = [];
    if (field.editor?.must) result.push(this.checkRequired(this.newItem[field.value]));
    if (field.editor?.isEmail) result.push(this.checkEmail(this.newItem[field.value]));
    if (field.editor?.minLength) result.push(this.checkLengthMin(this.newItem[field.value], field.editor?.minLength));
    return result;
  };

  async save() {
    if (!this.editForm.validate() || !this.settings.path) return;
    try {
      this.setLoading(true);
      if (this.isEdit) {
        await this.$feathers.service(this.settings.path).patch(this.item._id, _.omit(this.newItem, '_id'));
      } else {
        await this.$feathers.service(this.settings.path).create(this.newItem);
      }
      this.$emit('saved');
      this.$accessor.alertSuccess(<string>this.$t('saved'));
    } catch (e) {
      this.$accessor.alertError(e.message);
    } finally {
      this.setLoading();
    }
  };

  mounted() {
    if (this.isEdit) {
      this.newItem = _.cloneDeep(this.item);
    }
    _.forEach(this.settings.schema, (it: SchemaObject) => {
      if (this.newItem[it.value] == null) {
        Vue.set(this.newItem, it.value, it.default || '');
      }
    })
  }
};
</script>