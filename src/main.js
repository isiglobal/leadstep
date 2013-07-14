//
// LeadStep
// Copyright (c) 2013 Brandon Thomas <bt@brand.io>
//

// TODO: Doc Block
// TODO: Everything in LeadStep.* namespace.
// TODO: open_frag.js, close_frag.js

require('step');
require('nav');
require('field');

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

