<template>
  <view class="text-center card bg-white margin padding std-box-shadow">
    <view v-if="info !== null">
      <view class="text-bold text-black text-xxl padding">Hi, {{info.name}} 🎉</view>
      <view class="text-lg text-grey">{{info.sid}}</view>
      <button class="cu-btn bg-red text-lg margin-top" @click="navToLogin">退出登录</button>
    </view>
    <view v-else>
      <view class="text-grey text-xxl padding">您还没有登录 😉</view>
      <button class="cu-btn bg-blue text-lg margin-top" @click="navToLogin">去登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {UserInfo} from "@/core/StdUser";
  defineProps<{ info: UserInfo | null }>();
  async function navToLogin() { await uni.navigateTo({ url: "./login/index" }); }
</script>

<style scoped>
  .card {
    border-radius: 10rpx;
    /*background-image: linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);*/
  }
</style>