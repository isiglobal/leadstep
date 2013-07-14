//
// LeadStep
// Copyright (c) 2013 Brandon Thomas <bt@brand.io>
//

// TODO: Doc Block
// TODO: Everything in LeadStep.* namespace.
// TODO: open_frag.js, close_frag.js


//
// LeadStep
// Copyright (c) 2013 Brandon Thomas <bt@brand.io>
//
// Step is a node in an "undirected" graph. Each step corresponds to
// an installment of guided user input. 
//

var Step = Backbone.Model.extend({
	defaults: {
		key: '',
		title: '',

		// Parent and child steps
		parents: null,
		children: null,
 
		// Requires data to move to next step? TODO
		requiresData: false, // false | 'some' | 'all'
	},

	initialize: function() {
		this.set({
			parents: new Steps(),
			children: new Steps(),
		});
	},

	// Add Step, Array, or Collection of Steps.
	// Does not prevent duplicates from being added!
	setNext: function(steps) {
		var children = this.get('children'),
			i = 0;
		if('toArray' in steps) {
			children.add(steps.toArray()); // Collection
			for(i = 0; i < steps.length; i++) {
				steps.at(i)._addParent(this);
			}
		}
		else if('length' in steps) {
			children.add(steps); // Array
			for(i = 0; i < steps.length; i++) {
				steps[i]._addParent(this);
			}
		}
		else { 
			children.add(steps); // Object
			steps._addParent(this);
		}
	},

	// PRIVATE METHOD !
	_addParent: function(parent) {
		this.get('parents').add(parent);
	},

	////////////////////////////////////
	// 	   Override These Functions   //
	// to provide add'l functionality //
	////////////////////////////////////

	next: function() {
		if(!this.canProceed()) {
			return false;
		}
		return this.children.at(0);
	},

	prev: function() {
		if(!this.canGoBack()) {
			return false;
		}
		return this.parents.at(0);
	},

	canProceed: function() {
		if(!this.children.length) {
			return false;
		}
		return true;
	},

	canGoBack: function() {
		if(!this.parents.length) {
			return false;
		}
		return true;
	},
});


var Steps = Backbone.Collection.extend({
	model: Step,

	// Pointer to last visited and current stage
	_cur: 0,
	_prev: 0,

	/////////// NAVIGATION ///////////
	// These *TRIGGER* a change event!

	next: function() {
		if(this._cur >= this.length - 1) {
			return;
		}
		this._prev = this._cur;
		this._cur += 1;
		this.trigger('steps:change');
	},

	prev: function() {
		if(this._cur <= 0) {
			return;
		}
		this._prev = this._cur;
		this._cur -= 1;
		this.trigger('steps:change');
	},

	goto: function(n) {
		if(typeof(n) != 'number') {
			return;
		}
		if(n < 0 || n >= this.length) {
			return;
		}
		this._prev = this._cur;
		this._cur = n;
		this.trigger('steps:change');
	},

	/////////// STEP ACCESSORS //////////////
	// These do *NOT* trigger a change event!

	getCurStep: function() { return this.at(this._cur); },
	getNextStep: function() { return this.at(this.nextId()); },
	getPrevStep: function() { return this.at(this.prevId()); },
	getKey: function(key) { // TODO: gotoKey()
		return this.findWhere([{key: key}]);
	},

	/////////// POINTERS /////////////

	pos: function() { return this._cur; },
	end: function() { return this.length - 1; },
	nextId: function() {
		if(this._cur >= this.length - 1) {
			return this._cur;
		}
		return this._cur + 1;
	},
	prevId: function() {
		if(this._cur <= 0) {
			return 0;
		}
		return this._cur - 1;
	},
});


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


//
// Main App and API
//
var LeadStep = Backbone.View.extend({
	nav: {
		state: null, // model
		reset: null, // views...
		prev: null,
		next: null,
	},

	// Collection of all steps in the app
	steps: null,

	initialize: function() {
		var ns = null;

		ns = new NavState();
		this.nav.state = ns
		this.nav.reset = new ResetButton({model: ns, app: this});
		this.nav.prev = new PrevButton({model: ns, app: this});
		this.nav.next = new NextButton({model: ns, app: this});

		this.steps = new Steps();
	},

	addStep: function(step) {
		this.steps.add(step);
	},
});

