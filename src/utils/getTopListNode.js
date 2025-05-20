import { $isListNode, $isListItemNode } from "@lexical/list";

export const getTopListNode = (listItemNode) => {
  let list = listItemNode.getParent();

  let parent = list.getParent();

  while (parent) {
    if (!$isListItemNode(parent) && !$isListNode(parent)) break;

    list = parent;
    parent = parent.getParent();
  }

  return list;
};
