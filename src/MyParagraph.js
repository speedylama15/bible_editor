import { ParagraphNode } from "lexical";

class MyParagraph extends ParagraphNode {
  __customIndent;

  constructor(customIndent = 0, key) {
    super(key);

    this.__customIndent = customIndent;
  }

  static getType() {
    return "my-paragraph";
  }

  static clone(node) {
    return new MyParagraph(node.__customIndent, node.__key);
  }

  createDOM(config) {
    const dom = super.createDOM(config);

    dom.setAttribute("data-custom-indent", this.__customIndent);
    // FIX: keeping this just in case
    // REVIEW: this is not doing anything because I am not using INDENT_CONTENT_COMMAND
    // REVIEW: instead I am using my custom command to update the customIndent value and setAttribute
    // REVIEW: then the change occurs via CSS
    // dom.setAttribute("data-indent", this.getIndent());

    return dom;
  }

  updateDOM(prevNode, dom) {
    if (prevNode.__customIndent !== this.__customIndent) {
      dom.setAttribute("data-custom-indent", this.__customIndent);
      //   dom.setAttribute("data-indent", this.getIndent());
    }

    // REVIEW: Return false to indicate we don't need to recreate the DOM element. The default DOM structure of a paragraph hasn't changed
    return false;
  }

  getCustomIndent() {
    const self = this.getLatest();

    return self.__customIndent;
  }

  setCustomIndent(value) {
    const self = this.getWritable();

    self.__customIndent = value;

    return self;
  }
}

export default MyParagraph;
