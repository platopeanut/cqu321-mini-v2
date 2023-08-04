<template>
  <view style="height: 100rpx;"></view>
  <view class="footer solid-top bg-white text-black text-center flex align-center">
    <view class="cuIcon-refresh icon" @click="$emit('updateCourseInfo')"></view>
    <view class="cuIcon-back icon" @click="$emit('onTapPrevWeek')"></view>
    <view @click="$emit('onTapSwitchTerm')" style="flex: auto">第 {{ weekOfTerm }} 周</view>
    <view class="cuIcon-right icon" @click="$emit('onTapNextWeek')"></view>
    <view class="cuIcon-apps icon" @click="$emit('onTapMoreFunc')"></view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{weekOfTerm: number}>();
  defineEmits<{
    (e: 'updateCourseInfo'): void
    (e: 'onTapPrevWeek'): void
    (e: 'onTapNextWeek'): void
    (e: 'onTapSwitchTerm'): void
    (e: 'onTapMoreFunc'): void
  }>();
</script>

<style scoped>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
  }
  .footer > .icon {
    font-weight: bold;
    font-size: 50rpx;
    padding: 20rpx 35rpx;
  }
</style>