import Vue from 'vue'
import device from 'current-device'
export default function ({ store, redirect, app, req }) {
  Vue.prototype.$device = device
}
