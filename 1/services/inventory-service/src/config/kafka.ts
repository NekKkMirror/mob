import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'inventory-client',
    brokers: [process.env.KAFKA_BROKER!]
});

export default kafka;