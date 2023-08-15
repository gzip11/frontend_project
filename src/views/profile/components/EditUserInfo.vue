<template>
  <el-card>
    <div class="title" style="padding-bottom: 40px">
      <h1>修改您的个人信息</h1>
    </div>
    <el-form v-for="(item,index) in edit_user_info" :key="index" label-width="70px">
      <el-form-item :label="index">
        <el-input v-model="item.value" placeholder="请输入账号信息" clearable/>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="2" :offset="2">
        <el-button type="primary">保存</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger">重置</el-button>
      </el-col>
    </el-row>

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