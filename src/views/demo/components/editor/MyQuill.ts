import Quill from '../../../../plugins/quill/core';
import './styles/public.css';
import './fonts/iconfont.css';
import Counter from './plugins/counter.js';

// 默认配置
const DEFAULT_OPTIONS = {
	modules: {
		// counter: true,
	},
	placeholder: '请输入文本...',
	theme: 'snow'
};

const FONT_FAMILY = [
	'宋体',
	'黑体',
	'微软雅黑',
	'楷体',
	'仿宋',
	'Arial',
	'苹方',
];
const FONT_SIZE = ['12px', '14px', '16px', '18px', '24px', '32px'];
const LINE_HEIGHT = ['1', '1.5', '1.75', '2', '3', '4'];
const FONT_COLOR = ['#000', '#666', '#888', '#aaa'];

class MyQuill {
	quill: Quill;
	constructor(el, options = {}) {
		this.init();
		// 合并编辑器属性
		let config = {
			modules: {
			}
		};
		Object.assign(config, DEFAULT_OPTIONS, options);
		// config.modules.toolbar = {
		// 	container: [
		// 		'undo',
		// 		'redo',
		// 		{ font: FONT_FAMILY },
		// 		{ size: FONT_SIZE },
		// 		// { lineheight: LINE_HEIGHT },
		// 		{ color: FONT_COLOR },
		// 		'bold',
		// 		'italic',
		// 		'underline',
		// 		'strike',
		// 		'link',
		// 		{ align: [] },
		// 	],
		// 	handlers: {
		// 		// lineheight: this.handleLineHeight.bind(this),WW
		// 		undo: this.handleUndo.bind(this),
		// 		redo: this.handleRedo.bind(this),
		// 	}
		// };
		debugger
		this.quill = new Quill(el, config);
		this.quill.on('text-change', function () {
			console.log(arguments);
		});
	}
	// 初始化编辑器配置
	init() {
		// 字体
		// Quill.imports['attributors/style/font'].whitelist = FONT_FAMILY;
		// Quill.register(Quill.imports['attributors/style/font']);

		// 字体大小
		// Quill.imports['attributors/style/size'].whitelist = FONT_SIZE;
		// Quill.register(Quill.imports['attributors/style/size']);

		Quill.register('modules/counter', Counter);
	}
	// 行高
	handleLineHeight(value) {
		if (value) {
			this.quill.format('lineHeight', value);
		} else {
			console.log(value);
		}
	}
	// 撤销
	handleUndo() {
		this.quill.history.undo();
	}
	// 回退
	handleRedo() {
		this.quill.history.redo();
	}
}

export default MyQuill;
