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
  const objectTable = document.querySelector("tbody")
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

// formatChangeList
function formatChangeList (changeList) {
  if (changeList) {
    let regex = /\s{0,2}--\s{0,3}/g
    return changeList.replaceAll(regex, "* ")
  } else {
    return "* Created"
  }
}

// renderObjectsArray
function renderObjectsArray (objectsArray) {
  let outputString = ""
  const sortedArray = sortObjects(objectsArray)
  const formattedRows = sortedArray.map(object => `|${object.objectType}|${object.objectName}|${formatChangeList(object.changeList)}|`)
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
  if ( matches ) {
    return matches[1] + "-" + matches[3]
  }
  else {
    return "TICKET"
  }
}

// getApplicationLink
function getApplicationLink () {
  return window.location.href
}

// isEnabledConstantTools
function isEnabledConstantTools () {
  let constantForm = document.querySelector(".HeaderContentFooterLayout---HCF_layout")
  return constantForm ? true : false
}

// getElementOfConstantForm
function getElementOfConstantForm (elementIndex) {
  return document.querySelector(".HeaderContentFooterLayout---HCF_layout").children[1].firstChild.children[elementIndex].children[1].firstChild.firstChild
}

// isNewConstant
function isNewConstant () {
  return document.querySelector(".HeaderContentFooterLayout---HCF_layout").children[1].firstChild.childElementCount === 9
}

// getConstantType
function getConstantType () {
  let typeIndex = isNewConstant() ? 3 : 2
  return getElementOfConstantForm(typeIndex).firstElementChild.innerText
}

// determineIfConstantIsMultiple
function determineIfConstantIsMultiple () {
  // Determine the index of the value field based on whether this is a new or
  // existing constant
  let valueIndex = isNewConstant() ? 5 : 4
  /* The constant is a multiple if the field is of type textarea */
  return getElementOfConstantForm(valueIndex).type === "textarea"
}

// getConstantValue
function getConstantValue () {
  // Determine the index of the value field based on whether this is a new or
  // existing constant
  let valueIndex = isNewConstant() ? 5 : 4
  return getElementOfConstantForm(valueIndex).value
}

// renderConstantDocumentation
function renderConstantDocumentation (constantValue, developerName) {
  let applicationName = getApplicationName();
  let jiraTicket = getTicketFromApplicationName(applicationName)
  let descriptionIndex = isNewConstant() ? 2 : 1
  if ( getConstantType() === "Text" ) {
    // Wrap the constant value in quotes if it is a text value
    constantValue = "\"" + constantValue + "\""
  }
  let existingDescription = getElementOfConstantForm(descriptionIndex).value
  // Set the value of the description equal to any existing description and
  // the value plus a changelog
  getElementOfConstantForm(descriptionIndex).value = `${existingDescription}

Value: ${constantValue}
/*
////////////////////////////// CHANGE LOG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
<${formatDate()}><${jiraTicket}><${developerName}>
  -- Created

*/`
}

// addChangelogEntryToConstant
function addChangelogEntryToConstant (developerName) {
  let applicationName = getApplicationName();
  let jiraTicket = getTicketFromApplicationName(applicationName)
  let descriptionIndex = isNewConstant() ? 2 : 1
  let existingDescription = getElementOfConstantForm(descriptionIndex).value
  let changelogEntry = `<${formatDate()}><${jiraTicket}><${developerName}><Version Prior to Change: >
  --

`
  let changelogIndex = existingDescription.match(/<[\d||\-]+><[\d||\-||\w]+><.+>.?/).index;
  let newDescription = [
    existingDescription.slice(0, changelogIndex),
    changelogEntry,
    existingDescription.slice(changelogIndex)
   ].join('');
   getElementOfConstantForm(descriptionIndex).value = newDescription
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

function openProcessMonitor () {
  const urlPath = '/suite/design/monitoring/process-activity'
  const regex = /https:\/\/.*fisheries\.noaa\.gov|https:\/\/.*\.appiancloud.com/
  const baseUrl = window.location.origin

  if ( baseUrl.match(regex) ) {
    let monitorUrl = baseUrl + urlPath
    window.open(monitorUrl, '_blank')
  }
}

// returnSectionArray
function returnSectionArray() {
    const releaseNumber = '22.4' // hard-coded for now
    let sectionArray = Array.from(document.querySelector("#toc").children) // the section headings of the release notes
    let quoteRegex = /("|')/g // regex to find and replace all quotes
    let outputArray = [] // array returned by the rule

    // Loop through each section to get the section heading and sub-sections
    sectionArray.forEach(section => {
        let sectionLabel = section.firstChild.firstChild.innerText
        let subSectionArray = [...section.children]
        // Determine if the section has sub-sections (sub-sections are contained in an unordered list element)
        if (subSectionArray.map(subSection => subSection.tagName).includes('UL')) {

            let sub2ElementsArray = [...subSectionArray[1].children]

            // Loop through each of the children in the unordered list
            sub2ElementsArray.forEach((sub2Element, index) => {
                let nextElement = sub2ElementsArray[index + 1] // the element after the current element ()

                // If the current element is an unordered list, then all of the enhancements will be list items
                if (sub2Element.tagName === 'UL') {
                    let sub3ElementsArray = Array.from(sub2Element.children)
                    let subSectionLabel = JSON.stringify(sub2ElementsArray[index - 1].innerText.replace(quoteRegex, ""))
                    sub3ElementsArray.forEach(sub3Element => {
                        let enhancementLabel = JSON.stringify(sub3Element.innerText.replace(quoteRegex, ""))
                        outputArray.push([releaseNumber, sectionLabel, subSectionLabel, enhancementLabel])
                    })
                // If the current element is not an unordered list, check to  if the current element is either
                // the last in the list or if it is followed by another list item. If so, use the sub-section
                // heading as the enhancement and leave the sub-section column blank
                } else if (!nextElement || nextElement.tagName === 'LI') {
                    let enhancementLabel = JSON.stringify(sub2Element.firstChild.innerText.replace(quoteRegex, ""))
                    outputArray.push([releaseNumber, sectionLabel, '', enhancementLabel])
                }
            })
        // if the section does not contain any sub-sections, check if it is "resolved general issues"
        } else if (sectionLabel.toLowerCase() === 'resolved general issues') {
            console.log("Resolved General Issues section has been identified")
            let generalIssuesArray = [...document.querySelector("#resolved-general-issues").nextElementSibling.children]
            generalIssuesArray.forEach(element => {
                let enhancementLabel = JSON.stringify(element.innerText.match(/\n(.+)/)[1].replace(quoteRegex, ""))
                outputArray.push([releaseNumber, sectionLabel, '', enhancementLabel])
            })
        // Else add row with section heading and note that the contents but be evaluated manually
        } else {
            console.log(sectionLabel, " contains enhancements which must be documented manually.")
            outputArray.push([releaseNumber, sectionLabel, '', "MUST ADD CONTENTS MANUALLY"])
        }
    })
    // Return the array
    return outputArray
}

// generateCSV
function generateCSV(rows) {
    let content = "data:text/csv;charset=utf-8,";
    rows.forEach(function(row, index) {
        content += row.join(",") + "\n";
    });
    return encodeURI(content);
}

// downloadCSV
function downloadCSV() {
    window.open(generateCSV(returnSectionArray()))
}
