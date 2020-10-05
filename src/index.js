let row,
  rowSquare,
  moves,
  Xscore = 0,
  Oscore = 0,
  versusPlayer,
  won;
let x = new Player(row),
  o = new Player(row);

initializeVars();
createButtons(row);

function setXO(id) {
  let btn = document.getElementById(id);
  if (btn.innerHTML === `&nbsp;`) {
    console.log(versusPlayer, won);
    !versusPlayer
      ? moves % 2 === 0
        ? changeTile(btn, id, x)
        : changeTile(btn, id, o)
      : (changeTile(btn, id, x), playAI());
  }
}

function changeTile(btn, id, obj) {
  btn.innerHTML = obj.name;
  btn.style.backgroundColor = `#A9A9A9`;
  updateMoves(id, obj);
  gameOver(obj);
}

function gameOver(obj) {
  if (checkWin(obj)) {
    alert(`${obj.name} has won the game! Resetting!`);
    reset();
  } else if (moves === rowSquare) {
    alert(`Draw! Resetting!`);
    reset();
  }
}

function checkWin(obj) {
  let { rows, cols } = obj;
  for (let x = 0; x < row; x++) {
    if (rows[x] === row || cols[x] === row) {
      updateScore(obj);
      return true;
    }
  }
  if (obj.leftDiag === row || obj.rightDiag === row) {
    updateScore(obj);
    return true;
  }
}

function switchModes(state) {
  let msgs = [
    "Switching to AI!\nYou will lose your progress. Do you wish to proceed?",
    "Switching to two player mode!\nYou will lose your progress. Do you wish to proceed?"
  ];
  state
    ? confirm(msgs[0])
      ? reset()
      : null
    : confirm(msgs[1])
    ? reset()
    : null;
}

function playAI() {
  let x, y, spot, btn;
  while (true) {
    (x = randSpot()), (y = randSpot()), (spot = y * row + x);
    btn = document.getElementById(`btn${spot}`);
    if (btn.innerHTML === `&nbsp;`) {
      changeTile(btn, spot, o);
      break;
    }
  }
}

function Player(row, name) {
  this.name = name;
  this.rows = Array(row).fill(0);
  this.cols = Array(row).fill(0);
  this.leftDiag = 0;
  this.rightDiag = 0;
}

function initializeVars() {
  let checkBox = document.getElementById("checkbox");
  versusPlayer = checkBox.checked;

  (row = 3),
    (rowSquare = row ** 2),
    (moves = 0),
    (x = new Player(row, "X")),
    (o = new Player(row, "O"));
}

function createDivs(row) {
  let div,
    gameDiv = document.getElementById("game");
  for (let x = 1; x <= row; x++) {
    div = document.createElement(`div`);
    div.id = `div${x}`;
    div.className = `btnContainers`;
    div.style.flexDirection = `column`;

    gameDiv.appendChild(div);
  }
}

function createButtons(row) {
  createDivs(row);
  setScoreWidth(row);

  let btn, div;
  for (let x = 0; x < rowSquare; x++) {
    btn = document.createElement(`button`);
    btn = document.createElement(`button`);
    btn.id = `btn${x}`;
    (btn.className = `btn`), (btn.innerHTML = `&nbsp`);
    btn.setAttribute(`onclick`, `setXO(this.id)`);

    div = document.getElementById(`div${(x % row) + 1}`);
    div.appendChild(btn);
  }
}

function setScoreWidth(row) {
  let div = document.getElementById("score");
  div.style.width = row * 100 + `px`;
}

function updateScore(obj) {
  if (obj.name === `X`) {
    Xscore++;
    document.getElementById("Xscore").textContent = Xscore;
  } else {
    Oscore++;
    document.getElementById("Oscore").textContent = Oscore;
  }
}

function updateMoves(id, obj) {
  moves++;
  let x, y, num;
  if (typeof id !== "number") {
    num = parseInt(id.substring(3, id.length));
  }
  (x = num % row), (y = Math.floor(num / row));
  obj.rows[x]++, obj.cols[y]++;
  if (x === y) obj.leftDiag++;
  if (x === row - 1 - y) obj.rightDiag++;
}

function reset() {
  let btns = Array.from(document.querySelectorAll(".btn"));
  for (btn of btns) {
    btn.innerHTML = `&nbsp`;
    btn.style.backgroundColor = `#696969`;
  }
  initializeVars();
}

function randSpot() {
  return Math.floor(Math.random() * row);
}
