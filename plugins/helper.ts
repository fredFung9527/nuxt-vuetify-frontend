import Vue from 'vue';
import { Context } from '@nuxt/types';

let context: Context;

const functions = {
  test: (text?: boolean): void => {
    console.log(text || 'test');
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $helper: typeof functions;
  }
};

export default (originalContext: Context) => {
  context = originalContext;
  Vue.prototype.$helper = functions;
}