<template>
  <view class="flex" style="margin-top: 100rpx;">
    <view class="flex flex-direction text-lg text-center" style="width: 50rpx;">
      <view
          v-for="index in 13"
          :key="index"
          class="flex justify-center align-center"
          style="height: 120rpx;">{{index}}</view>
    </view>
    <view class="table-root">
      <view
          class="table-item text-df"
          :style="{...tableItem.pos, backgroundColor: tableItem.bgColor, width: '100rpx'}"
          v-for="(tableItem, index) in tableItems"
          :key="index"
          @click="$emit('onTapDetail', tableItem.course)"
      >
        <view>{{tableItem.course.classroom}}</view>
        <view class="bg-white" style="height: 1rpx;"></view>
        <view>{{tableItem.course.name}}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {Course} from "@/models/CourseModel";
  import type {GridItemPosStyle} from "@/pages/curriculum/util";

  defineProps<{
    tableItems: {
      course: Course,
      pos: GridItemPosStyle,
      bgColor: String
    }[]
  }>();
  defineEmits<{
    (e: 'onTapDetail', course: Course) : void
  }>();

</script>

<style scoped>
  .table-root {
    width: 700rpx;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(13, 120rpx);
  }

  .table-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
    border: 1px solid white;
    border-radius: 10rpx;
  }
</style>