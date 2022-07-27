// generateRuleComments.js
chrome.storage.local.get('developerName', function (result) {

  let developerName

  if (result.developerName){
    // Set the developer's name equal to the returned value
    developerName = result.developerName
  } else {
    // Get the developer's name via a prompt
    developerName = window.prompt(
        "Enter your name",
        "No Name"
    )
    // Save the name and return it
    chrome.storage.local.set({developerName: developerName}, function() {
      console.log('Developer name set to ' + developerName);
    })
  }

  // generateRuleComments
  let ruleName = getRuleName()

  let ticket = window.prompt(
    "Ticket number for this object",
    // default response
    "NO TICKET"
  );
  // Conditionally set the listBullet based on the ticket application prefix
  let listBullet = (ticket.substring(0, 3) === "ECO") ? "--" : "*";
  let date = formatDate()

  /* Paste rule comments */
  document.activeElement.value=
  `/*
  ${ruleName}(

  )
*/




/*
////////////////////////////// CHANGE LOG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

<${date}><${ticket}><${developerName}>
  ${listBullet} Created

*/
`

})
