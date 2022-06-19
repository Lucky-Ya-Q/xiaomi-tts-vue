<template>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="value" :options="option" />
  </van-dropdown-menu>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(0)
const option = [
  { text: '小爱音箱Pro', value: 0 }
]
</script>

<style scoped lang="scss">
.van-dropdown-menu{
  position: relative;
  z-index: 999;
  margin-bottom: 12px;
}
</style>
