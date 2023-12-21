const db = require("../database/db");
const todoRef = db.collection("todos");

async function getList({ offset = 0, limit = 10, sort = 'asc' }) {
  offset = parseInt(offset, 10);
  limit = parseInt(limit, 10);

  let query = todoRef;
  query = query.orderBy('createdAt', sort).limit(limit);

  if (offset > 0) {
    query = query.offset(offset);
  }

  const jobs = await query.get();

  const todosData = jobs.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return todosData;
}


async function getOne(todoId) {
  const job = await todoRef.doc(todoId).get();

  if (job.exists) {
    const todoData = job.data();

    return { id: job.id, ...todoData };
  } else {
    throw new Error("Todo Not Found with that id!");
  }
}

async function add(data) {
  await todoRef.add(data);
}

async function update(ids, updateData) {
  if (Array.isArray(ids)) {
    await Promise.all(
      ids.map(async (singleId) => {
        const todoDocRef = todoRef.doc(singleId);
        await todoDocRef.update({
          isCompleted: true,
        });
      })
    );
  } else {
    const todoDocRef = todoRef.doc(ids);
    await todoDocRef.update(updateData);
  }
}

async function remove(ids) {
  if (Array.isArray(ids)) {
    await Promise.all(
      ids.map(async (singleId) => {
        const todoDocRef = todoRef.doc(singleId);
        await todoDocRef.delete();
      })
    );
  } else {
    const todoDocRef = todoRef.doc(ids);
    await todoDocRef.delete();
  }
}

module.exports = {
  getList,
  getOne,
  add,
  update,
  remove,
};
