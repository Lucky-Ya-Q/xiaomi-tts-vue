<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit"
                  loading-text="登录中..." :loading="loading">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import request from '@/utils/request'
import { useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'

const router = useRouter()

const username = ref('18132087340')
const password = ref('1553592282liu')
const loading = ref(false)
const onSubmit = (values) => {
  loading.value = true
  request({
    url: '/tts/login',
    method: 'post',
    data: values
  }).then(data => {
    if (data.code === 200) {
      setToken(data.token)
      router.push('/layout')
    } else if (data.code === 201) {
      router.push('/no-device')
    }
  }).finally(() => {
    loading.value = false
  })
}
</script>

<style scoped lang="scss">

</style>
