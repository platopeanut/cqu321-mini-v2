<template>
  <view class="padding margin">
    <ua-markdown :source="mdText"/>
  </view>
</template>
<script setup lang="ts">
  import UaMarkdown from "@/pages/components/ua-markdown/ua-markdown.vue";
  const mdText = '# Hi, There!\n~~~c\n#include<stdio.h>\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}\n~~~';
</script>