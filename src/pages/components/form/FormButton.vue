<template>
  <button class="btn text-lg bg-blue" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineEmits<{ (e: 'click'): void }>();
</script>

<style scoped>
  .btn {
    width: 50%;
    display: block;
    margin: 20rpx auto;
  }
</style>
