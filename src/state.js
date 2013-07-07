define([
	'jquery', 'underscore', 'backbone',
  ], 
  function($, _, Backbone) {
	'use strict';

	console.log('loaded state');

	var state = function() {
		console.log('state');
	}

	return {
		state: 'state',
	};
});
