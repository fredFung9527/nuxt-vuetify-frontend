import Vue from 'vue';
import { Context } from '@nuxt/types';
import _ from 'lodash';
import { Attachment } from '~/types/models';

let context: Context;

interface LangObject {
  lang: string,
  text: string
}

const functions = {
  td(list: LangObject[]): string {
    if (!Array.isArray(list) || !list.length) return '-';
    const targetObject = _.find(list, (it: LangObject) => it.lang === context.i18n.locale);
    return targetObject?.text || '-';
  },
  async uploadFiles(files: FileList, tag: string = 'common', description?: string): Promise<Attachment[]> {
    if (!files || !files.length) throw new Error('No file');
    let result: Attachment[] = [];
    let idx = 0;
    while (idx < files.length) {
      let data = new FormData();
      data.append('file', files[idx]);
      data.append('tag', tag);
      data.append('description', description || '');
      
      const res = (await context.$axios.post(`${process.env.apiURL}/attachments`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${context.store.state.accessToken}`
        }
      })).data;
      result.push(res);
      idx += 1;
    }
    return result;
  }
};

declare module 'vue/types/vue' {
  interface Vue {
    $helper: typeof functions;
  }
};

export default (originalContext: Context) => {
  context = originalContext;
  Vue.prototype.$helper = functions;
};