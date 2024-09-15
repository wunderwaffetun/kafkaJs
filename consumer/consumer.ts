import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9093'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

consumer.connect();
consumer.subscribe({ topic: 'test', fromBeginning: true });

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value?.toString(),
    });
  },
});