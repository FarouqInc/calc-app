function formatEquation(unformattedString) {
    return unformattedString.toLowerCase().replace("pow", "**").replace("x", "*");
}

function clearField(event) {
    var textField = event.target;
    textField.value = "";
}
export {formatEquation,clearField}