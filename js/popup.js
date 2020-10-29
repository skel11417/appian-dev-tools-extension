// popup.js
document.addEventListener('DOMContentLoaded', function(){

  // Create a new RFR
  document.querySelector('#btn-create-rfr').addEventListener('click', () => onclick('createNewRFR'), false)

  // Generate documentation for a constant
  document.querySelector('#btn-document-constant').addEventListener('click', () => onclick('documentConstant'), false)

  // Load the existing RFR for the app
  // document.querySelector('#btn-load-rfr').addEventListener('click', () => onclick('load'), false)

  // Sends a message to open a new tab
  function onclick (message) {
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      }
    )
  }
}, false)
