export type TProduct =  {
  readonly id?: number;
  readonly plu: string;
  readonly name: string;
}

export type TInventory = {
  readonly id?: number;
	readonly product_id: number;
	readonly shop_id: number;
	readonly stock_quantity: number;
	readonly order_quantity: number;
}

export type TInventorQueryFilter = Partial<Pick<TInventory, 'shop_id'> & Pick<TProduct, 'plu'>> & {
  readonly stock_quantity_min?: number;
  readonly stock_quantity_max?: number;
  readonly order_quantity_min?: number;
  readonly order_quantity_max?: number
}

export type TUpdateQuantity = {
  readonly id: number
  readonly quantity: number;
}