<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="logo" style="height: 100px">
        <h3>虚拟仿真实验室管理系统</h3>
      </div>

    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              admin
              <el-icon class="el-icon--right">
                 <arrow-down/>
               </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Close" @click="exitInfo">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        this is main
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { Menu as IconMenu, Message, Setting, ArrowDown, Close} from '@element-plus/icons-vue';
import logo from '@/assets/img/logo-mini.png'
import router from '@/router'

const logoUrl = reactive({
  logo
})

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