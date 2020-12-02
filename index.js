import { createInterface } from "readline";
//    C
// R [*][ ]
//   [ ][ ]

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const testCases = Number(await getInputFromCLI("Number of test cases\n"));
  if (isNaN(testCases)) {
    console.error("Please use a valit numeric input");
    rl.close();
    process.exit(-1);
  }

  const grids = [];

  for (let i = 0; i < testCases; i++) {
    try {
      grids.push(await getNMParams());
    } catch (error) {
      console.error(error);
      rl.close();
      process.exit(-1);
    }
  }

  console.log("RESULTS:");
  grids.forEach((grid) => {
    const result = evaluateGrid(grid);
    console.log(result);
  });
  rl.close();
  process.exit(0);
}

/**
 *
 * @param {[Number, Number]} grid
 * @returns {String}
 */
function evaluateGrid(grid) {
  const [n, m] = grid;
  if (n > m) {
    if (m % 2 === 2) return "U";
    else return "D";
  } else {
    if (n % 2 === 0) return "L";
    else return "R";
  }
}

/**
 *
 * @param {String} question
 * @returns {Promise<String>}
 */
async function getInputFromCLI(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * @returns {Promise<[Number,Number]>}
 */
async function getNMParams() {
  return new Promise(async (resolve, reject) => {
    const nmInput = await getInputFromCLI("Insert N M tuple spaced\n");
    const nmValues = nmInput.split(" ");

    if (nmValues.length !== 2) reject("invalid input \n Example: 1 2");
    const [n, m] = nmValues;
    const nNumber = Number(n);
    const mNumber = Number(m);
    if (isNaN(nNumber) | isNaN(mNumber))
      reject("invalid input \n Example: 1 2");
    resolve([nNumber, mNumber]);
  });
}

main();
