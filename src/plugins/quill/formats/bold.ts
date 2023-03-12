import Inline from '../blots/inline';

// @ts-ignore TODO: Inline.tagName should be string[] | string
class Bold extends Inline {
  static blotName = 'bold';
  static tagName = ['STRONG', 'B'];

  static create() {
    // @ts-ignore
    return super.create();
  }

  static formats() {
    return true;
  }

  optimize(context) {
    super.optimize(context);
    if (this.domNode.tagName !== this.statics.tagName[0]) {
      this.replaceWith(this.statics.blotName);
    }
  }
}

export default Bold;
