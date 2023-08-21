<template>
  <view
    class="cu-modal"
    :class="isShow ? 'show' : ''"
    @tap="$emit('click')"
  >
    <view class="cu-dialog" @tap.stop="">
      <swiper
        class="square-dot"
        indicator-dots
        circular
        indicator-color="#767676"
        indicator-active-color="#fd6260"
        style="height: 730rpx;"
      >
        <swiper-item class="bg-white" v-for="(course, index) in courses" :key="index">
          <view class="margin padding text-lg text-black">
            <view class="text-center text-bold text-xl margin-bottom-xl">{{course.name}}</view>
            <view
              v-for="(item, index) in getItems(course)"
              :key="index"
              class="flex justify-between margin-top"
            >
              <view class="text-grey">{{ item[0] }}</view>
              <view>{{ item[1] }}</view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {getPeriodText, getTimeText, getWeeksText} from "@/utils/course";
  import type {UniCourse} from "@/pages/curriculum/util";
  defineProps<{ courses: UniCourse[], isShow: boolean }>();
  defineEmits<{ (e: 'click'): void }>();
  function getItems(course: UniCourse) {
    if ('courseNum' in course) return [
      ['课程编号', course.code],
      ['教学班号', course.courseNum],
      ['课程学分', course.credit],
      ['上课教室', course.classroom],
      ['任课教师', course.instructor],
      ['上课周数', getWeeksText(course.weeks)],
      ['上课时段', getPeriodText(course.dayTime)],
      ['上课时间', getTimeText(course.dayTime)]
    ];
    else return [
      ['课程编号', course.code],
      ['时段', getPeriodText(course.dayTime)],
      ['时间', getTimeText(course.dayTime)],
      ['周数', getWeeksText(course.weeks)],
      ['备注', course.content]
    ];
  }
</script>