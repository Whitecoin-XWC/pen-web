import http from '~/api/http'

export const state = () => ({
  locales: ['cn', 'en'],
  locale: 'en',
  queryData: null,
})

export const mutations = {
  set_queryData(state, payload) {
    state.queryData = payload
  },
  set_locale: (state, locale) => {
    // state.locale = locale
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}

export const actions = {
  async get_queryAddr({ commit }, payload) {
    const res = await http(this.$axios).queryAddr(payload)
    if (res.code === 1) {
      commit('set_queryData', res.data)
    }
    return res
  },
  async get_fetchAddr({ commit }, payload) {
    const res = await http(this.$axios).fetchAddr(payload)
    return res
  },
}
