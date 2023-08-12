<template>

</template>

<script setup lang="ts">
  import {onShow} from "@dcloudio/uni-app";
  import LibraryModel from "@/models/LibraryModel";

  onShow(async () => {
    const libraryModel = new LibraryModel();
    await libraryModel.update();
  })
</script>

<style scoped>

</style>