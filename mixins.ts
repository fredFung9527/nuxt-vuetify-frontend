// Vue minxins

import { Component, Vue } from 'nuxt-property-decorator';
import { MetaInfo } from 'vue-meta';

// You can declare mixins as the same style as components.
@Component
export class MyClass extends Vue {
  loading: boolean = false;

  head(): (MetaInfo | void) {};

  mounted(): void {}; // to be extended

  beforeMount(): void {}; // to be extended

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