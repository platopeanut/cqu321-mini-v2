<template>
  <Header :curr-date="currDate" :day-of-week="dayOfWeek"/>
  <CourseTable :table-items="tableItems" @on-tap-detail="onTapDetail"/>
  <Footer
    :week-of-term="weekOfTerm"
    @update-course-info="updateCourseInfo"
    @on-tap-prev-week="onTapPrevWeek"
    @on-tap-next-week="onTapNextWeek"
    @on-tap-switch-term="onTapSwitchTerm"
    @on-tap-more-func="onTapMoreFunc"
  />
  <CourseDetail
    :courses="activeCourses"
    :is-show="isShowDetail"
    @click="isShowDetail = false"
  />
</template>

<script setup lang="ts">
  import CourseModel, {Course, TermOffset} from "@/models/CourseModel";
  import {onShow} from "@dcloudio/uni-app";
  import {computed, ref} from "vue";
  import {
    getCourseCells,
    makeColorMap,
    makeCoursesMatrix
  } from "@/pages/curriculum/util";
  import {calcDateAfterNDays, calcDayOfWeek, calcWeeksBetweenDates, stringToDateInChinaTime} from "@/utils/datetime";
  import Header from "@/pages/curriculum/Header.vue";
  import Footer from "@/pages/curriculum/Footer.vue";
  import CourseTable from "@/pages/curriculum/CourseTable.vue";
  import CourseDetail from "@/pages/curriculum/CourseDetail.vue";

  const courseModel = new CourseModel();
  // CONST
  let colorMap: Map<string, string>;
  // STATUS
  const termOffset = ref<TermOffset>(TermOffset.CurrTerm);
  const termName = ref<string>("unknown");
  const currDate = ref(new Date());
  const startDate = ref<Date>(new Date());
  const courses = ref<Course[]>([]);
  const activeCourses = ref<Course[]>([]);
  const isShowDetail = ref(false);
  // COMPUTED
  const dayOfWeek = computed(() => calcDayOfWeek(currDate.value));
  const weekOfTerm = computed(() => calcWeeksBetweenDates(startDate.value, currDate.value));
  const currWeekCourses = computed(() => {
    return courses.value
        // 过滤掉非当前周
        .filter(it => it.weeks.includes(weekOfTerm.value))
        // 过滤掉无效时间段
        .filter(it => it.dayTime.period.start !== -1 && it.dayTime.period.end !== -1);
  });
  const coursesMatrix = computed(() => makeCoursesMatrix(currWeekCourses.value));
  const tableItems = computed(() => {
    // return currWeekCourses.value.map(it => {
    //   return {
    //     course: it,
    //     pos: getGridItemPosStyle(it),
    //     bgColor: colorMap.get(it.courseNum) || 'gray',
    //     isOverlap: false
    //   } as CourseCell;
    // });
    return getCourseCells(coursesMatrix.value).map(it => {
      it.bgColor = colorMap.get(it.course.courseNum) || 'gray';
      return it;
    });
  });

  async function initData() {
    const coursesData = await courseModel.get(termOffset.value);
    termName.value = "unknown";
    currDate.value = new Date();
    startDate.value = new Date();
    courses.value = [];
    if (coursesData !== null) {
      termName.value = coursesData.termName;
      startDate.value = stringToDateInChinaTime(coursesData.startDate);
      courses.value = coursesData.courses;
      colorMap = makeColorMap(courses.value);
    }
  }

  // HOOK
  onShow(async () => { await initData(); });
  async function updateCourseInfo() {
    await uni.showLoading({title: "更新中"});
    await courseModel.update(termOffset.value);
    await initData();
    uni.hideLoading();
    await uni.showToast({
      title: "更新完成",
      icon: "success"
    });
  }

  function onTapNextWeek() { switchWeek(1); }
  function onTapPrevWeek() { switchWeek(-1); }
  function switchWeek(deltaWeek: number) {
    currDate.value = calcDateAfterNDays(currDate.value, deltaWeek * 7);
    console.log(tableItems.value);
  }

  function onTapMoreFunc() {
    uni.showActionSheet({
      itemList: [
        '切换学期',
        '自定义课表',
        '云存储PUSH',
        '云存储FETCH'
      ],
      success(result: UniNamespace.ShowActionSheetRes): void {
        if (result.tapIndex === 0) { onTapSwitchTerm(); }
      }
    });
  }
  function onTapSwitchTerm() {
    const itemList = [termName.value, '2023秋'];
    itemList[termOffset.value] += '（当前）';
    uni.showActionSheet({
      itemList: itemList,
      success(result: UniNamespace.ShowActionSheetRes): void {
        termOffset.value = result.tapIndex;
        initData();
      }
    });
  }
  function onTapDetail(course: Course) {
    const namesSet = new Set<string>();
    const targetCourses: Course[] = [];
    const i = course.dayTime.weekday;
    for (let j = course.dayTime.period.start; j < course.dayTime.period.end; j++) {
      for (const currCourse of coursesMatrix.value[i][j]) {
        if (!namesSet.has(currCourse.name)) {
          targetCourses.push(currCourse);
          namesSet.add(currCourse.name);
        }
      }
    }
    activeCourses.value = targetCourses;
    isShowDetail.value = true;
    console.log(activeCourses.value);
  }
</script>