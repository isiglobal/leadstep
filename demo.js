// Demo the library
var main,
	steps;

$(function() {
	main();
});

main = function() {
	console.log('Demo functionality...');

	window.ls = new LeadStep();

	/* TEST GRAPH

		(start) A---------\
		          \-B--C--D---E---F-----\
		  			            |-G-------J (end)
					            \-H--I--/
	*/

	var a = new Step({key: 'a', title: 'Do you like Nintendo?'}),
		b = new Step({key: 'b', title: 'Do you like Zelda?'}),
		c = new Step({key: 'c', title: 'Do you like Pokemon?'}),
		e = new Step({key: 'e', title: 'Does science make you feel good?'}),
		d = new Step({key: 'd', title: 'Zombies, Pirates, or Ninjas?'}),
		f = new Step({key: 'f', title: 'Do you eat brains?'}),
		g = new Step({key: 'g', title: 'Do you have a pirate ship?'}),
		h = new Step({key: 'h', title: 'Do you speak Japanese?'}),
		i = new Step({key: 'i', title: 'Hontou ni?'}),
		j = new Step({key: 'j', title: 'Sweet, you\'re done with the form!'});

	ls.steps.add([a, b, c, d, e, f, g, h, i, j]);

	a.setNext([b, d]);
	b.setNext(c);
	c.setNext(d);
	d.setNext(e);
	e.setNext([f, g, h]);
	f.setNext(j);
	g.setNext(j);
	h.setNext(i);
	i.setNext(j);

	console.log(a.get('children').length);
	console.log(c.get('parents').length);

	//console.log(steps.at(0));
	//console.log(steps.at(1));
};
