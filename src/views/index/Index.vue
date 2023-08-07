<template>
  <div class="home-container">
    <el-container class="layout-container">
      <el-aside width="200px">
        <h1>虚拟仿真实验室管理系统</h1>
        <Menu/>
      </el-aside>

      <el-container>
        <el-header>
          <div class="header">
            <Header/>
          </div>
          <div class="tabs">
            <Tabs/>
          </div>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import logo from '@/assets/img/logo-mini.png';
import Header from "@/components/index/Header.vue";
import Menu from "@/components/index/Menu.vue"
import Tabs from "@/components/index/Tabs.vue";

const logoUrl = reactive({
  logo
})

const shadowGroup = ref([
  {
    name: 'Basic Shadow',
    type: '',
  },
  {
    name: 'Light Shadow',
    type: 'light',
  },
  {
    name: 'Lighter Shadow',
    type: 'lighter',
  },
  {
    name: 'Dark Shadow',
    type: 'dark',
  },
])

const getCssVarName = (type) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}




</script>

<style scoped>

.layout-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.el-aside {
  background-color: #475669;
}

.el-header {
  text-align: right;
  font-size: 18px;
  border-bottom: 1px solid #e1e1e1; /* 添加底部边框 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  padding: 10px; /* 添加内边距 */
}

.el-main {
  background-color: #99a9bf;
}

.el-aside {
  height: 100vh;
}
</style>