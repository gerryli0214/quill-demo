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
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value1"
        :editable="false"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-checkbox-group 
      v-model="checkedCities"
      :min="1"
      :max="2">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    <el-input pattern="[0-9]*" v-model="input" placeholder="请输入内容"></el-input>
    <el-input-number  v-model="num" :controls="false" :min="1" :max="10"></el-input-number>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1"></el-slider>
    </div>
    <input type="number" pattern="[0-9]*" maxlength="11"/>
  </div>
</template>

<script>
  import Home from './views/Home.vue'
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    name: 'app',
    components: { Home },
    data () {
      return {
        checkedCities: [],
        radio: '',
        input: '',
        num: 1,
        cities: cityOptions,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1: '',
      }
    }
  }
</script>