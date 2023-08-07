<template>
  <TabBar
      :tab-cur="tabCur"
      @on-tap-tab="newTabCur => tabCur = newTabCur"
      @on-tap-update="onTapUpdate"
  />
  <view class="std-bg-primary padding-top padding-bottom-xl" style="margin-top: 80rpx;">
    <Empty v-if="examInfoList.length === 0" message="暂无考试安排" icon-type="warning"/>
    <ExamItem
        v-for="examInfo in currExamInfoList"
        :key="examInfo.code"
        :exam-info="examInfo"
        :days="calcDays(examInfo)"
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
  import {calcDaysBetweenDates, stringToDateInChinaTime} from "@/utils/datetime";
  const examModel = new ExamModel();
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
    examInfoList.value.push({
      name: "高等数学",
      classroom: "D1234",
      code: "MATH1234",
      date: "2023-08-08",
      startTime: "08:00",
      endTime: "10:00",
      seatNum: "12",
    });
    examInfoList.value.push({
      name: "大学物理",
      classroom: "D1234",
      code: "PHY1234",
      date: "2023-08-09",
      startTime: "08:00",
      endTime: "10:00",
      seatNum: "12",
    });
    currDate.value = new Date();
  });
  async function onTapUpdate() {
    await uni.showLoading({title: '更新中'});
    await examModel.update();
    examInfoList.value = await examModel.get();
    uni.hideLoading();
  }
  function calcDays(examInfo: ExamInfo) {
    const examDate = stringToDateInChinaTime(examInfo.date);
    const _currDate = new Date(currDate.value.getTime());
    _currDate.setHours(0, 0, 0, 0);
    return calcDaysBetweenDates(_currDate, examDate);
  }
</script>