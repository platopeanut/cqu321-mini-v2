<template>
  <view class="margin padding bg-white flex justify-around">
    <button @click="onTapPull" class="btn cu-btn bg-blue cuIcon-pulldown"></button>
    <button @click="onTapPush" class="btn cu-btn bg-green cuIcon-pullup"></button>
  </view>
</template>

<script setup lang="ts">
  async function onTapPull() {
    uni.showModal({
      title: "是否拉取云端数据",
      success: result => {
        if (result.confirm)
          uni.showToast({ title: "拉取成功", icon: "success" });
      }
    });
  }

  async function onTapPush() {
    uni.showModal({
      title: "是否存储到云端",
      success: result => {
        if (result.confirm)
          uni.showToast({ title: "存储成功", icon: "success" });
      }
    });
  }
</script>

<style scoped>
  .btn {
    padding: 40rpx 60rpx;
    font-size: 50rpx;
  }
</style>