<template>
  <view class="form-item">
    <view class="bar"><view class="title"><text v-if="isRequired" class="required-star">* </text>{{title}}</view></view>
    <view class="content" :class="isFocus ? 'active' : ''" @click="onTap">{{value}}</view>
  </view>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  const props = defineProps<{
    title: string
    options: string[]
    value: string
    isRequired?: boolean
  }>();
  const emits = defineEmits<{
    (e: 'update:value', newValue: string): void
  }>();
  const isFocus = ref(false);
  function onTap() {
    isFocus.value = true;
    uni.showActionSheet({
      itemList: props.options,
      success: result => {
        emits('update:value', props.options[result.tapIndex]);
        isFocus.value = false;
      },
      fail: () => { isFocus.value = false }
    })
  }

</script>

<style scoped>
  @import "form.css";
</style>