import Router from 'koa-router';
import * as inventoryController from '../controllers/inventory.controller';

const router = new Router();

router.post('/products', inventoryController.createProduct);
router.post('/inventory', inventoryController.createInventory);

router.patch('/inventory/stock/increase', inventoryController.increaseStock);
router.patch('/inventory/stock/decrease', inventoryController.decreaseStock);
router.patch('/inventory/order/increase', inventoryController.increaseOrder);
router.patch('/inventory/order/decrease', inventoryController.decreaseOrder);

router.get('/inventory', inventoryController.getInventoryByFilters);
router.get('/products', inventoryController.getProductsByFilters);

export default router;