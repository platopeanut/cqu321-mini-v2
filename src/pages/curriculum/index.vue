<template>
  <button @click="updateCourseInfo">Update</button>
</template>

<script setup lang="ts">
  import CourseModel, {TermOffset} from "@/models/CourseModel";
  import {onShow} from "@dcloudio/uni-app";
  const courseModel = new CourseModel();
  onShow(async () => {
    const coursesData = await courseModel.get(TermOffset.CurrTerm);
    console.log(coursesData);
  });
  async function updateCourseInfo() {
    await courseModel.update();
  }
</script>