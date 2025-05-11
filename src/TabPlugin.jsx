import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $getSiblingCaret,
  $isParagraphNode,
  $isTextNode,
  COMMAND_PRIORITY_HIGH,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import { $isListItemNode } from "@lexical/list";

const TabPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        let canPressTab = false;
        const selection = $getSelection();
        const anchorNode = selection.anchor.getNode();
        const parentNode = $isTextNode(anchorNode)
          ? anchorNode.getParent()
          : anchorNode;
        const prevSiblingNode = $getSiblingCaret(
          parentNode,
          "previous"
        )?.getNodeAtCaret();

        // TODO: deal with how indentation works with Paragraph node
        if ($isParagraphNode(parentNode)) {
          const currentParentIndent = parentNode.getIndent();
          const incrementedParentIndent = currentParentIndent + 1;

          if (e.shiftKey) {
            editor.update(() => {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
            });

            return true;
          }

          // IDEA: this logic will most likely have to fixed
          if (
            prevSiblingNode &&
            prevSiblingNode.getIndent() >= parentNode.getIndent()
          ) {
            canPressTab = true;
          }

          if (canPressTab) {
            if (incrementedParentIndent > 5) return true;

            // REVIEW: editor.update() does not need to return a boolean
            editor.update(() => {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND);
            });

            return true;
          }
        }

        // IDEA: the logic is identical
        // IDEA: we'll have to see if the logic needs any change
        if ($isListItemNode(parentNode)) {
          const currentParentIndent = parentNode.getIndent();
          const incrementedParentIndent = currentParentIndent + 1;

          if (e.shiftKey) {
            editor.update(() => {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
            });

            return true;
          }

          if (
            prevSiblingNode &&
            prevSiblingNode.getIndent() >= parentNode.getIndent()
          ) {
            canPressTab = true;
          }

          if (canPressTab) {
            if (incrementedParentIndent > 5) return true;

            editor.update(() => {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND);
            });

            return true;
          }
        }
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
};

export default TabPlugin;
