<template>
  <view class="fixed-top padding-left padding-right bg-white flex align-center std-box-shadow">
    <view
        v-for="(icon, index) in icons"
        :key="index"
        class="tab"
        :class="['cuIcon-' + icon, tabCur === index ? 'active' : '']"
        @click="$emit('onTapTab', index)"
    ></view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{ tabCur: number }>();
  defineEmits<{ (e: 'onTapTab', idx: number): void }>();
  const icons = ['list', 'order', 'edit'];
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
    flex: 1;
    text-align: center;
    color: #767676;
    padding: 10rpx;
    margin: 0 20rpx 10rpx;
    border-bottom: 8rpx solid #767676;
    font-size: 50rpx;
  }
  .active {
    color: #fd6260;
    border-color: #fd6260;
    font-weight: bold;
  }
</style>