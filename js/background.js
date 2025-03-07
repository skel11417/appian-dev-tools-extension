// Create Rule Comments
chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
    id: "generateRuleComments",
    title: "Generate Rule Comments",
    contexts: ["editable", "page"],
    documentUrlPatterns: ["https://*.appiancloud.us/suite/design/*"]
  });
  if(chrome.runtime.lastError){
    console.log(chrome.runtime.lastError.message)
  }
});

// Create Changelog Entry
chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
      id: "generateChangelogEntry",
      title: "Generate Changelog Entry",
      contexts: ["editable","page"],
      documentUrlPatterns: ["https://*.appiancloud.us/suite/design/*"]
    });
    if(chrome.runtime.lastError){
      console.log(chrome.runtime.lastError.message)
    }
});

// Replace Native Components with Wrappers
chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
    id: "replaceNativeComponentsWithWrappers",
    title: "Replace Native Components with Wrappers",
    contexts: ["selection"],
    documentUrlPatterns: ["https://*.appiancloud.us/suite/design/*"]
  });
  if(chrome.runtime.lastError){
    console.log(chrome.runtime.lastError.message)
  }
});

// Convert to/from index function
chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
    id: "convertToOrFromIndexFunction",
    title: "Convert to/from index function",
    contexts: ["selection"],
    documentUrlPatterns: ["https://*.appiancloud.us/suite/design/*"]
  });
  if(chrome.runtime.lastError){
    console.log(chrome.runtime.lastError.message)
  }
});


// Insert Debug Text Field Component
chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
      id: "insertDebugTextField",
      title: "Insert Debug Text Field Component",
      contexts: ["editable","page"],
      documentUrlPatterns: ["https://*.appiancloud.us/suite/design/*", "https://*.appscloud.fisheries.noaa.gov/suite/design/*" ]
    });
    if(chrome.runtime.lastError){
      console.log(chrome.runtime.lastError.message)
    }
});



// contextMenuHandler
function contextMenuHandler(info, tab){
  switch (info.menuItemId) {
    case "generateRuleComments":
      chrome.scripting.executeScript({
        target: { tabId: tab.id},
        files: ['js/generateRuleComments.js']
      }).catch((error) => {
        console.error("Error executing script:", error)
      });
      break;
    case "generateChangelogEntry":
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/generateChangeLogEntry.js']
      }).catch((error) => {
        console.error("Error executing script:", error)
      });
      break;
    case "replaceNativeComponentsWithWrappers":
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/replaceNativeComponentsWithWrappers.js']
      }).catch((error) => {
        console.error("Error executing script:", error)
      });
      break;
    case "convertToOrFromIndexFunction":
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/convertToOrFromIndexFunction.js']
      }).catch((error) => {
        console.error("Error executing script:", error)
      });
    break;
    case "insertDebugTextField":
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/insertDebugTextField.js']
      }).catch((error) => {
        console.error("Error executing script:", error)
      });
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
