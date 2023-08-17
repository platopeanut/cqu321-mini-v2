<template>
  <view class="margin padding bg-white std-box-shadow std-border-radius">
    <view class="text-bold text-black text-xl">{{ title }}</view>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  defineProps<{ title: string }>();
</script>