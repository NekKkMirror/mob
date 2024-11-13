import * as inventoryModel from '../models/inventory.model';
import { sendActionMessage } from '../kafka/producer';
import { TProduct, TInventory, TUpdateQuantity, TInventorQueryFilter } from '../types/inventory.types';

export const addProduct = async (payload: TProduct): Promise<TProduct> => {
    const product = await inventoryModel.createProduct(payload);
    
		await sendActionMessage({ action: 'CREATE_PRODUCT', data: product });
  
		return product;
};

export const getProductsByFilters = async (payload: Partial<TProduct>): Promise<TProduct[]> => {
		const products = await inventoryModel.getProductsByFilters(payload);
		
		await sendActionMessage({ action: 'GET_PRODUCTS', data: products });
		
		return products
};

export const addInventory = async (payload: TInventory): Promise<TInventory> => {
   
    const inventory = await inventoryModel.createInventory(payload);
   
    await sendActionMessage({ action: 'CREATE_INVENTORY', data: inventory });
   
    return inventory;
};

export const increaseStock = async (payload: TUpdateQuantity): Promise<number> => {
    const { id, quantity } = payload
    const updated = await inventoryModel.updateStockQuantity(id, quantity);
    
    await sendActionMessage({ action: 'INCREASE_STOCK', data: { id, quantity } });
    
    return updated;
};

export const decreaseStock = async (payload: TUpdateQuantity): Promise<number> => {
    const { id, quantity } = payload
    const updated = await inventoryModel.updateStockQuantity(id, -quantity);

    await sendActionMessage({ action: 'DECREASE_STOCK', data: { id, quantity } });

    return updated;
};

export const increaseOrder = async (payload: TUpdateQuantity): Promise<number> => {
    const { id, quantity } = payload
    const updated = await inventoryModel.updateOrderQuantity(id, quantity);

    await sendActionMessage({ action: 'INCREASE_ORDER', data: { id, quantity } });

    return updated;
};

export const decreaseOrder = async (payload: TUpdateQuantity): Promise<number> => {
    const { id, quantity } = payload
    const updated = await inventoryModel.updateOrderQuantity(id, -quantity);

    await sendActionMessage({ action: 'DECREASE_ORDER', data: { id, quantity } });

    return updated;
};

export const getInventoryByFilters = async (payload: TInventorQueryFilter): Promise<TInventory[]> => {
    const inventory =  await inventoryModel.getInventoryByFilters(payload);
	
	 await sendActionMessage({ action: 'GET_INVENTORIES', data: inventory });
	 
	 return  inventory;
};