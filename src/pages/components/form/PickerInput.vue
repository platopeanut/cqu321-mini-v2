<template>
  <view class="form-item">
    <view class="bar"><view class="title"><text class="required-star">* </text>{{title}}</view></view>
    <view class="content">
      <picker :mode="type" :value="value" @change="$emit('update:value', $event.detail.value)">{{value}}</picker>
    </view>
  </view>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    type: "time" | "date"
    value: string
  }>();
  defineEmits<{ (e: 'update:value', newValue: string): void }>();
</script>

<style scoped>
  @import "form.css";
</style>