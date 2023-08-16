<template>
  <view @click="$emit('click')" class="card margin padding std-box-shadow bg-white flex text-xl justify-between">
    <view class="flex">
      <view :class="iconStyle" style="font-size: 40rpx;"></view>
      <view class="padding-left text-black">{{title}}</view>
    </view>
    <view v-if="hasArrow" class="cuIcon-right text-bold text-grey"></view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{
    iconStyle: string
    title: string
    hasArrow?: boolean
  }>();
  defineEmits<{ (e: 'click'): void }>();
</script>

<style scoped>
  .card {
    border-radius: 10rpx;
  }
</style>