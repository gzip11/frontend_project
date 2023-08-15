<template>
  <div class="filter-container">
    <el-input v-model="searchInfo.equipment_name" size="large" placeholder="输入设备名称" style="width: 200px"/>
    <el-input v-model="searchInfo.equipment_no" size="large" placeholder="输入设备编号" style="width: 180px;padding-left: 10px"/>
    <el-button type="primary" :icon="Search" @click="searchByNameAndNumber">查询</el-button>
    <el-button type="warning" :icon="Refresh" @click="refresh">刷新</el-button>
    <el-button type="primary" :icon="EditPen" @click="dialogInsertVisible=true">添加设备</el-button>
    <el-button type="primary" :icon="Download">导出设备信息</el-button>
    <el-button type="danger" :icon="Delete">删除所选中设备</el-button>
  </div>
  <!--添加信息对话框-->
  <el-dialog v-model="dialogInsertVisible" title="添加一个新设备" width="500px">
    <el-form :model="insertInfo" label-width="100px">
      <el-form-item label="设备名称">
        <el-input v-model="insertInfo.equipment_name" clearable/>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="insertInfo.equipment_number" clearable/>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="insertInfo.equipment_type" clearable>
          <el-option value="1"/>
          <el-option value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="操作系统">
        <el-select v-model="insertInfo.system_software" clearable>
          <el-option value="Windows"/>
          <el-option value="Linux" />
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="insertInfo.system_version" clearable/>
      </el-form-item>
      <el-form-item label="供应商">
        <el-input v-model="insertInfo.equipment_supplier" clearable/>
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="insertInfo.equipment_status" clearable>
          <el-option value="1" />
          <el-option value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="使用场合">
        <el-input v-model="insertInfo.equipment_purpose" clearable/>
      </el-form-item>
      <el-form-item label="所属实验室">
        <el-input v-model="insertInfo.lab_id" clearable/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="insertInfo.equipment_desc"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogInsertVisible=false">取消</el-button>
        <el-button type="primary" @click="insertData">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {Search,EditPen,Download,Delete,Refresh} from '@element-plus/icons-vue'
import {reactive,ref,provide,inject} from "vue";
import axios from "axios";
import {useSearchStore} from "@/stores";

const searchInfo = reactive({
  equipment_name: '',
  equipment_no: '',
})

const validateSearchInfo = () => {
  if (searchInfo.equipment_name === "" && searchInfo.equipment_no === "") {
    ElMessage.warning("查询条件不能都为空！");
    return false;
  }else {
    return true;
  }
}

const insertInfo = reactive({
  equipment_name: '',
  equipment_number: '',
  equipment_type: '',
  system_software: '',
  system_version: '',
  equipment_supplier: '',
  equipment_status: '',
  equipment_purpose: '',
  lab_id: '',
  equipment_desc: '',
})

let dialogInsertVisible = ref(false);
const refresh = inject("reload");
let result = ref();
const store = useSearchStore();

const searchByNameAndNumber = async() => {
  if (validateSearchInfo()){
    await axios.post('http://localhost:5173/api/SimulationEquipment/Condition',{
      number: searchInfo.equipment_no,
      name: searchInfo.equipment_name
    }).then(res => {
      store.updateSearchResult(res.data.data.records);
      ElMessage.success("查询成功");
    })
  }
}



const insertData = () => {
  axios.post('http://localhost:5173/api/SimulationEquipment',{
    name: insertInfo.equipment_name,
    number: insertInfo.equipment_number,
    type: insertInfo.equipment_type,
    software_system: insertInfo.system_software,
    version_number: insertInfo.system_version,
    supplier: insertInfo.equipment_supplier,
    status: insertInfo.equipment_purpose,
    lab_id: insertInfo.lab_id,
    thumbnail: insertInfo.equipment_desc
  }).then(res => {
    ElMessage.success("添加成功");
    dialogInsertVisible.value = false;
    /*if (res.code === 200){
      //console.log(res);
      ElMessage.success(res.msg);
    }*/
  })
}

</script>

<style scoped>

</style>