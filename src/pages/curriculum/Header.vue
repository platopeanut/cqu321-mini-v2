<template>
  <view class="header flex text-center text-lg text-black bg-white solid-bottom shadow">
    <view class="flex flex-direction justify-center" style="width: 50rpx;">
      <view class="text-bold">{{formatNumber(currDate.getMonth() + 1)}}</view>
      <view class="text-bold">月</view>
    </view>
    <view class="flex" style="width: 700rpx;">
      <view
          class="flex-sub flex flex-direction justify-center"
          :key="index"
          v-for="(item, index) in weekDayNames">
        <view class="text-bold">{{item}}</view>
        <view>{{formatNumber(weekDates[index])}}日</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {formatNumber} from "@/utils/util";
  import {getWeekDates} from "@/pages/curriculum/util";
  import {computed} from "vue";
  const props = defineProps<{currDate: Date}>();
  const weekDayNames = '一二三四五六日'.split('').map(it => '周' + it);
  const weekDates = computed(() => getWeekDates(props.currDate));
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100rpx;
  }
</style>