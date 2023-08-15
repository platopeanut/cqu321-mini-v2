<template>
  <view class="form-item">
    <view class="bar">
      <view class="title"><text class="required-star">* </text>{{title}}</view>
      <view v-if="!isValid" class="hint">{{title}}必须是数字！</view>
    </view>
    <input
        class="content"
        :class="[isFocus ? 'active' : '', !isValid ? 'error' : '']"
        placeholder-class="placeholder"
        :placeholder="placeholder"
        :value="value.toString()"
        @input="onChange"
        @focus="isFocus = true"
        @blur="isFocus = false"
    />
  </view>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  const props = defineProps<{
    title: string
    value: number
    defaultValue?: number
    placeholder?: string
  }>();
  const emit = defineEmits<{ (e: "update:value", newValue: number): void }>();
  const isFocus = ref(false);
  const isValid = ref(true);
  function onChange(e: any) {
    isValid.value = e.target.value.length > 0 && !isNaN(e.target.value);
    if (isValid.value) {
      emit('update:value', parseFloat(e.target.value));
    }
    else {
      emit('update:value', props.defaultValue || 0);
    }
  }
</script>

<style scoped>
  @import "form.css";
</style>