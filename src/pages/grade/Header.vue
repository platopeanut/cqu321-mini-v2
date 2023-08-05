<template>
  <scroll-view scroll-x class="bg-white nav solid-bottom fixed" scroll-with-animation :scroll-left="scrollLeft">
    <view class="flex text-center">
      <view class="cu-item flex-sub text-lg"
            :class="index === tabCur ? 'std-color-primary text-bold cur' : 'std-color-secondary'"
            v-for="(item,index) in termNames"
            :key="index"
            @tap="onTabSelect"
            :data-id="index">{{item}}</view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  const props = defineProps<{ termNames: string[], tabCur: number }>();
  const emits = defineEmits<{ (e: 'onTabSelect', idx: number): void }>();
  // 用于标签页自动右滑
  const scrollLeft = computed(() => (props.tabCur - 1) * 60);
  // 切换标签页时触发的回调
  function onTabSelect(e: any) {
    emits('onTabSelect', e.currentTarget!.dataset.id);
  }
</script>