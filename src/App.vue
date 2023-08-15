<template>
  <el-config-provider :locale="local">
    <router-view/>
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import {defineComponent} from "vue";

export default defineComponent({
  setup() {
    let local = zhCn
    return {
      local
    }
  }
})

</script>

<style scoped>

</style>