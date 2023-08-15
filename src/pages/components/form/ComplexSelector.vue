<template>
  <view class="form-item-row">
    <view class="title"><text class="required-star">* </text>{{title}}</view>
    <view class="content" @click="isShow = true">{{displayText}}</view>
  </view>
  <view class="cu-modal" :class="isShow ? 'show':''" @tap="isShow = false">
    <view class="cu-dialog" @tap.stop="">
      <view class="cells">
        <view
            class="cell"
            :class="idxList.includes(idx) ? 'active' : 'inactive'"
            v-for="(option, idx) in options"
            :key="idx"
            @click="()=>{ onTapCell(idx) }"
        >{{option}}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  const props = defineProps<{
    title: string
    displayText: string
    options: string[]
    idxList: number[]
  }>();
  const emit = defineEmits<{ (e: 'update:idxList', idxList: number[]) : void }>();
  const isShow = ref(false);
  function onTapCell(idx: number) {
    uni.vibrateShort();
    let newList = [...props.idxList];
    if (newList.includes(idx))
      newList = newList.filter(it => it !== idx);
    else newList.push(idx);
    emit('update:idxList', newList.sort((a, b) => a - b));
  }
</script>

<style scoped>
  @import "form.css";
  .cells {
    width: 100%;
    padding: 50rpx 10rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .cells > .cell {
    margin: 10rpx 10rpx;
    text-align: center;
    font-weight: bold;
    font-size: 40rpx;
    padding: 20rpx 0;
    border-radius: 10rpx;
  }
  .inactive {
    background-color: #ececec;
    color: #808080;
  }
  .active {
    background-color: #DEFBF7;
    color: #45B2C7;
  }
</style>