var Field = Backbone.Model.extend({
	defaults: {
		key: '',
		label: '',
		value: '',
		'default': '',
	},
});

var Fields = Backbone.Collection.extend({
	model: Field,
});
