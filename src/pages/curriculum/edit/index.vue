<template>
  <TabBar :tab-cur="tabCur" @on-tap-tab="onTapTab" />
  <view class="std-bg-primary" style="padding: 120rpx 0;">
    <view v-if="tabCur === 0">
      <view class="padding bg-white flex justify-around">
        <button @click="onTapPull" class="btn cu-btn bg-blue cuIcon-pulldown"></button>
        <button @click="onTapPush" class="btn cu-btn bg-green cuIcon-pullup"></button>
      </view>
      <CustomCourseCard
          v-for="(course, index) in customCourses"
          :key="index"
          :course="course"
          @edit="() => { onTapEdit(course) }"
          @delete="() => { onTapDelete(course) }"
      />
    </view>
    <CourseForm v-if="tabCur === 2" @submit="onSubmit" :old-custom-course="oldCustomCourse"/>
    <PriorityPage v-if="tabCur === 1"/>
  </view>
</template>

<script setup lang="ts">
  import TabBar from "@/pages/curriculum/edit/TabBar.vue";
  import {ref} from "vue";
  import CourseForm from "@/pages/curriculum/edit/CourseForm.vue";
  import {onShow} from "@dcloudio/uni-app";
  import type {CustomCourse} from "@/models/CustomCourseModel";
  import CustomCourseModel from "@/models/CustomCourseModel";
  import CustomCourseCard from "@/pages/curriculum/edit/CustomCourseCard.vue";
  import PriorityPage from "@/pages/curriculum/edit/PriorityPage.vue";

  const customCourseModel = CustomCourseModel.getInstance();
  const tabCur = ref(0);
  const customCourses = ref<CustomCourse[]>([]);
  const oldCustomCourse = ref<CustomCourse>();

  onShow(init);
  async function init() {
    customCourses.value = await customCourseModel.get();
  }
  async function onTapTab(tab: number) {
    tabCur.value = tab;
    if (tab === 2) oldCustomCourse.value = undefined;
  }
  async function onTapEdit(customCourse: CustomCourse) {
    await uni.vibrateShort();
    oldCustomCourse.value = customCourse;
    tabCur.value = 2;
  }
  async function onTapDelete(customCourse: CustomCourse) {
    await uni.vibrateShort();
    uni.showModal({
      title: `是否删除：${customCourse.name}`,
      success: async result => {
        if (result.confirm) {
          await customCourseModel.del(customCourse.code);
          customCourses.value = await customCourseModel.get();
          await uni.showToast({ title: "已删除", icon: "success" });
        }
      }
    });
  }
  async function onSubmit(customCourse: CustomCourse) {
    if (oldCustomCourse.value !== undefined) {
      await customCourseModel.del(oldCustomCourse.value.code);
      oldCustomCourse.value = undefined;
    }
    await customCourseModel.add(customCourse);
    await uni.showToast({ title: "添加成功", icon: "success" });
    await init();
    tabCur.value = 0;
  }
  async function onTapPull() {
    uni.showModal({
      title: "是否拉取云数据",
      success: async result => {
        if (result.confirm) {
          await uni.showLoading({ title: '拉取中' });
          await customCourseModel.pull();
          uni.hideLoading();
          await uni.showToast({ title: "拉取成功", icon: "success" });
          await init();
        }
      }
    });
  }
  async function onTapPush() {
    uni.showModal({
      title: "是否存储到云",
      success: async result => {
        if (result.confirm) {
          await uni.showLoading({ title: '推送中' });
          await customCourseModel.push();
          uni.hideLoading();
          await uni.showToast({ title: "存储成功", icon: "success" });
        }
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