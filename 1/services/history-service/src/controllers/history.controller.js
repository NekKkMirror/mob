import { fetchHistory } from '../services/history.service.js'

export const getHistory = async (ctx) => {
	const { shop_id, plu, date_from, date_to, action, page = "1", limit = "10" } = ctx.query
	const filters = { shop_id, plu, date_from, date_to, action }
	
	ctx.body = await fetchHistory(filters, parseInt(page), parseInt(limit))
}