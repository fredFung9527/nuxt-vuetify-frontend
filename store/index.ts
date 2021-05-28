// Tutorial: https://github.com/danielroe/typed-vuex
import { getAccessorType, mutationTree } from 'typed-vuex';

export const state = () => ({
  email: '' as string,
});

type RootState = ReturnType<typeof state>;

export const getters = {
  email: (state: RootState) => state.email,
};

export const mutations = mutationTree(state, {
  setEmail(state, newValue: string) {
    state.email = newValue
  },

  initialiseStore() {
    console.log('initialised')
  },
});

export const accessorType = getAccessorType({
  getters,
  mutations,
  state,
});