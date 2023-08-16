<template>
  <view class="std-bg-primary padding">
    <UserInfoCard :info="info" />
    <MenuItem title="清除缓存" icon-style="cuIcon-refresh text-red" @click="clearCache" />
    <MenuItem title="使用教程" icon-style="cuIcon-read text-orange" has-arrow @click="navToTutorial"/>
    <MenuItem title="关于我们" icon-style="cuIcon-formfill text-green" has-arrow @click="navToAbout"/>
  </view>
</template>

<script setup lang="ts">
  import {stdClearAllStorage} from "@/core/storage";
  import ActivityModel from "@/models/ActivityModel";
  import CourseModel from "@/models/CourseModel";
  import ExamModel from "@/models/ExamModel";
  import GradeModel from "@/models/GradeModel";
  import UserInfoCard from "@/pages/settings/UserInfoCard.vue";
  import {ref} from "vue";
  import stdUser, {UserInfo} from "@/core/StdUser";
  import {onShow} from "@dcloudio/uni-app";
  import MenuItem from "@/pages/settings/MenuItem.vue";

  const info = ref<UserInfo | null>(null);
  onShow(async () => { info.value = await stdUser.getUserInfo(false) });

  async function clearCache() {
    info.value = null;
    await stdClearAllStorage();
    ActivityModel.getInstance().reload();
    CourseModel.getInstance().reload();
    ExamModel.getInstance().reload();
    GradeModel.getInstance().reload();
    await uni.showToast({ title: "已清除", icon: "success"});
  }
  async function navToAbout() { await uni.navigateTo({ url: "./about/index" }) }
  async function navToTutorial() { await uni.navigateTo({ url: "./tutorial/index" }) }
</script>

<style scoped>

</style>