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

const SpacePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_SPACE_COMMAND,
      (e) => {
        const selection = $getSelection();
        const anchor = selection.anchor;
        const anchorOffset = anchor.offset;
        const anchorNode = anchor.getNode();
        const textContent = anchorNode.getTextContent();

        if (
          textContent[0] === "-" &&
          anchorOffset === 1 &&
          $isParagraphNode(anchorNode.getParent())
        ) {
          editor.update(() => {
            e.preventDefault();

            const paragraphNode = anchorNode.getParent();

            if (!$isParagraphNode(paragraphNode)) return false;

            const listNode = $createListNode("bullet");
            const listItemNode = $createListItemNode();
            const textNode = $createTextNode();

            textNode.setTextContent(textContent.substring(1));
            listNode.append(listItemNode);
            listItemNode.append(textNode);

            paragraphNode.replace(listNode);
            textNode.select(0, 0);

            return true;
          });
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
};

export default SpacePlugin;
