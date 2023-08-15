<template>
  <el-card>
    <div class="clearfix">
      <span>个人信息</span>
    </div>
    <div class="profile" style="padding-top: 20px">
      <div class="profile-info">
        <el-descriptions v-for="(key,value) in user_info" :key="value">
          <el-descriptions-item :label="value">{{key}}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {userStore} from "@/stores";
import {inject,reactive,onMounted} from "vue";
import {UserApi} from "@/api/api";
import axios from "axios";

const store = userStore();

const user_info = reactive({
  account: '',
  Name: '',
  email: '',
  phone: '',
  intro: '',
})

const request = inject('request');

//个人信息页面加载时就请求获取个人信息
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token){
    axios.defaults.headers.common['Authorization'] = `${ token }`;
  }
  axios.get('http://localhost:5173/api/user/info').then(response => {
    //console.log(response);
    user_info.account = response.data.data.account;
    user_info.Name = response.data.data.Name;
    user_info.email = response.data.data.email;
    user_info.intro = response.data.data.intro;
    user_info.phone = response.data.data.phone;
  }).catch(err => {
    console.error('Error',err);
  })
})

</script>

<style scoped>

</style>