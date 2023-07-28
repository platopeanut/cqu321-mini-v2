<template>
  <button @click="updateGradeInfo">Update</button>
</template>

<script setup lang="ts">
  import GradeModel from "@/models/GradeModel";
  import {onShow} from "@dcloudio/uni-app";
  const gradeModel = new GradeModel();
  onShow(async () => {
     const res = await gradeModel.get();
     console.log(res);
  });
  async function updateGradeInfo() {
    await gradeModel.update();
    await uni.showToast({
      title: "更新完成",
      icon: "success"
    });
  }
</script>

<style scoped>

</style>