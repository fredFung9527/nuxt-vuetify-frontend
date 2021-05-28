import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare mixins as the same style as components.
@Component
export class MyPage extends Vue {
  mounted() {}; // to be extended

  beforeMount() {}; // to be extended

  setLoading(value?: boolean): void {
    this.$nextTick(() => {
      if (value) {
        this.$nuxt.$loading.start()
      } else {
        this.$nuxt.$loading.finish();
      }
    });
  }
};