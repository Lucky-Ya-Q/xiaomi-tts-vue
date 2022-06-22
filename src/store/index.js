import { createStore } from 'vuex'
import request from '@/utils/request'

export default createStore({
  state: {
    devices: []
  },
  getters: {},
  mutations: {
    SET_DEVICES (state, payload) {
      state.devices = payload.devices
    }
  },
  actions: {
    setDevices (context) {
      request({ url: '/tts/getDevice' }).then((data) => {
        for (const device of data.data) {
          device.text = device.alias
          device.value = device.deviceID
        }
        context.commit('SET_DEVICES', { devices: data.data })
      })
    }
  },
  modules: {}
})
