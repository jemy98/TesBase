const textToTypeElement = document.getElementById("text-to-type");
const textToType = textToTypeElement.innerHTML.split(" ");
const userInput = document.getElementById("user-input");
const startButton = document.getElementById("start-button");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
console.log(textToType);
let startTime;
let timerInterval;

function startTest() {
  startTime = new Date();
  userInput.value = "";
  userInput.focus();
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  textToTypeElement.innerHTML = textToType
    .map((word) => `<span>${word}</span>`)
    .join(" ");
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  timeDisplay.innerText = elapsedTime + "s";
}

function calculatedWPM() {
  const wordsTyped = userInput.value.trim().split(" ").length;
  const elapsedTime = (new Date() - startTime) / 1000;
  const elapsedTimeInMinutes = elapsedTime / 60;
  const wpm = Math.round(wordsTyped / elapsedTimeInMinutes);
  wpmDisplay.innerText = wpm;
}

function calculateAccuracy() {
  const userWords = userInput.value.trim().split(" ");
  let correctWords = 0;
    userWords.forEach((word, index) => {
    if (word === textToType[index]) {
      correctWords++;
    }
    });
    const accuracy = Math.round((correctWords / userWords.length) * 100);
    accuracyDisplay.innerText = accuracy + "%";
}

function checkInput() {
	const typedText = userInput.value.trim().split(' ');
	const spans = textToTypeElement.querySelectorAll('span');
	typedText.forEach((word, index) => {
		if (spans[index]) {
            if (word === textToType[index]) {
				spans[index].className = 'correct';
			} else {
				spans[index].className = 'incorrect';
			}
		}
	});
	for (let i = typedText.length; i < spans.length; i++) {
		spans[i].className = '';
	}
}

function endTest() {
  clearInterval(timerInterval);
  calculatedWPM();
  calculateAccuracy();
  userInput.disabled = true;
}

startButton.addEventListener("click", () => {
  userInput.disabled = false;
  startTest();
});

userInput.addEventListener("input", () => {
  checkInput();
  const typedWords = userInput.value;
  if (typedWords.trim() === textToType.join(" ")) {
    endTest();
  }
});