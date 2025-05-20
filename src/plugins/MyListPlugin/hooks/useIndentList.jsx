import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSiblingCaret,
  COMMAND_PRIORITY_HIGH,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
} from "lexical";

import { getSelectionData } from "../../../utils/getSelectionData";
import { getListItemNodeIndex } from "../../../utils/getListItemNodeIndex";
import { $isListItemNode } from "@lexical/list";

const useIndentList = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        if (e.shiftKey) return false;

        const { parentNode: listItemNode, grandparentNode: listNode } =
          getSelectionData();

        if (!$isListItemNode(listItemNode)) return false;

        const listItemNodeIndex = getListItemNodeIndex(listNode, listItemNode);
        const origin = listItemNodeIndex === 0 ? listNode : listItemNode;
        const prevSiblingCaret = $getSiblingCaret(origin, "previous");
        const prevSiblingNode = prevSiblingCaret.getNodeAtCaret();
        const prevSiblingNodeIndent = prevSiblingNode?.getIndent();

        console.log(prevSiblingNodeIndent);

        if (
          prevSiblingNode &&
          prevSiblingNodeIndent < 5 &&
          prevSiblingNodeIndent >= listItemNode.getIndent()
        ) {
          editor.update(() => {
            editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
          });
        } else {
          return false;
        }

        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
};

export default useIndentList;
