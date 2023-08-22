<template>
  <view @click="isExpand = !isExpand" class="bg-white text-lg text-black margin padding std-border-radius std-box-shadow">
    <view class="flex justify-between">
      <view class="text-bold">{{bookInfo.title}}</view>
      <view class="text-grey">{{bookInfo.callNo}}</view>
    </view>
    <view v-if="isExpand" class="padding-top">
      <view class="flex justify-between" v-for="(item, index) in items" :key="index">
        <view class="text-grey">{{item[0]}}</view>
        <view>{{item[1]}}</view>
      </view>
    </view>
    <view class="flex justify-between padding-top">
      <view class="flex">
        <view class="cu-tag radius light" :class="bookInfo.isReturn ? 'bg-green' : 'bg-orange'">
          {{bookInfo.isReturn ? '已归还' : '未归还'}}
        </view>
        <view class="cu-tag radius light" :class="bookInfo.canRenew ? 'bg-blue' : 'bg-red'">
          {{bookInfo.canRenew ? '可续借' : '不可续借'}}
        </view>
      </view>
      <text class="text-black text-bold" :class="'cuIcon-' + (isExpand ? 'fold' : 'unfold')"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type {BookInfo} from "@/models/LibraryModel";
  import {formatTime} from "@/utils/datetime";
  import {computed, ref} from "vue";
  const props = defineProps<{ bookInfo: BookInfo }>();
  const isExpand = ref(false);
  const items = computed(() => {
    const bookInfo = props.bookInfo;
    return [
      ['所属图书馆', bookInfo.libraryName],
      ['借出时间', formatTime(new Date(bookInfo.borrowTime))],
      ['应归还日期', bookInfo.shouldReturnTime],
      ['归还时间', bookInfo.returnTime],
      ['续借次数', bookInfo.renewCount],
    ];
  });
</script>