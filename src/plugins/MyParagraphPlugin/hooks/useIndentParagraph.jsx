import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $isParagraphNode,
  COMMAND_PRIORITY_HIGH,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
} from "lexical";
import { getSelectionData } from "../../../utils/getSelectionData";

const useIndentParagraph = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        const { parentNode: paragraphNode } = getSelectionData();

        if (!$isParagraphNode(paragraphNode)) return false;

        editor.update(() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        });

        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  });
  return null;
};

export default useIndentParagraph;
