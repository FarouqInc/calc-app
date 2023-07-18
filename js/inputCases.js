import { formatEquation, clearField } from "./textfieldOfficer.js";
import { VariableCollection } from "./validation.js";

function createVariable(textField) {
  textField.value = "Enter Variable Name:";
  textField.addEventListener("click", clearField);
  textField.addEventListener("keydown", VariableCollection);
}

function evaluateExpression(textField, lastStepScreen, expression) {
  try {
    expression = formatEquation(expression);
    lastStepScreen.innerText = textField.value + " = ";
    try{
      textField.value = eval(expression).toFixed(4);
    }
    catch(e){
      textField.value = "ERROR: Invalid Expression";
      setTimeout(() => {
        clearField(textField);
      }, 1400);
    }
  } catch (e) {
    textField.value = "Incorrect Input";
    lastStepScreen.innerText = "";
  }
}

function checkEvaluated(textField,lastStepScreen){
    let toBeErased =
      textField.value ==
      eval(formatEquation(lastStepScreen.innerText.slice(0, -2)));
    if (toBeErased) {
      textField.value = "";
    }
}

export { createVariable, evaluateExpression, checkEvaluated};
