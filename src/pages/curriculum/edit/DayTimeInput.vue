<template>
  <MultiSelector
    title="时段"
    :options="periods"
    :display-text="displayText"
    v-model:idx-list="idxList"
    @change="onPeriodChange"
  />
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
  import {range} from "@/utils/util";
  import MultiSelector from "@/pages/components/form/MultiSelector.vue";
  import type {DayTime} from "@/models/CourseModel";

  const props = defineProps<{dayTime: DayTime}>();
  const emit = defineEmits<{ (e: 'update:dayTime', dayTime: DayTime): void }>();

  const idxList = ref([
    props.dayTime.weekday,
    Math.max(0, props.dayTime.period.start - 1),
    Math.max(0, props.dayTime.period.end - 1)
  ]);
  const periods = ref([
    '一二三四五六日'.split('').map(it => `周${it}`),
    getPeriodText(1, 13),
    getPeriodText(1, 13),
  ]);
  const displayText = computed(() => {
    const items = idxList.value.map((it, idx) => periods.value[idx][it]);
    if (items[1] === items[2])
      return `${items[0]} 第${items[1]}节`
    return `${items[0]} 第${items[1]}-${items[2]}节`;
  });

  watch(idxList, (newValue) => {
  emit('update:dayTime', {
    weekday: newValue[0],
    period: {
      start: parseInt(periods.value[1][newValue[1]]),
      end: parseInt(periods.value[2][newValue[2]]),
    }
  });
}, { immediate: true });

  function onPeriodChange(col: number, row: number) {
    if (col === 1) {
      periods.value[1] = getPeriodText(1, 13);
      periods.value[2] = getPeriodText(row + 1, 13);
    }
  }
  function getPeriodText(start: number, end: number) { return range(start, end + 1).map(it => it.toString()); }
</script>

<style scoped>

</style>