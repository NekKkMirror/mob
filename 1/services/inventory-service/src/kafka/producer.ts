import kafka from '../config/kafka';
import { TActionMessage } from "./types/action-message.type";
import { Partitioners, Producer} from "kafkajs";

const producer: Producer = kafka.producer({
	createPartitioner: Partitioners.LegacyPartitioner
});

export const sendActionMessage = async (message: TActionMessage) => {
    await producer.connect();
    await producer.send({
        topic: 'inventory-events',
        messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
};