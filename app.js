let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#newBtn");
let msg = document.querySelector(".msg");
let resetGameBtn = document.querySelector("#resetBtn");
let startGameBtn = document.querySelector("#startBtn");
let mainDisplay = document.querySelector(".mainDisp");
let InitialDisplay = document.querySelector(".initialInput");
let dispTurn = document.querySelector(".turn");

let player1Name = "";
let player2Name = "";

function startGame() {
  player1Name = document.getElementById("player1Name").value;
  player2Name = document.getElementById("player2Name").value;

  if (player1Name === "" || player2Name === "") {
    alert("Please enter names for both players.");
  } else {
    mainDisplay.classList.remove("hide");
    InitialDisplay.classList.add("hide");
    dispTurn.innerHTML = `${player1Name}'s turn`; 
  }
}

startGameBtn.addEventListener("click", startGame);

let turnX = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnX) {
        box.innerText = "X";
        turnX = false;
        box.style.color = "black";
        // box.style.color = "#d4a909";
        box.style.color = "#edc321";
        dispTurn.innerHTML = `${player2Name}'s turn`;
      } else {
        box.innerText = "O";
        turnX = true;
        box.style.color = "white";
        // box.style.color = "#edc321";
        box.style.color = "#ffb011";
        dispTurn.innerHTML = `${player1Name}'s turn`;
      }
      count += 1;
      console.log(count);
      box.disabled = true;
      checkWinner();
    }
  });
});

const checkWinner = () => {
  winPatterns.forEach(pattern => {
    let winnerFound = false;
    let position1Val = boxes[pattern[0]].innerText;
    let position2Val = boxes[pattern[1]].innerText;
    let position3Val = boxes[pattern[2]].innerText;
    if (position1Val !== "" && position2Val !== "" && position3Val !== "") {
      if (position1Val === position2Val && position2Val === position3Val) {
        console.log(`Player ${position1Val} won!`);
        disableBoxes();
        showWinner(position1Val);
        winnerFound = true;
      } else if (winnerFound === false && count === 9) {
        msg.classList.remove("hide");
        newGameBtn.parentElement.classList.remove("hide");
        dispTurn.classList.add("hide");
        msg.innerHTML = `The game is draw`;
      }
    }
  });
};

function showWinner(winner) {
  dispTurn.classList.add("hide");
  msg.classList.remove("hide");
  newGameBtn.parentElement.classList.remove("hide");
  if (winner == "X") {
    msg.innerHTML = `${player1Name} won!`;
  } else {
    msg.innerHTML = `${player2Name} won!`;
  }
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

function resetGame() {
  turnX = true;
  enableBoxes();
  msg.classList.add("hide");
  dispTurn.classList.remove("hide");
  newGameBtn.parentElement.classList.add("hide");
  count = 0;
  console.log("game reseted");
  dispTurn.innerHTML = `${player1Name}'s turn`; 
}

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
