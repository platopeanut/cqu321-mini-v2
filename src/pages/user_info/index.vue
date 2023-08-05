<template>
  <view class="std-bg-primary" style="height: 1000rpx">
    <view class="margin bg-white padding std-box-shadow">
      <form @submit="onTapLogin">
        <view class="cu-form-group">
          <view class="title">账号</view>
          <input placeholder="学号或统一身份认证账号" v-model="username"/>
        </view>
        <view class="cu-form-group">
          <view class="title">密码</view>
          <input placeholder="密码" type="password" v-model="password"/>
        </view>
        <radio-group class="flex padding-top justify-around text-lg text-grey">
          <view>
            <text class="padding-right">本科生</text>
            <radio class="radio" value="本科生" checked/>
          </view>
          <view>
            <text class="padding-right">研究生</text>
            <radio class="radio" value="研究生"/>
          </view>
        </radio-group>
        <view class="text-center padding-top">
          <button class="cu-btn round-dot bg-green text-lg" style="width: 50%;" form-type="submit">绑定</button>
        </view>
      </form>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {login} from "@/core/network";
  import {ref} from "vue";

  const username = ref("");
  const password = ref("");

  function onTapLogin() {
    uni.showLoading({title: "登陆中..."});
    login(username.value, password.value).then(() => {
      uni.hideLoading();
      uni.showToast({
        title: "登陆成功",
        icon: "success"
      });
    });
  }
</script>