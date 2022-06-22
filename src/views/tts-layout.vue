<template>
  <div class="tts-layout">
    <router-view></router-view>
  </div>
  <van-tabbar :route="true" :placeholder="true">
    <van-tabbar-item icon="home-o" to="/layout/index">首页</van-tabbar-item>
    <van-tabbar-item icon="calendar-o" to="/layout/shizhong">时钟</van-tabbar-item>
    <van-tabbar-item icon="chat-o" to="/layout/xiaoxi">消息</van-tabbar-item>
    <van-tabbar-item icon="manager-o" to="/layout/wode">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>

</script>

<style scoped lang="scss">

</style>
