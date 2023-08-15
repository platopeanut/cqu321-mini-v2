<template>
  <view @click="onTap" class="card margin text-xl bg-white std-box-shadow">
    <view class="flex justify-between">
      <view class="text-bold" :class="color">
        {{courseCardData.name}}
        <text v-if="courseCardData.isTop" class="cuIcon-crownfill text-yellow text-bold"></text>
      </view>
      <view class="text-grey">{{courseCardData.code}}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import type {CourseCardData} from "@/pages/curriculum/edit/util";
  const props = defineProps<{courseCardData: CourseCardData}>();
  const emit = defineEmits<{
    (e: 'top'): void
    (e: 'del'): void
  }>();
  const color = computed(() => {
    const tag = props.courseCardData.tag;
    if (tag === "custom") return "text-green";
    if (tag === "curr") return "text-black";
    if (tag === "next") return "text-blue";
    return "text-grey";
  });
  function onTap() {
    const itemList = props.courseCardData.isTop ? ['取消顶置'] : ['置顶'];
    if (props.courseCardData.tag === 'custom') itemList.push('删除');
    uni.showActionSheet({
      itemList: itemList,
      success: result => {
        if (result.tapIndex === 0) emit('top');
        else if (result.tapIndex === 1) emit('del');
      }
    });
  }
</script>

<style scoped>
  .card {
    padding: 40rpx 30rpx;
    border-radius: 5rpx;
  }
</style>