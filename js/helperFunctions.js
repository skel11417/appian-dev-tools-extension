// helperFunctions.js

// get RuleName
function getRuleName () {
  return document.querySelector(".TitleText---page_header").innerText
}

// getDeveloperNameWithPrompt
// Commented out because of not being able to successfully implement this
// function getDeveloperNameWithPrompt() {
//   let developerName = ""
//   // Get the developer's name via a prompt
//   developerName = window.prompt(
//     "Enter your name",
//     "No Name"
//   )
//   return developerName
// }

function formatDate () {
  let today = new Date()
  let dd  = (today.getDate() < 10 ? '0' : '') + today.getDate();
  let month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
  let yyyy = today.getFullYear()
  return (yyyy + "-" + month + "-" + dd);
}

// getAllObjectsOnPage
function getAllObjectsOnPage () {
  const objectTable = document.querySelector("#content > div.SailContainerWeb---sailcontents.appian-context-browser-chrome.appian-context-os-windows > div > div > div > div > div.SplitPaneLayout---pane.SplitPaneLayout---secondary_pane > div > div > div.FieldLayout---field_layout > div.FieldLayout---input_below > div > div.PagingGridLayout---scrollable_content > table > tbody")
  const objectsSubArray = []
  for (let objectRow of objectTable.rows) {
    let objectType = objectRow.children[1].firstChild.firstChild.alt
    let objectName = objectRow.children[2].firstChild.firstChild.innerText
    let objectLink = objectRow.children[2].firstChild.firstChild.firstChild.href
    objectsSubArray.push({objectType: objectType, objectName: objectName, objectLink: objectLink, changeList: ""})
  }
  return objectsSubArray
}

// getNextPageLink
function getNextPageLink () {
    return document.querySelector("#content > div.SailContainerWeb---sailcontents.appian-context-browser-chrome.appian-context-os-windows > div > div > div > div > div.SplitPaneLayout---pane.SplitPaneLayout---secondary_pane > div > div > div.FieldLayout---field_layout > div.FieldLayout---input_below > div > div.GridFooter---grid_footer > div > div.GridFooter---align_end > span:nth-child(3) > a")
  }

// getAllObjectsInApp
function getAllObjectsInApp () {
  const objectsArray = []
  let nextPageLink = getNextPageLink()
  // If there are no additional pages of objects
  if (nextPageLink === null) {
    // Push all objects in grid into array
    objectsArray.push(getAllObjectsOnPage())
  } else {
    // While there are more pages of objects
    while (nextPageLink.href === "#"){
      // add all of the objects on the page to the objects Array
      objectsArray.push(getAllObjectsOnPage())
      // Advance to next Page
      nextPageLink.click()
      // Get the next page link
      nextPageLink = getNextPageLink()
    }
  }
  return objectsArray
}

// compareObjects
function compareObjectTypes (a, b) {
  const objectA = a.objectType;
  const objectB = b.objectType;
  let comparison = 0;
  if (objectA > objectB) {
    comparison = 1
  } else if (objectA < objectB) {
    comparison = -1
  }
  return comparison
}

// sortObjects
function sortObjects (objectsArray) {
  return [...objectsArray].sort(compareObjectTypes)
}

// renderObjectsArray
function renderObjectsArray (objectsArray) {
  let outputString = ""
  const sortedArray = sortObjects(objectsArray)
  const formattedRows = sortedArray.map(object => `|${object.objectType}|${object.objectName}|${object.changeList}|`)
  formattedRows.forEach(row => {outputString += row + "\n"})
  return outputString
}

// getApplicationName
function getApplicationName () {
  return document.querySelector(".TitleText---page_header").innerText
}

// getTicketFromApplicationName
function getTicketFromApplicationName (applicationName) {
  let ticketNameRegex = /([A-Z]+)(\s.+|)-(\d+)/
  let matches = applicationName.match(ticketNameRegex)
  return matches[1] + "-" + matches[3]
}

// getApplicationLink
function getApplicationLink () {
  return window.location.href
}

function getInputOfConstantForm (elementIndex) {
  return document.querySelector(".HeaderContentFooterLayout---HCF_layout").children[1].firstChild.children[elementIndex].children[1].firstChild.firstChild
}

// getConstantName
function getConstantName () {
  return getInputOfConstantForm(1).value
}

function determineIfConstantIsMultiple () {
  // Check the type of the input field for the constant value */
  let fieldType = getInputOfConstantForm(5).type
  /* The constant is a multiple if the field is of type textArea */
  return fieldType === "textarea"
}

// getConstantValue
function getConstantValue () {
  return getInputOfConstantForm(5).value
}

function renderConstantDocumentation (constantValue, developerName) {
  let applicationName = getApplicationName();
  let jiraTicket = getTicketFromApplicationName(applicationName)
  let existingDescription = getInputOfConstantForm(2).value
  getInputOfConstantForm(2).value = `${existingDescription}

Value: ${constantValue}
/*
////////////////////////////// CHANGE LOG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
<${formatDate()}><${jiraTicket}><${developerName}>
  -- Created

*/`
}

// formatRadioValue
function formatRadioValue (radioValue) {
  switch (radioValue) {
    case "true":
      return "(/)"
    case "false":
      return "(x)"
    case "null":
      return "(N/A)"
    default:
      return "(N/A)"
  }
}

// renderRFR
function renderRFR (rfrData) {
  return `{panel:title=Ready For Review: ${rfrData.jiraTicket}|borderStyle=dashed|borderColor=#15466e|titleBGColor=#159999|bgColor=#f8f8f8|titleColor=#ffffff}
h2.Ticket Summary
|Developers|${rfrData.developerNames}
|
|Functional Solution|${rfrData.functionalSolution}
|
|Technical Solution|${rfrData.technicalSolution}
|
|Testing Considerations|${rfrData.testingConsiderations}
|
|Deployment Information|* Application: [${rfrData.applicationName}|${rfrData.applicationLink}]
* Builds Required: ${rfrData.buildsRequired}
* Pull Request: ${rfrData.pullRequest}
* Additional Information: ${rfrData.additionalInformation}
|



h2.Checklist
|Unit Tested?|${formatRadioValue(rfrData.isUnitTested)}|
|Test Case Created?|${formatRadioValue(rfrData.isTestCaseCreated)}|
|Broken Instances Deleted?|${formatRadioValue(rfrData.isBrokenInstancesDeleted)}|
|Reference Data Helper Updated?|${formatRadioValue(rfrData.isReferenceDataHelperUpdated)}|
|Data Dictionary Updated?|${formatRadioValue(rfrData.isDataDictionaryUpdated)}|



h2.Change Log
||Object Type||Object Name||Change List||
${renderObjectsArray(rfrData.objectsArray)}{panel}`
}
