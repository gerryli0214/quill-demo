<template>
  <div class="full">
    <header class="header">Demo</header>
    <main class="main">
      <aside class="aside pull-left" :style='{width: isPhone ? "auto" : "200px"}'>
        <el-menu
          default-active="/home/quill"
          router
          class="el-menu-vertical-demo"
          :collapse='!!isPhone'
        >
          <el-submenu index='/home/designer'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">demo案例</span>
            </template>
            <el-menu-item index="/home/quill">Quill编辑器</el-menu-item>
            <el-menu-item index="/home/drag">拖拽交互</el-menu-item>
            <el-menu-item index="/home/flexible">移动端适配</el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/designer">
            <i class="el-icon-menu"></i>
            <span slot="title">问卷设计器</span>
          </el-menu-item>
          <el-menu-item index="/home/preview">
            <i class="el-icon-document"></i>
            <span slot="title">问卷预览</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        isPhone: false
      }
    },
    created () {
      this.checkDevice()
      window.onresize = this.checkDevice
    },
    methods: {
      checkDevice () {
        let isAndroid = window.navigator.appVersion.match(/android/gi)
        let isIPhone = window.navigator.appVersion.match(/iphone/gi)
        this.isPhone = isAndroid || isIPhone
      }
    }
  }
</script>

<style scoped>
.header{
  height: 56px;
  line-height: 56px;
  padding: 0 24px;
  background-color: darkseagreen;
}
.main{
  display: flex;
  height: calc(100% - 56px);
}
.aside{
  /* width: 200px; */
  height: 100%;
}
.el-menu-vertical-demo{
  height: 100%;
}
.container{
  box-sizing: border-box;
  flex-grow: 1;
  /* margin-left: 200px; */
  height: 100%;
  padding: 24px;
}
</style>