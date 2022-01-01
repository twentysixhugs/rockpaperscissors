function getRandInt(max) {
    return Math.floor(Math.random() * max);
}

function computerPlay() {
    let randomOption = getRandInt(3);
    
    if (randomOption === 0) return "rock";
    if (randomOption === 1) return "paper";
    if (randomOption === 2) return "scissors";
}

function playRound(computerSelection, playerSelection) {

    let paperBeatsRockMsg = "Paper beats rock!";
    let scissorsBeatPaperMsg = "Scissors beat paper!";
    let rockBeatsScissorsMsg = "Rock beats scissors!";

    if (computerSelection === playerSelection) {
        return "Tie for this round.";
    }

    if (computerSelection === "rock" && playerSelection == "paper") {
        return paperBeatsRockMsg + " " + "You won this round!";
    }
    if (playerSelection === "rock" && computerSelection === "paper") {
        return paperBeatsRockMsg + " " + "You lost this round!";
    }
    
    if (computerSelection === "paper" && playerSelection === "scissors") {
        return scissorsBeatPaperMsg + " " + "You won this round!";
    }
    if (computerSelection === "scissors" && playerSelection === "paper") {
        return scissorsBeatPaperMsg + " " + "You lost this round!";
    }

    if (computerSelection === "rock" && playerSelection === "scissors") {
        return rockBeatsScissorsMsg + " " + "You lost this round!";
    }
    if (computerSelection === "scissors" && playerSelection === "rock") {
        return rockBeatsScissorsMsg + " " + "You won this round!";
    }

}

function handleGameResult (msg) {
    gameResult.textContent = msg;
    buttons.forEach(button => button.removeEventListener("click", eventHandler));

    roundResult.textContent = "The game has ended.";

    const playAgainBtn = document.createElement("button");

    playAgainBtn.setAttribute("id", "play-again");
    playAgainBtn.textContent = "Play again";

    resultContainer.appendChild(playAgainBtn);

    playAgainBtn.addEventListener("click", () => {
        resultContainer.removeChild(playAgainBtn);
        gameResult.textContent = "";
        
        playerWins.textContent = "Your wins: 0";
        computerWins.textContent = "Computer's wins: 0";
        ties.textContent = "Ties: 0";

        startGame();
    });


}

function eventHandler(e) {
    roundResult.textContent = playRound(computerPlay(), this.textContent.toLowerCase());

    if (roundResult.textContent.includes("You won")) {
        playerWinsCount++;
    } else if (roundResult.textContent.includes("You lost")) {
        computerWinsCount++;
    } else {
        tiesCount++;
    }

    playerWins.textContent = "Your wins: " + playerWinsCount;
    computerWins.textContent = "Computer's wins: " + computerWinsCount;
    ties.textContent = "Ties: " + tiesCount;

    if (playerWinsCount === 5) {
        handleGameResult("Congratulations! You've won!");
    }
    if (computerWinsCount === 5) {
        handleGameResult("You've lost. Better luck next time!");
    }
}


function startGame() {

    roundResult.textContent = "The game hasn't started yet";

    playerWinsCount = 0;
    computerWinsCount = 0;
    tiesCount = 0;


    buttons.forEach(button => button.addEventListener("click", eventHandler));
}

const buttons = document.querySelectorAll("button");

let playerWinsCount;
let computerWinsCount;
let tiesCount;


const resultContainer = document.querySelector(".result-container");

const roundResult = document.getElementById("round-result");

const playerWins = document.getElementById("player-wins");
const computerWins = document.getElementById("computer-wins");
const ties = document.getElementById("ties");

const gameResult = document.getElementById("game-result");

startGame();