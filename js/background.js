const contextMenus = {};

contextMenus.createRuleDocumentation =
  chrome.contextMenus.create(
    {
      "title": "Create Rule Documentation",
      "contexts": ["editable"]
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
