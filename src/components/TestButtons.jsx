import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import "./TestButtons.css";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
} from "lexical";
import {
  $createListItemNode,
  $createListNode,
  $isListItemNode,
  $isListNode,
} from "@lexical/list";

const TestButtons = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {}, [editor]);

  const handleGetMetadata = () => {
    editor.read(() => {
      const selection = $getSelection();

      console.log({
        isRangeSelection: $isRangeSelection(),
        isCollapsed: selection.isCollapsed(),
        anchor: selection?.anchor.offset,
        focus: selection?.focus.offset,
      });
    });
  };

  const handleGetType = () => {
    editor.read(() => {
      const selection = $getSelection();

      const anchorNode = selection.anchor.getNode();
      const parentNode = $isTextNode(anchorNode)
        ? anchorNode.getParent()
        : anchorNode;
      const listNode = $isListItemNode(parentNode)
        ? parentNode.getParent()
        : null;

      console.log({
        anchorType: anchorNode.getType(),
        parentType: parentNode.getType(),
        listType: listNode.getListType(),
      });
    });
  };

  const handleGetIndent = () => {
    editor.read(() => {
      const selection = $getSelection();
      const anchorNode = selection.anchor.getNode();
      const parentNode = $isTextNode(anchorNode)
        ? anchorNode.getParent()
        : anchorNode;

      if ($isListItemNode(parentNode)) {
        console.log(parentNode.getIndent());
      }
    });
  };

  const handleOnClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      const anchorNode = selection?.anchor.getNode();
      const immediateListItemNode = $isTextNode(anchorNode)
        ? anchorNode.getParent()
        : anchorNode;
      const parentListNode = $isListItemNode(immediateListItemNode)
        ? immediateListItemNode.getParent()
        : null;
      const nestedParentListItemNode = $isListNode(parentListNode)
        ? parentListNode.getParent()
        : null;

      if (nestedParentListItemNode) {
        const parentListItemNode = $createListItemNode();
        const listNode = $createListNode("number");
        const listItemNode = $createListItemNode();
        const textNode = $createTextNode(anchorNode.getTextContent());

        immediateListItemNode.remove();

        listItemNode.append(textNode);
        listNode.append(listItemNode);
        parentListItemNode.append(listNode);

        nestedParentListItemNode.insertAfter(parentListItemNode);

        textNode.select(
          textNode.getTextContent().length,
          textNode.getTextContent().length
        );
      }
    });
  };

  const handleChangingListType = () => {
    editor.update(() => {
      const selection = $getSelection();
      const anchorNode = selection?.anchor.getNode();
      const listItemNode = $isTextNode(anchorNode)
        ? anchorNode.getParent()
        : anchorNode;
      // TODO: this listNode is going to get removed
      // TODO: but I need its key
      const listNode = $isListItemNode(listItemNode)
        ? listItemNode.getParent()
        : null;

      if (listNode) {
        const listNodeKey = listNode.getKey();
        // FIX
        // const listType = listNode.getListType();
        const listItemNodeKey = listItemNode.getKey();
        const listItemNodes = listNode.getChildren();
        const newNodes = [];

        for (let i = 0; i < listItemNodes.length; i++) {
          const item = listItemNodes[i];
          // FIX
          const type = item.getKey() === listItemNodeKey ? "number" : "bullet";

          const newListNode = $createListNode(type);
          newListNode.append(item);
          newNodes.push(newListNode);
        }

        const base = listNode.getParent();
        const baseChildren = base.getChildren();
        const listIndex = baseChildren.findIndex(
          (node) => node.getKey() === listNodeKey
        );

        base.splice(listIndex, 1, []);
        base.splice(listIndex, 0, newNodes);
      }
    });
  };

  return (
    <div className="testButtons">
      <button onClick={handleGetMetadata}>Get Metadata</button>

      <button onClick={handleGetType}>Get Type</button>

      <button onClick={handleGetIndent}>Get Indent</button>

      <button onClick={handleOnClick}>Adding a NESTED numbered list</button>

      <button onClick={handleChangingListType}>
        Handle Changing List Type
      </button>
    </div>
  );
};

export default TestButtons;
