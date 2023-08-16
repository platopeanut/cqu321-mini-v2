<template>
  <view class="std-bg-primary padding">
    <view class="cu-list menu margin std-box-shadow std-border-radius bg-white">
      <view class="cu-item arrow" @click="navToUserInfoPage">
        <view class="content">
          <text class="cuIcon-form text-yellow"></text>
          <text class="text-grey">绑定信息</text>
        </view>
      </view>
      <view class="cu-item" @click="clearCache">
        <view class="content">
          <text class="cuIcon-refresh text-red"></text>
          <text class="text-grey">清除缓存</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-read text-orange"></text>
          <text class="text-grey">使用教程</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-formfill text-green"></text>
          <text class="text-grey">关于我们</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {stdClearAllStorage} from "@/core/storage";
  import ActivityModel from "@/models/ActivityModel";
  import CourseModel from "@/models/CourseModel";
  import ExamModel from "@/models/ExamModel";
  import GradeModel from "@/models/GradeModel";

  function navToUserInfoPage() {
    uni.navigateTo({url: "../user_info/index"});
  }
  async function clearCache() {
    await stdClearAllStorage();
    ActivityModel.getInstance().reload();
    CourseModel.getInstance().reload();
    ExamModel.getInstance().reload();
    GradeModel.getInstance().reload();
    await uni.showToast({ title: "已清除", icon: "success"});
  }
</script>

<style scoped>

</style>