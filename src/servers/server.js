const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const { createRouterApp } = require('../routes/router');
const { appConfig } = require('../config/configEnv');

let app;

const startApp = async () => {
  const config = appConfig();

  app = new Koa();

  const router = createRouterApp();

  app.use(async (ctx, next) => {
    ctx.config = config;
    await next();
    return ctx;
  });
  app.use(koaBodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });

  return app;
};

module.exports = {
  startApp,
};
