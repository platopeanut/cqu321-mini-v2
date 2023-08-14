<template>
  <view class="form-item">
    <view class="bar"><view class="title"><text class="required-star">* </text>{{title}}</view></view>
    <picker
        class="content"
        :class="isFocus ? 'active' : ''"
        :range="options"
        :value="idx"
        @change="onChange"
        @click="isFocus = true"
        @cancel="isFocus = false"
    >{{options[idx]}}</picker>
  </view>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  defineProps<{
    title: string
    options: string[]
    idx: number
  }>();
  const emit = defineEmits<{ (e: 'update:idx', newValue: number): void }>();
  const isFocus = ref(false);
  function onChange(e: any) {
    isFocus.value = false;
    emit('update:idx', parseInt(e.detail.value));
  }
</script>

<style scoped>
  @import "form.css";
</style>