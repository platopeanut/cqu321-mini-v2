<template>
  <view @click="$emit('click', examInfo)" class="card margin padding std-box-shadow text-df std-color-secondary bg-white">
    <view class="flex justify-between">
      <view class="text-xl text-bold text-black">{{examInfo.name}}</view>
      <view class="flex align-center">
        <view class="text-xxl text-bold" :class="calcHintColorClass(days, isOver)">{{hint.left}}</view>
        <view>{{hint.right}}</view>
      </view>
    </view>
    <view class="flex justify-between padding-top">
      <view>{{examInfo.date}}</view>
      <view>{{examInfo.startTime}} ~ {{examInfo.endTime}}</view>
    </view>
    <view class="flex justify-between">
      <view>教室：{{examInfo.classroom}}</view>
      <view>座位：{{examInfo.seatNum}}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {ExamInfo} from "@/models/ExamModel";
  import {computed} from "vue";
  import {calcHintColorClass} from "@/pages/exam/util";
  const props = defineProps<{ examInfo: ExamInfo, days: number, isOver: boolean, isSelf: boolean }>();
  defineEmits<{ (e: 'click', examInfo: ExamInfo): void }>();
  const hint = computed(() => {
    if (props.days === 0) return { left: '今天', right: '' };
    if (props.days === 1) return { left: '明天', right: ''};
    return {
      left: Math.abs(props.days),
      right: "天" + (props.days > 0 ? "后" : "前")
    };
  });
</script>

<style scoped>
  .card {
    border-radius: 10rpx;
  }
</style>