// Tutorial: https://github.com/danielroe/typed-vuex
import { getAccessorType, mutationTree } from 'typed-vuex';
import { User } from '~/model-types'

export const state = () => ({
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
  logined(): boolean {
    return getters.userID.length > 0 || false;
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
    const userRecord = localStorage.getItem('user');
    state.user = userRecord ?JSON.parse(userRecord) : {};
    console.log('Store is initialised');
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