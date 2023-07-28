<template>
  <button @click="navToGradePage">成绩查询</button>
  <button @click="navToCurriculumPage">课程表</button>
  <button @click="onTapLogin">Log In</button>
  <button @click="clearCache">Clear Cache</button>
</template>

<script setup lang="ts">
import {stdClearAllStorage} from "@/core/storage";
import {login} from "@/core/network";
function navToGradePage() {
  uni.navigateTo({url: "../grade/index"});
}
function navToCurriculumPage() {
  uni.navigateTo({url: "../curriculum/index"});
}

function clearCache() {
  stdClearAllStorage().then(() => {
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