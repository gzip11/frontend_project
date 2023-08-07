<template>
  <el-card>
    <div>
      <span>点击按钮即可注销您的账号</span>
    </div>
    <div>
      <el-button type="danger" size="large" @click="centerDialogVisible=true">注销</el-button>
    </div>
    <el-dialog v-model="centerDialogVisible" title="警告" width="30%" align-center center>
    <span>
      亲爱的虚拟仿真云平台用户，这会删除您的所有相关数据，您确定要注销吗？
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">返回</el-button>
        <el-button type="primary" @click="logout">
          确认注销
        </el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import jwtDecode from "jwt-decode";
import axios from "axios";

const centerDialogVisible = ref(false)

const userId = jwtDecode(localStorage.getItem('token')).userID;
const account = jwtDecode(localStorage.getItem('token')).account;

/*const logout = async () => {
  try {
    const res = await axios.post(`http://localhost:5173/api/user/logout/${userId}`);
      if (res.code === 200){
        console.log(res);
        //checkAccountStatus();
      }
  }catch (error){
    console.error('Error',error);
  }
}*/

const logout = () => {
  axios.post(`http://localhost:5173/api/user/logout/${userId}`).then(res => {
    console.log("hello"+res.data);
    if (res.data.code === 200){
      centerDialogVisible.value = false;
      checkAccountStatus();
    }else{

    }
  })

}

const checkAccountStatus = async () => {
  try {
    const response = await axios.post(`http://localhost:5173/api/user/isExisting/${account}`);
    if (response.data == null){
      console.log("当前用户已被注销");
      localStorage.removeItem('token');
      router.push('/welcome');
    }
  }catch (error){
    console.error('Error',error);
  }
}

</script>

<style scoped>

</style>