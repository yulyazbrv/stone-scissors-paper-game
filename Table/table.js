const Table = require('cli-table3');

class MoveTable {
  constructor(moves) {
    this.moves = moves;
  }

  generateTable() {
    const head = [''].concat(this.moves);
    const table = new Table({ head, style: { head: [], border: [] }, chars: { 'mid-mid': '+' } });

    for (const move1 of this.moves) {
      const row = [move1];

      for (const move2 of this.moves) {
        if (move1 === move2) {
          row.push('Draw');
        } else {
          const move1Index = this.moves.indexOf(move1);
          const move2Index = this.moves.indexOf(move2);
          const diff = (this.moves.length + move1Index - move2Index) % this.moves.length;

          row.push(diff > 0 && diff <= this.moves.length / 2 ? 'Win' : 'Lose');
        }
      }

      table.push(row);
    }

    return table;
  }

  printTable() {
    const generatedTable = this.generateTable();
    console.log(generatedTable.toString());
  }
}

module.exports = MoveTable;