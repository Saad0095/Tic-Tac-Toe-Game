let boxes = document.querySelectorAll(".box")
let newGameBtn = document.querySelector("#newBtn")
let msgContainer = document.querySelector(".msgContainer")
let msg = document.querySelector(".msg")
let resetGameBtn = document.querySelector("#resetBtn")


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
]

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
      box.style.color = "black"
    } else {
      box.innerText = "O";
      turnX = true;
      box.style.color = "white"
    }
    count += 1;
    console.log(count)

    box.disabled = true;
    checkWinner();
  });

});

const checkWinner = () => {
  // for (let pattern of winPatterns) {
  winPatterns.forEach(pattern => {

    let winnerFound = false;

    // console.log(pattern)
    // console.log(pattern[0],pattern[1],pattern[2])
    // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])   
    // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText)   

    let position1Val = boxes[pattern[0]].innerText
    let position2Val = boxes[pattern[1]].innerText
    let position3Val = boxes[pattern[2]].innerText


    if (position1Val != "" && position2Val != "" && position3Val != "") {
      if (position1Val == position2Val && position2Val == position3Val) {
        console.log(`Player ${position1Val} won!`)
        disableBoxes();
        showWinner(position1Val);
        winnerFound = true;
      }

      else if (winnerFound == false && count == 9) {
        msgContainer.classList.remove("hide")
        newGameBtn.parentElement.classList.remove("hide")
        console.log(`Draw`)
        msg.innerHTML = `<h2>The game is draw</h2>`

      }
    }
  });
}


function showWinner(winner) {
  msgContainer.classList.remove("hide")
  newGameBtn.parentElement.classList.remove("hide")

  msg.innerHTML = `<h2>Player${winner} won!</h2>`
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  })
}

function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";

  })
}

function resetGame() {
  turnX = true;
  enableBoxes()
  msgContainer.classList.add("hide")
  newGameBtn.parentElement.classList.add("hide")
  count = 0

  console.log("game reseted");

}


newGameBtn.addEventListener("click", resetGame)
resetGameBtn.addEventListener("click", resetGame)


