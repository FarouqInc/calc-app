import {clearField} from './textfieldOfficer.js';
var nowVariable = {
    name:"",
    value:0,
    reset: function () {
        this.name = "";
        this.value = 0;
    }
}

var totalVariables = [];

function validateVariableName(variableName) {
  const pattern = /^[A-Za-z_][A-Za-z0-9_]*$/;
  let invalidCheck = !invalidVariableNames.some((iv) => checkInvalid(iv, variableName));
  return (pattern.test(variableName) && invalidCheck);
}

function validateVariableValue(variableValue) {
  variableValue = resolveVariables(variableValue);
  try{
    variableValue = eval(variableValue);
    variableValue = variableValue.toString();
    var pattern = /^[0-9]*$/;
    return pattern.test(variableValue);
  }
  catch(e){
    return false;
  }
}


function VariableCollection(event){
    if (event.key == "Enter") {
        if (validateVariableName(event.target.value)) {
          event.target.value = event.target.value + " = ";
          event.target.removeEventListener("keydown", VariableCollection);
          event.target.addEventListener("keydown", VariableValueCollection);
        } else {
          event.target.value = "ERROR: Invalid Variable Name";
        }
    }
}

const invalidVariableNames = ['e','pi','sin','cos','tan','exp','pow'];
//!invalidVariableNames.some((iv) => checkInvalid(iv, name))
function checkInvalid(iv,given_iv){
  return iv == given_iv;
}

function VariableValueCollection(event){
            if ((event.key == "Enter")) {
              let variableValue = event.target.value.split(" ")[2]; // Get number at the end of equation
              if (validateVariableValue(variableValue)) {
                nowVariable.reset();
                nowVariable.name = event.target.value
                  .split(" ")[0]
                  .toLowerCase();
                variableValue = resolveVariables(variableValue);
                nowVariable.value = parseInt(eval(variableValue));
                totalVariables.push({...nowVariable});
                event.target.value = "Variable Registered!";
                setTimeout(() => {
                  clearField(event);
                },1400);
              } 
              else {
                event.target.value =
                  "ERROR: Invalid Variable Value";
              }
              event.target.removeEventListener(
                "keydown",
                VariableValueCollection
              );
            }
}

function resolveVariables(expression){
  totalVariables.forEach((current) => {
    let matchingCriteria = new RegExp("[+-/*(]?" + current.name + "[)+-/*]?");
    if(matchingCriteria.test(expression.toLowerCase())){
      expression = expression.toLowerCase().replace(new RegExp(current.name, 'g'),current.value);
      console.log(expression);
    }
  });
  return expression;
}

export {VariableCollection,resolveVariables};