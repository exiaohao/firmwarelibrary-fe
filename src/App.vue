<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
      >
        <el-text class="mx-1" type="primary">固件库</el-text>
        <div class="flex-grow" />
        <el-menu-item index="0"><RouterLink to="/">固件查询</RouterLink></el-menu-item>
        <el-menu-item index="1"><RouterLink to="/login">用户登录</RouterLink></el-menu-item>
        <el-sub-menu index="2">
          <template #title>工具</template>
          <el-menu-item index="2-1">固件申请</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3"><RouterLink to="/about">关于</RouterLink></el-menu-item>
      </el-menu>
<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/login">Login</RouterLink>-->
<!--      </nav>-->
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
