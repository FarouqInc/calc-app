import { formatEquation, clearField } from "./textfieldOfficer.js";
import { VariableCollection } from "./validation.js";
const { PI: pi, E: e ,sqrt} = Math;
var MathD = {
    sin: function(number){
        return (Math.sin(toRadian(number)));
    },
    cos: function(number){
        return (Math.cos(toRadian(number)));
    },
    tan: function(number){
        return (Math.tan(toRadian(number)));
    }
  }
const { sin,cos,tan } = MathD;

function toRadian(degree) {
    return degree * (Math.PI / 180);
};

console.log(sin(45));

function createVariable(textField) {
  textField.value = "Enter Variable Name:";
  textField.addEventListener("click", clearField);
  textField.addEventListener("keydown", VariableCollection);
}

function evaluateExpression(textField, lastStepScreen, expression) {
  try {
    expression = formatEquation(expression);
    lastStepScreen.innerText = textField.value + " = ";
    try {
      textField.value = eval(expression).toFixed(4);
    } catch (e) {
      textField.value = "ERROR: Invalid Expression";
      setTimeout(() => {
        textField.value = "";
        lastStepScreen.innerText = "";
      }, 1300);
    }
  } catch (e) {
    textField.value = "Incorrect Input";
  }
}

function checkEvaluated(textField, lastStepScreen) {
    let toBeErased = (textField.value == eval(formatEquation(lastStepScreen.innerText.slice(0, -2))));
    if (toBeErased) {
      textField.value = "";
    }
}

export { createVariable, evaluateExpression, checkEvaluated };
