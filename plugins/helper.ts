import Vue from 'vue';
import { Context } from '@nuxt/types';
import _ from 'lodash';

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