import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
	clientId: 'history-client',
	brokers: [process.env.KAFKA_BROKER]
});
