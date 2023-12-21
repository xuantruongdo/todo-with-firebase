const yup = require('yup');

async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.req.body;
    let schema = yup.object().shape({
      text: yup.string().required(),
    });

    await schema.validate(postData);
    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }
}

module.exports = todoInputMiddleware;