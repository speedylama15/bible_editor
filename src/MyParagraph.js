import { ParagraphNode } from "lexical";

class MyParagraph extends ParagraphNode {
  constructor(key) {
    super(key);
  }

  static getType() {
    return "my-paragraph";
  }

  static clone(node) {
    return new MyParagraph(node.__key);
  }

  createDOM(config) {
    const dom = super.createDOM(config);

    // REVIEW: set the __indent value from getIndent as the value of the attribute
    dom.setAttribute("data-indent", this.getIndent());

    return dom;
  }

  updateDOM(prevNode, dom) {
    if (prevNode.__indent !== this.__indent) {
      dom.setAttribute("data-indent", this.getIndent());
    }

    // REVIEW: Return false to indicate we don't need to recreate the DOM element. The default DOM structure of a paragraph hasn't changed
    return false;
  }
}

export default MyParagraph;
