import { $getSelection, $isRangeSelection, $isTextNode } from "lexical";

export const getSelectionData = () => {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) return false;
  if (!selection.isCollapsed()) return false;

  const anchorNode = selection.anchor.getNode();
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorOffset = anchor.offset;
  const parentNode = $isTextNode(anchorNode)
    ? anchorNode.getParent()
    : anchorNode;
  const textContent = parentNode.getTextContent();
  const grandparentNode = parentNode?.getParent();

  return {
    selection,
    anchor,
    focus,
    anchorNode,
    anchorOffset,
    parentNode,
    textContent,
    grandparentNode,
  };
};
