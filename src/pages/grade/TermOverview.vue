<template>
  <view class="bg-white shadow padding margin round-dot">
    <view class="text-black text-left text-lg">当前学期</view>
    <view class="flex text-center padding-top">
      <view class="flex-sub">
        <view class="text-xxl std-color-primary">{{termAvgGpa.four}}</view>
        <view class="text-lg text-grey">四分制</view>
      </view>
      <view class="flex-sub">
        <view class="text-xxl std-color-primary">{{termAvgGpa.five}}</view>
        <view class="text-lg text-grey">五分制</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{ termAvgGpa: {four: number, five: number} }>();
</script>