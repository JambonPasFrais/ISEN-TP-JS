(function() {

	let observableObject = new Observable();

	let winCallback = function(player) {
		console.log('Player', player, 'win !');
	}

	observableObject.on('win', winCallback);
	observableObject.on('move', function(player, x, y) {
		console.log('Player', player, 'is moving on ('+x+','+y+')');
	});

	console.log(observableObject);
	observableObject.off('win', winCallback);
	console.log(observableObject);
	observableObject.on('win', winCallback);
	console.log(observableObject);
	

	observableObject.trigger('win', 'Bob');
	observableObject.trigger('move', 'Alice', 2, 1);

	//observableObject.off('win', winCallback);
	observableObject.trigger('win', 'Alice');
	observableObject.trigger('move', 'Bob', 1, 1);

})();
