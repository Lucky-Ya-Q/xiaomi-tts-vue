<template>
  <van-dropdown-menu active-color="#1989fa" z-index="999">
    <van-dropdown-item v-model="value" :options="devices" @change="useDevice"/>
  </van-dropdown-menu>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
import { useStore } from 'vuex'

const store = useStore()

const devices = computed(() => store.state.devices)

const value = ref('')
value.value = Cookies.get('deviceId')

function useDevice (value) {
  console.log('切换指定设备', value)
  // TODO: 2022/6/21 由于没有多个设备就不搞了
  Cookies.set('deviceId', value)
}

onMounted(() => {
  if (devices.value.length) return
  store.dispatch('setDevices')
})
</script>

<style scoped lang="scss">

</style>
