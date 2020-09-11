// insertDebugBoxComponent.js

// get RuleName
function getRuleName () {
  return document.querySelector(".TitleText---page_header").innerText
}

function getDistinctVariableNames () {
  let variableNodeList = document.querySelectorAll(".cm-variable")
  // May need to include if statement here if one instance of variable span does
  // not return an array
  let variableArray = [...variableNodeList]
  let variableNamesArray = variableArray.map(variableSpan => variableSpan.innerText)
  return [...new Set(filterValidVariableNames(variableNamesArray))]
}

function filterValidVariableNames (variableNamesArray) {
  // Must remove fv!item
  return variableNamesArray.map(variableName => {
    if (variableName.includes(".")) {
      return variableName.substring(0, variableName.indexOf("."))
    } else {
      return variableName
    }
  })
}

function renderSingleVariableDictionary (variableName) {
  return `{name: "${variableName}", value: ${variableName}}`
}

function renderVariablesDictionary (variableNamesArray) {
  let outputString = ""
  variableNamesArray.forEach((variableName, index) => {
    outputString += renderSingleVariableDictionary(variableName)
    if(index != variableNamesArray.length - 1){
      outputString += ", \n"
    }
  })
  return outputString
}

function renderDebugBoxSAILCode () {
  let ruleName = getRuleName()
  let variableNamesArray = getDistinctVariableNames()
  let localVariablesArray = []
  let ruleInputsArray = []
  variableNamesArray.forEach(variableName => {
    if (variableName.match(/local!/)) {
      localVariablesArray.push(variableName)
    } else if (variableName.match(/ri!/)) {
      ruleInputsArray.push(variableName)
    }
  })
  let localVariablesDictionary = renderVariablesDictionary(localVariablesArray)
  let ruleInputsDictionary = renderVariablesDictionary(ruleInputsArray)

  return `rule!TSPI_Debug_Box(
    isDebugMode: true,
    label: "${ruleName + " Debug Box"}",
    localVariables: {
      ${localVariablesDictionary}
    },
    ruleInputs: {
      ${ruleInputsDictionary}
    }
  ),
  `
}


document.activeElement.value = renderDebugBoxSAILCode()
