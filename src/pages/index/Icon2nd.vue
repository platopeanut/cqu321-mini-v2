<template>
  <view class="flex flex-direction align-center text-center root" @click="$emit('click')">
    <view class="icon-bg" :class="disabled ? 'disable' : 'able'">
      <text class="text-white icon" :class="iconName"></text>
    </view>
    <view class="icon-text text-df">{{ title }}</view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  iconName: string
  title: string
  disabled?: boolean
}>();
defineEmits<{
  (e: 'click'):void
}>();
</script>

<style scoped>
.root {
  width: 120rpx;
}
.icon-bg {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.able {
  background: linear-gradient(45deg, #FE3B39 30%, #FD8B8A 82%);
}
.disable {
  background: linear-gradient(45deg, #808080 30%, #909090 82%);
}
.icon-bg > .icon {
  line-height: 80rpx;
  font-size: 50rpx;
}
.icon-text {
  padding-top: 10rpx;
  color: #696969;
}
</style>