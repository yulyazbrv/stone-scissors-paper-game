class Rules {
  constructor(moves) {
    this.moves = moves;
  }

  getResult(playerMove, computerMove) {
    if (playerMove === computerMove) {
      return 'Draw';
    }

    const playerMoveIndex = this.moves.indexOf(playerMove);
    const computerMoveIndex = this.moves.indexOf(computerMove);
    const diff = (this.moves.length + playerMoveIndex - computerMoveIndex) % this.moves.length;

    return diff > 0 && diff <= this.moves.length / 2 ? 'You win!' : 'Computer win!';
  }
}

module.exports = Rules;