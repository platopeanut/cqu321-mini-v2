<template>
  <Form>
    <TextInput
        title="账号"
        placeholder="学号或统一身份认证号"
        is-required
        v-model:value="info.username"
        :check="isCheck"
    />
    <TextInput
        :type="TextInputType.PASSWORD"
        title="密码"
        placeholder="账号密码"
        is-required
        v-model:value="info.password"
        :check="isCheck"
    />
    <RadioSelector is-required title="身份" v-model:idx="info.identity" :options="['本科生', '研究生']"/>
    <FormButton @click="onTapLogin">登录</FormButton>
  </Form>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import {TextInputType} from "@/pages/components/form/types";
  import TextInput from "@/pages/components/form/TextInput.vue";
  import Form from "@/pages/components/form/Form.vue";
  import RadioSelector from "@/pages/components/form/RadioSelector.vue";
  import {login} from "@/core/network";
  import FormButton from "@/pages/components/form/FormButton.vue";
  import {stdShowErrorToast} from "@/core/common";
  const info = ref({
    username: "",
    password: "",
    identity: 0
  });
  const isCheck = ref(false);
  function checkInfo() {
    isCheck.value = true;
    console.log(info.value);
    return info.value.username.length > 0 && info.value.password.length > 0
  }
  async function onTapLogin() {
    if (!checkInfo()) return;
    await uni.showLoading({title: "登陆中"});
    try {
      await login(info.value.username, info.value.password);
      uni.hideLoading();
      await uni.navigateBack({ delta: 1});
      await uni.showToast({ title: "登陆成功", icon: "success" });
    } catch (e: any) {
      uni.hideLoading();
      await stdShowErrorToast(e);
    }
  }
</script>