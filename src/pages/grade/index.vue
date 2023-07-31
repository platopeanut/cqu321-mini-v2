<template>
  <view class="padding-bottom-xl std-bg-primary">
    <scroll-view scroll-x class="bg-white nav solid-bottom fixed" scroll-with-animation :scroll-left="scrollLeft">
      <view class="flex text-center">
        <view class="cu-item flex-sub text-lg"
              :class="index===tabCur?'text-blue text-bold cur':''"
              v-for="(item,index) in termNames"
              :key="index"
              @tap="onTabSelect"
              :data-id="index">{{item}}</view>
      </view>
    </scroll-view>
    <view style="height: 90rpx;"></view>
    <view v-if="tabCur !== 0">
      <view class="bg-white shadow padding margin round-dot">
        <view class="text-black text-left text-lg">当前学期</view>
        <view class="flex text-center padding-top">
          <view class="flex-sub">
            <view class="text-xxl text-blue">{{termAvgGpa.four}}</view>
            <view class="text-lg text-grey">四分制</view>
          </view>
          <view class="flex-sub">
            <view class="text-xxl text-blue">{{termAvgGpa.five}}</view>
            <view class="text-lg text-grey">五分制</view>
          </view>
        </view>
      </view>
      <view
          class="cu-list menu card-menu margin-top"
          v-for="(item, index) in scoreItems"
          :key="index"
      >
        <view class="cu-item" @click="() => { selectItems[index] = !selectItems[index]; }">
          <view class="content" style="max-width: 60%">
            <view class="text-lg text-bold">{{item.name}}</view>
          </view>
          <view class="action">
            <text :class="['margin-right', 'text-bold', scoreToColor(scoreToNumber(item.score))]">{{item.score}}</text>
            <text :class="['lg', 'text-gray', selectItems[index] ? 'cuIcon-fold' : 'cuIcon-unfold']"></text>
          </view>
        </view>
        <view v-if="selectItems[index]" class="cu-item text-lg text-grey">
          <view class="content flex">
            <view>学分: </view>
            <view>{{item.credit}}</view>
          </view>
          <view class="action flex">
            <view>教师: </view>
            <view>{{item.instructor}}</view>
          </view>
        </view>
        <view v-if="selectItems[index]" class="cu-item">
          <view class="content">
            <text class="cu-tag radius light bg-olive">{{item.tags.studyNature}}</text>
            <text class="cu-tag radius light bg-cyan">{{item.tags.courseNature}}</text>
          </view>
          <view class="action text-lg text-grey">{{item.moreInfo.code}}</view>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="bg-white shadow padding margin round-dot">
        <view class="cu-list menu card-menu margin-bottom">
          <view class="cu-item">
            <view class="content"><text class="text-lg text-bold">综合绩点</text></view>
            <view class="action"><text class="text-xl text-blue">{{gpaInfo?.gpa}}</text></view>
          </view>
          <view class="cu-item">
            <view class="content"><text class="text-lg text-bold">专业排名</text></view>
            <view class="action"><text class="text-xl text-blue">{{gpaInfo?.majorRanking}}</text></view>
          </view>
          <view class="cu-item">
            <view class="content"><text class="text-lg text-bold">班级排名</text></view>
            <view class="action"><text class="text-xl text-blue">{{gpaInfo?.classRanking}}</text></view>
          </view>
          <view class="cu-item">
            <view class="content"><text class="text-lg text-bold">年级排名</text></view>
            <view class="action"><text class="text-xl text-blue">{{gpaInfo?.gradeRanking}}</text></view>
          </view>
          <view class="cu-item">
            <view class="content"><text class="text-lg text-bold">加权平均分</text></view>
            <view class="action"><text class="text-xl text-blue">{{gpaInfo?.weightedAvg}}</text></view>
          </view>
        </view>
        <view @click="updateGradeInfo" class="cu-btn block round lg" :class="isLoading ? 'bg-green' : 'bg-blue'"  style="width: max-content; margin: 0 auto;">
          <text v-if="isLoading" class="cuIcon-loading1 text-bold cuIconfont-spin margin-right"></text>
          <view>{{isLoading ? '更新中...' : '更新'}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import GradeModel, {GpaType, GradeInfo} from "@/models/GradeModel";
  import {onShow} from "@dcloudio/uni-app";
  import {computed, ref} from "vue";
  import {
    convertToTermName,
    filterCourseWhenCalcGpa,
    scoreToColor,
    scoreToNumber,
    scoreToPoint
  } from "@/pages/grade/util";

  const gradeModel = new GradeModel();

  // 标签页索引
  const tabCur = ref(0);
  // 用于标签页自动右滑
  const scrollLeft = ref(0);
  // 成绩信息
  const gradeInfo = ref<GradeInfo | null>(null);
  // 点开的成绩项
  const selectItems = ref<boolean[]>([]);
  const isLoading = ref(false);

  onShow(async () => {
    gradeInfo.value = await gradeModel.get();
    isLoading.value = false;
  });

  // 所有学期名称
  const termNames = computed<string[]>(() => {
    const names = new Set<string>();
    gradeInfo.value?.scoreItems.forEach(it => { names.add(convertToTermName(it.session)); });
    const nameList = Array.from(names);
    nameList.unshift('总览');
    return nameList;
  });
  // 当前学期的成绩项
  const scoreItems = computed(() => {
    return gradeInfo.value?.scoreItems
        .filter(it => convertToTermName(it.session) === termNames.value[tabCur.value])
        .reverse();
  });
  // 当前学期的绩点
  const termAvgGpa = computed<{four: number, five: number}>(() => {
    let allCredit = 0;
    let avgGpa = {four: 0, five: 0};
    scoreItems.value?.filter(filterCourseWhenCalcGpa)
      .forEach(it => {
        allCredit += it.credit;
        avgGpa.four += it.credit * scoreToPoint(scoreToNumber(it.score), GpaType.FOUR);
        avgGpa.five += it.credit * scoreToPoint(scoreToNumber(it.score), GpaType.FIVE);
      });
    avgGpa.four = Number((avgGpa.four / allCredit).toFixed(4));
    avgGpa.five = Number((avgGpa.five / allCredit).toFixed(4));
    return avgGpa;
  });
  // 总览信息
  const gpaInfo = computed(() => gradeInfo.value?.gpaInfo || null);

  // 切换标签页时触发的回调
  function onTabSelect(e: any) {
    tabCur.value = e.currentTarget!.dataset.id;
    scrollLeft.value = (e.currentTarget.dataset.id - 1) * 60;
    selectItems.value = new Array(scoreItems.value?.length || 0).fill(false);
  }

  // 更新成绩
  async function updateGradeInfo() {
    isLoading.value = true;
    await gradeModel.update();
    isLoading.value = false;
    gradeInfo.value = await gradeModel.get();
    await uni.showToast({
      title: "更新完成",
      icon: "success"
    });
  }
</script>

<style scoped>
</style>