let words = ["Canada", "India", "Australia", "Germany", "Belgium", "Argentina", "China", "Brazil", "Japan", "France", "Finland", "Denmark"];
let word = words[Math.floor(Math.random() * words.length)];
let allowedErrors = 6;
let guesses = [];
let done = false;

function displayWord() {
    let display = '';
    for (let letter of word) {
        if (guesses.includes(letter.toLowerCase())) {
            display += letter + ' ';
        } else {
            display += '_ ';
        }
    }
    document.getElementById("wordDisplay").innerText = display.trim();
}

function makeGuess() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toLowerCase();
    guessInput.value = ''; // Clear input field

    if (guess.length === 1 && !guesses.includes(guess)) {
        guesses.push(guess);

        if (!word.toLowerCase().includes(guess)) {
            allowedErrors--;
            document.getElementById("errorsLeft").innerText = `Allowed Errors Left: ${allowedErrors}`;
        }

        displayWord();

        if (allowedErrors <= 0) {
            document.getElementById("result").innerText = `Sorry, you ran out of tries. The word was "${word}".`;
            endGame();
        }

        if (!word.split('').some(letter => !guesses.includes(letter.toLowerCase()))) {
            document.getElementById("result").innerText = `You found the word! It was "${word}".`;
            endGame();
        }
    }
}

function endGame() {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("playAgainContainer").style.display = "block";
    document.getElementById("exitGame").style.display = "block";
}

function startNewGame() {
    word = words[Math.floor(Math.random() * words.length)];
    allowedErrors = 6;
    guesses = [];
    done = false;
    document.getElementById("result").innerText = '';
    document.getElementById("errorsLeft").innerText = `Allowed Errors Left: 6`;
    displayWord();
    document.getElementById("guessInput").disabled = false;
    document.getElementById("playAgainContainer").style.display = "none";
    document.getElementById("exitGame").style.display = "none";
}

function exitGame() {
    if (confirm("Are you sure you want to exit the game?")) {
        window.close(); // Close the browser tab or window
    }
}

// Initialize game
displayWord();
