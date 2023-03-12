/**
 * @description quill编辑器文本计数插件
 */
class Counter {
  constructor (quill, options) {
    this.quill = quill
    this.options = options
    this.quill.container.setAttribute('data-count', 0)
    this.initEvent()
  }

  initEvent () {
    this.quill.on('text-change', this.handleTextChange.bind(this))
  }

  handleTextChange () {
    let count = this.quill.getLength() - 1
    // let text = this.quill.getText()
    // let count = text.length - 1
    this.quill.container.setAttribute('data-count', count)
  }
}

export default Counter