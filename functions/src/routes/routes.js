const Router = require('koa-router');
const todoHandler = require('../handlers/todo/todoHandler')
const todoInputMiddleware = require('../middlewares/todoMiddleware')

const router = new Router({
    prefix: '/api'
});

router.get('/todos', todoHandler.getTodos)
router.post('/todos', todoInputMiddleware, todoHandler.save)
router.get('/todo/:id', todoHandler.getTodo)
router.put('/todo/:id', todoHandler.updateTodo)
router.delete('/todo/:id', todoHandler.removeTodo)
router.put('/todos/multiple', todoHandler.updateMultipleTodo)
router.delete('/todos/multiple', todoHandler.removeMultipleTodo)
  
module.exports = router;