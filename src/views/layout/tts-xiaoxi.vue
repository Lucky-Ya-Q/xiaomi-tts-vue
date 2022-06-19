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
import { Toast } from 'vant'

const {
  copy
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
    copy(process.env.NODE_ENV === 'production'
      ? 'http://123.57.63.56:7706'
      : 'http://192.168.1.8:8080' + '/#/praise?token=' + data.token)
    Toast('已复制')
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
