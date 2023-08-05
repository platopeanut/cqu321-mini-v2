<template>
  <view class="flex flex-direction text-center root" @click="$emit('click')">
    <view class="icon-bg">
      <text class="text-white text-bold icon" :class="iconName"></text>
    </view>
    <view class="icon-text text-lg">{{ title }}</view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{
    iconName: string
    title: string
  }>();
  defineEmits<{
    (e: 'click'):void
  }>();
</script>

<style scoped>
  .root {
    width: 120rpx;
  }
  .icon-bg {
    height: 120rpx;
    border-radius: 50%;
    background: linear-gradient(45deg, #FE3B39 30%, #FD8B8A 82%);
  }
  .icon-bg > .icon {
    line-height: 120rpx;
    font-size: 65rpx;
  }
  .icon-text {
    padding-top: 10rpx;
    color: #696969;
  }
</style>