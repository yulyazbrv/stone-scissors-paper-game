const readline = require("readline");
const HMAC = require("./HMAC/hmac");
const Rules = require("./Rules/rules");
const KeyGenerator = require("./KeyGenerator/keyGenerator");
const MoveTable = require("./Table/table");

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

  let choice = '';

  while (choice !== '0') {
    const menu = moves.map((move, index) => `${index + 1} - ${move}`).join('\n') + '\n0 - Exit\n? - Help';

    choice = await new Promise((resolve) => {
      rl.question(`${menu}\nEnter your move: `, (input) => {
        resolve(input.trim());
      });
    });

    if (choice === '0') {
      console.log('Bye!');
      break;
    } else if (choice === '?') {
      const moveTable = new MoveTable(moves);
      moveTable.printTable();
    } else {
      const playerMove = moves[parseInt(choice, 10) - 1];

      if (!playerMove) {
        console.error('Error: Invalid choice. Please try again.');
      } else {
        console.log(`Your move: ${playerMove}`);
        console.log(`Computer move: ${computerMove}`);
        console.log(gameRules.getResult(playerMove, computerMove));
        console.log(`HMAC Key: ${key.toString('hex').toUpperCase()}`);
        break;
      }
    }
  }

  rl.close();
}

main();
