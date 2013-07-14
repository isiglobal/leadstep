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
