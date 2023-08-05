<template>
  <scroll-view scroll-x class="bg-white nav solid-bottom fixed" scroll-with-animation>
    <view class="flex text-center">
      <view
        v-for="(currType, index) in searchTypes"
        :key="index"
        :data-id="index"
        class="cu-item flex-sub text-lg"
        :class="currType === searchType ? 'std-color-primary text-bold cur' : 'std-color-secondary'"
        @click="$emit('click', currType)"
      >{{typeNames[index]}}</view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  import {SearchType} from "@/models/CourseInfoModel";

  defineProps<{ searchType: SearchType }>();
  defineEmits<{ (e: 'click', newSearchType: SearchType): void }>();
  const searchTypes = [SearchType.CourseName, SearchType.TeacherName];
  const typeNames = ['搜课程', '搜老师'];
</script>