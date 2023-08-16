<template>
  <Form>
    <TextInput title="课程名称" v-model:value="course.name" is-required :check="isCheck"/>
    <TextInput title="课程编号" v-model:value="course.code" is-required :check="isCheck"/>
    <TextInput title="教学班号" v-model:value="course.courseNum" is-required :check="isCheck"/>
    <TextInput title="上课教室" v-model:value="course.classroom"/>
    <TextInput title="任课教师" v-model:value="course.instructor"/>
    <NumberInput title="课程学分" v-model:value="course.credit"/>
    <DayTimeInput v-model:day-time="course.dayTime"/>
    <ComplexSelector
        title="上课周数"
        :display-text="weeksText"
        :options="range(1, 31).map(it => it.toString())"
        v-model:idx-list="course.weeks"
    />
    <FormButton @click="onTapSave">新增课程</FormButton>
  </Form>
</template>
<script setup lang="ts">
  import Form from "@/pages/components/form/Form.vue";
  import type {Course} from "@/models/CourseModel";
  import {computed, ref} from "vue";
  import TextInput from "@/pages/components/form/TextInput.vue";
  import FormButton from "@/pages/components/form/FormButton.vue";
  import DayTimeInput from "@/pages/curriculum/edit/DayTimeInput.vue";
  import NumberInput from "@/pages/components/form/NumberInput.vue";
  import ComplexSelector from "@/pages/components/form/ComplexSelector.vue";
  import {range} from "@/utils/util";
  import {getWeeksText} from "@/pages/curriculum/util";
  const props = defineProps<{ oldCourse?: Course }>();
  const emit = defineEmits<{ (e: 'submit', course: Course): void }>();
  const course = ref<Course>(props.oldCourse !== undefined ? props.oldCourse : {
    classroom: "",
    code: "",
    courseNum: "",
    credit: 0,
    dayTime: {period: {end: 0, start: 0}, weekday: 0},
    instructor: "",
    name: "",
    weeks: []
  });
  const weeksText = computed(() => getWeeksText(course.value.weeks.map(it => it + 1)));
  const isCheck = ref(false);
  function checkPass() {
    isCheck.value = true;
    const c = course.value;
    return c.name.length > 0
        && c.code.length > 0
        && c.courseNum.length > 0;
  }
  function onTapSave() {
    if (!checkPass()) return;
    emit('submit', course.value);
  }
</script>