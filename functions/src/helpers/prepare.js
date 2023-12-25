function prepare(doc) {
  return {
    ...doc.data(),
    id: doc.id,
  };
}

module.exports = {prepare}