<template>
  <view class="padding margin">
    <ua-markdown :source="mdText"/>
  </view>
</template>
<script setup lang="ts">
  import UaMarkdown from "@/pages/components/ua-markdown/ua-markdown.vue";
  import {ref} from "vue";
  import {onShow} from "@dcloudio/uni-app";
  import {oldRequestV1} from "@/core/old";
  const mdText = ref("");
  onShow(async () => {
    const res = await oldRequestV1({ url: "/about/about_us" });
    mdText.value = res.Content;
  });
</script>