export const getListItemNodeIndex = (listNode, listItemNode) => {
  let listItemNodeIndex = null;
  const listItemNodeKey = listItemNode.getKey();
  const listNodeChildren = listNode.getChildren();

  for (let i = 0; i < listNodeChildren.length; i++) {
    const item = listNodeChildren[i];

    if (item.getKey() === listItemNodeKey) {
      listItemNodeIndex = i;

      break;
    }
  }

  return listItemNodeIndex;
};
