<template>
  <div class="tts-no-device">
    <van-empty image="network" description="没有设备在线，请检查网络是否正常">
      <van-button class="bottom-button" type="danger" round @click="ok">确定</van-button>
    </van-empty>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function ok () {
  router.push('/login')
}
</script>

<style scoped lang="scss">
.tts-no-device {
  height: 100vh;
  display: flex;
  justify-content: center;

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>
