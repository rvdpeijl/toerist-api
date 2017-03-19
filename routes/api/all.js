var _        = require('lodash');
var async    = require('async');
var keystone = require('keystone');

var Category = keystone.list('Category');
var Product  = keystone.list('Product');

exports = module.exports = function (req, res) {

	async.parallel([
		function(cb) {
			Category.model.find()
				.lean()
				.exec(function(error, categories) {
					if (error) return cb(error, null);
					cb(null, categories);
				});

		},
		function(cb) {
			Product.model.find()
				.populate('category')
				.lean()
				.exec(function(error, products) {
					if (error) return cb(error, null);
					cb(null, products);
				});
		}
	], function(error, results) {
		if (error) {
			return res.json({ error: error });
		}

		var categories = results[0];
		var products   = results[1];

		var all = _.map(categories, function(category) {
			category.products = [];

			var _products = _.filter(products, function(product) {
				var productCategoryId = product.category._id.toString();
				var categoryId        = category._id.toString();

				return productCategoryId == categoryId;
			});

			category.products = _products;
			return category;
		})

		return res.json(all);

	});
};
