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
        indicator-color="#8799a3"
        indicator-active-color="#0081ff"
        style="height: 800rpx;"
      >
        <swiper-item v-for="(course, index) in courses" :key="index">
          <scroll-view scroll-y>
            <view class="cu-list menu text-left solid-top">
              <view class="cu-item" style="text-align: center;">
                <view class="content">
                  <text class="text-black">{{course.name}}</text>
                </view>
              </view>
<!--              <view class="cu-item">-->
<!--                <view class="content">-->
<!--                  <text class="text-grey">上课时段</text>-->
<!--                </view>-->
<!--                <view class="action">-->
<!--                  <text class="text-black">周{{course.weeks}}节</text>-->
<!--                </view>-->
<!--              </view>-->
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">上课教室</text>
                </view>
                <view class="action">
                  <text class="text-black">{{course.classroom}}</text>
                </view>
              </view>
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">课程编号</text>
                </view>
                <view class="action">
                  <text class="text-black">{{course.code}}</text>
                </view>
              </view>
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">任课教师</text>
                </view>
                <view class="action">
                  <text class="text-black">{{course.instructor}}</text>
                </view>
              </view>
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">教学班号</text>
                </view>
                <view class="action">
                  <text class="text-black">{{course.courseNum}}</text>
                </view>
              </view>
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">上课周次</text>
                </view>
                <view class="action">
                  <text class="text-black">{{course.weeks.join(',')}}</text>
                </view>
              </view>
              <view class="cu-item">
                <view class="content">
                  <text class="text-grey">上课时间</text>
                </view>
                <view class="action">
                  <text class="text-black">{{course.dayTime.weekday}}</text>
                </view>
              </view>
            </view>
          </scroll-view>
<!--          <scroll-view scroll-y>-->
<!--            <view class="cu-list menu text-left solid-top">-->
<!--              <view class="cu-item" style="text-align: center;">-->
<!--                <view class="content">-->
<!--                  <text class="text-black">{{course.name}}</text>-->
<!--                </view>-->
<!--              </view>-->
<!--              <view class="cu-item">-->
<!--                <view class="content">-->
<!--                  <text class="text-grey">时段</text>-->
<!--                </view>-->
<!--                <view class="action">-->
<!--                  <text class="text-black">周{{currDetailLessons[index].WeekDayFormat}}{{currDetailLessons[index].PeriodFormat}}节</text>-->
<!--                </view>-->
<!--              </view>-->
<!--              <view class="cu-item">-->
<!--                <view class="content">-->
<!--                  <text class="text-grey">周次</text>-->
<!--                </view>-->
<!--                <view class="action">-->
<!--                  <text class="text-black">{{currDetailLessons[index].TeachingWeekFormat}}</text>-->
<!--                </view>-->
<!--              </view>-->
<!--              <view class="cu-item">-->
<!--                <view class="content">-->
<!--                  <text class="text-grey">时间</text>-->
<!--                </view>-->
<!--                <view class="action">-->
<!--                  <text class="text-black">{{course.dayTime}}</text>-->
<!--                </view>-->
<!--              </view>-->
<!--              <view class="cu-item" wx:if="{{currDetailLessons[index].Content}}">-->
<!--                <view class="content">-->
<!--                  <text class="text-grey">说明</text>-->
<!--                </view>-->
<!--                <view class="action">-->
<!--                  <text class="text-black">{{currDetailLessons[index].Content}}</text>-->
<!--                </view>-->
<!--              </view>-->
<!--            </view>-->
<!--          </scroll-view>-->
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {Course} from "@/models/CourseModel";
  defineProps<{ courses: Course[], isShow: boolean }>();
  defineEmits<{ (e: 'click'): void }>();
</script>