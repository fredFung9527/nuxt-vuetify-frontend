// Vue minxins

import { Component, Vue } from 'nuxt-property-decorator';
import { MetaInfo } from 'vue-meta';

// You can declare mixins as the same style as components.
@Component
export class MyClass extends Vue {
  loading: boolean = false;

  layout(): (string | void) {};
  
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
  };

  $push(path: string): void {
    this.$router.push(this.localePath(path));
  };

  $replace(path: string): void {
    this.$router.replace(this.localePath(path));
  }
};

@Component
export class InputRules extends Vue {
  checkRequired(v: string | number): boolean | string {
    if (typeof v === 'string') {
      return v.length > 0 || <string>this.$t('rules.required');
    }
    return !isNaN(v) || <string>this.$t('rules.required');
  };

  checkEmail(v: string): boolean | string {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return v && regex.test(v.toLowerCase()) || <string>this.$t('rules.wrongEmail');
  };

  checkLengthMin(v: string, min: number = 6): boolean | string {
    return v && v.length >= min || <string>this.$t('rules.atLeastLength', {length: min});
  };

  checkPasswords(v1: string, v2: string): boolean | string {
    return v1 && v2 && v1 === v2 || <string>this.$t('rules.inconsistPasswords');
  };
};

@Component
export class LoginFirst extends Vue {
  mounted() {
    try {
      this.$accessor.initialiseStore();
      if (!this.$accessor.logined) {
        this.$router.replace(this.localePath('/login'));
        this.$accessor.alertError(<string>this.$t('errors.loginFirst'));
        return;
      }
    } catch (e) {}
  };
};