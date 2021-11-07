const { default: axios } = require('axios');
const { publisherMessages } = require('./publisher');

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

module.exports = {
  sendMessages,
};
