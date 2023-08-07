<template>
  <div class="toolbar">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home/dashboard' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              欢迎
              {{store.auth.user}}
              <el-icon class="el-icon--right">
                 <arrow-down/>
               </el-icon>
            </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="User" @click="router.push('/home/profile')">个人中心</el-dropdown-item>
          <el-dropdown-item :icon="Close" @click="exitInfo">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import {userStore} from "@/stores";
import router from "@/router";
import { User,ArrowDown, Close,ArrowRight} from '@element-plus/icons-vue';
import jwtDecode from "jwt-decode";

const store = userStore();

const currentUser = jwtDecode(localStorage.getItem('token')).Name;


const exitInfo = () => {
  ElMessageBox.confirm(
      '确定退出登录?',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '退出成功',
        });
        store.auth.user = null;
        localStorage.removeItem('token')
        router.push('/welcome');
      })
      .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          }
      )
}

</script>

<style scoped>

</style>