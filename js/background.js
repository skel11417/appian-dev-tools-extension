const contextMenus = {};

contextMenus.createRuleDocumentation =
  chrome.contextMenus.create(
    {
      "title": "Create Rule Documentation",
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
    case contextMenus.createRuleDocumentation:
      chrome.tabs.executeScript({
        file: 'js/generateDocumentation.js'
      })
      break;
    // default:
  }
}

// click event listener
chrome.contextMenus.onClicked.addListener(contextMenuHandler)

// Open new tab and show rfr
chrome.runtime.onMessage.addListener(function (message){
    if (message.type === "open") {
      chrome.tabs.create(
        { url: chrome.runtime.getURL("rfr_viewer.html") },
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
