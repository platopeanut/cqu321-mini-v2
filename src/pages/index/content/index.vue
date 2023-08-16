<template>
  <view class="margin padding-sm std-box-shadow">
    <ua-markdown :source="markdownContent"/>
  </view>
</template>

<script setup lang="ts">
  import {onLoad} from "@dcloudio/uni-app";
  import {getMarkdownUrl} from "@/core/old";
  import {ref} from "vue";
  import UaMarkdown from "@/pages/components/ua-markdown/ua-markdown.vue";
  const markdownContent = ref("");
  onLoad(async (option: any) => {
    const res = await uni.request({ url: getMarkdownUrl(option.url), method: "GET" });
    if (res.statusCode === 200) markdownContent.value = res.data as string;
  });
</script>