<template>
  <div id="app">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import Home from './views/Home.vue'
  export default {
    name: 'app',
    components: { Home },
    data () {
      return {
        
      }
    }
  }
</script>