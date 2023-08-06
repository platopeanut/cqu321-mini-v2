<template>
  <view class="card bg-white std-box-shadow text-center">
    <view class="padding">
      <view class="text-black text-bold text-xl padding-bottom-sm">{{name}}</view>
      <view class="text-gray text-lg">{{code}}</view>
    </view>
    <view class="flex justify-between">
      <view
          v-for="(item, index) in ScoreLevels"
          :key="index"
          class="text-center text-shadow text-df" :class="`text-${item[0]}`"
      >
        <text class="cuIcon-ellipse"></text>
        <text class="text-gray">{{item[1]}}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {ScoreLevels} from "@/pages/course_info/detail/util";
  defineProps<{ name: string, code: string }>();
</script>

<style scoped>
  .card {
    padding: 20rpx;
    border-radius: 10rpx;
  }
</style>
