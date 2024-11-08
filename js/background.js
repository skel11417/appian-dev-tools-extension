// contextMenus
const contextMenus = {};

// Create Rule Comments
contextMenus.generateRuleComments =
  chrome.contextMenus.create(
    {
      "title": "Generate Rule Comments",
      "contexts": ["editable","page"],
      "documentUrlPatterns": ["https://*.appiancloud.us/suite/design/*"]
    },
    function(){
      if(chrome.runtime.lastError){
        console.log(chrome.runtime.lastError.message)
      }
    }
  )

  // Create Changelog Entry
  contextMenus.generateChangeLogEntry =
    chrome.contextMenus.create(
      {
        "title": "Generate Changelog Entry",
        "contexts": ["editable","page"],
        "documentUrlPatterns": ["https://*.appiancloud.us/suite/design/*"]
      },
      function(){
        if(chrome.runtime.lastError){
          console.log(chrome.runtime.lastError.message)
        }
      }
    )

    // Insert Debug Text Field Component
    contextMenus.replaceNativeComponentsWithWrappers =
      chrome.contextMenus.create(
        {
          "title": "Replace Native Components with Wrappers",
          "contexts": ["selection"],
          "documentUrlPatterns": ["https://*.appiancloud.us/suite/design/*"]
        },
        function(){
          if(chrome.runtime.lastError){
            console.log(chrome.runtime.lastError.message)
          }
        }
      )

    // Convert to/from index function
    contextMenus.convertToOrFromIndexFunction =
      chrome.contextMenus.create(
        {
          "title": "Convert to/from index function",
          "contexts": ["selection"],
          "documentUrlPatterns": ["https://*.appiancloud.us/suite/design/*"]
        },
        function(){
          if(chrome.runtime.lastError){
            console.log(chrome.runtime.lastError.message)
          }
        }
      )

    // Insert Debug Text Field Component
    contextMenus.insertDebugTextField =
      chrome.contextMenus.create(
        {
          "title": "Insert Debug Text Field Component",
          "contexts": ["editable","page"],
          "documentUrlPatterns": ["https://*.appiancloud.us/suite/design/*"]
        },
        function(){
          if(chrome.runtime.lastError){
            console.log(chrome.runtime.lastError.message)
          }
        }
      )



// contextMenuHandler
function contextMenuHandler(info, tab){
  switch (info.menuItemId) {
    case contextMenus.generateRuleComments:
      chrome.tabs.executeScript({
        file: 'js/generateRuleComments.js'
      })
      break;
    case contextMenus.generateChangeLogEntry:
      chrome.tabs.executeScript({
        file: 'js/generateChangeLogEntry.js'
      })
      break;
    case contextMenus.replaceNativeComponentsWithWrappers:
      chrome.tabs.executeScript({
        file: 'js/replaceNativeComponentsWithWrappers.js'
      })
      break;
    case contextMenus.insertDebugTextField:
      chrome.tabs.executeScript({
        file: 'js/insertDebugTextField.js'
      })
      break;
    case contextMenus.convertToOrFromIndexFunction:
      chrome.tabs.executeScript({
        file: 'js/convertToOrFromIndexFunction.js'
      })
      break;
    // default:
  }
}

// click event listener
chrome.contextMenus.onClicked.addListener(contextMenuHandler)

// Open new tab and show rfr
chrome.runtime.onMessage.addListener(function (message){
    if (message.type === "openRFREditor") {
      chrome.tabs.create(
        { url: chrome.runtime.getURL("rfr_editor.html") },
        function ( tab ) {
          var handler = function(tabId, changeInfo) {
            if(tabId === tab.id && changeInfo.status === "complete"){
              chrome.tabs.onUpdated.removeListener(handler);
              chrome.tabs.sendMessage(tabId, {rfrId: message.rfrId});
            }
          }
          // in case we're faster than page load (usually):
        chrome.tabs.onUpdated.addListener(handler);
        // just in case we're too late with the listener:
        chrome.tabs.sendMessage(tab.id, {rfrId: message.rfrId});
        }
      );
    }
  }
)
