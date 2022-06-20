<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset title="留言板">
      <van-field v-model="name" label="昵称" placeholder="请输入昵称"
                 maxlength="10"
                 required
                 :rules="[{ required: true, message: '请输入昵称' }]"/>
      <van-field
        v-model="message"
        rows="5"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言内容"
        show-word-limit
        :rules="[{ required: true, message: '请输入留言内容' }]"
      />
      <div class="button-group">
        <van-row justify="space-around">
          <van-col span="6">
            <van-button class="button" type="warning" size="small" round @click="clear">清空</van-button>
          </van-col>
          <van-col span="6">
            <van-button class="button" native-type="submit" type="primary" size="small" round
                        loading-text="发送" :loading="sendLoading">发送
            </van-button>
          </van-col>
        </van-row>
      </div>
    </van-cell-group>
  </van-form>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import request from '@/utils/request'

const route = useRoute()

const name = ref('')
const message = ref('')
const sendLoading = ref(false)

function clear () {
  message.value = ''
}

function onSubmit () {
  sendLoading.value = true
  request({
    url: '/tts/praise',
    method: 'post',
    data: {
      text: name.value + '说：' + message.value,
      token: route.query.token
    }
  }).then(() => {
    clear()
  }).finally(() => {
    sendLoading.value = false
  })
}
</script>

<style scoped lang="scss">
.button-group {
  margin: 10px;

  .button {
    width: 100%;
  }
}
</style>
