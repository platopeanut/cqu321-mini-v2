<template>
  <view class="margin std-box-shadow cu-list menu card-menu text-lg">
    <view class="cu-item">
      <view class="content">{{examInfo.name}}</view>
      <view class="action">{{displayDaysText()}}</view>
    </view>
    <view class="cu-item">
      <view class="content">{{examInfo.date}}</view>
      <view class="action">{{examInfo.startTime}} ~ {{examInfo.endTime}}</view>
    </view>
    <view class="cu-item">
      <view class="content">{{examInfo.classroom}}</view>
      <view class="action">{{examInfo.seatNum}}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {ExamInfo} from "@/models/ExamModel";
  const props = defineProps<{ examInfo: ExamInfo, days: number }>();
  function displayDaysText() {
    if (props.days < 0) return `${-props.days}天前`;
    if (props.days === 0) return '今天';
    if (props.days === 1) return '明天';
    return `${props.days}天后`;
  }
</script>