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

// getBaseUrlOfAppianInstance
function getBaseUrlOfOpenWindow () {
  return window.location.origin
}

function isUrlAppianInstance (baseUrl) {
  const regex = /https:\/\/.*fisheries\.noaa\.gov|https:\/\/.*\.appiancloud.us/
  return baseUrl.match(regex)
}

function openNewTabForAppianSite (urlPath) {
  const baseUrl = getBaseUrlOfOpenWindow();
  // Open url if it exists
  if ( isUrlAppianInstance(baseUrl) ) {
    let monitorUrl = baseUrl + urlPath
    window.open(monitorUrl, '_blank')
  }
}

// openProcessMonitor
function openProcessMonitor () {
  openNewTabForAppianSite('/suite/design/monitoring/process-activity')
}

// createNewRule
function createNewRule () {
  openNewTabForAppianSite('/suite/design/rule')
}

// createNewInterface
function createNewInterface () {
  openNewTabForAppianSite('/suite/design/interface')
}

// returnSectionArray
function returnSectionArray() {
  let outputArray = []; // array returned by the rule
  const quoteRegex = /("|')/g; // regex to find and replace all quotes

  // Get release number
  const releaseRegex = /\d{2}\.\d/g; // Regex to get the release number
  const releaseNumber = document.URL.match(releaseRegex)[0]; // hard-coded for now

  // Remove Header Links
  const headerLinks = document.getElementsByClassName("header-link-wrapper");
  Array.from(headerLinks).forEach((headerLink) => (headerLink.innerHTML = ""));

  // Get main sections and remove unnecessary
  const sectionArray = Array.from(document.getElementsByTagName("h2"));

  // Remove first and last elements in section Array
  sectionArray.shift();
  sectionArray.pop();

  // Loop through each section and create as many rows as needed
  sectionArray.forEach((section) => {
    let sectionLabel = section.innerText;
    let subSectionElement = section.nextElementSibling; // Start looping through siblings
    let hasSubsections = false; // Default to false

    console.log(sectionLabel);

    // Loop through all siblings until the end of the list or the next h2 section
    while (subSectionElement.tagName !== "H2") {
      // Section contains h3 subsection
      if (subSectionElement.tagName === "H3") {
        hasSubsections = true;
        let subSectionLabel = subSectionElement.innerText;
        let hasEnhancements =
          subSectionElement.nextElementSibling.nextElementSibling.tagName ===
          "H4"; // must improve on this rule
        let sub2Element =
          subSectionElement.nextElementSibling.nextElementSibling;
        console.log(subSectionLabel);
        if (hasEnhancements) {
          while (
            sub2Element !== undefined &&
            sub2Element.tagName !== "H3" &&
            sub2Element.tagName !== "H2"
          ) {
            if (sub2Element.tagName === "H4") {
              let enhancementText = sub2Element.innerText;
              // Add to output Array
              outputArray.push([
                releaseNumber,
                sectionLabel,
                subSectionLabel,
                enhancementText,
              ]);
            }
            sub2Element = sub2Element.nextElementSibling;
          }
        } else {
          // Add to output Array
          outputArray.push([releaseNumber, sectionLabel, " ", subSectionLabel]);
        }
        // Section contains an unordered list
      } else if (subSectionElement.tagName === "UL") {
        hasSubsections = true;
        let list = Array.from(subSectionElement.children);
        // Process List
        list.forEach((listItem) => {
          let match = listItem.innerText.match(
            /(?:Low|Medium|High)\n([\s\S]*)/
          );
          if (match) {
            let enhancementText = match[1];
            // Add to output array
            outputArray.push([
              releaseNumber,
              sectionLabel,
              "",
              enhancementText,
            ]);
          }
        });
      }
      // Advance to next element on page
      subSectionElement = subSectionElement.nextElementSibling;
    }
    // If loop has completed without finding subsections, then there are none
    if (!hasSubsections) {
      let enhancementText = JSON.stringify(
        section.nextElementSibling.innerText.replace(quoteRegex, "")
      );
      // Add to output array
      outputArray.push([releaseNumber, sectionLabel, "", enhancementText]);
    }
  });
  return outputArray;
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
