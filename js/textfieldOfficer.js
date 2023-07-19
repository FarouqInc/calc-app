import {resolveVariables} from './validation.js'

function formatEquation(unformattedString) {
    let formattedString = resolveVariables(unformattedString);
    return formattedString
      .toLowerCase()
      .replace(/pow/g, "**")
      .replace(/x/g, "*");
}

function clearField(event) {
    var textField = event.target;
    textField.value = "";
}
export {formatEquation,clearField}