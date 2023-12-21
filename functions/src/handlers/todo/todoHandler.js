const {
  getList: getListTodos,
  getOne: getOneTodo,
  add: addTodo,
  update,
  remove
  } = require("../../repositories/todoRepository");
  
async function getTodos(ctx) {
  try {
    const todos = await getListTodos(ctx.query);

    ctx.status = 200;
    return ctx.body = {
      data: todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const currentTodo = await getOneTodo(id);
    if (currentTodo) {
      ctx.status = 200;
      return (ctx.body = {
        data: currentTodo,
      });
    }
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function save(ctx) {
  try {
    let postData = ctx.req.body;
    postData.isCompleted = false;
    postData.createdAt = new Date().toISOString();
    
    await addTodo(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateTodo(ctx) {
  try {
    const { id } = ctx.params;
    const updateData = ctx.req.body;
    const currentTodo = await getOneTodo(id);
    if (currentTodo) {
      await update(id, updateData);

      ctx.status = 200;
      return (ctx.body = {
        success: true,
      });
    } else {
      throw new Error("Todo Not Found with that id!");
    }
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeTodo(ctx) {
  try {
    const { id } = ctx.params;
    const currentTodo = await getOneTodo(id);
    if (currentTodo) {
      await remove(id);
    } else {
      throw new Error("Todo Not Found with that id!");
    }
    
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateMultipleTodo(ctx) { 
  try {
    const { ids } = ctx.req.body;
    await update(ids);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeMultipleTodo(ctx) {
  try {
    const { ids } = ctx.req.body;
    await remove(ids);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getTodos,
  getTodo,
  save,
  updateTodo,
  removeTodo,
  updateMultipleTodo,
  removeMultipleTodo
};
