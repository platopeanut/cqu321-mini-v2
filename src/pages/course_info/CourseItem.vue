<template>
  <view class="cu-list menu card-menu margin-top">
    <view class="cu-item arrow" @click="$emit('click', courseAbstract)">
      <view class="content">
        <view class="text-lg text-black">{{courseAbstract.name}}</view>
      </view>
      <view class="action">
        <view class="text-lg text-grey">{{courseAbstract.code}}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {CourseAbstract} from "@/models/CourseInfoModel";
  defineProps<{ courseAbstract: CourseAbstract }>();
  defineEmits<{ (e: 'click', courseAbstract: CourseAbstract):void }>();
</script>