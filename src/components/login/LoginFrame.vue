<template>
  <div class="login-container">
    <div class="head-title">
      <h1 style="font-size:20px">虚拟仿真实训教学管理及资源共享云平台</h1>
    </div>
    <div class="form-body">
      <div class="login-form">
        <el-form :model="formData" :rules="formRules" :ref="form" hide-required-asterisk="true">
          <el-form-item label="账号" prop="username">
            <el-input v-model="formData.username" :prefix-icon="User" size="large" placeholder="请输入账号"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" show-password v-model="formData.password" :prefix-icon="Lock" size="large" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item>
              <el-col :span="6">
                <el-radio-group>
                  <el-radio label="自动登录"/>
                </el-radio-group>
              </el-col>
              <el-col :span="6" :offset="12">
                <el-link type="primary">忘记密码</el-link>
              </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="180">
              <el-col :span="14">
                <el-link>其他登录方式</el-link>
              </el-col>
              <el-col :span="10">
                <el-link type="primary" @click="router.push('/register')">注册账户</el-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive,ref,inject} from "vue";
import router from "@/router";
import {User,Lock} from '@element-plus/icons-vue';
import {CommonApi,UserApi} from "@/api/api";
import {userStore} from "@/stores";

const formData = ref({
  username: '',
  password: ''
});

const formRules= reactive({
  username: [
    {
      required: true,message: '请输入用户名',trigger: 'blur'
    },
  ],
  password: [
    {
      required: true, message: '请输入密码', trigger: 'blur'
    }
  ]
});

const form = ref(null);

const errorMessage = () => {
  ElMessage.error('登录失败');
}

const request = inject('request');

const store = userStore();

const login = () => {
  if (!formData.value.username || !formData.value.password){
    ElMessage.warning("用户名或密码不能为空");
  }else{
      const response = request.post(CommonApi.login,{
      account: formData.value.username,
      password: formData.value.password,
    }).then(res => {
      if (res.code === 200){
        ElMessage.success(res);
        store.auth.user = res.data.user.account;
        router.push('/home');
      }
      },() => {
      ElMessage.error(res.message);
      store.auth.user = null;
      })
  }
}

</script>

<style scoped>
.head-title {
  margin-top: 50px;
}

.head-title h1 {
  text-align: center;
}


.form-body {
  margin-top: 50px;
}

.login-form {
  padding: 20px;
}

.el-button {
  width: 360px;
}
</style>