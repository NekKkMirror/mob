import Router from 'koa-router'
import { getHistory } from '../controllers/history.controller.js'

export const historyRouter = new Router({ prefix: '/history' })

historyRouter.get('/', getHistory)