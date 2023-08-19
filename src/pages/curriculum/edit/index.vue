<template>
  <TabBar :tab-cur="tabCur" @on-tap-tab="newTab => tabCur = newTab" />
  <view class="std-bg-primary" style="padding: 120rpx 0;">
    <CourseForm v-if="tabCur === 1" @submit="onSubmit" />
    <view v-else class="std-bg-primary">
      <CloudSync />
      <Hint />
      <CourseCard
          v-for="(courseCardData, idx) in courseCardDataList"
          :key="idx"
          :course-card-data="courseCardData"
          @top="() => { onTapTop(courseCardData) }"
          @del="() => { onTapDel(courseCardData) }"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
  import TabBar from "@/pages/curriculum/edit/TabBar.vue";
  import {ref} from "vue";
  import CourseForm from "@/pages/curriculum/edit/CourseForm.vue";
  import type {Course} from "@/models/CourseModel";
  import CourseModel, {TermOffset} from "@/models/CourseModel";
  import CourseCard from "@/pages/curriculum/edit/CourseCard.vue";
  import {onShow} from "@dcloudio/uni-app";
  import type {CourseCardData} from "@/pages/curriculum/edit/util";
  import Hint from "@/pages/curriculum/edit/Hint.vue";
  import CloudSync from "@/pages/curriculum/edit/CloudSync.vue";

  const tabCur = ref(0);
  const courseModel = CourseModel.getInstance();
  const courseCardDataList = ref<CourseCardData[]>([]);

  onShow(init);
  async function init() {
    // 依次取出
    const curr = (await courseModel.getCoursesData(TermOffset.CurrTerm))?.courses || [];
    const next = (await courseModel.getCoursesData(TermOffset.NextTerm))?.courses || [];
    // TODO
    // const custom = await courseModel.getCustom();
    // 合并
    const all: { course: Course, tag: string }[] = [];
    // custom.forEach(it => all.push({ course: it, tag: "custom" }));
    curr.forEach(it => all.push({ course: it, tag: "curr" }));
    next.forEach(it => all.push({ course: it, tag: "next" }));
    // 保证code唯一
    const codes = new Set<string>();
    const results: CourseCardData[] = [];
    // TODO
    // const priority = await courseModel.getPriority();
    const priority: string[] = [];
    all.forEach(it => {
      if (codes.has(it.course.code)) return;
      codes.add(it.course.code);
      results.push({
        code: it.course.code,
        name: it.course.name,
        tag: it.tag,
        isTop: priority.includes(it.course.code)
      });
    });
    // 调整优先级
    const priorityMap = new Map<string, number>();
    priority.forEach((code, index) => { priorityMap.set(code, index + 1) });
    results.sort((a, b) => {
      const aIndex = priorityMap.get(a.code) || 0;
      const bIndex = priorityMap.get(b.code) || 0;
      return bIndex - aIndex;
    });
    courseCardDataList.value = results;
  }
  async function onSubmit(course: Course) {
    // TODO
    // await courseModel.addCustom(course);
    await uni.showToast({ title: "添加成功", icon: "success" });
    await init();
    tabCur.value = 0;
  }
  async function onTapTop(courseCardData: CourseCardData) {
    // TODO
    // if (courseCardData.isTop) await courseModel.clearPriority(courseCardData.code);
    // else await courseModel.setPriority(courseCardData.code);
    await init();
  }
  async function onTapDel(courseCardData: CourseCardData) {
    // TODO
    // await courseModel.delCustom(courseCardData.name);
    await init();
  }
</script>