var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */
var Category = new keystone.List('Category', {
	sortable: true
});

Category.add({
	name: { type: Types.Text, required: true, initial: true, index: true }
});

/**
 * Registration
 */
Category.defaultColumns = 'name, displayOrder';
Category.register();

