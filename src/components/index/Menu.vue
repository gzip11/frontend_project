<template>
  <el-radio-group   v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">折叠</el-radio-button>
  </el-radio-group>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item @click="this.$router.push('/home/dashboard')">
      <el-icon><House /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item>
      <el-icon><User /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-menu-item>
      <el-icon><UserFilled /></el-icon>
      <template #title>角色管理</template>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Menu /></el-icon>
      <template #title>菜单管理</template>
    </el-menu-item>
    <el-menu-item>
      <el-icon><Operation /></el-icon>
      <template #title>仿真设备管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {House,User,UserFilled,Menu,Operation} from '@element-plus/icons-vue'

const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  height: 88vh;
}
</style>
