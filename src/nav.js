//
// Classes --
// 		NavState (model)
// 		NavButton (view parent class) 
// 			ResetButton
// 			PrevButton
// 			NextButton
// 			NextAndFinishButton
//

var NavState = Backbone.Model.extend({
	defaults: {
		canGoForward: false,
		canGoBack: false,
		isEmpty: true,
		isDone: false,
	},
	initialize: function() {
	},
});

var NavButton = Backbone.View.extend({
	model: null,
	steps: null,
	classes: {
		enabled: 'enabled',
		disabled: 'disabled',
	},
	// To use text, set use=true.
	text: {
		use: false,
		enabled: 'enabled',
		disabled: 'disabled',
	},
	// To use images, set use=true.
	img: {
		use: false,
		enabled: null,
		disabled: null,
	},
	initialize: function(args) {
		if('app' in args) {
			this.steps = args.app.steps;
		}
		else if('steps' in args) {
			this.steps = args.steps;
		}
		this.render();
	},
	render: function() {
		this.setClass();
	},
	click: function() {
		console.log('nav');
	},
	isEnabled: function() {
		return false;
	}
	setClass: function() {
		if(this.isEnabled()) {
			this.$el.addClass(this.classes.enabled);
			this.$el.removeClass(this.classes.disabled);
			this.$el.removeAttr('disabled');
			//this.$el.css('cursor', 'pointer');
		}
		else {
			this.$el.addClass(this.classes.disabled);
			this.$el.removeClass(this.classes.enabled);
			this.$el.attr('disabled', 'disabled');
			//this.$el.css('cursor', 'default');
		}
	},
});

var ResetButton = NavButton.extend({
	model: null,
	// To use text, set use=true.
	text: {
		use: false,
		enabled: 'enabled',
		disabled: 'disabled',
	},
	// To use images, set use=true.
	img: {
		use: false,
		enabled: null,
		disabled: null,
	},
	initialize: function() {
		this.listenTo(this.model, 'change:isEmpty', this.render);
	},
	render: function() {
	},
	click: function() {
		console.log('reset');
		// TODO: trigger form reset!!
		this.steps.goto(0);
	},
	isEnabled: function() {
		return !this.model.get('isEmpty');
	},
});


var PrevButton = NavButton.extend({
	model: null,
	// To use text, set use=true.
	text: {
		use: false,
		enabled: 'enabled',
		disabled: 'disabled',
	},
	// To use images, set use=true.
	img: {
		use: false,
		enabled: null,
		disabled: null,
	},
	initialize: function() {
		this.listenTo(this.model, 'change:canGoBack', this.render);
	},
	render: function() {
	},
	click: function() {
		console.log('prev');
		this.steps.prev();
	},
	isEnabled: function() {
		return this.model.get('canGoBack');
	},
});

var NextButton = NavButton.extend({
	model: null,
	// To use text, set use=true.
	text: {
		use: false,
		enabled: 'enabled',
		disabled: 'disabled',
	},
	// To use images, set use=true.
	img: {
		use: false,
		enabled: null,
		disabled: null,
	},
	initialize: function() {
		this.listenTo(this.model, 'change:canGoForward', this.render);
		this.listenTo(this.model, 'change:isDone', this.render);
	},
	render: function() {
	},
	click: function() {
		console.log('forward');
		this.steps.next();
	},
	isEnabled: function() {
		return this.model.get('canGoForward') || this.model.get('isDone');
	},
	isDone: function() {
		return this.model.get('isDone');
	},
});


var NextAndFinishButton = NavButton.extend({
	model: null,
	// To use text, set use=true.
	text: {
		use: false,
		enabled: 'enabled',
		disabled: 'disabled',
	},
	// To use images, set use=true.
	img: {
		use: false,
		enabled: null,
		disabled: null,
	},
	initialize: function() {
		this.listenTo(this.model, 'change:canGoForward', this.render);
		this.listenTo(this.model, 'change:isDone', this.render);
	},
	render: function() {
	},
	click: function() {
		console.log('forward');
		this.steps.next();
	},
	isEnabled: function() {
		return this.model.get('canGoForward') || this.model.get('isDone');
	},
	isDone: function() {
		return this.model.get('isDone');
	},
});


var NavButtonOld = Backbone.View.extend({
	// State:
	// enabled | disabled | finished
	state: 'enabled',

	imgEnabled: null,
	imgDisabled: null,
	imgFinished: null,

	callback: null,

	events: {
		'click': 'onclick',
	},

	initialize: function(args) {
		this.imgEnabled = args.imgEnabled;
		this.imgDisabled = args.imgDisabled;
		this.callback = args.callback;
	},

	onclick: function() {
		this.callback();
	},

	render: function() {
		var src = '';
		var able = false;

		switch(this.state) {
			case 'enabled':
				src = this.imgEnabled;
				able = true;
				break;
			case 'finished':
				src = this.imgFinished;
				able = true;
				break;
			case 'disabled':
			default:
				src = this.imgDisabled;
				able = false;
		}

		if(able) {
			this.$el.removeClass('disabled');
			this.$el.removeAttr('disabled');
			this.$el.css('cursor', 'pointer');
		}
		else {
			this.$el.addClass('disabled');
			this.$el.attr('disabled', 'disabled');
			this.$el.css('cursor', 'default');
		}

		this.$el.find('img').attr('src', src);
	},

	enable: function() {
		this.state = 'enabled';
		this.render();
	},

	disable: function() {
		this.state = 'disabled';
		this.render();
	},

	finish: function() {
		this.state = 'finished';
		this.render();
	}
});

