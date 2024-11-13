/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('history', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
		table.string('plu').nullable();
		table.integer('shop_id').nullable()
		table.string('action').notNullable()
		table.timestamp('action_date').defaultTo(knex.fn.now())
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTable('history')
};
