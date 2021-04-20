QUnit.test('TicTacToe prototype - method existance', function(assert) {
  assert.equal(typeof TicTacToe.prototype.play, 'function');
  assert.equal(typeof TicTacToe.prototype.reset, 'function');
  assert.equal(typeof TicTacToe.prototype.getCurrentPlayer, 'function');
  assert.equal(typeof TicTacToe.prototype.getCaseState, 'function');
  assert.equal(typeof TicTacToe.prototype.isFinished, 'function');
  assert.equal(typeof TicTacToe.prototype.hasWinner, 'function');
  assert.equal(typeof TicTacToe.prototype.getWinner, 'function');
});

QUnit.test('TicTacToe inherit from Observable', function(assert) {
  assert.ok(TicTacToe.prototype instanceof Observable);
  assert.equal(TicTacToe.prototype.constructor, TicTacToe);
});

QUnit.test('TicTacToe constructor', function(assert) {
	let game = new TicTacToe();
    let observable = new Observable();
    
    assert.ok(Object.keys(observable).every(key => game[key]));

	assert.equal(game.currentPlayer, 0);
	assert.ok(Array.isArray(game.grid));
	assert.equal(game.grid.length, 3);
	for(let line = 0; line < 3; ++line) {
		assert.ok(Array.isArray(game.grid[line]));
		assert.equal(game.grid[line].length, 3);
	}
});

QUnit.test('TicTacToe play - player id', function(assert) {
	let game = new TicTacToe();

	assert.equal(0, game.currentPlayer);
	game.play(0,0);
	assert.equal(1, game.currentPlayer);
	game.play(0,1);
	assert.equal(0, game.currentPlayer);
	game.play(0,2);
	assert.equal(1, game.currentPlayer);
});

QUnit.test('TicTacToe play - grid state', function(assert) {
	let game = new TicTacToe();

	game.play(0,0);
	assert.equal(0, game.grid[0][0]);
	game.play(0,1);
	assert.equal(1, game.grid[0][1]);
	game.play(0,2);
	assert.equal(0, game.grid[0][2]);
	game.play(1,1);
	assert.equal(1, game.grid[1][1]);
	assert.equal(undefined, game.grid[1][0]);
	assert.equal(undefined, game.grid[1][2]);
	assert.equal(undefined, game.grid[2][0]);
	assert.equal(undefined, game.grid[2][1]);
	assert.equal(undefined, game.grid[2][2]);
});

QUnit.test('TicTacToe getCurrentPlayer', function(assert) {
	let game = new TicTacToe();

	assert.equal(0, game.getCurrentPlayer());
	game.play(0,0);
	assert.equal(1, game.getCurrentPlayer());
	game.play(0,1);
	assert.equal(0, game.getCurrentPlayer());
	game.play(0,2);
	assert.equal(1, game.getCurrentPlayer());
});

QUnit.test('TicTacToe getCaseState', function(assert) {
	let game = new TicTacToe();

	game.play(0,0);
	assert.equal(0, game.getCaseState(0, 0));
	game.play(0,1);
	assert.equal(1, game.getCaseState(0, 1));
	game.play(0,2);
	assert.equal(0, game.getCaseState(0, 2));
	game.play(1,1);
	assert.equal(1, game.getCaseState(1, 1));
	assert.equal(undefined, game.getCaseState(1, 0));
	assert.equal(undefined, game.getCaseState(1, 2));
	assert.equal(undefined, game.getCaseState(2, 0));
	assert.equal(undefined, game.getCaseState(2, 1));
	assert.equal(undefined, game.getCaseState(2, 2));
});

QUnit.test('TicTacToe reset', function(assert) {
	let game = new TicTacToe();

	game.play(0,0);
	game.play(0,1);
	game.play(0,2);
	game.play(1,1);
	game.play(2,2);
	game.reset();
	for(let x = 0; x < 3; ++x) {
		for(let y = 0; y < 3; ++y) {
			assert.equal(game.getCaseState(x, y), undefined);
		}
	}
	assert.equal(game.getCurrentPlayer(), 0);
});

QUnit.test('TicTacToe win column', function(assert) {
	let game = new TicTacToe();
	assert.ok(!game.isFinished());
	game.play(1,1);
	game.play(0,0);
	game.play(1,2);
	game.play(2,0);
	assert.ok(!game.isFinished());
	game.play(1,0);
	assert.ok(game.isFinished());
	assert.ok(game.hasWinner());
	assert.equal(game.getWinner(), 0);
});

QUnit.test('TicTacToe win line', function(assert) {
	let game = new TicTacToe();
	assert.ok(!game.isFinished());
	game.play(1,1);
	game.play(0,0);
	game.play(2,1);
	game.play(2,0);
	game.play(1,2);
	assert.ok(!game.isFinished());
	game.play(1,0);
	assert.ok(game.isFinished());
	assert.ok(game.hasWinner());
	assert.equal(game.getWinner(), 1);
});

QUnit.test('TicTacToe win diag', function(assert) {
	let game = new TicTacToe();
	assert.ok(!game.isFinished());
	game.play(0,0);
	game.play(0,2);
	game.play(2,2);
	game.play(1,1);
	game.play(1,2);
	assert.ok(!game.isFinished());
	game.play(2,0);
	assert.ok(game.isFinished());
	assert.ok(game.hasWinner());
	assert.equal(game.getWinner(), 1);
});

QUnit.test('TicTacToe mate', function(assert) {
	let game = new TicTacToe();
	assert.ok(!game.isFinished());
	game.play(1,1);
	game.play(0,0);
	game.play(0,2);
	game.play(2,0);
	game.play(1,0);
	game.play(1,2);
	game.play(0,1);
	game.play(2,1);
	assert.ok(!game.isFinished());
	game.play(2,2);
	assert.ok(game.isFinished());
	assert.ok(!game.hasWinner());
	assert.equal(game.getWinner(), undefined);
});
