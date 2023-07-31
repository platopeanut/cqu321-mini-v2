<template>
  <button @click="onTapLogin">Log In</button>
</template>

<script setup lang="ts">
  import {login} from "@/core/network";

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