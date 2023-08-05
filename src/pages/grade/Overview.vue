<template>
  <view class="bg-white shadow padding margin round-dot">
    <view class="cu-list menu card-menu margin-bottom">
      <view class="cu-item">
        <view class="content"><text class="text-lg text-bold">综合绩点</text></view>
        <view class="action"><text class="text-xl text-blue">{{gpaInfo.gpa}}</text></view>
      </view>
      <view class="cu-item">
        <view class="content"><text class="text-lg text-bold">专业排名</text></view>
        <view class="action"><text class="text-xl text-blue">{{gpaInfo.majorRanking}}</text></view>
      </view>
      <view class="cu-item">
        <view class="content"><text class="text-lg text-bold">班级排名</text></view>
        <view class="action"><text class="text-xl text-blue">{{gpaInfo.classRanking}}</text></view>
      </view>
      <view class="cu-item">
        <view class="content"><text class="text-lg text-bold">年级排名</text></view>
        <view class="action"><text class="text-xl text-blue">{{gpaInfo.gradeRanking}}</text></view>
      </view>
      <view class="cu-item">
        <view class="content"><text class="text-lg text-bold">加权平均分</text></view>
        <view class="action"><text class="text-xl text-blue">{{gpaInfo.weightedAvg}}</text></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {GpaInfo} from "@/models/GradeModel";
  defineProps<{ gpaInfo: GpaInfo }>();
</script>

<style scoped>

</style>