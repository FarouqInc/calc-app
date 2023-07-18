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
  var pattern = /^[A-Za-z_][A-Za-z0-9_]*$/;
  return pattern.test(variableName);
}

function validateVariableValue(variableValue) {
  var pattern = /^[0-9]*$/;
  return pattern.test(variableValue);
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

function VariableValueCollection(event){
  console.log("entered");
            if (event.key == "Enter") {
              let variableValue = event.target.value.split(" ")[2]; // Get number at the end of equation
              if (validateVariableValue(variableValue)) {
                nowVariable.reset();
                nowVariable.name = event.target.value.split(" ")[0];
                nowVariable.value = parseInt(variableValue);
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
  
}

export {VariableCollection,resolveVariables};