<template>
  <view class="padding-bottom-xl std-bg-primary">
    <scroll-view scroll-x class="bg-white nav solid-bottom fixed" scroll-with-animation :scroll-left="scrollLeft">
      <view class="flex text-center">
        <view class="cu-item flex-sub text-lg"
              :class="index===tabCur?'text-blue text-bold cur':''"
              v-for="(item,index) in termNames"
              :key="index"
              @tap="tabSelect"
              :data-id="index">{{item}}</view>
      </view>
    </scroll-view>
    <view style="height: 90rpx;"></view>
    <view
        v-if="tabCur !== 0"
        class="cu-list menu"
        :class="'card-menu margin-top'"
        v-for="(item, index) in scoreItems"
        :key="index"
    >
      <view class="cu-item">
        <view class="content" style="max-width: 60%">
          <view class="text-lg text-bold">{{item.name}}</view>
        </view>
        <view class="action">
          <text :class="['margin-right', 'text-bold', scoreToColor(item.score)]">{{item.score}}</text>
          <text class="lg text-gray cuIcon-unfold"></text>
        </view>
      </view>
    </view>
    <view v-else>
      <button @click="updateGradeInfo">Update</button>
    </view>
  </view>
</template>

<script setup lang="ts">
  import GradeModel, {GradeInfo} from "@/models/GradeModel";
  import {onShow} from "@dcloudio/uni-app";
  import {computed, ref} from "vue";
  import {convertToTermName, scoreToColor} from "@/pages/grade/util";

  const gradeModel = new GradeModel();
  const tabCur = ref(0);
  const scrollLeft = ref(0);
  const gradeInfo = ref<GradeInfo | null>(null);
  const termNames = computed<string[]>(() => {
    const names = new Set<string>();
    gradeInfo.value?.scoreItems.forEach(it => { names.add(convertToTermName(it.session)); });
    const nameList = Array.from(names);
    nameList.unshift('总览');
    return nameList;
  });
  const scoreItems = computed(() => {
    return gradeInfo.value?.scoreItems
        .filter(it => convertToTermName(it.session) === termNames.value[tabCur.value])
        .reverse();
  })

  onShow(async () => {
    gradeInfo.value = await gradeModel.get();
  });
  function tabSelect(e: any) {
    tabCur.value = e.currentTarget!.dataset.id;
    scrollLeft.value = (e.currentTarget.dataset.id - 1) * 60
  }
  async function updateGradeInfo() {
    await gradeModel.update();
    await uni.showToast({
      title: "更新完成",
      icon: "success"
    });
  }
</script>

<style scoped>
</style>