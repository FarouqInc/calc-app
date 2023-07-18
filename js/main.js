import { init } from "./utilities.js";
import { createVariable,evaluateExpression,checkEvaluated } from './inputCases.js';
const { sin, tan, cos, PI: pi ,E:e} = Math;

window.onload = init();

let buttons = document.getElementById("buttonContainer");
buttons.addEventListener("click", processInput);

function processInput(event) {
  let expression = "";
  let pressedButtonValue= event.target.innerText;
  let textField = document.getElementById("inputScreen");
  let lastStepScreen = document.getElementById("lastStepScreen");

  // To reset the textfield after a result is generated.
  checkEvaluated(textField,lastStepScreen);

  // Option 1: Create a Variable
  if (pressedButtonValue === "VAR") {
    createVariable(textField);
  }
  // Option 2: Evaluate the Expression
  else if (pressedButtonValue === "=") {
    expression = textField.value;
    evaluateExpression(textField,lastStepScreen,expression);
  } 
  // Option 3: Backspace
  else if (pressedButtonValue === "<=") {
    let textField = document.getElementById("inputScreen");
    textField.value = textField.value.slice(0, -1);
  } 
  // Option 4: Enter a value
  else {
    let textField = document.getElementById("inputScreen");
    textField.value = textField.value + pressedButtonValue;
  }
}
