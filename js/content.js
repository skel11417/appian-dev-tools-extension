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

  // Execute code to create documentation for a constant
  else if (request === 'documentConstant') {
    // Execute code only if the constant window appears on screen
    if ( isEnabledConstantTools() ) {
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

        let constantValue = getConstantValue();
        let isConstantMultiple = determineIfConstantIsMultiple();
        if ( constantValue === "" ) {
          alert("Enter a value for the constant")
        }
        // Replace value if constant is set to multiple
        else if ( isConstantMultiple ) {
          renderConstantDocumentation("Contains multiple values", developerName)
        }
        // Do not write value if value length is extremely long
        else if (constantValue.length > 300) {
          renderConstantDocumentation("", developerName)
        }
        else {
          renderConstantDocumentation(constantValue, developerName)
        }
      })
    }
    else {
      alert("No constant selected")
    }
  }

  // Execute request to add a changelog entry to a constant
  else if (request === 'addChangelogEntry') {
    // Execute code only if the constant window appears on screen
    if ( isEnabledConstantTools() ) {
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
        addChangelogEntryToConstant(developerName)
      })
    }
    else {
      alert("No constant selected")
    }
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
