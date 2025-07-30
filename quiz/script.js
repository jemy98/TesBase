const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Great White Shark", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "NaCl", correct: false },
    ],
  },
  {
    question: "Which element has the atomic number 1?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Carbon", correct: false },
      { text: "Nitrogen", correct: false },
    ],
  },
  {
    question: "What is the largest continent on Earth?",
    answers: [
      { text: "Africa", correct: false },
      { text: "Asia", correct: true },
      { text: "North America", correct: false },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the main ingredient in guacamole?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Avocado", correct: true },
      { text: "Pepper", correct: false },
      { text: "Onion", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answers-button");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const resetButton = document.getElementById("restart-btn");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  resultContainer.style.display = "none";
  questionContainer.style.display = "block";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
    answersButton.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answersButton.firstChild) {
    answersButton.removeChild(answersButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
    selectedButton.style.backgroundColor = "#1976D2";
  } else {
    selectedButton.style.backgroundColor = "red";
  }
  Array.from(answersButton.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#1976D2";
    }
  });

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;
}
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});
resetButton.addEventListener("click", startQuiz);

startQuiz();
