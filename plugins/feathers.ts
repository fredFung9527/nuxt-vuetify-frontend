import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { AuthenticationResult } from '@feathersjs/authentication';
import { User } from '~/types/models';

let context: Context;

const socket = io(process.env.apiURL || 'http://localhost:3001', { transports: ['websocket'] });
socket.on('connection', () => {
  console.log('Connected to API');
  context.store.commit('setConnected', true);
});
socket.on('disconnect', () => {
  console.log('Disconnected to API');
  context.store.commit('setConnected', false);
});

const feathersClient = feathers();
feathersClient.configure(socketio(socket, { 
  timeout: process.env.socketTimeout ? +process.env.socketTimeout : 10000 
}));
feathersClient.configure(auth({ 
  storageKey: 'authKey' ,
  storage: window.localStorage
}));
feathersClient.hooks({
  before: {
  }
});

interface AuthenticationInput {
  email: string,
  password: string,
}

const authFunctions = {
  async register(input: User): Promise<AuthenticationResult> {
    if (!input || !input.email || !input.password) throw new Error ('Not enough information');
    await feathersClient.service('users').create(input);
    return await this.login(input);
  },
  async login(input?: AuthenticationInput): Promise<AuthenticationResult> {
    try {
      const reAuthResult = await feathersClient.reAuthenticate();
      console.log('Re-Authenticated');
      context.store.commit('setUser', reAuthResult.user);
      return reAuthResult;
    } catch (error) {
      const loginResult = await feathersClient.authenticate({
        strategy: 'local',
        ...input
      });
      console.log('Logined');
      context.store.commit('setUser', loginResult.user);
      return loginResult;
    }
  },
  async logout() :Promise<void> {
    await feathersClient.logout();
    context.store.commit('setUser', {});
  }
}

new Promise(async() => {
  try {
    await authFunctions.login();
  } catch (e) {
    await authFunctions.logout();
    console.log('Login fail at the init stage');
  }
});

declare module 'vue/types/vue' {
  interface Vue {
    $feathers: feathers.Application<any>;
    $auth: typeof authFunctions;
  }
};

export default (originalContext: Context) => {
  context = originalContext;
  Vue.prototype.$feathers = feathersClient;
  Vue.prototype.$auth = authFunctions;
};