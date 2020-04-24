chrome.runtime.onMessage.addListener(function(request){

  // Execute Code to Create an RFR
  if (request === 'create'){
    let value = getSelectionText()
    chrome.storage.local.set({test_1: value}, function() {
      console.log('Value is set to ' + value);
    })
  }
  // Execute Code to Load an RFR
  else if (request === 'load') {
    chrome.storage.local.get('test_1', function(result) {
      alert('Value currently is ' + result.test_1);
    });
  }

  function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
  }

})
