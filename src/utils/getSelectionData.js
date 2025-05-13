import { $isRangeSelection, $isTextNode } from "lexical";

export const getSelectionData = (selection) => {
  if (!$isRangeSelection(selection)) return false;

  // FIX
  // if (!selection.isCollapsed()) return false;

  const anchorNode = selection.anchor.getNode();
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorOffset = anchor.offset;
  const parentNode = $isTextNode(anchorNode)
    ? anchorNode.getParent()
    : anchorNode;
  const textContent = parentNode.getTextContent();

  return { anchor, focus, anchorNode, anchorOffset, parentNode, textContent };
};
