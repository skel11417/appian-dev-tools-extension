// helperFunctions.js

// get RuleName
function getRuleName () {
  return document.querySelector(".TitleText---page_header").innerText
}

// getDeveloperNameWithPrompt
function getDeveloperNameWithPrompt() {
  let developerName = ""
  // Get the developer's name via a prompt
  developerName = window.prompt(
    "Enter your name",
    "No Name"
  )
  return developerName
}

let formatDate = () => {
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

// renderObjects
function renderObjectsArray (objectsArray) {
  let outputString = ""
  const sortedArray = sortObjects(objectsArray)
  const formattedRows = sortedArray.map(object => `|${object.objectType}|${object.objectName}|* Created|`)
  formattedRows.forEach(row => {outputString += row + "\n"})
  return outputString
}

// getApplicationName
function getApplicationName () {
  return document.querySelector(".TitleText---page_header").innerText
}

// getTicketFromApplicationName
function getTicketFromApplicationName (applicationName) {
  let ticketNameRegex = /([A-Z]+)\s.+-(\d+)/
  let matches = applicationName.match(ticketNameRegex)

  return matches[1] + "-" + matches[2]
}

// getApplicationLink
function getApplicationLink () {
  return window.location.href
}

// renderRFR
function renderRFR (rfrParameters) {
  return `{panel:title=Ready For Review:${rfrParameters.jiraTicket}|borderStyle=dashed|borderColor=#15466e|titleBGColor=#159999|bgColor=#f8f8f8|titleColor=#ffffff}
h2.Ticket Summary
|Developers|${rfrParameters.developerName}
|
|Functional Solution|
|
|Technical Solution|
|
|Testing Considerations|
|
|Deployment Information|* Application: [${rfrParameters.applicationName}|${rfrParameters.applicationLink}]
* Builds Required:
* Pull Request:
* Additional Information:
|



h2.Checklist
|Unit Tested?|()|
|Test Case Created?|()|
|Broken Instances Deleted?|()|
|Reference Data Helper Updated?|()|
|Data Dictionary Updated?|()|



h2.Change Log
||Object Type||Object Name||Change List||
${renderObjectsArray(rfrParameters.objectsArray)}{panel}`
}
