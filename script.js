//add these to game-status when playing
//make a popup window for 'how to play' instructions
//<div id="player-wins">Player wins: 0</div>
//<div id="computer-wins">Computer wins: 0</div>
//the font should be bigger!!!
function getRandInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice(options) {
    return options[getRandInt(3)];
}

function getPlayerChoice(options, e)
{
    let playerChoice;
    playerChoice = options.find(element => element === e.currentTarget.id);

    return playerChoice;
}

function getRoundResultMsg(playerSelection, computerSelection)
{
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
        return paperBeatsRockMsg + " " + "You lost this round.";
    }
    
    if (computerSelection === "paper" && playerSelection === "scissors") {
        return scissorsBeatPaperMsg + " " + "You won this round!";
    }
    if (computerSelection === "scissors" && playerSelection === "paper") {
        return scissorsBeatPaperMsg + " " + "You lost this round.";
    }

    if (computerSelection === "scissors" && playerSelection === "rock") {
        return rockBeatsScissorsMsg + " " + "You won this round!";
    }
    if (computerSelection === "rock" && playerSelection === "scissors") {
        return rockBeatsScissorsMsg + " " + "You lost this round.";
    }
}

function playRound(e) {
    const weaponAsk = document.getElementById("ask-weapon");
    weaponAsk.textContent = "Fight!";

    const options = ['rock', 'paper', 'scissors'];

    const playerChoice = getPlayerChoice(options, e);
    const computerChoice = getComputerChoice(options);

    const roundResultMsg = getRoundResultMsg(playerChoice, computerChoice);


    if (roundResultMsg.includes("You won"))
        playerWinsCount++;
    if (roundResultMsg.includes("You lost"))
        computerWinsCount++;
    if (roundResultMsg.includes("Tie"))
        tiesCount++;

    const playingDivs = getPlayingDivs();


    playingDivs.divRoundResult.textContent = roundResultMsg;
    playingDivs.divPlayerWins.textContent = "Your wins: " + playerWinsCount;
    playingDivs.divComputerWins.textContent = "Computer's wins: " + computerWinsCount;
    playingDivs.divTies.textContent = "Ties: " + tiesCount;

    if (playerWinsCount === 5) {
        finishGame('player');
    }
            
    if (computerWinsCount === 5){
        finishGame('computer'); 
    }

}

function getPlayingDivs() {
    const playingDivs = {
        'divPlayingContainer': document.getElementById('playing'),
        'divRoundResult': document.getElementById('round-result'),
        'divPlayerWins': document.getElementById('player-wins'),
        'divComputerWins': document.getElementById('computer-wins'),
        'divTies': document.getElementById('ties')
    }
    
    return playingDivs;
}

function createPlayingDivs() {
    if (!gamePlayedAgain) {
        var divRoundResult = document.createElement("div");
        divRoundResult.setAttribute("id", "round-result");
    
    
        var divPlayerWins = document.createElement("div");
        divPlayerWins.setAttribute("id", "player-wins");
    
        var divComputerWins = document.createElement("div");
        divComputerWins.setAttribute("id", "computer-wins");
    
        var divTies = document.createElement("div");
        divTies.setAttribute("id", "ties");

        divStats.removeChild(divNotPlayingContainer);
        divStats.appendChild(divPlayingContainer);


        divPlayingContainer.appendChild(divRoundResult);
        divPlayingContainer.appendChild(divPlayerWins);
        divPlayingContainer.appendChild(divComputerWins);
        divPlayingContainer.appendChild(divTies);
    }

    if (gamePlayedAgain) {
        var playingDivs = getPlayingDivs();

        divStats.appendChild(divPlayingContainer);

        playingDivs.divRoundResult.textContent = "";

        divPlayingContainer.appendChild(playingDivs.divRoundResult);
        divPlayingContainer.appendChild(playingDivs.divPlayerWins);
        divPlayingContainer.appendChild(playingDivs.divComputerWins);
        divPlayingContainer.appendChild(playingDivs.divTies);
    }

    

    divsCreated = true;
}

function removePlayingDivs() {
    divStats.removeChild(divPlayingContainer);
}


function finishGame(winner) {
    
    const weaponAsk = document.getElementById("ask-weapon");
    weaponAsk.textContent = "The game has ended.";

    const playingDivs = getPlayingDivs();

    //removePlayingDivs();

    let gameResultMsg;

    const divGameResultMsg = document.createElement('div');
    divGameResultMsg.setAttribute('id', 'game-result');

    if (winner === 'player') {
        gameResultMsg = 'Congratulations! You\'ve won!';
    }
    if (winner === 'computer') {
        gameResultMsg = "You've lost. Better luck next time!";
    }

    divGameResultMsg.textContent = gameResultMsg;

    divStats.appendChild(divGameResultMsg);
    divStats.appendChild(playingDivs.divPlayerWins);
    divStats.appendChild(playingDivs.divComputerWins);
    divStats.appendChild(playingDivs.divTies);

    divPlayerWins = 0;
    divComputerWins = 0;
    divTies = 0;

    divsCreated = false;


    const choiceSelections = document.querySelectorAll("#rock, #paper, #scissors");

    choiceSelections.forEach(choice => choice.removeEventListener('click', playRound), {
        capture: true
    });

    divStats.appendChild(restartBtn);

}

function createPlayButton(text, id) {
    const btn = document.createElement("button");

    btn.setAttribute('id', id);

    btn.textContent = text;

    return btn;
}

function start() {
    const weaponAsk = document.getElementById("ask-weapon");
    weaponAsk.textContent = "Choose your weapon!";

    playerWinsCount = 0;
    computerWinsCount = 0;
    tiesCount = 0;

    if (!divsCreated)
        createPlayingDivs();

    const playingDivs = getPlayingDivs();

    playingDivs.divPlayerWins.textContent = "Your wins: " + playerWinsCount;
    playingDivs.divComputerWins.textContent = "Computer's wins: " + computerWinsCount;
    playingDivs.divTies.textContent = "Ties: " + tiesCount;

    const choiceSelections = document.querySelectorAll("#rock, #paper, #scissors");

    choiceSelections.forEach(choice => choice.addEventListener('click', playRound), {
        capture: true
    });
}

let divsCreated = false;
let gameFinished = false;
let gamePlayedAgain = false;
    
let playerWinsCount, computerWinsCount, tiesCount;

const divStats = document.querySelector(".stats");

const divPlayingContainer = document.createElement("div");
divPlayingContainer.setAttribute("id", "playing");

const divNotPlayingContainer = document.querySelector("#not-playing");

const restartBtn = createPlayButton("Play again", "restart-btn");
const startBtn = createPlayButton("Play", "start-btn");

divStats.appendChild(startBtn);


startBtn.onclick = () => {
    divStats.removeChild(startBtn);
    divStats.style.gap = "4px";
    start();
};

restartBtn.onclick = () => {
    gamePlayedAgain = true;
    divStats.removeChild(restartBtn);
    
    const divGameResult = document.getElementById("game-result");
    divStats.removeChild(divGameResult);

    start();
};
