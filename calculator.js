const buttons = document.querySelector(".buttons-container");
const display = document.querySelector(".value");
const expressionHTML = document.querySelector(".expression");

let firstOperand = "";
let operator = "";
let secondOperand = "";
let expression = "";
let arr = [];

display.textContent = "0";

// Event listeners press buttons!! 
addEventListener("keydown", (event) => {
  const value = event.key;

  if(value === "Backspace") {
    if(operator !== "") {
      secondOperand = secondOperand.slice(0, secondOperand.length -1);
      display.textContent = firstOperand + operator + secondOperand;
    }else {
      firstOperand = firstOperand.slice(0, firstOperand.length -1);
      display.textContent = firstOperand 
    }
  }

  if(value === "Delete") {
    firstOperand = "";
    operator = "";
    secondOperand = "";
    display.textContent = "0";
  }

  if(!isNaN(value) || value === ".") {
    if(!operator) {
      firstOperand += value;
      display.textContent = firstOperand;
    }else {
      secondOperand += value;
      display.textContent = secondOperand;
    }
  }else if(value === ".") {
    if(!firstOperand.includes(".")) {
      firstOperand += value;
      display.textContent = firstOperand;
    } else if(!secondOperand.includes(".")) {
      secondOperand += value;
      display.textContent = firstOperand + operator + secondOperand
    }
  }else if(["+", "-", "*", "/"].includes(value)) {
    operator = value;
    expressionHTML.textContent = firstOperand + operator
  }else if(value === "=" || value === "Enter") {
    const result = operate(Number(firstOperand), operator, Number(secondOperand));
    display.textContent = result;
    firstOperand = "";
    operator = "";
    secondOperand = "";
    expressionHTML.textContent = "";
  }
  
  console.log(`Value: ${value}`)
  console.log(`First operand: ${firstOperand}`);
  console.log(`Operator: ${operator}`);
  console.log(`Second operand: ${secondOperand}`);
});

buttons.addEventListener("click", (event) => {
  const target = event.target;
  const value = target.id;

  if(!target.tagName === "BUTTON") return;

  if(value === "delete") {
    if(operator !== "") {
      secondOperand = secondOperand.slice(0, secondOperand.length -1);
      display.textContent = firstOperand + operator + secondOperand;
    }else {
      firstOperand = firstOperand.slice(0, firstOperand.length -1);
      display.textContent = firstOperand 
    }
  }

  if(value === "clear") {
    firstOperand = "";
    operator = "";
    secondOperand = "";
    display.textContent = "0";
    expressionHTML.textContent = "";
  }

  if(!isNaN(value) || value === ".") {
    if(!operator) {
      firstOperand += value;
      display.textContent = firstOperand;
    }else {
      secondOperand += value;
      display.textContent = secondOperand;
    }
  }else if(value === ".") {
    if(!firstOperand.includes(".")) {
      firstOperand += value;
      display.textContent = firstOperand;
    } else if(!secondOperand.includes(".")) {
      secondOperand += value;
      display.textContent = firstOperand + operator + secondOperand
    }
  }else if(["+", "-", "*", "/"].includes(value)) {
    operator = value;
    expressionHTML.textContent = firstOperand + operator
  }else if(value === "=") {
    const result = operate(Number(firstOperand), operator, Number(secondOperand));
    display.textContent = result;
    firstOperand = "";
    operator = "";
    secondOperand = "";
    expressionHTML.textContent = "";
  }
  
  /* console.log(`Value: ${value}`)
  console.log(`First operand: ${firstOperand}`);
  console.log(`Operator: ${operator}`);
  console.log(`Second operand: ${secondOperand}`); 
  */
})

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