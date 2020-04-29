function insertValuesIntoRFRTemplate (rfrId, rfrData) {
  // const ticketSummary = document.createElement('h2')
  // ticketName.innerText = "Ticket Summary"
  // document.body.appendChild(ticketSummary)
  document.querySelector("#jira-ticket").value = rfrData.jiraTicket
  document.querySelector("#developers").value = rfrData.developerNames
  document.querySelector("#functional-solution").value = rfrData.functionalSolution
  document.querySelector("#technical-solution").value = rfrData.technicalSolution
  document.querySelector("#testing-considerations").value = rfrData.testingConsiderations
  document.querySelector("#application-name").value = rfrData.applicationName

  rfrData.objectsArray.forEach(object => createObjectTableRow(object))
}

function createObjectTableRow (object) {
  // {objectType: objectType, objectName: objectName, objectLink: objectLink, changeList: ""}
  let table = document.getElementById("object-table");
  let row = table.insertRow(-1);
  let objectTypeCell = row.insertCell(0);
  let objectNameCell = row.insertCell(1);
  let changeListCell = row.insertCell(2);
  objectTypeCell.innerText = object.objectType;
  // make input
  objectNameCell.innerText = object.objectName;
  // make text area
  changeListCell.innerText = object.changeList;
}

let onMessageHandler = function(message){
  const rfrId = message.rfrId
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler);
  let textArea = document.createElement("textarea");
  textArea.value = message.data
  textArea.label = "ChangeLog"
  textArea.style = "margin: 0px; width: 580px; height: 303px;"
  chrome.storage.local.get(rfrId, function (result) {
    let rfrData = result[rfrId]
    insertValuesIntoRFRTemplate(rfrId, rfrData)

  })
  // document.body.appendChild(textArea)
}

chrome.runtime.onMessage.addListener(onMessageHandler);
