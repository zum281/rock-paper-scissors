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
  playerButtons,
) => {
  const score = checkWinner(playerChoice);
  playerScore += score[0];
  aiScore += score[1];
  console.log(playerScore, aiScore);
  round++;
  console.log(round);
  if (round === 5) {
    console.log("game over");
    playerButtons.forEach((btn) => (btn.disabled = true));
  }

  return { playerScore, aiScore, round };
};

const playGame = () => {
  const playerButtons = document.querySelectorAll("button");

  let playerScore = 0;
  let aiScore = 0;
  let round = 0;

  playerButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const playerChoice = event.target.id;
      const result = playRound(
        playerChoice,
        playerScore,
        aiScore,
        round,
        playerButtons,
      );

      playerScore = result.playerScore;
      aiScore = result.aiScore;
      round = result.round;
    }),
  );
};

playGame();
