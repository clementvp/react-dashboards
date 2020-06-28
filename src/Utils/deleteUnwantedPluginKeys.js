const deleteUnwantedPluginKeys = (item) => {
  delete item.isDraggable;
  delete item.isResizable;
  delete item.moved;
  delete item.static;
  delete item.maxH;
  delete item.maxW;
  delete item.minH;
  delete item.minW;
  return item;
};

export default deleteUnwantedPluginKeys;
