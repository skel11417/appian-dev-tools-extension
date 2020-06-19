chrome.runtime.onMessage.addListener(function(request){

  // Execute Code to load developer name and Create an RFR
  if (request === 'createNewRFR'){
    chrome.storage.local.get('developerName', function (result) {
      let developerName
      if (result.developerName){
        developerName = result.developerName
      } else {
        // Get the developer's name via a prompt
        developerName = window.prompt(
          "Enter your name",
          "No Name"
        )
        // Save the name
        chrome.storage.local.set({developerName: developerName}, function() {
          console.log('Developer name set to ' + developerName);
        })
      }

      let objectsArray = getAllObjectsOnPage()
      let applicationName = getApplicationName()
      let applicationLink = getApplicationLink()
      let jiraTicket = getTicketFromApplicationName(applicationName)
      let rfrId = "my_rfr"
      let rfrData = {
          rfrId: rfrId,
          applicationLink: applicationLink,
          jiraTicket: jiraTicket,
          developerNames: developerName,
          functionalSolution: "",
          technicalSolution: "",
          testingConsiderations: "",
          // Deployment Information
          applicationName: applicationName,
          buildsRequired: "",
          pullRequest: "",
          additionalInformation: "",
          // Radio button values
          isUnitTested: "null",
          isTestCaseCreated: "null",
          isBrokenInstancesDeleted: "null",
          isReferenceDataHelperUpdated: "null",
          isDataDictionaryUpdated: "null",
          // Objects Array
          objectsArray: objectsArray
        }

      chrome.storage.local.set({"my_rfr": rfrData}, function() {
        chrome.runtime.sendMessage({type: 'openRFREditor', rfrId: rfrId})
      })
    })
  }

  // Execute Code to Load an RFR
  else if (request === 'load') {
    chrome.storage.local.get('test_1', function(result) {
      let data = result.test_1
      chrome.runtime.sendMessage({type: 'open', data: data})
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
