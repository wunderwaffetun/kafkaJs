  import express from 'express';
  import { Request, Response } from 'express';
  import { Kafka, Partitioners } from 'kafkajs';

  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'], // URL of Kafka broker
  });

  const producer = kafka.producer();
  const app = express();

  // Function to initialize producer
  const startProducer = async () => {
    await producer.connect();
  };

  startProducer().catch(console.error);

  app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
  });

  app.get('/send', async (req: Request, res: Response) => {
    try {
      await producer.send({
        topic: 'test', // topic name
        messages: [{ value: 'Hello KafkaJS user!' + Math.random().toString() }],
      });
      res.send('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    }
  });

  app.listen(3000, () => {
    console.log('Application started on port 3000!');
  });