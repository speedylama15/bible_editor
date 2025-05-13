import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createTextNode,
  $getSelection,
  $isParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  KEY_SPACE_COMMAND,
} from "lexical";
import { $createListItemNode, $createListNode } from "@lexical/list";

import { getSelectionData } from "../../../utils/getSelectionData";

const useCreateList = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_SPACE_COMMAND,
      (e) => {
        const selection = $getSelection();

        // REVIEW: checkup
        const { anchorOffset, parentNode, textContent } =
          getSelectionData(selection);

        if (
          textContent[0] === "-" &&
          anchorOffset === 1 &&
          $isParagraphNode(parentNode)
        ) {
          e.preventDefault();

          if (!$isParagraphNode(parentNode)) return false;

          // REVIEW: this is the only case where a bullet list will get created via typing
          editor.update(() => {
            // IDEA: this whole section within this block may be recycled for other types of list
            const currentIndent = parentNode.getIndent();
            const listNode = $createListNode("bullet");
            const listItemNode = $createListItemNode();
            const textNode = $createTextNode();

            // REVIEW: persist the text
            textNode.setTextContent(textContent.substring(1));
            listNode.append(listItemNode);
            listItemNode.append(textNode);

            parentNode.replace(listNode);
            // REVIEW: indent
            listItemNode.setIndent(currentIndent);
            // REVIEW: selection must be maintained
            textNode.select(0, 0);
          });

          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
};

export default useCreateList;
