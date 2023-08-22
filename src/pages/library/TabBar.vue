<template>
  <view class="fixed-top bg-white flex justify-around align-center std-box-shadow">
    <view @click="$emit('update:tabCur', 0)" class="text-xl tab" :class="tabCur === 0 ? 'active' : ''">当前借阅</view>
    <view @click="$emit('update:tabCur', 1)" class="text-xl tab" :class="tabCur === 1 ? 'active' : ''">历史借阅</view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{ tabCur: number }>();
  const emit = defineEmits<{ (e: 'update:tabCur', newTab: number): void }>();
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
</style>