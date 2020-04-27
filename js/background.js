const contextMenus = {};

// Create Rule Comments
contextMenus.generateRuleComments =
  chrome.contextMenus.create(
    {
      "title": "Generate Rule Comments",
      "contexts": ["editable","page"],
      "documentUrlPatterns": ["https://*.appiancloud.com/suite/design/*"]
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
        "documentUrlPatterns": ["https://*.appiancloud.com/suite/design/*"]
      },
      function(){
        if(chrome.runtime.lastError){
          console.log(chrome.runtime.lastError.message)
        }
      }
    )

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
              chrome.tabs.sendMessage(tabId, {data: message.data});
            }
          }
          // in case we're faster than page load (usually):
        chrome.tabs.onUpdated.addListener(handler);
        // just in case we're too late with the listener:
        chrome.tabs.sendMessage(tab.id, {data: message.data});
        }
      );
    }
  }
)
