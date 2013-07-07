define([
  ], 
  function() {
	'use strict';

	console.log('loaded state');

	var state = function() {
		console.log('state');
	}

	return {
		state: 'state',
	};
});
