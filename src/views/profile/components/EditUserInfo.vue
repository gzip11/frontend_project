<template>
  <el-card>
    <h1>修改个人信息</h1>
    <el-form v-for="(item,index) in edit_user_info" :key="index">
      <el-form-item :label="index">
        <el-input v-model="item.value" placeholder="请输入账号信息" clearable/>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";

const edit_user_info = reactive({
  account: '123',
  name: '213',
  email: '1312',
  phone: '2312',
  intro: '1231'
})

</script>

<style scoped>

</style>