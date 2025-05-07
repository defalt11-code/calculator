const buttons = document.querySelector(".buttons-container");
const display = document.querySelector(".value");
const expressionHTML = document.querySelector(".expression");

// Operand Variable!!
let displayFirstOperand = "";
let displaySecondOperand = "";
let displayOperator = "";

let firstOperand = "";
let operator = "";
let secondOperand = "";
let expression = "";
// I place the result as global scope because of the ERROR string becoming firstOperand
let result;

display.textContent = "0";

// Event listeners press buttons!! 
addEventListener("keydown", (event) => {
  const value = event.key;
  console.log(value);
  keysOperate(value);

  console.log(`First operand: ${firstOperand}`);
  console.log(`Operator: ${operator}`);
  console.log(`Second operand: ${secondOperand}`); 
});

// Buttons event listeners!!!
buttons.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if(button) {
    let value = button.id;
    keysOperate(value);
  }

// I use to to track my variable to help me debug it!!
  console.log(`First operand: ${firstOperand}`);
  console.log(`Operator: ${operator}`);
  console.log(`Second operand: ${secondOperand}`); 
 
})

// OPERATE WHAT BUTTON HAS PRESS
function keysOperate(value) {
  if(value === "Backspace") {
    handleBackspace();
  }
  if(value === "Delete") { 
    clearAll();
  }

  if(!isNaN(value)) {
    handleNumer(value);
  }

  if(value === ".") {
    handleDecimal(value);
  }

  if(["+", "-", "*", "/"].includes(value)) {
    handleOperator(value);
  }
  if(value === "=" || value === "Enter") {
    calculateResult();
  }
}

// HANDLE THE BACKSPACE KEY
function handleBackspace() {
  if(result || result == "0") {
    secondOperand = "";
    expressionHTML.textContent = "";
    return;
  }
  if(operator !== "") {
    secondOperand = secondOperand.slice(0, secondOperand.length -1);
    display.textContent = secondOperand;
    if(secondOperand == "") {
      display.textContent = "0";
      displayFirstOperand = firstOperand;
      displayOperator =  operator;
      expressionHTML.textContent = `${displayFirstOperand} ${displayOperator}`;
    }
  }else if(firstOperand == ""){
    display.textContent = "0" 
  }else {
    firstOperand = firstOperand.slice(0, firstOperand.length -1);
  }
  console.log(result);
}

// CLEAR ALL THE DISPLAY
function clearAll() {
  firstOperand = "";
  operator = "";
  secondOperand = "";
  result = "";

  displayFirstOperand = "";
  displayOperator = "";
  displaySecondOperand = "";

  display.textContent = "0";
  expressionHTML.textContent = "";
}

// HANDLE NUMBER
function handleNumer(value) {
  if(!operator) {
    //Stops the number from growing
    if(result) {
      result = "";
      if(firstOperand.length >= 15) return;
      firstOperand += value;
      displayFirstOperand = firstOperand;
      display.textContent = displayFirstOperand;
      expressionHTML.textContent = "";
    } else {
      if(firstOperand.length >= 15) return;
      firstOperand += value;
      displayFirstOperand = firstOperand;
      display.textContent = displayFirstOperand;
      expressionHTML.textContent = ""
    }
  }else {
    //Stops the number from growing
    if(secondOperand.length >= 15) return;
    secondOperand += value;
    displaySecondOperand = secondOperand
    display.textContent = displaySecondOperand;
  }

  console.log(`Value: ${value}`)
}

// HANDLE DECIMAL
function handleDecimal(value) {
  const currentOperand = operator ? secondOperand : firstOperand;
  if(value === "." && currentOperand.includes(".")) return;

  if(!operator) {
    firstOperand += ".";
    display.textContent = firstOperand;
  }else{
    secondOperand += ".";
    display.textContent = secondOperand;
  }
}

// HANDLE OPERATOR
function handleOperator(value) {
  operator = value;
  if(!firstOperand) {
    firstOperand = "0";
  };
  if(result) {
    firstOperand = result;
    result = operate(Number(firstOperand), operator, Number(secondOperand));
    display.textContent = result;
  }
  expressionHTML.textContent = firstOperand + operator;
  console.log(`Value: ${value}`);
}

// CALCULATE THE RESULT
function calculateResult() { 
  if(!operator) {
    firstOperand = "";
    secondOperand = "";
    display.textContent = "0";
  }else {
    // Mirror operand on empty input
    if(!secondOperand) {
      secondOperand = firstOperand;
      if(firstOperand && operator && secondOperand) {
        result = operate(Number(firstOperand), operator, Number(secondOperand));
        // Avoid unecessary decimals!!
        if(Number.isInteger(result)) {
          display.textContent = result;
        }else {
          display.textContent = result.toFixed(2);
        }
        displayFirstOperand = firstOperand;
        displayOperator = operator;
        displaySecondOperand = secondOperand;

        expressionHTML.textContent = `${displayFirstOperand} ${displayOperator} ${displaySecondOperand} =`; 

        firstOperand = "";
        operator = "";
        secondOperand = "";
      }
    }else if(firstOperand && operator && secondOperand) {
        result = operate(Number(firstOperand), operator, Number(secondOperand));
        // Avoid unnecessary decimals!1
        if(Number.isInteger(result)) {
          display.textContent = result;
        }else {
          display.textContent = result.toFixed(2);
        }
        displayFirstOperand = firstOperand;
        displayOperator = operator;
        displaySecondOperand = secondOperand;

        expressionHTML.textContent = `${displayFirstOperand} ${displayOperator} ${displaySecondOperand} =`; 

        firstOperand = "";
        operator = "";
        secondOperand = "";
    }
  }
}

// function that operate whole thing if "=" or "Enter" is press
function operate(firstOperand, operator, secondOperand) {
  switch(operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*": 
      return firstOperand * secondOperand;
    case "/":
      return secondOperand === 0 ? "ERROR" : firstOperand / secondOperand;
  }
}