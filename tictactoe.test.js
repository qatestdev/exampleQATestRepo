const { expect } = require('chai');

// tictactoe.test.js


describe('TicTacToe', () => {
    let TicTacToe;
    before(() => {
        TicTacToe = require('./tictactoe.js').TicTacToe || require('./tictactoe.js');
    });

    it('should initialize with empty board and X as current player', () => {
        const game = new TicTacToe();
        expect(game.board).to.deep.equal(Array(9).fill(null));
        expect(game.currentPlayer).to.equal('X');
        expect(game.winner).to.be.null;
    });

    it('should allow players to make moves and alternate turns', () => {
        const game = new TicTacToe();
        expect(game.makeMove(0)).to.be.true;
        expect(game.board[0]).to.equal('X');
        expect(game.currentPlayer).to.equal('O');
        expect(game.makeMove(1)).to.be.true;
        expect(game.board[1]).to.equal('O');
        expect(game.currentPlayer).to.equal('X');
    });

    it('should not allow moves on occupied positions', () => {
        const game = new TicTacToe();
        game.makeMove(0);
        expect(game.makeMove(0)).to.be.false;
    });

    it('should detect a win for X', () => {
        const game = new TicTacToe();
        game.makeMove(0); // X
        game.makeMove(3); // O
        game.makeMove(1); // X
        game.makeMove(4); // O
        game.makeMove(2); // X wins
        expect(game.winner).to.equal('X');
    });

    it('should detect a win for O', () => {
        const game = new TicTacToe();
        game.makeMove(3); // X
        game.makeMove(0); // O
        game.makeMove(4); // X
        game.makeMove(1); // O
        game.makeMove(8); // X
        game.makeMove(2); // O wins
        expect(game.winner).to.equal('O');
    });

    it('should detect a draw', () => {
        const game = new TicTacToe();
        // X O X
        // X X O
        // O X O
        game.makeMove(0); // X
        game.makeMove(1); // O
        game.makeMove(2); // X
        game.makeMove(5); // O
        game.makeMove(3); // X
        game.makeMove(6); // O
        game.makeMove(4); // X
        game.makeMove(8); // O
        game.makeMove(7); // X
        expect(game.winner).to.equal('Draw');
    });

    it('should not allow moves after game is won', () => {
        const game = new TicTacToe();
        game.makeMove(0); // X
        game.makeMove(3); // O
        game.makeMove(1); // X
        game.makeMove(4); // O
        game.makeMove(2); // X wins
        expect(game.makeMove(5)).to.be.false;
    });
});
