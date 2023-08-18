<template>
  <el-button :icon="Download" type="success" @click="tableExport">导出设备信息到Excel</el-button>
  <el-button :icon="Delete" type="danger" @click="batchDeletetion">删除已选中设备</el-button>

  <div class="table-container" style="padding-top: 20px">
    <el-table
        highlight-current-row
        fit
        :data="tableData.List"
        style="width: 100%;"
        id="el-table"
        stripe="true"
        ref="tableRef,multipleTableRef"
        @selection-change="handleSelection"
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
      <el-table-column align="center" min-width="100%" prop="equipmentDesc" label="备注"/>
      <el-table-column align="center" min-width="200%" prop="createTime" label="添加时间" :formatter="formatDate"/>
      <el-table-column align="center" min-width="200%" prop="updateTime" label="更新时间" :formatter="formatDate"/>
      <el-table-column width="150%" label="操作" fixed="right" align="center">
        <template #default="scope">
          <el-button type="success" size="small" @click="tableData.dialogEditVisible = true && saveId(scope)">编辑</el-button>
          <!--          <el-button type="success" size="small" @click="tableData.dialogInfoVisible = true">详细信息</el-button>-->
          <el-button type="danger" size="small" @click="deleteData(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


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
<!--  <el-dialog v-model="tableData.dialogInfoVisible" title="设备详细信息" width="500px">-->
<!--  </el-dialog>-->

  <!--导出信息对话框-->
  <el-dialog v-model="exportTable.dialog" title="导出数据到表格">
    <el-input v-model="exportTable.fileName" placeholder="请输入导出文件名"/>
    <el-alert type="info" title="默认文件名为（导出测试）" :closable="false" style="padding-top: 10px"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="exportTable.dialog = false">取消</el-button>
        <el-button type="primary" @click="save">导出</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import {reactive,ref,toRefs,nextTick,getCurrentInstance,onMounted,toRaw,inject} from "vue";
import axios from "axios";
import {ElMessage,ElMessageBox} from "element-plus";
import {Download,Delete} from "@element-plus/icons-vue";
import {useSearchStore} from "@/stores";
import FileSaver from 'file-saver'
import * as XSLX from 'xlsx'


const tableData = reactive({
  List: [],
  /**
   * @typedef {Object} InsertInfo
   * @property {string} equipment_name
   * @property {string} equipment_number
   * @property {number} equipment_type
   * @property {string} system_software
   * @property {string} system_version
   * @property {string} equipment_supplier
   * @property {number} equipment_status
   * @property {string} equipment_purpose
   * @property {number} lab_id
   * @property {string} equipment_desc
   */

  /**
   * @type {updateEquipmentInfo}
   */
  updateEquipmentInfo: {
    equipment_name: '',
    equipment_number: '',
    equipment_type: 1,
    system_software: '',
    system_version: '',
    equipment_supplier: '',
    equipment_status: 0,
    equipment_purpose: '',
    lab_id: 0,
    equipment_desc: '',
  },
  dialogEditVisible: false,
  // dialogInfoVisible: false,
});

const exportTable = reactive({
  List: [],
  dialog: false,//对话框显示与否
  fileName: ''//自定义文件名
});


//用于访问组件实例
const { proxy } = getCurrentInstance();

const { List,dialog,fileName } = toRefs(exportTable);

//表格导出到excel
const tableExport = () => {
  const selectList = proxy?.$refs.tableRef.getSelectionRows();
  if (selectList){
    exportTable.List = proxy?.$refs.tableRef.getSelectionRows();
  }
  exportTable.dialog = true;
}

const save = () => {
  nextTick(() => {
    let filename = '';
    const xlsxParam = { raw:true }
    const elTable = XSLX.utils.table_to_book(document.getElementById('el-table'),xlsxParam);
    if (exportTable.fileName === ''){
      filename = '导出测试.xlsx'
    }else {
      filename = exportTable.fileName += '.xlsx'
    }
    const wbout = XSLX.write(elTable,{bookType: 'xlsx', bookSST: true, type: 'array'});
    try {
      FileSaver.saveAs(new Blob([wbout],{type: 'application/octet-stream'}),filename);
    }catch (e) {
      if (typeof console !== 'undefined'){
        console.log(e,wbout);
      }
    }
    return wbout
  })
}

//批量删除
let batchDel = [];
const multipleTableRef = ref('');
//获取选中列的id
const handleSelection = (val) => {
  batchDel = [];
  val.forEach(item => {
    batchDel.push(item.simulationEquipmentId);
    //console.log(item.simulationEquipmentId);
  })
}

const batchDeletetion = () => {
  ElMessageBox.confirm(
      "此操作将会批量删除您选中的数据，是否继续？",
      "警告",
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }
  ).then(() => {
    //请求接口
    axios.post('http://localhost:5173/api/SimulationEquipment/BulkDelete',batchDel).then(res => {
      if (res.data.code === 200){
        ElMessage.success(res.data.msg);
        getPageData();
      }else {
        ElMessage.error("删除失败");
      }
    })
  })
}



const store = toRefs(useSearchStore());
tableData.List = store.searchResult;


const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

const handleSizeChange = (size) => {
  pageSize.value = size;
  //console.log(pageSize.value);
  axios.post('http://localhost:5173/api/SimulationEquipment/page',{
    page: currentPage.value,
    pageSize: pageSize.value
  }).then(res => {
    //console.log(res);
    tableData.List = res.data.data.records;
    total.value = res.data.data.total;
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
    total.value = res.data.data.total;
  })
}

const listLoading = ref(true);

const refresh = inject("reload");

const formatDate = (row,column,cellValue,index) => {
  let s = new Date(cellValue).toLocaleString();
  return s;
}

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
    softwareSystem: tableData.updateEquipmentInfo.system_software,
    versionNumber: tableData.updateEquipmentInfo.system_version,
    supplier: tableData.updateEquipmentInfo.equipment_supplier,
    status: tableData.updateEquipmentInfo.equipment_status,
    purpose: tableData.updateEquipmentInfo.equipment_purpose,
    labId: tableData.updateEquipmentInfo.lab_id,
    equipmentDesc: tableData.updateEquipmentInfo.equipment_desc
  }).then(res => {
    //console.log(res);
    if (res.data.code === 200){
      ElMessage.success(res.data.msg);
      tableData.dialogEditVisible = false;
      getPageData();
    }else {
      ElMessage.error(res.data.msg);
      tableData.dialogEditVisible = false;
      getPageData();
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
      getPageData();
      // if (res.code === 200){
      //   ElMessage.success({
      //     type: 'success',
      //     message: '删除成功',
      //   })
      // }
    })
  })
}

const getPageData = () => {
  axios.post('http://localhost:5173/api/SimulationEquipment/page',{
    page: currentPage.value,
    pageSize: pageSize.value
  }).then(res => {
    //console.log(res.data.data.records);
    tableData.List = res.data.data.records;
    total.value = res.data.data.total;
  });
};

onMounted(() => {
  getPageData();
})

</script>

<style scoped>

</style>