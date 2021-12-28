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
        return "Tie";
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

function getLowerCaseUserInput() {
    while(true) {
        let userInput = prompt("Choose rock, paper or scissors").toLowerCase();

        //validate user input
        if (userInput !== "rock" && userInput !== "paper" && userInput !== "scissors") {
            console.log("Incorrect input. Please, try again.");
        }
        else {
            return userInput;
        }
    }
}

function game() {
    let countPlayerWins = 0;
    let countComputerWins = 0;

    for (let i = 0; i < 5; i++) {
        console.log("Current round is " + (i + 1));

        let playerSelection = getLowerCaseUserInput();
        let computerSelection = computerPlay();

        let roundResult = playRound(computerSelection, playerSelection);

        if (roundResult.includes("You won")) {
            countPlayerWins++;
        }
        else if (roundResult.includes("You lost")) {
            countComputerWins++;
        }

        console.log(roundResult);
        
    }

    if (countPlayerWins > countComputerWins)
        console.log("Congratulations! You won the game!");
    if (countComputerWins > countPlayerWins)
        console.log("You lost the game! Better luck next time!");
    if (countPlayerWins == countComputerWins) //that is, if both 0 (or for whatever reason not 0 but the same)
        console.log("The result is tie.");
}


game();