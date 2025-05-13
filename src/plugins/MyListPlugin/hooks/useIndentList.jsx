import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $getSiblingCaret,
  COMMAND_PRIORITY_HIGH,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
} from "lexical";
import { $isListItemNode } from "@lexical/list";

import { getSelectionData } from "../../../utils/getSelectionData";

const useIndentList = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        // IDEA: this only handles indent, end this and return false
        if (e.shiftKey) return false;

        let canPressTab = false;
        const selection = $getSelection();

        // REVIEW: must be listItem
        const { parentNode } = getSelectionData(selection);

        const prevSiblingNode = $getSiblingCaret(
          parentNode,
          "previous"
        )?.getNodeAtCaret();

        // FIX
        console.log("BULLET LIST INDENT", prevSiblingNode?.getType());

        if ($isListItemNode(parentNode)) {
          const currentParentIndent = parentNode.getIndent();
          const incrementedParentIndent = currentParentIndent + 1;

          if (
            prevSiblingNode &&
            prevSiblingNode.getIndent() >= parentNode.getIndent()
          ) {
            canPressTab = true;
          }

          if (canPressTab) {
            // REVIEW: maximum indentation
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

export default useIndentList;

// // TODO: deal with how indentation works with Paragraph node
// if ($isParagraphNode(parentNode)) {
//   const currentParentIndent = parentNode.getIndent();
//   const incrementedParentIndent = currentParentIndent + 1;

//   if (e.shiftKey) {
//     editor.update(() => {
//       editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
//     });

//     return true;
//   }

//   // IDEA: this logic will most likely have to fixed
//   if (
//     prevSiblingNode &&
//     prevSiblingNode.getIndent() >= parentNode.getIndent()
//   ) {
//     canPressTab = true;
//   }

//   if (canPressTab) {
//     if (incrementedParentIndent > 5) return true;

//     // REVIEW: editor.update() does not need to return a boolean
//     editor.update(() => {
//       editor.dispatchCommand(INDENT_CONTENT_COMMAND);
//     });

//     return true;
//   }
// }
