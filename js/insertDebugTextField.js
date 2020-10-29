// insertDebugTextBox

function insertDebugTextField() {
  return `/* Debugging */
a!textField(
  label: "DEBUG",
  readOnly: true,
  value: ""
),`
}


document.activeElement.value = insertDebugTextField()
