import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $isTextNode,
  COMMAND_PRIORITY_HIGH,
  KEY_ENTER_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { $isListItemNode } from "@lexical/list";

const EnterPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (e) => {
        const selection = $getSelection();
        const anchorNode = selection.anchor.getNode();
        const parentNode = $isTextNode(anchorNode)
          ? anchorNode.getParent()
          : anchorNode;

        if ($isListItemNode(parentNode)) {
          e.preventDefault();

          const textContent = anchorNode.getTextContent();

          if (textContent) {
            return false;
          } else {
            const currentIndent = parentNode.getIndent();

            if (currentIndent === 0) {
              const paragraphNode = $createParagraphNode();
              const textNode = $createTextNode();
              paragraphNode.append(textNode);
              textNode.select(0, 0);

              parentNode.replace(paragraphNode);
            } else {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            }

            return true;
          }
        }
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
};

export default EnterPlugin;
