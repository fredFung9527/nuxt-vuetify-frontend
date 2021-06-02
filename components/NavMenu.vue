<template>
  <v-list dense nav>
    <v-text-field 
      filled rounded dense hide-details
      append-icon="mdi-magnify"
      v-model="keyowrd"
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
          link :to="localePath(sItem.to)"
        >
          <v-list-item-content>
            <v-list-item-title>{{$t(sItem.title)}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{sItem.icon}}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-item v-else link :to="localePath(item.to)">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
      </v-list-item>
    </div>
  </v-list>
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

  items: MenuItem[] = [
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
    {
      icon: 'mdi-account-circle',
      title: 'pages.profile',
      subItems: [
        {
          icon: 'mdi-account-circle',
          title: 'pages.profile',
          to: '/'
        }
      ]
    },
  ];
};
</script>