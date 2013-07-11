// Demo the library
var main,
	steps;

$(function() {
	main();
});

main = function() {
	console.log('Demo functionality...');

	steps = new Steps();

	/* TEST GRAPH

		(start) A---------\
		          \-B--C--D---E---F-----\
		  			            |-G-------J (end)
					            \-H--I--/
	*/

	var a = new Step({key: 'a', title: 'title'}),
		b = new Step({key: 'b', title: 'title'}),
		c = new Step({key: 'c', title: 'title'}),
		d = new Step({key: 'd', title: 'title'}),
		e = new Step({key: 'e', title: 'title'}),
		f = new Step({key: 'f', title: 'title'}),
		g = new Step({key: 'g', title: 'title'}),
		h = new Step({key: 'h', title: 'title'}),
		i = new Step({key: 'i', title: 'title'}),
		j = new Step({key: 'j', title: 'title'});

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
