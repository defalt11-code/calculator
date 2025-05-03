const buttons = document.querySelector('.buttons-container');
const display = document.querySelector('.display');

let firstOperand = "";
let secondOperand = "";
let operator = "";


display.textContent = "0";

buttons.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.id;
  console.log(typeof value);
  if(target.tagName !== "BUTTON") return;

  if(value === "clear") {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    display.textContent = "";
    return;
  };

                            /* GOOD MORNIG SELF! */
    /* FINISH THIS CODE TODAY!! MAKE YOUR SELF PROUD!!! PLEASE DO IT! */
          /* FOR YOUR FAMILY DREAMS AND FOR MY DREAM! PLEASE!! */
          /*  DON'T FORGET TO REMOVE THE EXPRESSION VARIABLES! */
                              /* GOOD LUCK! */

  if(!isNaN(value) || value === "."){
    if(!operator) {
      firstOperand += value;
      display.textContent = firstOperand;
    } else {
      secondOperand += value;
      display.textContent = firstOperand + operator + secondOperand;
    }
  } else if(["+", "-", "*", "/",].includes(value)) {
    operator = value;
    display.textContent = firstOperand + operator;
  } else if(value === "=") {
    let result = operate(Number(firstOperand), operator, Number(secondOperand));
    display.textContent = result;
    firstOperand = result;
    secondOperand = "";
  }

  console.log(`VALUE: ${value}`)

  console.log(`first operand: ${firstOperand}`);
  console.log(`operator: ${operator}`);
  console.log(`second operand: ${secondOperand}`);

});

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

// first < 0 ? return : firsOperan / secondOperand