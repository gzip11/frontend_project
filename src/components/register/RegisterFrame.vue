<template>
  <div class="register-container">
    <div class="head-title">
      <h1>注册</h1>
    </div>
    <div class="register-form">
      <div class="form-item">
        <el-form>
          <el-form-item label="账号">
            <el-input v-model="user_info.username" :prefix-icon="User" size="large" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user_info.password" :prefix-icon="Lock" size="large"/>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input :prefix-icon="Check" size="large"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="user_info.name" :prefix-icon="Notebook" size="large"/>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="user_info.tel" placeholder="请输入手机号" class="input-with-select">
              <template #prepend>
                <el-select size="large" v-model="value" style="width: 80px">
                  <el-option
                      v-for="item in data.tel_region_code"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user_info.email" placeholder="请输入邮箱" :prefix-icon="Files" size="large"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-col :span="6">
              <el-input v-model="user_info.verificationCode" size="large" style="width: 180px"/>
            </el-col>
            <el-col :span="6" :offset="9">
              <el-button size="large" type="primary">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form>
            <el-row justify="space-between">
              <el-col :span="12">
                <el-button size="large" style="width: 200px" type="primary" @click="register">注册</el-button>
              </el-col>
              <el-col :span="8">
                <el-link type="primary" @click="router.push('/')">使用已有帐户登录</el-link>
              </el-col>
            </el-row>
          </el-form>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import {ref,reactive,inject} from "vue";
import {User,Lock,Notebook,Check,Files} from "@element-plus/icons-vue";3
import {CommonApi,UserApi} from "@/api/api";

const value = ref('');

const data = reactive({
  tel_region_code: [
    {
      "country":"中国",
      "code":"+86",
    },
    {
      "country":"美国",
      "code":"+1",
    },
    {
      "country":"印度",
      "code":"+91",
    },
    {
      "country":"巴西",
      "code":"+55",
    },
    {
      "country":"俄罗斯",
      "code":"+7",
    },
    {
      "country":"日本",
      "code":"+81",
    },
    {
      "country":"德国",
      "code":"+49",
    }
  ],
});

const user_info = ref({
  username: '',
  password: '',
  name: '',
  tel: '',
  email: '',
  verificationCode: '',
})

const isEmpty = (obj) => {
  for (let item in obj) {
    if (obj.hasOwnProperty(item)){
      console.log("null");
      return false;
    }else{
      return true;
    }
  }
}

const request = inject('request');

const register = () => {
  const response = request.post(UserApi.register,{
    account: user_info.value.username,
    password: user_info.value.password,
    name: user_info.value.name,
    phone: user_info.value.tel,
    email: user_info.value.email,
    type: 1,
    cardNumber: 3201,
  }).then(res => {
    console.log(res);
    if (res.code === 200) {
      ElMessage.success(res.message);
      router.push('/');
    }else{
      ElMessage.error(res.message);
    }
  })
}

</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.head-title {
  margin-top: 50px;
}

.head-title h1 {
  text-align: center;
}

.register-form {
  margin-top: 20px;
}

.form-item {
  padding: 20px;
}
</style>