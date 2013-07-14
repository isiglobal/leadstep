
// 
// View of the step
//
var StepView = Backbone.View.extend({
	model: null,
	initialize: function() {
	},
	render: function() {
		this.$el.html(this.model.get('title'));
	},
});

//
// View of the container
//
var StepsView = Backbone.View.extend({
	initialize: function() {
	},
	render: function() {
	},
});

