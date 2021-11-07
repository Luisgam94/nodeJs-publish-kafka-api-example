const Router = require('koa-router');
const { sendMessages } = require('./serviceImpl');

const createRouterApp = () => {
  const router = new Router();
  router.get('/publisher-kafka/example', sendMessages);
  return router;
};

module.exports = {
  createRouterApp,
};
