define([
	'state',
  ], 
  function(State) {
	'use strict';

	console.log('loaded step');

	var step = function() {
		console.log('step');
	}

	return {
		step: 'step',
	};
});
