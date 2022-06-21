<template>
  <div class="tts-layout">
    <router-view></router-view>
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="calendar-o">时钟</van-tabbar-item>
    <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const active = ref(0)
watch(active, (newVal) => {
  switch (newVal) {
    case 0:
      router.push('/layout/index')
      break
    case 1:
      router.push('/layout/shizhong')
      break
    case 2:
      router.push('/layout/xiaoxi')
      break
    case 3:
      router.push('/layout/wode')
      break
  }
})
</script>

<style scoped lang="scss">
.tts-layout {
  margin-bottom: 50px;
}
</style>
