export default {
  state: {
    accessToken: ''
  },

  getters: {
    accessToken (state) {
      return state.accessToken
    }
  },

  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    }
  },

  actions: {
  }
}
