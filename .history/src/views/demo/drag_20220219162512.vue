<template>
  <div class="drag-demo">
    <div class="title">拖拽交互</div>
    <div class="drag-container">
      <div class="left-side pull-left">
        <el-button
          v-for="element in addList"
          :key='element'
          class="demo-btn"
          size='small'
          @dragstart.native='handleDragstart(...arguments, element)'
          draggable="true"
        >{{element}}</el-button>
      </div>
      <div class="main-container"
        ref='mainContainer'
      >
      <draggable>
        <div class="drag-card" v-for="element in list" :key='element'>
          <div class="card-container">模块：{{element}}</div>
        </div>
      </draggable>
      <!-- @dragover='handleDragover'
      @drop='handleDrop'
      @dragleave='handleDragleave' -->
        <!-- <div class="drag-card"
          :class='{"show-line-before": element === activeIndex && isDragBefore, "show-line-after": element === activeIndex && !isDragBefore}'
          v-for="element in list"
          :data-element='element'
          :key="element"
          @dragenter='handleDragenter'
          @dragstart='handleCardDragstart'
          draggable="true"
        >
          <div class="card-header">
            <button class="pull-right" @click='removeItem(element)'>删除</button>
            <button class="drag-button pull-right">排序</button>
          </div>
          <div class="card-container">模块：{{element}}</div>
        </div> -->
      </div>
    </div>
    
  </div>
</template>

<script>
  import Draggable from './components/draggable/index.vue'

  export default {
    name: 'drag',
    data () {
      return {
        list: [ 1, 2, 3 ],
        addList: [ 4, 5, 6 ],
        activeIndex: -1,
        isDragBefore: false
      }
    },
    components: {
      Draggable
    },
    methods: {
      handleDragstart (e, value) {
        e.dataTransfer.setData('text/plain', JSON.stringify({
          fun: 'handleAdd',
          payload: value
        }))
      },
      removeItem (item) {
        let index = this.list.findIndex(vv => vv === item)
        if (index === -1) {
          throw new Error('未找到删除项信息')
        }
        this.list.splice(index, 1)
      },
      /**
       * @description 手动计算拖拽排序按钮位置
       * */
      handleCardDragstart (e) {
        // e.preventDefault()
        let target = e.target
        let element = target.dataset.element
        let param = {fun: 'handleSort', payload: element}
        console.log(JSON.stringify(param))
        e.dataTransfer.setData('text/plain', JSON.stringify(param))
      },
      /**
       * @description dragenter事件
       * 1. 拖拽在模块上半部分，默认添加至当前模块前面
       * 2. 拖拽在模块下半部分，默认添加至当前模块后面
       **/
      handleDragenter (e) {
        e.preventDefault()
        let target = e.currentTarget
        // 鼠标位置
        let mousePosition = {
          left: e.clientX,
          top: e.clientY
        }
        // 模块相对于body的偏移量
        let blockPosition = this.getPosition(target)
        let blockHeight = target.clientHeight
        let middlePosition = blockPosition.top + blockHeight / 2
        this.isDragBefore = mousePosition.top < middlePosition
        // 当前活动index
        let activeIndex = target.dataset.element
        if (!activeIndex) return
        this.activeIndex = Number(activeIndex)
        console.log(this.activeIndex)
      },
      handleDragleave (e) {
        console.log('dragleave')
        // this.activeIndex = -1
      },
      handleDragover (e) { // 阻止默认事件才能drop
        e.preventDefault()
      },
      handleDrop (e) {
        let data = e.dataTransfer.getData('text/plain')
        if (!data) return
        let param = JSON.parse(data)
        this[param.fun](e, param.payload)
        this.activeIndex = -1
      },
      handleAdd (e, data) {
        let target = e.currentTarget
        let index = this.list.findIndex(vv => vv === this.activeIndex)
        // 确定是放置位置
        let spliceIndex = this.isDragBefore ? index : index + 1
        this.list.splice(spliceIndex, 0, Number(data))
      },
      handleSort (e, data) {
        let originIndex = this.list.findIndex(vv => vv === Number(data))
        this.list.splice(originIndex, 1)
        let index = this.list.findIndex(vv => vv === this.activeIndex)
        // 确定是放置位置
        let spliceIndex = this.isDragBefore ? index : index + 1
        this.list.splice(spliceIndex, 0, Number(data))
      },
      getPosition (el, offsetParent = document.body) { // 获取元素的相对偏移量
        let position = {
          left: 0,
          top: 0
        }
        let currentNode = el
        let maxCall = 0
        while (currentNode && currentNode !== offsetParent) {
          position.left += currentNode.offsetLeft
          position.top += currentNode.offsetTop
          currentNode = currentNode.offsetParent
          maxCall++
          if (currentNode && currentNode.contains(offsetParent)) break
          if (maxCall > 30) {
            position = {
              left: 0,
              top: 0
            }
            break
          }
        }
        return position
      }
    }
  }
</script>

<style scoped>
.drag-demo{
  position: relative;
  height: 100%;
}
.drag-card{
  position: relative;
  margin: 24px;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: snow;
  transition: all .5s ease-in-out;
}
.show-line-after::after{
  position: absolute;
  content: '';
  bottom: -18px;
  left: 0;
  right: 0;
  height: 10px;
  border-radius: 5px;
  background-color: skyblue;
}
.show-line-before::before{
  position: absolute;
  content: '';
  top: -18px;
  left: 0;
  right: 0;
  height: 10px;
  border-radius: 5px;
  background-color: skyblue;
}
.card-header{
  height: 36px;
  line-height: 36px;
}
.left-side{
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  padding: 16px;
  margin: 0 -16px;
}
.demo-btn{
  margin-bottom: 16px;
}
.main-container{
  position: absolute;
  top: 32px;
  bottom: 0;
  left: 200px;
  right: 0;
  overflow: auto;
}
</style>