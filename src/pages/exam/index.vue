<template>
  <TabBar
      :tab-cur="tabCur"
      @on-tap-tab="newTabCur => tabCur = newTabCur"
      @on-tap-update="onTapUpdate"
      @on-tap-add="onTapAdd"
  />
  <view class="std-bg-primary padding-top padding-bottom-xl" style="margin-top: 80rpx;">
    <Empty v-if="currExamInfoList.length === 0" message="暂无考试安排" icon-type="success" hint="请尝试刷新"/>
    <ExamItem
        v-for="examInfo in currExamInfoList"
        :key="examInfo.name"
        :exam-info="examInfo"
        :days="calcDays(examInfo)"
        :is-over="tabCur !== 0"
        :is-self="examModel.isSelfExam(examInfo.name)"
        @click="onTapExamItem"
    />
  </view>
</template>

<script setup lang="ts">
  import Empty from "@/pages/components/Empty.vue";
  import ExamModel, {ExamInfo} from "@/models/ExamModel";
  import {onShow} from "@dcloudio/uni-app";
  import {computed, ref} from "vue";
  import ExamItem from "@/pages/exam/ExamItem.vue";
  import TabBar from "@/pages/exam/TabBar.vue";
  import {calcDaysBetweenDates, stringToDateInChinaTime, truncDate} from "@/utils/datetime";
  const examModel = ExamModel.getInstance();
  const examInfoList = ref<ExamInfo[]>([]);
  const tabCur = ref(0);
  const currDate = ref(new Date());

  const currExamInfoList = computed(() => examInfoList.value
      .filter(it => {
        const currTime = currDate.value.getTime();
        const endTime = stringToDateInChinaTime(it.date + ' ' + it.endTime).getTime();
        return tabCur.value === 0 ? currTime <= endTime : currTime > endTime;
      })
      .sort((a, b) => {
        return tabCur.value === 0 ?
            stringToDateInChinaTime(a.date + ' ' + a.startTime).getTime()
            - stringToDateInChinaTime(b.date + ' ' + b.startTime).getTime()
            :
            stringToDateInChinaTime(b.date + ' ' + b.endTime).getTime()
            - stringToDateInChinaTime(a.date + ' ' + a.endTime).getTime();
      })
  );

  onShow(async () => {
    examInfoList.value = await examModel.get();
    currDate.value = new Date();
  });
  async function onTapUpdate() {
    await examModel.update();
    examInfoList.value = await examModel.get();
    await uni.showToast({ title: "更新完成", icon: "success" });
  }
  function calcDays(examInfo: ExamInfo) {
    const examDate = stringToDateInChinaTime(examInfo.date);
    return calcDaysBetweenDates(truncDate(currDate.value), examDate);
  }
  async function onTapAdd() {
    await uni.navigateTo({ url: "./edit/index" });
  }
  async function onTapExamItem(examInfo: ExamInfo) {
    if (!examModel.isSelfExam(examInfo.name)) return;
    await uni.showActionSheet({
      itemList: ['删除', '修改'],
      success: async (result) => {
        if (result.tapIndex === 0) {
          await examModel.deleteByName(examInfo.name);
          examInfoList.value = await examModel.get();
          await uni.showToast({ title: "已删除", icon: "success" });
        }
        else {
          await uni.navigateTo({ url: './edit/index?name=' + examInfo.name });
        }
      }
    });
  }
</script>