<template>
  <view class="margin padding std-box-shadow bg-white text-lg text-black std-border-radius">
    <view class="text-bold text-xl">{{course.name}}</view>
    <view class="flex justify-between padding-top-sm">
      <view>周数：{{getWeeksText(course.weeks)}}</view>
      <view>时段：{{getPeriodText(course.dayTime)}}</view>
    </view>
    <view v-if="course.content.length > 0" class="text-grey padding-top-sm">教室：{{course.content}}</view>
    <view class="flex text-center text-bold padding-top-sm" style="font-size: 50rpx;">
      <view @click="$emit('edit')" class="flex-sub cuIcon-edit text-blue"></view>
      <view @click="$emit('delete')" class="flex-sub cuIcon-close text-red"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {CustomCourse} from "@/models/CustomCourseModel";
  import {getPeriodText, getWeeksText} from "@/utils/course";
  defineProps<{ course: CustomCourse }>();
  defineEmits<{ (e: 'edit'): void, (e: 'delete'): void }>();
</script>
