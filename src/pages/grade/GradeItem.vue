<template>
  <view class="cu-list menu card-menu margin-top">
    <view class="cu-item" @click="$emit('click')">
      <view class="content" style="max-width: 60%">
        <view class="text-lg text-bold">{{scoreItem.name}}</view>
      </view>
      <view class="action">
        <text :class="['margin-right', 'text-bold', scoreToColor(scoreToNumber(scoreItem.score))]">{{scoreItem.score}}</text>
        <text :class="['lg', 'text-gray', isExpand ? 'cuIcon-fold' : 'cuIcon-unfold']"></text>
      </view>
    </view>
    <view v-if="isExpand" class="cu-item text-lg text-grey">
      <view class="content flex">
        <view>学分: </view>
        <view>{{scoreItem.credit}}</view>
      </view>
      <view class="action flex">
        <view>教师: </view>
        <view>{{scoreItem.instructor}}</view>
      </view>
    </view>
    <view v-if="isExpand" class="cu-item">
      <view class="content">
        <text class="cu-tag radius light bg-olive">{{scoreItem.tags.studyNature}}</text>
        <text class="cu-tag radius light bg-cyan">{{scoreItem.tags.courseNature}}</text>
      </view>
      <view class="action text-lg text-grey">{{scoreItem.moreInfo.code}}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {ScoreItem} from "@/models/GradeModel";
  import {scoreToColor, scoreToNumber} from "@/pages/grade/util";
  defineProps<{
    scoreItem: ScoreItem
    isExpand: boolean
  }>();
  defineEmits<{ (e: 'click'): void }>();
</script>