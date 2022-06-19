<template>
  <tts-toggle-device></tts-toggle-device>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
  </van-cell-group>
  <van-button class="send" round @click="send">发送</van-button>
</template>

<script setup>
import TtsToggleDevice from '@/components/tts-toggle-device'
import { ref } from 'vue'
import request from '@/utils/request'

const message = ref('')

function send () {
  request({
    url: '/tts/say',
    method: 'post',
    data: { text: message.value }
  }).then(data => {
  })
}
</script>

<style scoped lang="scss">
.send {
  width: 160px;
  height: 40px;
}
</style>
