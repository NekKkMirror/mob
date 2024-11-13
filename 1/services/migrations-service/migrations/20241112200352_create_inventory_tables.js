/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	
	await knex.schema.createTable('products', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('plu').notNullable().unique();
		table.string('name').notNullable();
		table.timestamps(true, true);
	});
	
	await knex.schema.createTable('inventory', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.uuid('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE');
		table.integer('shop_id').notNullable();
		table.integer('stock_quantity').defaultTo(0);
		table.integer('order_quantity').defaultTo(0);
		table.timestamps(true, true);
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('inventory');
	await knex.schema.dropTableIfExists('products');
};
