import { addHistory, getHistory } from '../models/history.model.js'

export const createHistory = async (historyData) => {
	return await addHistory(historyData)
}

export const fetchHistory = async (filters, page, limit) => {
	const offset = (page - 1) * limit
	return await getHistory(filters, offset, limit)
}