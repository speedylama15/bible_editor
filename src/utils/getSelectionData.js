import { $isRangeSelection, $isTextNode } from "lexical";

export const getSelectionData = (selection) => {
  if (!$isRangeSelection(selection)) return false;

  if (!selection.isCollapsed()) return false;

  const anchorNode = selection.anchor.getNode();
  const anchorOffset = selection.anchor.offset;
  const parentNode = $isTextNode(anchorNode)
    ? anchorNode.getParent()
    : anchorNode;
  const textContent = parentNode.getTextContent();

  return { anchorNode, anchorOffset, parentNode, textContent };
};
