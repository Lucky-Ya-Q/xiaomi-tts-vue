<template>
  <van-cell-group inset title="个人信息">
    <van-cell title="单元格" value="内容"/>
    <van-cell title="单元格" value="内容" label="描述信息"/>
  </van-cell-group>
  <van-cell-group inset title="账号信息">
    <van-cell title="退出登录" title-class="logout" clickable @click="logout"/>
  </van-cell-group>
</template>

<script setup>
import { Dialog } from 'vant'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'

const router = useRouter()

function logout () {
  Dialog.confirm({
    message: '确定退出登录吗？'
  }).then(() => {
    removeToken()
    router.push('/login')
  }).catch(() => {
  })
}
</script>

<style scoped lang="scss">
::v-deep(.logout) {
  text-align: center;
  color: #ee0a24;
}
</style>
