<template>
  <view class="std-bg-primary padding-top-sm padding-bottom-xl">
    <InfoCard title="重庆大学学生服务大厅">
      <InfoItem value="https://my.cqu.edu.cn/workspace/home" info-way="网站" />
    </InfoCard>
    <InfoCard title="志愿时长查询、志愿证明文件下载">
      <InfoItem value="青志重大" info-way="公众号" />
      <InfoItem value="校青协志愿信息统计服务" info-way="小程序" />
    </InfoCard>
    <InfoCard title="GPA查询、电子成绩单下载">
      <InfoItem value="校务行" info-way="小程序" />
    </InfoCard>
    <InfoCard title="评教">
      <InfoItem value="http://jxpj.cqu.edu.cn/stu/index" info-way="网站" />
<!--      微信公众号：（=>互动）-->
      <InfoItem value="重庆大学服务号" info-way="公众号"/>
    </InfoCard>
    <InfoCard title="体测查询">
      <InfoItem value="http://tzcs.cqu.edu.cn/servlet/adminservlet" info-way="网站（校园网）" />
    </InfoCard>
  </view>
</template>

<script setup lang="ts">
  import InfoItem from "@/pages/general_info/InfoItem.vue";
  import InfoCard from "@/pages/general_info/InfoCard.vue";
</script>