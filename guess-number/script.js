let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const message = document.getElementById('message');
const resetGame = document.getElementById('resetGame');
function checkGuess() {
    const userGuess = Number(guessInput.value);
    attempts++;
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
        message.style.color = 'red';
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
        message.style.color = 'red';
    } else {
        message.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
        message.style.color = 'blue';
        endGame();
    }
    guessInput = '';
    guessInput.focus();
}
function endGame() {
    guessInput.disabled = true;
    submitGuess.disabled = true;
    resetGame.style.display = 'inline';
}
function resetGames() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.disabled = false;
    submitGuess.disabled = false;
    message.textContent = 'Guess the number';
    message.style.color = 'black';
    resetGame.style.display = 'none';
    guessInput.value = '';
    guessInput.focus();
}
submitGuess.addEventListener('click', checkGuess);
resetGame.addEventListener('click', resetGames);
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});