<template>
  <button @click="navToGradePage">成绩查询</button>
  <button @click="navToCurriculumPage">课程表</button>
  <button @click="clearCache">Clear Cache</button>
</template>

<script setup lang="ts">
import {stdClearAllStorage} from "@/core/storage";

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
</script>