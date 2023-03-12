<template>
  <div class="full">
    <header class="header">Demo</header>
    <main class="main">
      <aside class="aside pull-left" :style='{width: isPhone ? "auto" : "200px"}'>
        <el-menu default-active="/home/quill" router class="el-menu-vertical-demo" :collapse='!!isPhone'>
          <el-submenu index="/home">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">demo案例</span>
            </template>
            <el-menu-item index="/home/quill">Quill编辑器</el-menu-item>
          </el-submenu>

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
  .header {
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    background-color: darkseagreen;
  }

  .main {
    display: flex;
    height: calc(100% - 56px);
  }

  .aside {
    /* width: 200px; */
    height: 100%;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }

  .container {
    box-sizing: border-box;
    flex-grow: 1;
    /* margin-left: 200px; */
    height: 100%;
    padding: 24px;
  }
</style>