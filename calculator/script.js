const calculator = {
  displayvalue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
function updateDisplay() {
  const display = document.querySelector(".display");
  display.value = calculator.displayvalue;
}
function inputDigit(digit) {
  const { displayvalue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayvalue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayvalue =
      displayvalue === "0" ? digit : displayvalue + digit;
  }
  updateDisplay();
}
function inputDecimal(dot) {
  if (!calculator.displayvalue.includes(dot)) {
    calculator.displayvalue += dot;
  }
}
function handleOperator(nextOperator) {
  const { firstOperand, displayvalue, operator } = calculator;
  const inputValue = parseFloat(displayvalue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayvalue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  updateDisplay();
}
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  } else if (operator === "%") {
    return firstOperand / secondOperand * 100;
  } else if (operator === "√") {
    return Math.sqrt(firstOperand);
  }
  return secondOperand;
}
function resetCalculator() {
  calculator.displayvalue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay();
}
function backspace() {
  const { displayvalue } = calculator;
  if (displayvalue.length > 1) {
    calculator.displayvalue = displayvalue.slice(0, -1);
  } else {
    calculator.displayvalue = "0";
  }
  updateDisplay();
}
function handleEqual() {
  const { firstOperand, displayvalue, operator } = calculator;
  const inputValue = parseFloat(displayvalue);

  if (operator && !calculator.waitingForSecondOperand) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayvalue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
  }
}
document.querySelector(".keys").addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    return;
  }

  if (target.classList.contains("equal-sign")) {
    handleEqual();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    return;
  }
  if (target.classList.contains("backspace")) {
    backspace();
    return;
  }
  inputDigit(target.value);
});
