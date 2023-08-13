<template>
  <view class="form-item">
    <view class="bar">
      <view class="title"><text v-if="isRequired" class="required-star">* </text>{{title}}</view>
      <view v-if="!checkPass()" class="hint">{{title}}不能为空！</view>
    </view>
    <input
        class="content"
        :class="[isFocus ? 'active' : '', !checkPass() ? 'error' : '']"
        placeholder-class="placeholder"
        :value="value"
        :placeholder="placeholder"
        :password="type === TextInputType.PASSWORD"
        @input="$emit('update:value', $event.target.value)"
        @focus="isFocus = true"
        @blur="isFocus = false"
    />
  </view>
</template>

<script setup lang="ts">
  import {TextInputType} from "@/pages/components/form/types";
  import {ref} from "vue";
  const props = defineProps<{
    title: string
    value: string
    placeholder?: string
    type?: TextInputType
    isRequired?: boolean
    check?: boolean
  }>();
  defineEmits<{ (e: "update:value", newValue: string): void }>();
  const isFocus = ref(false);
  function checkPass() {
    return !props.check || props.value.length > 0;
  }
</script>

<style scoped>
  @import "form.css";
</style>