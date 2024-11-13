import db from '../db/db';
import { TProduct, TInventory, TInventorQueryFilter } from '../types/inventory.types';

export const createProduct = async (data: TProduct): Promise<TProduct> =>
    (await db('products').insert(data).returning('*'))[0];

export const createInventory = async (data: TInventory): Promise<TInventory> =>
    (await db('inventory').insert(data).returning('*'))[0];

export const updateStockQuantity = async (id: number, quantity: number): Promise<number> =>
    db('inventory').where({ id }).increment('stock_quantity', quantity);

export const updateOrderQuantity = async (id: number, quantity: number): Promise<number> =>
    db('inventory').where({ id }).increment('order_quantity', quantity);

export const getInventoryByFilters = async (filters: TInventorQueryFilter): Promise<TInventory[]> => {
    let query = db('inventory')
        .join('products', 'inventory.product_id', 'products.id')
        .select('inventory.*', 'products.name', 'products.plu');
	
	if (filters.plu) query.where('products.plu', filters.plu);
	if (filters.shop_id) query.where('inventory.shop_id', filters.shop_id);
    if (filters.stock_quantity_min && filters.stock_quantity_max) query.whereBetween('inventory.stock_quantity', [filters.stock_quantity_min, filters.stock_quantity_max]);
    if (filters.order_quantity_min && filters.order_quantity_max) query.whereBetween('inventory.order_quantity', [filters.order_quantity_min, filters.order_quantity_max]);

    return query;
};

export const getProductsByFilters = async (filters: Partial<TProduct>): Promise<TProduct[]> => {
    let query = db('products').select('*');

    if (filters.plu) query.where('plu', filters.plu);
    if (filters.name) query.where('name', 'like', `%${filters.name}%`);

    return query;
};