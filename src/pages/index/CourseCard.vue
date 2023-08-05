<template>
  <view class="std-border-radius margin-left margin-right padding std-box-shadow bg-white flex flex-direction text-center">
    <view class="text-grey text-lg row0">第11周 / 周四</view>
    <view class="flex justify-between row1">
      <view class="flex">
        <view class="name-left"></view>
        <view class="course-name">Web开发技术</view>
      </view>
      <view class="classroom">D1134</view>
    </view>
    <view class="flex justify-between">
      <view class="text-lg text-grey">第10-12节</view>
      <view class="text-lg text-grey">08:00 ~ 10:00</view>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .classroom {
    background: linear-gradient(76deg, #FE3B39 30%, #FD8B8A 81%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: bold;
    font-size: 40rpx;
  }
  .name-left {
    width: 8rpx;
    height: 80%;
    background-color: #FF8F1F;
    margin-right: 8rpx;
  }
  .course-name {
    font-size: 40rpx;
    font-weight: bold;
    color: black;
  }
  .row0 {
    padding-bottom: 5rpx;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid #F5F5F5;
  }
  .row1 {
    padding-bottom: 10rpx;
  }
</style>