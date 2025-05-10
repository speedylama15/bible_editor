import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getNodeByKey,
  $getSelection,
  $isParagraphNode,
  $isTextNode,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

const TabPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        editor.update(() => {
          e.preventDefault();

          const selection = $getSelection();
          const anchorNode = selection.anchor.getNode();
          const parentNode = $isTextNode(anchorNode)
            ? anchorNode.getParent()
            : anchorNode;

          if ($isParagraphNode(parentNode)) {
            const currentParentIndent = parentNode.getIndent();
            const updatedParentIndent = currentParentIndent + 1;

            editor.dispatchCommand(DATA_ATTRIBUTE_COMMAND, {
              key: parentNode.getKey(),
              attributeValue: updatedParentIndent,
            });

            parentNode.setIndent(updatedParentIndent);

            return true;
          }

          if (e.shiftKey) {
            editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);

            return true;
          } else {
            editor.dispatchCommand(INDENT_CONTENT_COMMAND);

            return true;
          }
        });
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
};

export default TabPlugin;
