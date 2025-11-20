class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
    }

    printBoard() {
        const b = this.board;
        console.log(
            `${b[0] || ' '} | ${b[1] || ' '} | ${b[2] || ' '}\n` +
            `---------\n` +
            `${b[3] || ' '} | ${b[4] || ' '} | ${b[5] || ' '}\n` +
            `---------\n` +
            `${b[6] || ' '} | ${b[7] || ' '} | ${b[8] || ' '}\n`
        );
    }

    makeMove(position) {
        if (this.winner || this.board[position] !== null) {
            return false;
        }
        this.board[position] = this.currentPlayer;
        this.winner = this.checkWinner();
        if (!this.winner) {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
        return true;
    }

    checkWinner() {
        const b = this.board;
        const lines = [
            [0,1,2],[3,4,5],[6,7,8], // rows
            [0,3,6],[1,4,7],[2,5,8], // cols
            [0,4,8],[2,4,6]          // diags
        ];
        for (const [a, bIdx, c] of lines) {
            if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
                return b[a];
            }
        }
        if (b.every(cell => cell)) return 'Draw';
        return null;
    }
}

// Example usage:
const game = new TicTacToe();
game.printBoard();
// To make a move: game.makeMove(position); // position: 0-8
// Example moves:
game.makeMove(0); // X
game.makeMove(4); // O
game.makeMove(1); // X
game.makeMove(5); // O
game.makeMove(2); // X wins
game.printBoard();
console.log('Winner:', game.winner);


