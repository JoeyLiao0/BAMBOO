import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
    setRefreshToken(token) {
      this.refreshToken = token;
    },
    clearAccessToken() {
      this.accessToken = null;
    },
    clearRefreshToken() {
      this.refreshToken = null;
    },
    clearTokens() {
      this.clearAccessToken();
      this.clearRefreshToken();
    },
  },
  persist: {
    storage: localStorage,
    pick: ["accessToken", "refreshToken"],
  },
});
