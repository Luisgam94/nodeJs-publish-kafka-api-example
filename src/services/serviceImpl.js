const { default: axios } = require('axios');
const { publisherMessages } = require('./publisher');
const { initLogger } = require('../config/logging');

const sendMessages = async (ctx) => {
  try {
    const resp = await axios.get('https://rickandmortyapi.com/api/character');
    const eventMessage = { data: resp.data };
    const messageToString = JSON.stringify(eventMessage);
    const message = { value: messageToString };

    await publisherMessages('topic-dummy', message);

    ctx.response.status = 200;
    ctx.response.body = {
      message: 'message published',
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: error.message,
    };
  }

  return ctx;
};

const saveMessageKafka = async (ctx) => {
  const log = initLogger();
  log.info({ body: ctx.request.body }, 'request received');

  try {
    const eventMessage = { data: ctx.request.body };
    const messageToString = JSON.stringify(eventMessage);
    const message = { value: messageToString };

    await publisherMessages(ctx.config.topic, message);

    log.info({ event: message }, 'event published in kafka');

    ctx.response.status = 200;
    ctx.response.body = {
      message: 'message published',
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: error.message,
    };
  }

  return ctx;
};

module.exports = {
  sendMessages,
  saveMessageKafka,
};
