<template>
  <div class="register-container">
    <div class="head-title">
      <h1>注册</h1>
    </div>
    <div class="register-form">
      <div class="form-item">
        <el-form
            label-width="70px"
            @validate="onValidate"
            :model="user_info"
            :rules="rules"
            ref="formRef"
            :hide-required-asterisk="true"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="user_info.account" :prefix-icon="User" size="large" clearable/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" show-password v-model="user_info.password" :prefix-icon="Lock" size="large" clearable/>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input type="password" show-password v-model="user_info.confirm_password" :prefix-icon="Check" size="large" clearable/>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="user_info.name" :prefix-icon="Notebook" size="large" clearable/>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="user_info.tel" placeholder="请输入手机号" class="input-with-select" clearable>
              <template #prepend>
                <el-select size="large" v-model="value" style="width: 80px">
                  <el-option
                      v-for="item in data.tel_region_code"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                  >
                    <span style="float: left">{{item.code}}</span>
                    <span style="float: right;padding-left: 10px">{{item.country}}</span>
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-col :span="6">
              <el-input placeholder="请输入验证码" v-model="user_info.code" size="large" style="width: 180px" clearable/>
            </el-col>
            <el-col :span="6" :offset="9">
              <el-button size="large" type="primary">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form>
            <el-row justify="space-between">
              <el-col :span="6" :offset="4">
                <el-button size="large" style="width: 200px" type="primary" @click="register">注册</el-button>
              </el-col>
              <el-col :span="6">
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
import {User,Lock,Notebook,Check,Files} from "@element-plus/icons-vue";
import {UserApi} from "@/api/api";

const value = ref('');

const data = reactive({
  tel_region_code: [
    {
      country:"中国",
      code:"+86",
    },
    {
      country:"美国",
      code:"+1",
    },
    {
      country:"印度",
      code:"+91",
    },
    {
      country:"巴西",
      code:"+55",
    },
    {
      country:"俄罗斯",
      code:"+7",
    },
    {
      country:"日本",
      code:"+81",
    },
    {
      country:"德国",
      code:"+49",
    }
  ],
});

const user_info = ref({
  account: '',
  password: '',
  confirm_password: '',
  name:'',
  tel: '',
  code: '',
})

/*const isEmpty = (obj) => {
  for (let item in obj) {
    if (obj.hasOwnProperty(item)){
      console.log("null");
      return false;
    }else{
      return true;
    }
  }
}*/

const validateUserName = (rule,value,callback) => {
  if (value === ''){
    callback(new Error('请输入用户名'));
  }else if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)){
    callback(new Error('用户不能包含特殊字符，是能是中文或者英文'));
  }else{
    callback();
  }
}

const validatePassWord = (rule,value,callback) => {
  if (value === ''){
    callback(new Error('请再次输入密码'));
  }else if(value !== user_info.value.password){
    callback(new Error('两次输入的密码不一致'));
  }else {
    callback()
  }
}

const validateTel = (rule,value,callback) => {
  if (value === '') {
    callback(new Error('手机号不能为空'));
  }else if (!/^1[3-9]\d{9}$/.test(value)){
    callback(new Error('手机号不合法'));
  }else {
    callback();
  }
}

const formRef  = ref(null);
const isTelValid = ref(false)
const clodTime = ref(0)

const onValidate = (prop,isValid) => {
  if (prop === 'tel'){
    isTelValid.value = isValid;
  }
}


const rules = reactive({
  account: [
    { validator: validateUserName, trigger: ['blur','change'] },
    { min: 2, max: 10, message: '用户名的长度必须在2到8个字符之间', trigger: ['blur','change']}
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码的长度必须在6到16个字符之间', trigger: ['blur','change'] }
  ],
  confirm_password: [
    { validator: validatePassWord, trigger: ['blur','change'] }
  ],
  name: [
    {required: true,message: '请输入姓名', trigger: 'blur'},
  ],
  tel: [
    { validator: validateTel, trigger: ['blur','change'] }
  ],
  code: [
    { required: true, message: '请输入获取的验证码',trigger: 'blur' }
  ]
});


const request = inject('request');

const register = () => {
  formRef.value.validate((isValid) => {
    if (isValid){
      const response = request.post(UserApi.register,{
        account: user_info.value.account,
        password: user_info.value.password,
        name: user_info.value.name,
        phone: user_info.value.tel,
      }).then(res => {
        //console.log(res);
        if (res.code === 200) {
          ElMessage.success(res.msg);
          router.push('/');
        }else{
          ElMessage.error(res.msg);
        }
      })
    }else{
      ElMessage.warning("请填写完整的信息");
    }
  })
}

</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.head-title {
  margin-top: 20px;
}

.head-title h1 {
  text-align: center;
}

.register-form {
  padding-top: 20px;
}

.form-item {
  padding: 10px;
}

</style>