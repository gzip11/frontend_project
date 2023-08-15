<template>
  <div class="toolbar">
    <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              欢迎
              {{currentUser}}
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
        })
        localStorage.removeItem('token')
        store.auth.user = null;
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