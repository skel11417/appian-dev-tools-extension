// generateRuleComments.js

chrome.storage.local.get('developerName', function (result) {

  let developerName

  if (result.developerName){
    developerName = result.developerName
  } else {
    developerName = window.prompt(
      "Enter your name",
      "No Name"
    )
    // Save the name
    chrome.storage.local.set({developerName: developerName}, function() {
      console.log('Developer name set to ' + developerName);
    })
  }

  // generateRuleComments
  let ticket = window.prompt(
    "Ticket number for this object",
    // default response
    ""
  );

  let priorVersion = window.prompt(
    "Version Prior to Change",
    // default response
    ""
  );

  let formatDate = () => {
    let today = new Date()
    let dd  = (today.getDate() < 10 ? '0' : '') + today.getDate();
    let month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
    let yyyy = today.getFullYear()
    return (yyyy + "-" + month + "-" + dd);
  }

  let date = formatDate()

  document.activeElement.value=
`<${date}><${ticket}><${developerName}><Version Prior to Change: ${priorVersion}>
  -- `

})
