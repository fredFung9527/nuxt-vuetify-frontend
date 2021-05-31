// Vue minxins

import Vue from 'vue';
import Component, { createDecorator } from 'vue-class-component';

// You can declare mixins as the same style as components.
@Component
export class MyClass extends Vue {
  loading: boolean = false;

  mounted() {}; // to be extended

  beforeMount() {}; // to be extended

  setLoading(value?: boolean): void {
    this.$nextTick(() => {
      if (value) {
        this.loading = true;
        this.$nuxt.$loading.start()
      } else {
        this.loading = false;
        this.$nuxt.$loading.finish();
      }
    });
  }
};