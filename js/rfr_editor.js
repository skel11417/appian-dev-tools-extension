var onMessageHandler = function(message){
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler);

  let textArea = document.createElement("textarea");
  textArea.value = message.data
  textArea.label = "ChangeLog"
  textArea.style = "margin: 0px; width: 580px; height: 303px;"
  document.body.appendChild(textArea)
}

chrome.runtime.onMessage.addListener(onMessageHandler);
