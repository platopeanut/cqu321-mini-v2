<template>
  <view class="std-bg-primary padding-bottom-xl padding">
    <TitleCard :name="courseDetail.name" :code="courseDetail.code"/>
    <DetailItem
      v-for="(detail, index) in courseDetail.details"
      :key="index"
      :detail="detail" />
  </view>
</template>

<script setup lang="ts">
  import {onLoad} from "@dcloudio/uni-app";
  import {ref} from "vue";
  import CourseInfoModel, {CourseDetail} from "@/models/CourseInfoModel";
  import TitleCard from "@/pages/course_info/detail/TitleCard.vue";
  import DetailItem from "@/pages/course_info/detail/DetailItem.vue";
  const courseDetail = ref<CourseDetail>({} as CourseDetail);
  onLoad(async (option: any) => {
    courseDetail.value = await CourseInfoModel.queryDetail(option.code);
    courseDetail.value.name = option.name;
    courseDetail.value.code = option.code;
  });
</script>
