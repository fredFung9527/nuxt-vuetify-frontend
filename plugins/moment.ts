import Vue from 'vue';
import { Context } from '@nuxt/types';
import moment from 'moment';

let context: Context;

const functions = {
  moment(text: string, originalFormat: string = 'YYYY-MM-DD'): moment.Moment {
    return moment(text, originalFormat);
  },
  getDate(date?: moment.MomentInput, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format);
  },
  getDateTime(date?: moment.MomentInput, format: string = 'YYYY-MM-DD HH:mm'): string {
    return moment(date).format(format);
  },
  getDiff(start: moment.MomentInput, end: moment.MomentInput, unit: string = 'hours'): number {
    if (!start || !end) throw new Error('Need Two Dates');
    const duration = moment.duration(moment(end).diff(start));
    const finalUnit = unit[0].toLowerCase();
    switch (finalUnit) {
      case 'd':
        return duration.asYears();
      case 'm':
        return duration.asMinutes();
      case 's':
        return duration.asSeconds();
      default:
        return duration.asHours();
    }
  },
  isBefore(target: moment.MomentInput, compare: moment.MomentInput): boolean {
    if (!target || !compare) throw new Error('Need Two Dates');
    return moment(target).isBefore(compare);
  },
  isAfter(target: moment.MomentInput, compare: moment.MomentInput): boolean {
    if (!target || !compare) throw new Error('Need Two Dates');
    return moment(target).isAfter(compare);
  }
};

declare module 'vue/types/vue' {
  interface Vue {
    $moment: typeof functions;
  }
};

export default (originalContext: Context) => {
  context = originalContext;
  Vue.prototype.$moment = functions;
};