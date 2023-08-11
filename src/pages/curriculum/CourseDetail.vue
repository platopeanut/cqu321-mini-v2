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
          <scroll-view scroll-y>
            <view class="margin padding text-lg text-black">
              <view class="text-center text-bold">{{course.name}}</view>
              <view class="flex justify-between margin-top">
                <view>课程编号</view>
                <view>{{course.code}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>教学班号</view>
                <view>{{course.courseNum}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>课程学分</view>
                <view>{{course.credit}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>上课教室</view>
                <view>{{course.classroom}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>任课教师</view>
                <view>{{course.instructor}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>上课周数</view>
                <view>{{getWeeksText(course)}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>上课时段</view>
                <view>{{getPeriodText(course)}}</view>
              </view>
              <view class="flex justify-between margin-top">
                <view>上课时间</view>
                <view>{{getTimeText(course)}}</view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {Course} from "@/models/CourseModel";
  import {getPeriodText, getTimeText, getWeeksText} from "./util";
  defineProps<{ courses: Course[], isShow: boolean }>();
  defineEmits<{ (e: 'click'): void }>();
</script>