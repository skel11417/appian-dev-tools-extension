// rfr_editor.js

// insertValuesIntoRFRTemplate
function insertValuesIntoRFRTemplate (rfrId, rfrData) {
  // hiddenFields
  document.querySelector("#rfr-id").value = rfrId
  document.querySelector("#application-link").value = rfrData.applicationLink

  // Visible Fields
  document.querySelector("#jira-ticket").innerText = rfrData.jiraTicket
  document.querySelector("#developer-names").value = rfrData.developerNames
  document.querySelector("#functional-solution").value = rfrData.functionalSolution
  document.querySelector("#technical-solution").value = rfrData.technicalSolution
  document.querySelector("#testing-considerations").value = rfrData.testingConsiderations
  document.querySelector("#application-name").value = rfrData.applicationName
  document.querySelector("#builds-required").value = rfrData.buildsRequired
  document.querySelector("#pull-request").value = rfrData.pullRequest
  document.querySelector("#additional-information").value = rfrData.additionalInformation

  // Radio button values
  // Unit Tested?
  setRadioValue('unit-tested', rfrData.isUnitTested)
  // Test Case Created?
  setRadioValue('test-case', rfrData.isTestCaseCreated)
  // Broken Instances Deleted?
  setRadioValue('broken-instances', rfrData.isBrokenInstancesDeleted)
  // Reference Data Helper Updated
  setRadioValue('reference-data', rfrData.isReferenceDataHelperUpdated)
  // Data Dictionary Updated
  setRadioValue('data-dictionary', rfrData.isDataDictionaryUpdated)

  // Sort Objects Array
  sortedObjectsArray = sortObjects(rfrData.objectsArray)
  sortedObjectsArray.forEach(object => createObjectTableRow(object))

}

// getValuesFromRFRTemplate
function getValuesFromRFRTemplate () {
  let rfrData = {
    // Hidden Field
    applicationLink: document.querySelector("#application-link").value,
      // rfrId: create a separate for this

    // Text Fields
    jiraTicket: document.querySelector("#jira-ticket").innerText,
    developerNames: document.querySelector("#developer-names").value,
    functionalSolution: document.querySelector("#functional-solution").value,
    technicalSolution: document.querySelector("#technical-solution").value,
    testingConsiderations: document.querySelector("#testing-considerations").value,

    // Deployment Information
    applicationName: document.querySelector("#application-name").value,
    buildsRequired: document.querySelector("#builds-required").value,
    pullRequest: document.querySelector("#pull-request").value,
    additionalInformation: document.querySelector("#additional-information").value,
    // Radio button values
    isUnitTested: getRadioValue('unit-tested'),
    isTestCaseCreated: getRadioValue('test-case'),
    isBrokenInstancesDeleted: getRadioValue('broken-instances'),
    isReferenceDataHelperUpdated: getRadioValue('reference-data'),
    isDataDictionaryUpdated: getRadioValue('data-dictionary'),
    objectsArray: getObjectsArrayFromTable()
  }
  return rfrData
}

// getRadioValue
function getRadioValue (radioName) {
  let radioValue
  let radioNodes = document.getElementById('form').elements[radioName]
  for (var i=0, len=radioNodes.length; i<len; i++) {
    if ( radioNodes[i].checked ) {
        radioValue = radioNodes[i].value
        break
    }
  }
  return radioValue
}

// setRadioValue
function setRadioValue (radioName, radioValue) {
  let radioNodes = document.getElementById('form').elements[radioName]

  for (var i=0, len=radioNodes.length; i<len; i++) {
    if ( radioNodes[i].value === radioValue ) {
      if (Boolean(radioValue)) {
        radioNodes[i].checked = true
      } else {
        radioNodes[i].checked = false
      }
      break
    }
  }
}

// getObjectsArrayFromTable
function getObjectsArrayFromTable () {
  let objectsArray = []
  let objectRows = document.querySelectorAll('.object-row')

  if (objectRows) {
    objectRows.forEach(objectRow => {
      objectsArray.push(
        {
          objectType: objectRow.children[0].innerText,
          objectName: objectRow.children[1].innerText,
          // objectLink: "objectLink",

          // Add a rule to parse this text field
          changeList: objectRow.children[2].innerText
        }
      )
    })

  }
  return objectsArray
}

