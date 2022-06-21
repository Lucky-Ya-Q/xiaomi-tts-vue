<template>
  <tts-toggle-device></tts-toggle-device>
  <van-cell-group title="留言板" inset>
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
  <van-cell-group :title="'音量：'+volume" inset style="padding: 20px 32px;">
    <van-slider v-model="volume" @change="setVolume" @update:model-value="warning"/>
  </van-cell-group>
</template>

<script setup>
import TtsToggleDevice from '@/components/tts-toggle-device'
import { onMounted, ref } from 'vue'
import request from '@/utils/request'
import { Dialog, Notify } from 'vant'

const message = ref('')
const volume = ref(6)
const sendLoading = ref(false)
const shareLoading = ref(false)

function clear () {
  message.value = ''
}

function getVolume () {
  request({ url: '/tts/getVolume' }).then((data) => {
    const info = JSON.parse(data.data.info)
    volume.value = info.volume
  })
}

onMounted(() => {
  getVolume()
})

function warning (value) {
  if (value > 60) {
    Notify({
      type: 'warning',
      message: '声音太大有扰民风险'
    })
  } else {
    Notify.clear()
  }
}

function setVolume (value) {
  request({
    url: '/tts/setVolume',
    method: 'get',
    params: { volume: value }
  }).then(() => {
    getVolume()
  })
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
    Dialog.alert({
      message: `${process.env.NODE_ENV === 'production'
        ? 'https://shanyexia.top/xiaomi-tts-vue'
        : 'http://192.168.1.8'}/#/praise?token=${data.token}`
    }).then(() => {
      // on close
    })
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
