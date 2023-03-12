<template>
  <div class="editor-container">
    <div class="title">文本编辑器</div>
    <div id="common-editor"></div>
  </div>
</template>

<script>
  import MyQuill from './components/editor/MyQuill.js'

  export default {
    name: 'quill',
    data () {
      return {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.quillInstance = new MyQuill('#common-editor', {
          theme: 'snow'
        })
      }
    }
  }
</script>

<style scoped>
  .title{
    font-size: 18px;
    height: 36px;
    line-height: 36px;
  }
  #common-editor{
    height: 300px;
    border: 1px solid #ccc;
    border-top: 0;
  }
</style>