// createObjectTableRow
function createObjectTableRow (object) {
  // {objectType: objectType, objectName: objectName, objectLink: objectLink, changeList: ""}
  let table = document.getElementById("object-table");
  let row = table.insertRow(-1);
  row.classList.add("object-row");
  let objectTypeCell = row.insertCell(0);
  let objectNameCell = row.insertCell(1);
  let changeListCell = row.insertCell(2);
  changeListCell.contentEditable = "true"
  objectTypeCell.innerText = object.objectType;
  // make input
  objectNameCell.innerText = object.objectName;
  // make text area
  changeListCell.innerText = object.changeList;
}

// copyToClipboard
function copyToClipboard(event) {
  event.preventDefault()

  // ABSTRACT THIS TO SEPARATE RULE
  const rfrData = getValuesFromRFRTemplate();
  document.querySelector('#developer-template').innerText = rfrData.developerNames;
  document.querySelector("#heading-template").innerText = "Ready For Review: " + rfrData.applicationName;
  document.querySelector("#functional-solution-template").innerText = rfrData.functionalSolution;
  document.querySelector("#technical-solution-template").innerText = rfrData.technicalSolution;
  document.querySelector("#testing-considerations-template").innerText = rfrData.testingConsiderations;
  document.querySelector("#application-name-template").innerHTML = `<a href=${rfrData.applicationLink}>${rfrData.applicationName}</a>`;
  document.querySelector("#builds-required-template").innerText = "Builds Required: ".concat(rfrData.buildsRequired ? rfrData.buildsRequired : "None")
  document.querySelector("#additional-information-template").innerText = "Additional Information: ".concat(rfrData.additionalInformation ? rfrData.additionalInformation : "N/A")


  // Render table

  // 'https://dev.to/stegriff/copy-rich-html-with-the-native-clipboard-api-5ah8'
  try {
    const content = document.getElementById('clipboard-template').outerHTML;
    const blobInput = new Blob([content], {type: 'text/html'});
    const clipboardItemInput = new ClipboardItem({'text/html' : blobInput});
    navigator.clipboard.write([clipboardItemInput]);
  } catch(e) {
    // Handle error with user feedback - "Copy failed!" kind of thing
    console.log(e);
  }

}

// onGenerateMarkdown
function onGenerateMarkdown (event) {
    event.preventDefault()
    // Collect all data from the RFR Template Editor
    let rfrData = getValuesFromRFRTemplate()
    const JIRA_URL = "https://technologysolutions.atlassian.net/browse/"
    // ***************
    // Save this data to local storage, then render it as markdown
    // and enter it into the text area
    // **************

    // Create text area for the RFR
    let markdownTextArea = document.createElement("textarea");
    markdownTextArea.label = "ChangeLog";
    markdownTextArea.style = "margin: 0px; width: 580px; height: 303px;";
    markdownTextArea.id = "markdown-text-area";
    markdownTextArea.value = renderRFR(rfrData);

    // Create button
    let copyToClipboardButton = document.createElement("button");
    copyToClipboardButton.id = "copy-to-clipboard"
    copyToClipboardButton.innerHTML = "Copy to Clipboard";
    copyToClipboardButton.addEventListener("click", copyToClipboard)

    // Create link to Jira ticket (in old issue view)
    let jiraTicketLink = document.createElement('a')
    let linkText = document.createTextNode("Go to Jira Ticket");
    jiraTicketLink.appendChild(linkText);
    jiraTicketLink.title = "Go to Jira Ticket";
    jiraTicketLink.href = JIRA_URL + rfrData.jiraTicket + "?oldIssueView=true"

    // Clear Template editor and button
    document.querySelector("#rfr-editor").remove()
    document.querySelector("#submit").remove()
    // Add Markdown Text Area to document
    let container = document.querySelector('.container')
    container.appendChild(markdownTextArea)
    container.appendChild(copyToClipboardButton)
    container.appendChild(jiraTicketLink)
  }



// onMessageHandler
function onMessageHandler (message) {
  const rfrId = message.rfrId
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler)

  // Insert the RFR data into the template
  chrome.storage.local.get(rfrId, function (result) {
    let rfrData = result[rfrId]
    insertValuesIntoRFRTemplate(rfrId, rfrData)
  })

  // Add event listener to submit button
  document.querySelector("#submit").addEventListener("click",
    copyToClipboard
  )
}

chrome.runtime.onMessage.addListener(onMessageHandler);
