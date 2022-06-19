<template>
  <tts-toggle-device></tts-toggle-device>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="3"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
  </van-cell-group>
  <van-row  justify="space-around">
    <van-col span="6">
      <van-button class="button" type="warning" round @click="clear">清空</van-button>
    </van-col>
    <van-col span="6">
      <van-button class="button" type="primary" round @click="send"
                  loading-text="发送" :loading="sendLoading">发送
      </van-button>
    </van-col>
    <van-col span="6">
      <van-button class="button" type="success" round @click="share"
                  loading-text="分享" :loading="shareLoading">分享</van-button>
    </van-col>
  </van-row>

</template>

<script setup>
import TtsToggleDevice from '@/components/tts-toggle-device'
import { ref } from 'vue'
import request from '@/utils/request'

const message = ref('')
const sendLoading = ref(false)
const shareLoading = ref(false)

function clear () {
  message.value = ''
}

function send () {
  sendLoading.value = true
  request({
    url: '/tts/say',
    method: 'post',
    data: { text: message.value }
  }).finally(() => {
    clear()
    sendLoading.value = false
  })
}

function share () {
  shareLoading.value = true
  request({
    url: '/tts/share',
    method: 'get'
  }).then(data => {
    console.log(data)
  }).finally(() => {
    shareLoading.value = false
  })
}
</script>

<style scoped lang="scss">
.button {
  width: 100%;
}
</style>
