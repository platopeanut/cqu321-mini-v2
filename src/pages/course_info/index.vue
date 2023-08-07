<template>
  <TabBar :search-type="searchType" @click="(newSearchType: SearchType) => { searchType = newSearchType; }"/>
  <view class="std-bg-primary" style="padding: 100rpx 0;">
    <view class="margin std-box-shadow std-border-radius bg-white padding">
      <view class="cu-bar search">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input
              type="text"
              :placeholder="'请输入' + (searchType === SearchType.CourseName ? '课程' : '教师') + '名称'"
              v-model="queryInfo"
          />
        </view>
      </view>
      <view class="padding-top padding-bottom" style="display: flex; justify-content: center;">
        <button class="cu-btn btn lg" @click="onTapQuery" style="width: 50%;">查询</button>
      </view>
    </view>
    <view v-if="searchType === SearchType.CourseName">
      <view v-if="dataByCourseName.length > 0">
        <CourseItem
            v-for="(courseAbstract, index) in dataByCourseName"
            :key="index"
            :course-abstract="courseAbstract"
            @click="onTapDetail"
        />
      </view>
      <Tip v-else/>
    </view>
    <view v-else>
      <view v-if="dataByTeacherName.length > 0">
        <TeacherCourse
            v-for="([teacherName, courseAbstractList], index) in dataByTeacherName"
            :teacher-name="teacherName"
            :course-abstract-list="courseAbstractList"
            :key="index"
            @click="onTapDetail"
        />
      </view>
      <Tip v-else/>
    </view>
  </view>
</template>

<script setup lang="ts">
  import TabBar from "@/pages/course_info/TabBar.vue";
  import CourseInfoModel, {CourseAbstract, SearchType} from "@/models/CourseInfoModel";
  import {ref} from "vue";
  import CourseItem from "@/pages/course_info/CourseItem.vue";
  import {arrayGroupBy} from "@/utils/util";
  import TeacherCourse from "@/pages/course_info/TeacherCourse.vue";
  import Tip from "@/pages/course_info/Tip.vue";
  const searchType = ref(SearchType.CourseName);
  const dataByCourseName = ref<CourseAbstract[]>([]);
  const dataByTeacherName = ref<[string, CourseAbstract[]][]>([]);
  const queryInfo = ref("");
  async function onTapQuery() {
    if (queryInfo.value.length > 0) {
      await uni.showLoading({ title: "查询中" });
      const data = await CourseInfoModel.query(searchType.value, queryInfo.value);
      uni.hideLoading();
      if (searchType.value === SearchType.CourseName) {
        dataByCourseName.value = data;
      }
      else {
        dataByTeacherName.value = Array.from(arrayGroupBy<string, CourseAbstract>(data, "instructor"));
      }
    }
    else {
      await uni.showToast({
        title: "输入不能为空",
        icon: "error"
      });
    }
  }
  async function onTapDetail(courseAbstract: CourseAbstract) {
    await uni.navigateTo({ url: `./detail/index?name=${courseAbstract.name}&code=${courseAbstract.code}` });
  }
</script>

<style scoped>
  .btn {
    background-color: #fd6260;
    color: white;
    font-weight: bold;
  }
</style>