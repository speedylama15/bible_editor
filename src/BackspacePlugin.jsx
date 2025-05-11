import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $isTextNode,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { $isListItemNode } from "@lexical/list";

const BackspacePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (e) => {
        const selection = $getSelection();
        const anchorNode = selection.anchor.getNode();
        const anchorOffset = selection.anchor.offset;
        const parentNode = $isTextNode(anchorNode)
          ? anchorNode.getParent()
          : anchorNode;

        if (
          $isListItemNode(parentNode) &&
          anchorOffset === 0 &&
          selection.isCollapsed()
        ) {
          const currentIndent = parentNode.getIndent();

          e.preventDefault();

          const paragraphNode = $createParagraphNode();
          const textNode = $createTextNode();
          const textContent = anchorNode.getTextContent();
          textNode.setTextContent(textContent);
          paragraphNode.setIndent(currentIndent);
          paragraphNode.append(textNode);
          parentNode.replace(paragraphNode);
          paragraphNode.select(0, 0);

          return true;
        }
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
};

export default BackspacePlugin;
