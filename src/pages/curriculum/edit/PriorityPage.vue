<template>
  <view class="std-bg-primary">
    <Hint />
    <PriorityCard
        v-for="(priorityCardData, idx) in priorityCardDataList"
        :key="idx"
        :priority-card-data="priorityCardData"
        @top="() => { onTapTop(priorityCardData) }"
    />
  </view>
</template>
<script setup lang="ts">
  import Hint from "@/pages/curriculum/edit/Hint.vue";
  import {CourseTag, PriorityCardData} from "@/pages/curriculum/edit/util";
  import {onMounted, ref} from "vue";
  import CourseModel, {TermOffset} from "@/models/CourseModel";
  import PriorityCard from "@/pages/curriculum/edit/PriorityCard.vue";
  import CustomCourseModel from "@/models/CustomCourseModel";
  import CoursePriorityModel from "@/models/CoursePriorityModel";

  const courseModel = CourseModel.getInstance();
  const customCourseModel = CustomCourseModel.getInstance();
  const coursePriorityModel = CoursePriorityModel.getInstance();
  const priorityCardDataList = ref<PriorityCardData[]>([]);
  onMounted(init);
  async function init() {
    // 依次取出
    const curr = (await courseModel.getCoursesData(TermOffset.CurrTerm))?.courses || [];
    const next = (await courseModel.getCoursesData(TermOffset.NextTerm))?.courses || [];
    const custom = await customCourseModel.get();
    // 合并
    // 保证code唯一
    const codes = new Set<string>();
    const all: PriorityCardData[] = [];
    await coursePriorityModel.load();
    function addItem(data: PriorityCardData) {
      if (codes.has(data.code)) return;
      data.isTop = coursePriorityModel.has(data.code);
      all.push(data);
      codes.add(data.code);
    }
    // 基本优先级：custom > curr > next
    custom.forEach(it => addItem({ name: it.name, code: it.code, tag: CourseTag.Custom, isTop: false }));
    curr.forEach(it => addItem({ name: it.name, code: it.code, tag: CourseTag.Curr, isTop: false }));
    next.forEach(it => addItem({ name: it.name, code: it.code, tag: CourseTag.Next, isTop: false }));
    priorityCardDataList.value = all.sort((a, b) => coursePriorityModel.compare(b.code, a.code));
  }
  async function onTapTop(data: PriorityCardData) {
    if (data.isTop) await coursePriorityModel.del(data.code);
    else await coursePriorityModel.add(data.code);
    await init();
  }
</script>