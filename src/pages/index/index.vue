<template>
  <view class="std-bg-primary">
    <ActivityCard />
    <CourseCard curriculum-page-url="../curriculum/index"/>
    <view class="bg-white margin std-border-radius std-box-shadow shadow padding-top padding-bottom">
      <view class="icons-1st padding-bottom">
        <Icon1st title="课表" icon-name="cuIcon-calendar" @click="navToCurriculumPage"/>
        <Icon1st title="成绩" icon-name="cuIcon-rank" @click="navToGradePage"/>
        <Icon1st title="查课" icon-name="cuIcon-search" @click="navToCourseInfoPage"/>
        <Icon1st title="排考" icon-name="cuIcon-write" @click="navToExamPage"/>
      </view>
      <view class="icons-1st padding-top">
        <Icon2nd title="常用信息" icon-name="cuIcon-evaluate_fill" @click="navToGeneralInfoPage" />
        <Icon2nd title="图书馆" icon-name="cuIcon-read" @click="navToLibraryPage"/>
        <Icon2nd title="生活" icon-name="cuIcon-baby" disabled />
<!--        <Icon2nd title="空教室" icon-name="cuIcon-location" />-->
        <Icon2nd title="体测查询" icon-name="cuIcon-footprint" disabled />
        <Icon2nd title="设置" icon-name="cuIcon-settings" @click="navToSettingsPage"/>
      </view>
    </view>
  </view>
  <ad-custom unit-id="adunit-67019180b6466026"></ad-custom>
</template>

<script setup lang="ts">
  import Icon1st from "@/pages/index/Icon1st.vue";
  import Icon2nd from "@/pages/index/Icon2nd.vue";
  import CourseCard from "@/pages/curriculum/CourseCard.vue";
  import ActivityCard from "@/pages/index/ActivityCard.vue";
  function navToGradePage() {
    uni.navigateTo({url: "../grade/index"});
  }
  function navToCurriculumPage() {
    uni.navigateTo({url: "../curriculum/index"});
  }
  function navToSettingsPage() {
    uni.navigateTo({url: "../settings/index"});
  }
  function navToCourseInfoPage() {
    uni.navigateTo({url: "../course_info/index"});
  }
  function navToExamPage() {
    uni.navigateTo({url: "../exam/index"});
  }
  function navToGeneralInfoPage() {
    uni.navigateTo({url: "../general_info/index"});
  }
  function navToLibraryPage() {
    uni.navigateTo({url: "../library/index"});
  }
</script>

<style scoped>
  .icons-1st {
    display: flex;
    justify-content: space-evenly;
    border-radius: 20rpx;
  }
</style>