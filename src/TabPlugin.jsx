import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isParagraphNode,
  $isTextNode,
  COMMAND_PRIORITY_HIGH,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

import {
  DATA_ATTRIBUTE_COMMAND,
  useDataAttributeCommand,
} from "./useDataAttributeCommand";

const TabPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useDataAttributeCommand();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        // IDEA: use this variable
        // let canPressTab = false;
        const selection = $getSelection();
        const anchorNode = selection.anchor.getNode();
        const parentNode = $isTextNode(anchorNode)
          ? anchorNode.getParent()
          : anchorNode;

        // TODO: deal with how indentation works with Paragraph node
        if ($isParagraphNode(parentNode)) {
          const currentParentIndent = parentNode.getIndent();
          const incrementedParentIndent = currentParentIndent + 1;
          const decrementedParentIndent = currentParentIndent - 1;

          if (incrementedParentIndent > 5) return true;

          if (e.shiftKey) {
            editor.update(() => {
              editor.dispatchCommand(DATA_ATTRIBUTE_COMMAND, {
                key: parentNode.getKey(),
                attributeValue: decrementedParentIndent,
              });

              parentNode.setIndent(decrementedParentIndent);
            });

            return true;
          } else {
            editor.update(() => {
              editor.dispatchCommand(DATA_ATTRIBUTE_COMMAND, {
                key: parentNode.getKey(),
                attributeValue: incrementedParentIndent,
              });

              parentNode.setIndent(incrementedParentIndent);
            });

            return true;
          }
        }

        if (e.shiftKey) {
          // REVIEW: no need to return true or false within an editor.update() method
          editor.update(() => {
            editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
          });

          return true;
        } else {
          editor.update(() => {
            editor.dispatchCommand(INDENT_CONTENT_COMMAND);
          });

          return true;
        }
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
};

export default TabPlugin;
