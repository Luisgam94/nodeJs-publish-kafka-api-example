const Koa = require('koa');
const { createRouterApp } = require('./router');

let app;

const startApp = async () => {
  app = new Koa();

  const router = createRouterApp();

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
