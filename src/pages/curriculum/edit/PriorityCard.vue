<template>
  <view @click="onTap" class="card margin text-xl bg-white std-box-shadow">
    <view class="flex justify-between">
      <view class="text-bold" :class="color">
        {{ priorityCardData.name }}
        <text v-if="priorityCardData.isTop" class="cuIcon-crownfill text-yellow text-bold"></text>
      </view>
      <view class="text-grey">{{ priorityCardData.code }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from "vue";
import type {PriorityCardData} from "@/pages/curriculum/edit/util";
import {CourseTag} from "@/pages/curriculum/edit/util";

const props = defineProps<{ priorityCardData: PriorityCardData }>();
  const emit = defineEmits<{ (e: 'top'): void }>();
  const color = computed(() => {
    const tag = props.priorityCardData.tag;
    if (tag === CourseTag.Custom) return "text-green";
    if (tag === CourseTag.Curr) return "text-black";
    if (tag === CourseTag.Next) return "text-blue";
    return "text-grey";
  });
  function onTap() {
    const itemList = props.priorityCardData.isTop ? ['取消顶置'] : ['置顶'];
    uni.showActionSheet({
      itemList: itemList,
      success: result => {
        if (result.tapIndex === 0) emit('top');
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