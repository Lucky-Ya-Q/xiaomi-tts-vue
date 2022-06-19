<template>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="5"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <div class="button-group">
      <van-row justify="space-around">
        <van-col span="6">
          <van-button class="button" type="warning" size="small" round @click="clear">清空</van-button>
        </van-col>
        <van-col span="6">
          <van-button class="button" type="primary" size="small" round @click="send"
                      loading-text="发送" :loading="sendLoading">发送
          </van-button>
        </van-col>
      </van-row>
    </div>
  </van-cell-group>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import request from '@/utils/request'

const route = useRoute()

const message = ref('')
const sendLoading = ref(false)

function clear () {
  message.value = ''
}

function send () {
  sendLoading.value = true
  request({
    url: '/tts/praise',
    method: 'post',
    data: {
      text: message.value,
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
