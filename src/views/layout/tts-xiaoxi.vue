<template>
  <tts-toggle-device></tts-toggle-device>
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
          <van-button class="button" type="success" size="small" round @click="share"
                      loading-text="分享" :loading="shareLoading">分享
          </van-button>
        </van-col>
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
import TtsToggleDevice from '@/components/tts-toggle-device'
import { ref } from 'vue'
import request from '@/utils/request'
import { useClipboard } from '@vueuse/core/index'
import { Dialog, Toast } from 'vant'

const {
  copy,
  text
} = useClipboard()

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
  }).then(() => {
    clear()
  }).finally(() => {
    sendLoading.value = false
  })
}

function share () {
  shareLoading.value = true
  request({
    url: '/tts/share',
    method: 'get'
  }).then(data => {
    const url = `${process.env.NODE_ENV === 'production'
      ? 'https://shanyexia.top/xiaomi-tts-vue'
      // : 'http://192.168.1.8:8080'
      : 'https://shanyexia.top/xiaomi-tts-vue'}/#/praise?token=${data.token}`
    copy(url)
    if (text.value) {
      Toast('已复制')
    } else {
      Dialog.alert({
        message: url
      }).then(() => {
        // on close
      })
    }
  }).finally(() => {
    shareLoading.value = false
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
