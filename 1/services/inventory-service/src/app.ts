import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import inventoryRouter from './routes/inventory.router';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();

app.use(bodyParser());
app.use(inventoryRouter.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Inventory service running on port ${PORT}`);
});