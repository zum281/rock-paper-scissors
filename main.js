const aiChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
};

const checkWinner = (playerChoice) => {
  const computerChoice = aiChoice();
  if (playerChoice === computerChoice) return [1, 1];
  if (playerChoice === "rock" && computerChoice === "scissors") return [1, 0];
  if (playerChoice === "paper" && computerChoice === "rock") return [1, 0];
  if (playerChoice === "scissors" && computerChoice === "paper") return [1, 0];
  return [0, 1];
};

const playRound = (
  playerChoice,
  playerScore,
  aiScore,
  round,
  endGame,
  playerButtons,
) => {
  const playerScoreCointainer = document.querySelector("#player-score");
  const aiScoreContainer = document.querySelector("#ai-score");
  const roundContainer = document.querySelector("#round");
  const endGameContainer = document.querySelector(".game-over");
  const endGameMessage = document.querySelector("#game-over-message");
  const modal = document.querySelector("#modal");

  const score = checkWinner(playerChoice);
  playerScore += score[0];
  aiScore += score[1];

  modal.innerHTML = `
    <div class="modal-content">
      <p>${
        score[0] > score[1]
          ? "Player wins"
          : score[0] < score[1]
          ? "AI wins"
          : "It's a tie"
      }</p>
      <button id="restart" onclick="newRound()">New Round</button>
    </div>
  `;
  modal.style.display = "flex";

  playerScoreCointainer.innerHTML = playerScore;
  aiScoreContainer.innerHTML = aiScore;

  round++;

  if (round < 6) roundContainer.innerHTML = round;

  if (round === 6) {
    endGame = true;

    playerButtons.forEach((btn) => (btn.disabled = true));

    endGameContainer.style.display = "block";

    const winner =
      playerScore > aiScore ? "player" : playerScore < aiScore ? "ai" : "tie";

    if (winner !== "tie") {
      endGameMessage.innerHTML = `${winner} wins the game!`;
    } else {
      endGameMessage.innerHTML = "It's a tie!";
    }
  }

  return { playerScore, aiScore, round, endGame };
};

const playGame = () => {
  const playerButtons = document.querySelectorAll(
    "button:not(#restart):not(#modal button):not(#end-game button)",
  );

  let playerScore = 0;
  let aiScore = 0;
  let round = 1;
  let endGame = false;

  playerButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const playerChoice = e.target.alt;

      const result = playRound(
        playerChoice,
        playerScore,
        aiScore,
        round,
        endGame,
        playerButtons,
      );

      playerScore = result.playerScore;
      aiScore = result.aiScore;
      round = result.round;
      endGame = result.endGame;
    }),
  );
};

const newRound = () => {
  const modal = document.querySelector("#modal");
  modal.innerHTML = "";
  modal.style.display = "none";
};

playGame();
