
export default (result) => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }
  // Make sure to return null if this object doesn't have an ID
  return null;
};
