<template>
  <view class="std-border-radius margin-left margin-right padding std-box-shadow bg-white flex flex-direction text-center">
    <view v-if="!hasData" class="bg-white" @click="onTapUpdate">
      <view class="padding-xl text-bold text-orange">👉 点击更新课程数据 👋</view>
    </view>
    <view v-else-if="courses.length === 0" class="bg-white" @click="navToCurriculumPage">
      <view>
        <view class="text-grey text-lg row0">第{{ weekOfTerm }}周 / 周{{ dayOfWeekText }}</view>
        <view class="padding text-bold text-black text-xl">🎉 今日无课 ✨</view>
      </view>
    </view>
    <swiper
        v-else
        @click="navToCurriculumPage"
        class="square-dot"
        indicator-dots
        circular
        indicator-color="#767676"
        indicator-active-color="#fd6260"
        style="height: 220rpx;"
        :current="currentIdx"
    >
      <swiper-item class="bg-white" v-for="(course, index) in courses" :key="index">
        <view>
          <view class="text-grey text-lg row0">第{{ weekOfTerm }}周 / 周{{ dayOfWeekText }}</view>
          <view class="flex justify-between row1">
            <view class="flex">
              <view class="name-left"></view>
              <view class="course-name">{{ formatTextOverflow(course.name, 10) }}</view>
            </view>
            <view class="classroom">{{ formatTextOverflow(course.classroom, 5) }}</view>
          </view>
          <view class="flex justify-between">
            <view class="text-lg text-grey">第{{ course.dayTime.period.start }}-{{ course.dayTime.period.end }}节</view>
            <view class="text-lg text-grey">{{ getTimeText(course) }}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import CourseModel, {Course, TermOffset} from "@/models/CourseModel";
  import {computed, ref} from "vue";
  import {calcDayOfWeek, calcWeeksBetweenDates, stringToDateInChinaTime} from "@/utils/datetime";
  import {onShow} from "@dcloudio/uni-app";
  import {formatTextOverflow} from "@/utils/util";
  import {calcCurrPeriod, getTimeText} from "./util";

  const props = defineProps<{ curriculumPageUrl: string }>();

  const courseModel = CourseModel.getInstance();
  const currDate = ref(new Date());
  const startDate = ref<Date>(new Date());
  const courses = ref<Course[]>([]);
  const hasData = ref(false);

  const dayOfWeekText = computed(() => '一二三四五六日'.split('')[calcDayOfWeek(currDate.value)]);
  const weekOfTerm = computed(() => calcWeeksBetweenDates(startDate.value, currDate.value));
  const currentIdx = computed(() => {
    const curr = calcCurrPeriod(currDate.value)[0];
    let i = 0;
    for (; i < courses.value.length; i++) {
      if (curr <= courses.value[i].dayTime.period.start)
        return i;
    }
    return courses.value.length - 1;
  });

  onShow(initData);
  async function initData() {
    currDate.value = new Date();
    startDate.value = new Date();
    const coursesData = await courseModel.get(await courseModel.getCurrSelectTerm());
    hasData.value = coursesData !== null;
    if (coursesData !== null) {
      startDate.value = stringToDateInChinaTime(coursesData.startDate);
      courses.value = coursesData.courses
          // 过滤掉非当前周和非当天
          .filter(it => it.weeks.includes(weekOfTerm.value) && it.dayTime.weekday === calcDayOfWeek(currDate.value))
          // 过滤掉无效时间段
          .filter(it => it.dayTime.period.start !== -1 && it.dayTime.period.end !== -1)
          // 按照开始时间从小到大进行排序
          .sort((a, b) => a.dayTime.period.start - b.dayTime.period.start);
    }
  }
  async function onTapUpdate() {
    await courseModel.update(TermOffset.CurrTerm);
    await initData();
    await uni.showToast({
      title: "更新完成",
      icon: "success"
    });
  }
  async function navToCurriculumPage() { await uni.navigateTo({ url: props.curriculumPageUrl }) }
</script>

<style scoped>
  .classroom {
    background: linear-gradient(76deg, #FE3B39 30%, #FD8B8A 81%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: bold;
    font-size: 40rpx;
  }
  .name-left {
    width: 8rpx;
    height: 80%;
    background-color: #FF8F1F;
    margin-right: 8rpx;
  }
  .course-name {
    font-size: 40rpx;
    font-weight: bold;
    color: black;
  }
  .row0 {
    padding-bottom: 5rpx;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid #F5F5F5;
  }
  .row1 {
    padding-bottom: 10rpx;
  }
</style>