<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left-container">
          <div class="logo">
            <el-image :src="data.logoUrl" :fit="none"></el-image>
          </div>
          <div class="banner">
            <el-carousel height="auto" arrow="never">
              <el-carousel-item style="height: auto" v-for="item in data.carouselImg" :key="item">
                <el-image :src="item.url" :fit="fill"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="8">
        <div class="form-container">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
              <component :is="Component"></component>
            </transition>
          </router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import logo from '@/assets/img/logo-mini.png';
import {reactive,ref} from "vue";

const data = reactive({
  logoUrl: logo,
  carouselImg: [
    {url: new URL('@/assets/img/carousel01.jpeg',import.meta.url).href},
    {url: new URL('@/assets/img/carousel02.jpeg',import.meta.url).href},
  ]
})

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url("@/assets/img/bigbg.jpg") no-repeat;
}

.el-row {
  border-radius: 5px;
  border-shadow: 0 2px 10px 0 rgb(57 106 255 / 5%);
  width: 1000px;
  height: 600px;
  background-color: #fff;
}

.left-container{
  width: 500px;
  height: 400px;
  overflow: hidden;
  margin-top: 100px;
}

.form-container div::after {
  clear: both;
}

.form-container{
  width: 400px;
  height: 400px;
}

.logo {
  height: 50px;
}

.banner {
  margin-top: 60px;
  height: 50px;
}

.el-carousel__item h1 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>