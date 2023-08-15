<template>
  <view class="fixed-top bg-white flex justify-around align-center std-box-shadow">
    <view @click="$emit('onTapTab', 0)" class="tab cuIcon-list" :class="tabCur === 0 ? 'active' : ''"></view>
    <view @click="$emit('onTapTab', 1)" class="tab cuIcon-edit" :class="tabCur === 1 ? 'active' : ''"></view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{ tabCur: number }>();
  defineEmits<{ (e: 'onTapTab', idx: number): void }>();
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
    border-bottom: 8rpx solid #767676;
    font-size: 50rpx;
  }
  .active {
    color: #fd6260;
    border-color: #fd6260;
    font-weight: bold;
  }
</style>