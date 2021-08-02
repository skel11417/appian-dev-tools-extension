// convertToOrFromIndexFunction
function convertToOrFromIndexFunction() {
  const variableNameRegex = /local!\w+|ri!\w+/g
  const indexNotationFieldNameRegex = /"(\w+)/
  const dotNotationFieldNameRegex = /local!\w+\.(\w+)|ri!\w+\.(\w+)|/

  let textSelection = window.getSelection()
  let textString = textSelection.toString()
  let variableName = textString.match(variableNameRegex)[0]

  if ( textString.includes("index(") ) {
    // Get field name and return dot notation
    let fieldName = textString.match(indexNotationFieldNameRegex)[1]
    return `${variableName}.${fieldName}`
  } else {
    // Else get field name and return index notation
    console.log(textString.match(dotNotationFieldNameRegex))
    let fieldName = textString.match(dotNotationFieldNameRegex)[2]
    return `index(${variableName}, "${fieldName}", {})`
  }
}

document.activeElement.value = convertToOrFromIndexFunction()
