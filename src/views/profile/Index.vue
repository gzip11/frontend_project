<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <UserInfo/>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="修改信息" name="first">
              <EditUserInfo/>
            </el-tab-pane>
            <el-tab-pane label="注销账号" name="second">
              <Logout/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserInfo from "@/views/profile/components/UserInfo.vue";
import EditUserInfo from "@/views/profile/components/EditUserInfo.vue";
import Logout from "@/views/profile/components/Logout.vue";
import { ref } from "vue";

const activeName = ref('first')

</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>