<template>
  <div class="tts-login">
    <h3 class="title">小米账号登录</h3>
    <div class="logo">
      <img width="48" src="https://s02.mifile.cn/assets/static/image/logo-mi2.png" alt="logo">
      <p>让每个人都能享受科技的乐趣</p>
    </div>
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
      <van-button round block type="primary" native-type="submit"
                  loading-text="登录中..." :loading="loading">
        登录
      </van-button>
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import request from '@/utils/request'
import { useRoute, useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const onSubmit = (values) => {
  loading.value = true
  request({
    url: '/tts/login',
    method: 'post',
    data: values
  }).then(data => {
    if (data.code === 200) {
      store.dispatch('setDevices')
      Cookies.set('deviceId', data.data.deviceId)
      setToken(data.data.token)
      if (route.query.redirect) {
        router.push(route.query.redirect)
      } else {
        router.push('/layout')
      }
    } else if (data.code === 201) {
      router.push('/no-device')
    }
  }).finally(() => {
    loading.value = false
  })
}
</script>

<style scoped lang="scss">
.tts-login {
  padding-top: 50px;
  height: 100vh;
  background: white;

  .title {
    font-weight: normal;
    text-align: center;
  }

  .logo {
    text-align: center;
    padding: 20px 0 40px 0;
    background-image: url(https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/background.d3d7d2dd.png);
    background-size: cover;
    background-position: center -60px;

    p {
      font-size: 14px;
      color: #646566;
    }
  }

  .van-cell-group {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .van-button {
    width: 80%;
    margin: auto;
  }
}
</style>
