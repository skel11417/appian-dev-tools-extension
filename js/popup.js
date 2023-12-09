// popup.js

// On Page load
document.addEventListener('DOMContentLoaded', function(){

  // Create a new RFR
  document.querySelector('#btn-create-rfr').addEventListener('click', () => onClick('createNewRFR'), false)

  // Generate documentation for a constant
  document.querySelector('#btn-document-constant').addEventListener('click', () => onClick('documentConstant'), false)

  // Add a changelog entry to a constant
  document.querySelector('#btn-changelog-constant').addEventListener('click', () => onClick('addChangelogEntry'), false)

  // Update the developer's name
  document.querySelector('#link-change-developer').addEventListener('click', () => onClick('changeDeveloperName'), false)

  // Open process monitoring for the current environment
  document.querySelector('#open-environment-process-monitoring').addEventListener('click', () => onClick('openProcessMonitor'), false)

  // Create a new blank rule
  document.querySelector('#new-rule-link').addEventListener('click', () => onClick('createNewRule'), false)

  // Create a new blank interface
  document.querySelector('#new-interface-link').addEventListener('click', () => onClick('createNewInterface'), false)


  // Load the existing RFR for the app
  // document.querySelector('#btn-load-rfr').addEventListener('click', () => onClick('load'), false)

  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const releaseNotesUrlRegex = /https:\/\/docs\.appian\.com\/suite\/help\/\d{2}\.\d\/Appian_Release_Notes\.html/gm
    let activeTabUrl = tabs[0].url;
    let isLocationReleaseNotes = releaseNotesUrlRegex.test(activeTabUrl)
    
    // Hide data extraction section if user is not on a page that can be parsed
    if ( isLocationReleaseNotes ) {
      document.querySelector('#data-extraction').style.display = 'inline'
      document.querySelector('#document-release-notes').addEventListener('click', () => onClick('documentReleaseNotes'), false)
    }
  });

  // Sends a message to open a new tab with the selected message
  function onClick (message) {
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message)
      }
    )
  }
}, false)
