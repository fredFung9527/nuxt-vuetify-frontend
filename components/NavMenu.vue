<template>
  <client-only>
    <v-list dense nav class="navMenu">
      <v-text-field 
        filled rounded dense hide-details
        append-icon="mdi-magnify"
        v-model="keyowrd"
        class="my-2"
      />
      <div v-for="(item, idx) in filteredItems" :key="`menu-${idx}`">
        <v-list-group
          v-if="item.subItems"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(sItem, jdx) in item.subItems" :key="`menu-${idx}-${jdx}`"
            exact :to="localePath(sItem.to)"
          >
            <v-list-item-content>
              <v-list-item-title>{{$t(sItem.title)}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>{{sItem.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else exact :to="localePath(item.to)">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </client-only>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { MyClass } from '~/mixins';
import _ from 'lodash'

interface SubMenuItem {
  icon?: string,
  title: string,
  to: string,
};

interface MenuItem {
  icon?: string,
  title: string,
  to?: string,
  subItems?: SubMenuItem[]
};

@Component
export default class NavMenu extends mixins(MyClass) {
  keyowrd: string = '';

  get filteredItems(): MenuItem[] {
    if (!this.keyowrd) return this.items || [];
    const lowerCaseKeyword: string = this.keyowrd.toLowerCase();

    const isGood = function(text: string): boolean {
      if (!text) return false;
      return text.toLowerCase().includes(lowerCaseKeyword);
    }

    let result: MenuItem[] = [];
    _.forEach(this.items, (it: MenuItem) => {
      if (isGood(<string>this.$t(it.title))) {
        result.push(it);
        return;
      }

      const goodSubItems = _.filter(it.subItems, (sit: SubMenuItem) => isGood(<string>this.$t(sit.title)));
      if (goodSubItems && goodSubItems.length) {
        result.push({
          ...it,
          ...{ subItems: goodSubItems }
        });
      }
    });
    return result;
  }

  items: MenuItem[] =
    this.$accessor.logined ? [
      {
        icon: 'mdi-home',
        title: 'pages.home',
        to: '/'
      },
      {
        icon: 'mdi-account-circle',
        title: 'pages.profile',
        to: '/profile'
      },
      ...this.$accessor.isAdmin ? [
        {
          icon: 'mdi-account-lock',
          title: 'pages.admins',
          to: '/admins'
        },
      ] : [],
      {
        icon: 'mdi-login',
        title: 'logout',
        to: '/logout'
      },
    ] : [
      {
        icon: 'mdi-login',
        title: 'login',
        to: '/login'
      },
    ]
};
</script>

<style scoped>
.navMenu {
  padding-top: 0px !important;
}

.navMenu >>> .v-list-item--active {
  color: var(--v-primary-base) !important;
}
</style>