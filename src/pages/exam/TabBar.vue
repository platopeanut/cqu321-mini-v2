<template>
  <view class="fixed-top bg-white flex justify-around align-center std-box-shadow">
    <view @click="$emit('onTapTab', 0)" class="text-xl tab" :class="tabCur === 0 ? 'active' : ''">进行中</view>
    <view
      @click="$emit('onTapUpdate')"
      class="icon cuIcon-refresh text-bold std-color-secondary"
    ></view>
    <view
        @click="$emit('onTapAdd')"
        class="icon cuIcon-add text-bold std-color-secondary"
    ></view>
    <view @click="$emit('onTapTab', 1)" class="text-xl tab" :class="tabCur === 1 ? 'active' : ''">已结束</view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{ tabCur: number }>();
  defineEmits<{ (e: 'onTapUpdate'): void, (e: 'onTapAdd'): void, (e: 'onTapTab', idx: number): void }>();
</script>

<style scoped>
  .fixed-top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100rpx;
    z-index: 100;
  }
  .tab {
    color: #767676;
    padding-bottom: 5rpx;
    border-bottom: 5rpx solid #767676;
  }
  .active {
    color: #fd6260;
    border-color: #fd6260;
    font-weight: bold;
  }
  .icon {
    font-size: 50rpx;
  }
</style>