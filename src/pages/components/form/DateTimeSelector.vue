<template>
  <view class="form-item-row">
    <view class="title"><text class="required-star">* </text>{{title}}</view>
    <picker
        class="content" :class="isFocus ? 'active' : ''"
        :mode="type"
        :value="value"
        @change="onChange"
        @click="isFocus = true"
        @cancel="isFocus = false"
    >{{value}}</picker>
  </view>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  defineProps<{
    title: string
    type: "time" | "date"
    value: string
  }>();
  const emit = defineEmits<{ (e: 'update:value', newValue: string): void }>();
  const isFocus = ref(false);
  function onChange(e: any) {
    isFocus.value = false;
    emit('update:value', e.detail.value);
  }
</script>

<style scoped>
  @import "form.css";
</style>