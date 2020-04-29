function insertValuesIntoRFRTemplate (data) {
  // const ticketSummary = document.createElement('h2')
  // ticketName.innerText = "Ticket Summary"
  // document.body.appendChild(ticketSummary)
  document.querySelector("#developers").value = "fish"
  document.querySelector("#functional-solution").value = data
}

let onMessageHandler = function(message){
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler);

  let textArea = document.createElement("textarea");
  textArea.value = message.data
  textArea.label = "ChangeLog"
  textArea.style = "margin: 0px; width: 580px; height: 303px;"
  insertValuesIntoRFRTemplate(message.data)
  // document.body.appendChild(textArea)
}

chrome.runtime.onMessage.addListener(onMessageHandler);
