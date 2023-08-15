<template>
  <view class="form-item-row">
    <view class="title"><text class="required-star">* </text>{{title}}</view>
    <picker
        mode="multiSelector"
        class="content"
        :class="isFocus ? 'active' : ''"
        :range="options"
        :value="idxList"
        @click="isFocus = true"
        @cancel="isFocus = false"
        @change="onChange"
        @columnchange="onColumnChange"
    >{{ displayText }}</picker>
  </view>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  defineProps<{
    title: string
    options: string[][]
    idxList: number[]
    displayText: string
  }>();
  const emit = defineEmits<{
    (e: 'update:idxList', newIdxList: number[]): void
    (e: 'change', col: number, row: number): void
  }>();
  const isFocus = ref(false);
  function onChange(e: any) {
    isFocus.value = false;
    emit('update:idxList', e.detail.value);
  }
  function onColumnChange(e: any) {
    emit('change', e.detail.column, e.detail.value);
  }
</script>

<style scoped>
  @import "form.css";
</style>