import { db } from '../db/db.js'

export const addHistory = async (historyData) => {
	return db('history').insert(historyData).returning('*');
}

export const getHistory = async (filters, offset = 0, limit = 10) => {
	const query = db('history').select('*')
	
	if (filters.shop_id) query.where('shop_id', filters.shop_id)
	if (filters.plu) query.where('plu', filters.plu)
	if (filters.date_from) query.where('action_date', '>=', filters.date_from)
	if (filters.date_to) query.where('action_date', '<=', filters.date_to)
	if (filters.action) query.where('action', filters.action)
	
	return query.offset(offset).limit(limit)
}