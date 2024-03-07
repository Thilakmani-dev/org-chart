export const findObjectById = (id, obj) => {
  if (obj.id === id) {
    return obj;
  }
  if (obj.children) {
    for (const child of obj.children) {
      const result = findObjectById(id, child);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
