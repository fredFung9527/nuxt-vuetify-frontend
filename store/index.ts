// Tutorial: https://github.com/danielroe/typed-vuex
import { getAccessorType, mutationTree } from 'typed-vuex';
import { User } from '~/types/models';

export const state = () => ({
  ininted: false as boolean,
  connected: false as boolean,
  user: {} as User,

  alert: false as boolean,
  alertMessage: '' as string,
  alertType: '' as string
});

type RootState = ReturnType<typeof state>;

export const getters = {
  userID(state: RootState): string {
    return state.user?._id || '';
  },
  logined(state: RootState): boolean {
    return getters.userID(state).length > 0 || false;
  },
};

export const mutations = mutationTree(state, {
  setConnected(state, v: boolean) {
    state.connected = v || false;
  },
  setUser(state, user: User) {
    state.user = user || {};
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  initialiseStore(state) {
    if (state.ininted) return;
    const userRecord = localStorage.getItem('user');
    state.user = userRecord ?JSON.parse(userRecord) : {};
    console.log('Store is initialised');
    state.ininted = true;
  },
  closeAlert(state) {
    state.alert = false;
  },
  alertError(state, message: string) {
    state.alert = true;
    state.alertType = 'error';
    state.alertMessage = message || '';
  },
  alertSuccess(state, message: string) {
    state.alert = true;
    state.alertType = 'success';
    state.alertMessage = message || '';
  }
});

export const accessorType = getAccessorType({
  getters,
  mutations,
  state,
});