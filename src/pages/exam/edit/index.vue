<template>
  <Form>
    <TextInput
        title="课程名称"
        placeholder="课程名称"
        is-required
        v-model:value="examInfo.name"
        :check="isCheck"
    />
    <TextInput title="课程代码" placeholder="课程代码" v-model:value="examInfo.code"/>
    <TextInput title="考试地点" placeholder="考试地点" v-model:value="examInfo.classroom"/>
    <TextInput title="座位号" placeholder="座位号" v-model:value="examInfo.seatNum"/>
    <DateTimeSelector title="日期" type="date" v-model:value="examInfo.date" />
    <DateTimeSelector title="开始时间" type="time" v-model:value="examInfo.startTime" />
    <DateTimeSelector title="结束时间" type="time" v-model:value="examInfo.endTime" />
    <FormButton @click="onTapSubmit">保存</FormButton>
  </Form>
</template>

<script setup lang="ts">
  import Form from "@/pages/components/form/Form.vue";
  import {ref} from "vue";
  import type {ExamInfo} from "@/models/ExamModel";
  import {getCurrDate, getCurrTime} from "@/utils/datetime";
  import TextInput from "@/pages/components/form/TextInput.vue";
  import FormButton from "@/pages/components/form/FormButton.vue";
  import ExamModel from "@/models/ExamModel";
  import {onLoad} from "@dcloudio/uni-app";
  import DateTimeSelector from "@/pages/components/form/DateTimeSelector.vue";
  const examModel = ExamModel.getInstance();
  const examInfo = ref<ExamInfo>({
    name: "",
    code: "",
    classroom: "",
    seatNum: "",
    date: getCurrDate(),
    startTime: getCurrTime(),
    endTime: getCurrTime(),
  });
  const isCheck = ref(false);
  onLoad((option: any) => {
    if (option.name) {
      const info = examModel.getByName(option.name);
      if (info) examInfo.value = { ...info };
    }
  });
  function checkInfo() {
    isCheck.value = true;
    return examInfo.value.name.length > 0;
  }
  async function onTapSubmit() {
    if (!checkInfo()) return;
    await examModel.add(examInfo.value);
    await uni.navigateBack({ delta: 1 });
    setTimeout(async () => {
      await uni.showToast({ title: '已添加', icon: "success" });
    }, 200);
  }
</script>