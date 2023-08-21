<template>
  <Form>
    <TextInput title="课程名称" v-model:value="course.name" is-required :check="isCheck"/>
    <TextInput title="上课教室" v-model:value="course.content"/>
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
  import {computed, ref} from "vue";
  import TextInput from "@/pages/components/form/TextInput.vue";
  import FormButton from "@/pages/components/form/FormButton.vue";
  import DayTimeInput from "@/pages/curriculum/edit/DayTimeInput.vue";
  import ComplexSelector from "@/pages/components/form/ComplexSelector.vue";
  import {range} from "@/utils/util";
  import {getWeeksText} from "@/utils/course";
  import type {CustomCourse} from "@/models/CustomCourseModel";
  const props = defineProps<{ oldCustomCourse?: CustomCourse }>();
  const emit = defineEmits<{ (e: 'submit', customCourse: CustomCourse): void }>();
  const course = ref<CustomCourse>({
    name: props.oldCustomCourse?.name || "",
    code: props.oldCustomCourse?.code || "",
    content: props.oldCustomCourse?.content || "",
    dayTime: {
      weekday: props.oldCustomCourse?.dayTime.weekday || 0,
      period: {
        start: props.oldCustomCourse?.dayTime.period.start || 0,
        end: props.oldCustomCourse?.dayTime.period.end || 0
      }
    },
    weeks: [...(props.oldCustomCourse?.weeks || []).map(it => it - 1)]
  });
  const isCheck = ref(false);
  const weeksText = computed(() => getWeeksText(course.value.weeks.map(it => it + 1)));
  function checkPass() {
    isCheck.value = true;
    const c = course.value;
    return c.name.length > 0;
  }
  function onTapSave() {
    course.value.code = course.value.name;
    if (!checkPass()) return;
    course.value.weeks = course.value.weeks.map(it => it + 1);
    emit('submit', course.value);
  }
</script>