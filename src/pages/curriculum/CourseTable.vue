<template>
  <view class="flex" style="margin-top: 100rpx;">
    <view class="flex flex-direction text-lg text-center" style="width: 50rpx;">
      <view
          v-for="index in 13"
          :key="index"
          class="flex justify-center align-center std-color-secondary"
          style="height: 120rpx;">{{index}}</view>
    </view>
    <view>
      <view class="grid-container course-table">
        <view
            class="table-item text-df"
            style="width: 100rpx;"
            :style="{...tableItem.pos, backgroundColor: tableItem.bgColor}"
            v-for="(tableItem, index) in tableItems"
            :key="index"
            @click="$emit('onTapDetail', tableItem.course)"
        >
          <view v-if="tableItem.isOverlap" class="text-white text-bold text-right padding-top-xs padding-right-xs">...</view>
          <view v-if="'classroom' in tableItem.course">
            <view>{{tableItem.course.classroom}}</view>
            <view class="bg-white" style="height: 1rpx;"></view>
          </view>
          <view>{{tableItem.course.name}}</view>
        </view>
      </view>
      <view class="grid-container bottom-table">
        <view v-if="currWeekOfTerm === fixedWeekOfTerm" class="today-col" :style="{gridColumnStart: dayOfWeek}"></view>
      </view>
      <view class="grid-container top-table">
        <view v-if="currWeekOfTerm === fixedWeekOfTerm" :style="{
          gridColumnStart: dayOfWeek,
          gridRowStart: idxOfDay[0] + 1,
          gridRowEnd: idxOfDay[0] + 2,
        }"><view :style="{height: `${120 * idxOfDay[1]}rpx`}" class="time-line"></view></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {CourseCell, UniCourse} from "@/pages/curriculum/util";
  import {calcDayOfWeek} from "@/utils/datetime";
  import {computed} from "vue";
  import {calcCurrPeriod} from "@/pages/curriculum/util";

  const props = defineProps<{
    tableItems: CourseCell[],
    currDate: Date,
    fixedWeekOfTerm: number,
    currWeekOfTerm: number
  }>();
  defineEmits<{ (e: 'onTapDetail', course: UniCourse) : void }>();
  const dayOfWeek = computed(()=>{
    return calcDayOfWeek(props.currDate) + 1;
  });
  const idxOfDay = computed(() => calcCurrPeriod(props.currDate));

</script>

<style scoped>
  .grid-container {
    width: 700rpx;
    display: grid;
    grid-template-columns: repeat(7, 100rpx);
    grid-template-rows: repeat(13, 120rpx);
    position: absolute;
  }

  .course-table {
    z-index: 1;
  }

  .bottom-table {
    z-index: 0;
  }

  .top-table {
    z-index: 2;
    pointer-events: none;
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

  .today-col {
    grid-row-start: 1;
    grid-row-end: 14;
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
  }

  .time-line {
    border-bottom: 8rpx solid #fd6260;
  }
</style>