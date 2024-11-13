import { Context } from 'koa';
import * as inventoryService from '../services/inventory.service';
import { TInventorQueryFilter, TInventory, TProduct, TUpdateQuantity } from "../types/inventory.types";

export const createProduct = async (ctx: Context) => {
	console.log(ctx.request.body)
    ctx.body = await inventoryService.addProduct(<TProduct>ctx.request.body);
};

export const createInventory = async (ctx: Context) => {
    ctx.body = await inventoryService.addInventory(<TInventory>ctx.request.body);
};

export const increaseStock = async (ctx: Context) => {
    ctx.body = await inventoryService.increaseStock(<TUpdateQuantity>ctx.request.body);
};

export const decreaseStock = async (ctx: Context) => {
    ctx.body = await inventoryService.decreaseStock(<TUpdateQuantity>ctx.request.body);
};

export const increaseOrder = async (ctx: Context) => {
    ctx.body = await inventoryService.increaseOrder(<TUpdateQuantity>ctx.request.body);
};

export const decreaseOrder = async (ctx: Context) => {
    ctx.body = await inventoryService.decreaseOrder(<TUpdateQuantity>ctx.request.body);
};

export const getInventoryByFilters = async (ctx: Context) => {
    ctx.body = await inventoryService.getInventoryByFilters(<TInventorQueryFilter>ctx.query);
};

export const getProductsByFilters = async (ctx: Context) => {
    const filters = ctx.query;
    ctx.body = await inventoryService.getProductsByFilters(<Partial<TProduct>>ctx.query);
};