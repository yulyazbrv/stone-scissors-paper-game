const readline = require('readline');
const HMAC = require('./HMAC/hmac');
const Rules = require('./Rules/rules');
const Table = require('./Table/table');
const KeyGenerator = require('./KeyGenerator/keyGenerator');

async function main() {
  const moves = process.argv.slice(2);

  if (moves.length < 3 || moves.length % 2 === 0) {
    console.error('Error: Invalid number of moves.');
    return;
  }

  if (new Set(moves).size !== moves.length) {
    console.error('Error: Duplicate moves found.');
    return;
  }
  
  const gameRules = new Rules(moves);
  const computerMove = moves[Math.floor(Math.random() * moves.length)];
  const key = KeyGenerator.generateKey(32);
  const hmac = HMAC.generateHmac(computerMove, key);

  console.log(`HMAC: ${hmac.toUpperCase()}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const menu = moves.map((move, index) => `${index + 1} - ${move}`).join('\n') + '\n0 - Exit\n' + '? - Help';

  rl.question(`${menu}\nEnter your move: `, (choice) => {
    rl.close();

    if (choice === '0') {
      console.log('Bye!');
      return;
    } else if (choice === '?') {
      const moveTable = new Table(moves);
      const table = moveTable.generateTable();
      console.log('\n' + table.map(row => row.join('     ')).join('\n'));
      return;
    }

    const playerMove = moves[parseInt(choice, 10) - 1];

    if (!playerMove) {
      console.error('Error: Invalid choice. Please try again.');
      main()
      return;
    }

    console.log(`Your move: ${playerMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(gameRules.getResult(playerMove, computerMove));
    console.log(`HMAC Key: ${key.toString('hex').toUpperCase()}`);
  });
}

main();