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

import { getSelectionData } from "./utils/getSelectionData";

const SpacePlugin = () => {
  const [editor] = useLexicalComposerContext();

  // useEffect(() => {
  //   return editor.registerCommand(
  //     KEY_SPACE_COMMAND,
  //     (e) => {
  //       const selection = $getSelection();

  //       const { anchorOffset, parentNode, textContent } =
  //         getSelectionData(selection);

  //       if (
  //         textContent[0] === "-" &&
  //         anchorOffset === 1 &&
  //         $isParagraphNode(parentNode)
  //       ) {
  //         editor.update(() => {
  //           e.preventDefault();

  //           if (!$isParagraphNode(parentNode)) return false;

  //           const currentIndent = parentNode.getIndent();
  //           const listNode = $createListNode("bullet");
  //           const listItemNode = $createListItemNode();
  //           const textNode = $createTextNode();

  //           textNode.setTextContent(textContent.substring(1));
  //           listNode.append(listItemNode);
  //           listItemNode.append(textNode);

  //           parentNode.replace(listNode);
  //           listItemNode.setIndent(currentIndent);
  //           textNode.select(0, 0);

  //           return true;
  //         });
  //       }

  //       return false;
  //     },
  //     COMMAND_PRIORITY_EDITOR
  //   );
  // }, [editor]);

  return null;
};

export default SpacePlugin;
