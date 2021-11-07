const { Kafka } = require('kafkajs');

const publisherMessages = async (topic, message) => {
  const config = {
    brokers: ['localhost:9092'],
  };

  const kafka = new Kafka(config);
  const producer = kafka.producer();
  await producer.connect();
  const res = await producer.send({
    topic,
    messages: [message],
  });
  await producer.disconnect();
  return res;
};

module.exports = {
  publisherMessages,
};
