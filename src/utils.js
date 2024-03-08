export function moveObjectByIdToTeam(objectId, toTeamName, orgData) {
  const moveObjectRecursive = (node) => {
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.id === objectId) {
          const [objectToMove] = node.children.splice(i, 1);

          const targetTeamNode = findTeamNode(orgData, toTeamName);
          if (targetTeamNode) {
            targetTeamNode.children.push(objectToMove);
          }
          return orgData;
        }

        const result = moveObjectRecursive(child);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  return moveObjectRecursive(orgData);
}

function findTeamNode(node, teamName) {
  if (node.id === teamName) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const result = findTeamNode(child, teamName);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
