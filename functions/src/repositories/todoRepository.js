const db = require("../database/db");
const { prepare } = require("../helpers/prepare");
const todoRef = db.collection("todos");

async function getList({ limit = 10, sort = "asc" } = {}) {
  limit = parseInt(limit, 10);

  const jobs = await todoRef.orderBy("createdAt", sort).limit(limit).get();

  const todosData = jobs.docs.map((doc) => prepare(doc));

  return todosData;
}

async function getOne(id) {
  const job = await todoRef.doc(id).get();

  if (job.exists) {
    return prepare(job);
  }
  return {};
}

async function add(data) {
  await todoRef.add(data);
}

async function update({ ids, updateData } = {}) {
  await Promise.all(
    ids.map((id) => {
      return todoRef.doc(id).update(updateData);
    })
  );
}

async function remove(ids) {
  await Promise.all(
    ids.map(async (id) => {
      todoRef.doc(id).delete();
    })
  );
}

module.exports = {
  getList,
  getOne,
  add,
  update,
  remove,
};
