"use strict"
let randomNumber, attempts, isGameOver;
const message = document.getElementById("message");
const resultDiv = document.getElementById("result");
const resultValue = document.getElementById("resultValue");
const restartButton = document.getElementById("restartButton");
const userGuessInput = document.getElementById("userGuess");
const guessButton = document.getElementById("guessButton");
initializeGame();
function initializeGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  isGameOver = false;
  message.textContent = "Devinez le nombre entre 1 et 100.";
  resultDiv.style.display = "none";
  restartButton.style.display = "none";
  userGuessInput.disabled = false;
  guessButton.disabled = false;
  userGuessInput.focus();
}
guessButton.addEventListener("click", checkGuess);
userGuessInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});
restartButton.addEventListener("click", initializeGame);
function checkGuess() {
  if (isGameOver) return;
  const userGuess = parseInt(userGuessInput.value);
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
  } else {
    attempts--;
    if (userGuess === randomNumber) {
      endGame(true);
    } else if (attempts === 0) {
      endGame(false);
    } else {
      message.textContent = `Tentatives restantes : ${attempts}`;
      message.textContent += userGuess < randomNumber ? " | Le nombre est plus grand." : " | Le nombre est plus petit.";
      userGuessInput.value = "";
    }
  }
}
function endGame(isWinner) {
  isGameOver = true;
  userGuessInput.disabled = true;
  guessButton.disabled = true;
  resultDiv.style.display = "block";
  restartButton.style.display = "block";
  if (isWinner) {
    message.textContent = `Félicitations ! Vous avez trouvé le nombre ${randomNumber} en ${10 - attempts} essais.`;
  } else {
    message.textContent = `Désolé, vous avez épuisé toutes vos tentatives. Le nombre était ${randomNumber}.`;
  }
  resultValue.textContent = isWinner ? "Gagné !" : "Perdu.";
}
