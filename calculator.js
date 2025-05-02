const buttons = document.querySelector('.buttons-container');
const display = document.querySelector('.display');

let firstOperand = '';
let operator = '';
let secondOperand = '';

buttons.addEventListener("click", (event) => {
  let target = event.target;
  let value = target.id;

  if(value === "clear") {
    firstOperand = "";
    operator = "";
    secondOperand = "";
    display.textContent = "";
    return;
  }

  if(target.tagName !== "BUTTON") return;
  console.log(value);
  console.log(`first operator: ${firstOperand}`);
  console.log(`Second operand: ${secondOperand}`);
  console.log(`Operator: ${operator}`);

  if(!operator) {
    firstOperand += value;
    display.textContent = value;
  }else {
    secondOperand += value;
    display.textContent = value;
  }
});





function operate(firstOperand, operator, secondOperand) {
  
}

console.log("something is wrong")

