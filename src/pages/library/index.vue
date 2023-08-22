<template>
  <TabBar v-model:tab-cur="tabCur"/>
  <view class="page std-bg-primary padding-top padding-bottom-xl">
    <view v-if="tabCur === 0">
      <Empty v-if="currBookInfos.length === 0" icon-type="success" message="暂无借阅"/>
      <BookInfoCard v-for="(bookInfo, index) in currBookInfos" :key="index" :book-info="bookInfo"/>
    </view>
    <view v-else-if="tabCur === 1">
      <Empty v-if="prevBookInfos.length === 0" icon-type="success" message="暂无借阅"/>
      <BookInfoCard v-for="(bookInfo, index) in prevBookInfos" :key="index" :book-info="bookInfo"/>
    </view>
  </view>
</template>

<script setup lang="ts">
  import LibraryModel, {BookInfo} from "@/models/LibraryModel";
  import {ref} from "vue";
  import BookInfoCard from "@/pages/library/BookInfoCard.vue";
  import TabBar from "@/pages/library/TabBar.vue";
  import Empty from "@/pages/components/Empty.vue";
  import {onShow} from "@dcloudio/uni-app";

  const tabCur = ref(0);
  const currBookInfos = ref<BookInfo[]>([]);
  const prevBookInfos = ref<BookInfo[]>([]);

  onShow(async () => {
    await uni.showLoading({ title: "加载中" });
    currBookInfos.value = await new LibraryModel().update(true);
    prevBookInfos.value = await new LibraryModel().update(false);
    uni.hideLoading();
    await uni.showToast({ title: "查询成功", icon: "success" });
  });
</script>

<style scoped>
  .page {
    margin-top: 80rpx;
  }
</style>