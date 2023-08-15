<template>

  <el-table
      highlight-current-row
      fit
      :data="tableData.List"
      style="width: 100%;"
      border
      :v-loading="listLoading"
      :default-sort="{ prop:'simulationEquipmentId',order:'descending'}"
  >
    <el-table-column fixed type="selection"/>
    <el-table-column align="center" prop="simulationEquipmentId" label="ID" sortable/>
    <el-table-column align="center" min-width="100%" prop="name" label="设备名称" />
    <el-table-column align="center" min-width="100%" prop="number" label="设备编号"/>
    <el-table-column align="center" min-width="100%" prop="type" label="设备类型"/>
    <el-table-column align="center" min-width="100%" prop="softwareSystem" label="操作系统"/>
    <el-table-column align="center" min-width="100%" prop="versionNumber" label="版本号"/>
    <el-table-column align="center" min-width="100%" prop="supplier" label="供应商"/>
    <el-table-column align="center" min-width="100%" prop="status" label="设备状态"/>
    <el-table-column align="center" min-width="100%" prop="purpose" label="使用场景"/>
    <el-table-column align="center" min-width="100%" prop="labId" label="所属实验室"/>
    <el-table-column align="center" min-width="100%" prop="thumbnail" label="备注"/>
    <el-table-column align="center" min-width="100%" prop="createTime" label="添加时间"/>
    <el-table-column align="center" min-width="100%" prop="updateTime" label="更新时间"/>
    <el-table-column width="220%" label="操作" fixed="right" align="center">
      <template #default="scope">
          <el-button type="primary" size="small" @click="tableData.dialogEditVisible = true && saveId(scope)">编辑</el-button>
          <el-button type="success" size="small" @click="tableData.dialogInfoVisible = true">详细信息</el-button>
          <el-button type="danger" size="small" @click="deleteData(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--分页器-->
  <el-pagination
      layout="total,sizes,prev,pager,next,jumper"
      :page-sizes="[5,10,15,20]"
      :total="total"
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="padding-top: 20px"
      background
  />

  <!--修改设备信息对话框-->
  <el-dialog :destroy-on-close="true" v-model="tableData.dialogEditVisible" title="编辑设备信息" width="500px">
    <el-form :model="tableData.updateEquipmentInfo" label-width="100px">
      <el-form-item label="设备名称">
        <el-input v-model="tableData.updateEquipmentInfo.equipment_name" clearable/>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="tableData.updateEquipmentInfo.equipment_number" clearable/>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="tableData.updateEquipmentInfo.equipment_type" clearable>
          <el-option value="1"/>
          <el-option value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="操作系统">
        <el-select v-model="tableData.updateEquipmentInfo.system_software" clearable>
          <el-option value="Windows"/>
          <el-option value="Linux"/>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="tableData.updateEquipmentInfo.system_version" clearable/>
      </el-form-item>
      <el-form-item label="供应商">
        <el-input v-model="tableData.updateEquipmentInfo.equipment_supplier" clearable/>
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="tableData.updateEquipmentInfo.equipment_status">
          <el-option value="1" />
          <el-option value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="使用场合">
        <el-input v-model="tableData.updateEquipmentInfo.equipment_purpose"/>
      </el-form-item>
      <el-form-item label="所属实验室">
        <el-input v-model="tableData.updateEquipmentInfo.lab_id" clearable/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="tableData.updateEquipmentInfo.equipment_desc"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="tableData.dialogEditVisible=false">取消</el-button>
        <el-button type="primary" @click="updateData">更新</el-button>
      </span>
    </template>
  </el-dialog>
  <!--详细信息对话框-->
  <el-dialog v-model="tableData.dialogInfoVisible" title="设备详细信息" width="500px">

  </el-dialog>

</template>

<script setup>
import {reactive,ref,onMounted,toRaw,inject,provide,computed} from "vue";
import axios from "axios";
import {ElMessage,ElMessageBox} from "element-plus";
import {lab} from "@/api/api";
import {useSearchStore} from "@/stores";
import {toRefs} from "vue";


const tableData = reactive({
  List: [],
  updateEquipmentInfo: {
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
  },
  dialogEditVisible: false,
  dialogInfoVisible: false,
});

const store = toRefs(useSearchStore());
tableData.List = store.searchResult;


let pageSize = ref(10);
let currentPage = ref(1);
const total = ref(9);

const handleSizeChange = (size) => {
  pageSize.value = size;
  //console.log(pageSize.value);
  axios.post('http://localhost:5173/api/SimulationEquipment/page',{
    page: currentPage.value,
    pageSize: pageSize.value
  }).then(res => {
    //console.log(res);
    tableData.List = res.data.data.records;
  })
}

const handleCurrentChange = (current) => {
  currentPage.value = current
  //console.log(currentPage.value);
  axios.post('http://localhost:5173/api/SimulationEquipment/page',{
    page: currentPage.value,
    pageSize: pageSize.value
  }).then(res => {
    //console.log(res);
    tableData.List = res.data.data.records;
  })
}

const listLoading = ref(true);

const refresh = inject("reload");

const getData = () => {
  axios.get('http://localhost:5173/api/SimulationEquipment').then(res => {
    if (res != null){
      tableData.List = res.data.data;
      //console.log(tableData.List)
      ElMessage.success("查询成功");
    }else{
      ElMessage.warning("信息获取失败，请稍后再试");
      //this.$router.push('/home/dashboard');
    }
  })
}

let id = ref(null);
const saveId = (row) => {
  id =  toRaw(row.row.simulationEquipmentId);
  return true;
}

const updateData = () => {
  axios.put('http://localhost:5173/api/SimulationEquipment',{
    simulationEquipmentId: id,
    name: tableData.updateEquipmentInfo.equipment_name,
    number: tableData.updateEquipmentInfo.equipment_number,
    type: tableData.updateEquipmentInfo.equipment_type,
    software_system: tableData.updateEquipmentInfo.system_software,
    version_number: tableData.updateEquipmentInfo.system_version,
    supplier: tableData.updateEquipmentInfo.equipment_supplier,
    status: tableData.updateEquipmentInfo.equipment_purpose,
    lab_id: tableData.updateEquipmentInfo.lab_id,
    thumbnail: tableData.updateEquipmentInfo.equipment_desc
  }).then(res => {
    //console.log(res);
    if (res.data.code === 200){
      ElMessage.success(res.data.msg);
      tableData.dialogEditVisible = false;
      getData();
    }else {
      ElMessage.error(res.data.msg);
      tableData.dialogEditVisible = false;
      getData();
    }
  })
}

const deleteData = (row) => {
  ElMessageBox.confirm(
      '您确定要删除吗？',
      '警告',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }
  ).then(()=>{
    //console.log(toRaw(row.row.simulationEquipmentId));
    const id = toRaw(row.row.simulationEquipmentId);
    axios.delete(`http://localhost:5173/api/SimulationEquipment/${id}`).then(res => {
      ElMessage.success("删除成功");
      getData();
      // if (res.code === 200){
      //   ElMessage.success({
      //     type: 'success',
      //     message: '删除成功',
      //   })
      // }
    })
  })
}

onMounted(() => {
  getData();
})

</script>

<style scoped>

</style>