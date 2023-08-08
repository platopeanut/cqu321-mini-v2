<template>
  <view class="text-center padding bg-white">
    <view class="icon" :class="getClass(iconType)"></view>
    <view class="text-xl text-grey">{{message}}</view>
    <view v-if="hint" class="padding-xs text-df text-blue text-shadow">{{hint}}</view>
  </view>
</template>

<style scoped>
  .icon {
    font-size: 200rpx;
  }
</style>

<script setup lang="ts">
  defineProps<{
    message: string
    iconType: "success" | "warning" | "error"
    hint?: string
  }>();
  function getClass(iconType: "success" | "warning" | "error") {
    if (iconType === "success") return "cuIcon-roundcheckfill text-green";
    if (iconType === "warning") return "cuIcon-warnfill text-yellow";
    if (iconType === "error") return "cuIcon-roundclosefill text-red";
    return "";
  }

</script>