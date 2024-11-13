import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { historyRouter } from './routes/history.router.js'
import { consume } from './kafka/consumer.js'
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();

app.use(bodyParser())
app.use(historyRouter.routes())

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`History service running on port ${PORT}`);
	
	consume().catch(console.error)
})