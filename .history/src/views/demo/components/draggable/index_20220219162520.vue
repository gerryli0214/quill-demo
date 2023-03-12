<template>
<div class="draggable-container">
  <slot></slot>
</div>
</template>

<script>
  export default {
    name: 'draggable',
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      }
    },
    mounted () {
      console.log(this.$el.children)
      debugger
    }
  }
</script>

<style scoped>
  .draggable-container{
    height: 100%;
  }
</style>