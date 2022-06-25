<template>
  <!--  <tts-toggle-device></tts-toggle-device>-->
  <van-cell-group title="打卡记录" inset>
    <van-calendar
      :min-date="date1"
      :max-date="date2"
      row-height="50"
      :poppable="false"
      :formatter="formatter"
      :show-title="false"
      :show-confirm="false"
      @select="select"
      :style="{ height: '344px' }"
    >
      <template #bottom-info>
        <div style="color:#969799; position: relative; top: 5px;">160</div>
      </template>
    </van-calendar>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const date1 = ref(new Date('2022-04-08'))
const date2 = ref(new Date())

function formatter (day) {
  day.className = 'bgi'
  return day
}

function select (day) {
  console.log(day)
}
</script>

<style scoped lang="scss">
::v-deep(.bgi) {
}

::v-deep(.van-calendar__selected-day) {
  background-color: transparent;
  color: #1989fa;
}

::v-deep(.van-calendar__day) {
  margin-bottom: 4px !important;
}
</style>
