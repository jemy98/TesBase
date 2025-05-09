const countdownElement = document.getElementById("countdown");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const daysInput = document.getElementById("daysInput");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const startButton = document.getElementById("startButton");
let countdownInterval;

function startTimer() {
  let days = parseInt(daysInput.value) || 0;
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;
  let totalSeconds =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  if (totalSeconds <= 0) {
    alert("Please enter a valid time.");
    return;
  }
  daysInput.value = '';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
  countdownInterval = setInterval(() => {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
    totalSeconds--;
    if (totalSeconds < 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = "Time's up!";
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  clearInterval(countdownInterval);
  startTimer();
});
