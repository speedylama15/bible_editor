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

        const {
          anchorOffset,
          parentNode: paragraphNode,
          textContent,
        } = getSelectionData(selection);

        if (!$isParagraphNode(paragraphNode)) return false;

        if (
          textContent[0] === "-" &&
          anchorOffset === 1 &&
          $isParagraphNode(paragraphNode)
        ) {
          e.preventDefault();

          editor.update(() => {
            const currentIndent = paragraphNode.getIndent();
            const listNode = $createListNode("bullet");
            const listItemNode = $createListItemNode();
            const textNode = $createTextNode(textContent.substring(1));

            listItemNode.append(textNode);
            listNode.append(listItemNode);

            paragraphNode.replace(listNode);
            listItemNode.setIndent(currentIndent);
            textNode.select(0, 0);
          });

          return true;
        }

        const textContentBeforeCaret = textContent.substring(0, anchorOffset);
        const canCreateNumberedList =
          textContentBeforeCaret.match(/^(\d+)\.(\s*)$/);

        if (canCreateNumberedList) {
          e.preventDefault();

          const textBeforeCaret = canCreateNumberedList[0];

          editor.update(() => {
            const currentIndent = paragraphNode.getIndent();
            const listNode = $createListNode(
              "number",
              parseInt(textBeforeCaret)
            );
            const listItemNode = $createListItemNode();
            const textNode = $createTextNode(
              textContent.substring(textBeforeCaret.length)
            );

            listItemNode.append(textNode);
            listNode.append(listItemNode);

            // IDEA: questionable
            paragraphNode.replace(listNode);
            listItemNode.setIndent(currentIndent);
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
