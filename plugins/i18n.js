import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.home.locale,
    fallbackLocale: 'cn',
    messages: {
      cn: require('~/lang/cn.json'),
      en: require('~/lang/en.json'),
    },
  })
}
