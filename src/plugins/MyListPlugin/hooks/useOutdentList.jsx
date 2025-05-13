import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $getSiblingCaret,
  COMMAND_PRIORITY_HIGH,
  KEY_TAB_COMMAND,
} from "lexical";
import { $isListItemNode } from "@lexical/list";

import { getSelectionData } from "../../../utils/getSelectionData";

const useOutdentList = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        const selection = $getSelection();

        const { parentNode } = getSelectionData(selection);

        if (e.shiftKey && $isListItemNode(parentNode)) {
          // FIX
          console.log($getSiblingCaret(parentNode, "next")?.getNodeAtCaret());
          console.log(
            $getSiblingCaret(parentNode, "next")
              ?.getAdjacentCaret()
              ?.getNodeAtCaret()
          );
          return true;
        } else {
          return false;
        }
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);
  return null;
};

export default useOutdentList;
