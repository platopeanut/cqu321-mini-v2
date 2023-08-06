<template>
  <Header :term-names="termNames" :tab-cur="tabCur" @on-tab-select="(newTabCur) => {tabCur = newTabCur}"/>
  <view class="std-bg-primary padding" style="margin-top: 90rpx;">
    <view v-if="tabCur !== 0">
      <TermOverview :term-avg-gpa="termAvgGpa"/>
      <GradeItem
        v-for="item in scoreItems"
        :key="item.moreInfo.code"
        :score-item="item"
      />
    </view>
    <view v-else>
      <Overview v-if="gpaInfo !== null" :gpa-info="gpaInfo" />
      <Empty v-else icon-type="warning" message="请尝试更新数据" />
      <view @click="updateGradeInfo" class="cu-btn block round lg" :class="isLoading ? 'bg-green' : 'bg-blue'"  style="width: max-content; margin: 0 auto;">
        <text v-if="isLoading" class="cuIcon-loading1 text-bold cuIconfont-spin margin-right"></text>
        <view>{{isLoading ? '更新中...' : '更新'}}</view>
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
    scoreToNumber,
    scoreToPoint
  } from "@/pages/grade/util";
  import Header from "@/pages/grade/Header.vue";
import Overview from "@/pages/grade/Overview.vue";
import TermOverview from "@/pages/grade/TermOverview.vue";
import GradeItem from "@/pages/grade/GradeItem.vue";
  import Empty from "@/pages/components/Empty.vue";

  const gradeModel = new GradeModel();

  const tabCur = ref(0);
  // 成绩信息
  const gradeInfo = ref<GradeInfo | null>(null);
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