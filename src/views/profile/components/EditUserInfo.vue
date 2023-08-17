<template>
  <el-card>
    <div class="title" style="padding-bottom: 40px">
      <h1>修改您的个人信息</h1>
    </div>
    <el-form label-width="70px">
      <el-form-item label="账号">
        <el-input v-model="edit_user_info.account" placeholder="请输入新的账号名称" clearable/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="edit_user_info.name" placeholder="请输入姓名" clearable/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="edit_user_info.email" placeholder="请输入邮箱" clearable/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="edit_user_info.phone" placeholder="请输入手机号码" clearable/>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="edit_user_info.intro" placeholder="请输入个人介绍" clearable/>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="2" :offset="2">
        <el-button type="primary" @click="editUserInfo">保存</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import axios from "axios";
import router from "@/router";
import jwtDecode from "jwt-decode";

const edit_user_info = reactive({
  account: '',
  name: '',
  email: '',
  phone: '',
  intro: ''
})

//修改用户信息
const editUserInfo = () => {
  if (edit_user_info != null){
    const id = jwtDecode(localStorage.getItem('token')).userID;
    axios.put(`http://localhost:5173/api/user/update`,{
      userId: id,
      account: edit_user_info.account,
      name: edit_user_info.name,
      email: edit_user_info.email,
      phone: edit_user_info.phone,
      intro: edit_user_info.intro
    }).then(res => {
      if (res.data.code === 200){
        ElMessage.success("修改成功");
        router.go(0);
      }
    })
  }else {
    ElMessage.warning("更新的信息不能完全为空");
  }
}

</script>

<style scoped>

</style>