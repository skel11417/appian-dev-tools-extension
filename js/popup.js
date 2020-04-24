// popup.js
document.addEventListener('DOMContentLoaded', function(){

  // Create a new RFR
  document.querySelector('#btn-create-rfr').addEventListener('click', () => onclick('create'), false)

  // Load the existing RFR for the app
  // document.querySelector('#btn-load-rfr').addEventListener('click', () => onclick('load'), false)

  function onclick (message) {
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      }
    )
  }
}, false)
