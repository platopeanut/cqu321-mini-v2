<template>
  <view class="flex padding-top text-lg" @click="onTap">
    <text class="cu-tag round margin-right-xs" :class="getInfoWayStyle(infoWay)">{{ infoWay }}</text>
    <text class="text-grey txt-overflow">{{value}}</text>
    <text class="cuIcon-copy text-bold text-red"></text>
  </view>
</template>

<script setup lang="ts">
  import type {InfoWay} from "@/pages/general_info/util";
  import {getInfoWayStyle} from "@/pages/general_info/util";
  const props = defineProps<{
    infoWay: InfoWay
    value: string
  }>();
  async function onTap() {
    await uni.setClipboardData({ data: props.value });
  }
</script>

<style scoped>
  .txt-overflow {
    text-overflow:ellipsis;/*省略号 */
    white-space:nowrap;/*溢出时不换行 */
    overflow:hidden;/*溢出时隐藏 */
  }
</style>