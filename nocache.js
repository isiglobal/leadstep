// Force the browser to bypass the cache and reload the library.
var nocache_load = function(script) {
	var qsa = '?',
		i = 0;
	for(i = 0; i < 15; i++) {
		qsa += Math.floor(Math.random()*10).toString();
	}
	$('body').append('<script src="' + script + qsa + '"></script>');
};
