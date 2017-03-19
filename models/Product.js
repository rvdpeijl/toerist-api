var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */
var Product = new keystone.List('Product', {
	sortable: true
});

Product.add({
	name: { type: Types.Text, required: true, initial: true, index: true },
	description: { type: Types.Textarea, initial: true, index: true, note: 'Optional' },
	category: { type: Types.Relationship, ref: 'Category', initial: true, required: true },
	price: { type: Types.Money, required: true, initial: true, format: '€0.0,00' }
});

/**
 * Registration
 */
Product.defaultColumns = 'name, category, price';
Product.register();
