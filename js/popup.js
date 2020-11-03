// popup.js
document.addEventListener('DOMContentLoaded', function(){

  // Create a new RFR
  document.querySelector('#btn-create-rfr').addEventListener('click', () => onClick('createNewRFR'), false)

  // Generate documentation for a constant
  document.querySelector('#btn-document-constant').addEventListener('click', () => onClick('documentConstant'), false)

  // Add a changelog entry to a constant
  document.querySelector('#btn-changelog-constant').addEventListener('click', () => onClick('addChangelogEntry'), false)

  document.querySelector('#link-change-developer').addEventListener('click', () => onClick('changeDeveloperName'), false)

  // Load the existing RFR for the app
  // document.querySelector('#btn-load-rfr').addEventListener('click', () => onClick('load'), false)

  // Sends a message to open a new tab with the selected message
  function onClick (message) {
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      }
    )
  }
}, false)
