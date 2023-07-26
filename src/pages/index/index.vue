<template>
  <button @click="navToGradePage">成绩查询</button>
  <button @click="onTapLogin">Log In</button>
  <button @click="clearCache">Clear Cache</button>
</template>

<script setup lang="ts">
import {clearAllStorage} from "@/core/storage";
import {login} from "@/core/network";

function navToGradePage() {
  console.log("click")
  uni.navigateTo({url: "../grade/index"});
}

function clearCache() {
  clearAllStorage().then(() => {
    uni.showToast({
      title: "CLEAR DONE!",
      icon: "success"
    });
  });
}

function onTapLogin() {
  uni.showLoading({title: "登陆中..."});
  login("20201682", "cjm2857177614").then(() => {
    uni.hideLoading();
    uni.showToast({
      title: "登陆成功",
      icon: "success"
    });
  });
}
</script>