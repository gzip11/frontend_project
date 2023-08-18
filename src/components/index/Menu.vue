<template>
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
    <el-sub-menu>
      <template #title>
        <el-icon><operation/></el-icon>
        <span>实验室管理</span>
      </template>
      <el-menu-item @click="this.$router.push('/home/simulation_equipment')">虚拟仿真设备管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {House,Operation} from '@element-plus/icons-vue'

const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  height: 100vh;
}
</style>
