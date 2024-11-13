import { kafka } from "../config/kafka.js";
import { addHistory } from "../models/history.model.js";

const consumer = kafka.consumer({ groupId: 'history-group' });

export const consume = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic: 'inventory-events', fromBeginning: true })
	
	await consumer.run({
		eachMessage: async ({ message }) => {
			const event = JSON.parse(message.value.toString())
			
			if (Array.isArray(event.data)) {
					for (const item of event.data) {
							await addHistory({
								action: event.action,
								shop_id: item.shop_id ?? null,
								plu: item.plu ?? null,
								action_date: new Date()
							})
					}
			} else {
				await addHistory({
					action: event.action,
					shop_id: event.data.shop_id ?? null,
					plu: event.data.plu ?? null,
					action_date: new Date()
				})
			}
		}
	})
};