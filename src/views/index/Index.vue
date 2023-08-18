<template>
  <div class="home-container">
    <el-container class="layout-container">
      <el-aside width="200px">
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
          <router-view v-slot="{ Component }" v-if="isRouterAlive">
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
import { ref,reactive,nextTick,provide } from 'vue';
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

const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

provide("reload",reload);

</script>

<style scoped>

.layout-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.el-aside {
  background-color: #fff;
  width: 12rem;
}


.el-header {
  background-color: #D5FFD0;
  height: 4rem;
  text-align: right;
  font-size: 18px;
  border-bottom: 1px solid #e1e1e1; /* 添加底部边框 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  padding: 10px; /* 添加内边距 */
}

.el-main {
  background-color: #279EFF;
  height: calc(100vh - 4rem);
}

.el-aside {
  height: 100vh;
}
</style>