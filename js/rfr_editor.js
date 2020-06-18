// rfr_editor.js

// insertValuesIntoRFRTemplate
function insertValuesIntoRFRTemplate (rfrId, rfrData) {
  document.querySelector("#jira-ticket").value = rfrData.jiraTicket
  document.querySelector("#developer-names").value = rfrData.developerNames
  document.querySelector("#functional-solution").value = rfrData.functionalSolution
  document.querySelector("#technical-solution").value = rfrData.technicalSolution
  document.querySelector("#testing-considerations").value = rfrData.testingConsiderations
  document.querySelector("#application-name").value = rfrData.applicationName

  rfrData.objectsArray.forEach(object => createObjectTableRow(object))
}

// getValuesFromRFRTemplate
function getValuesFromRFRTemplate () {
  let rfrData = {
    // applicationLink: create a hidden field for this
    jiraTicket: document.querySelector("#jira-ticket").value,
    developerNames: document.querySelector("#developer-names").value,
    functionalSolution: document.querySelector("#functional-solution").value,
    technicalSolution: document.querySelector("#technical-solution").value,
    testingConsiderations: document.querySelector("#testing-considerations").value,
    // objectsArray: create a rule to create a new array from the table data,
    // this is just dummy data
    objectsArray: [{objectType: "objectType", objectName: "objectName", objectLink: "objectLink", changeList: "* Whatever changes the user added"}],

    applicationName: document.querySelector("#application-name").value
  }
  return rfrData
}

// createObjectTableRow
function createObjectTableRow (object) {
  // {objectType: objectType, objectName: objectName, objectLink: objectLink, changeList: ""}
  let table = document.getElementById("object-table");
  let row = table.insertRow(-1);
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

// onGenerateMarkdown
function onGenerateMarkdown (event) {
    event.preventDefault()
    // Collect all data from the RFR Template Editor
    let rfrData = getValuesFromRFRTemplate()
    // ***************
    // Save this data to local storage, then render it as markdown
    // and enter it into the text area
    // **************

    // Create text area for the RFR
    let markdownTextArea = document.createElement("textarea");
    markdownTextArea.label = "ChangeLog"
    markdownTextArea.style = "margin: 0px; width: 580px; height: 303px;"
    markdownTextArea.value = renderRFR(rfrData)
    // Clear Template editor
    document.querySelector("#rfr-editor").innerHTML = ""
    // Add Markdown Text Area to document
    document.body.appendChild(markdownTextArea)
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
    onGenerateMarkdown
  )
}

chrome.runtime.onMessage.addListener(onMessageHandler);
