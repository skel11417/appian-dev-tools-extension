// generateDocumentation
const ruleName = document.querySelector(
  ".TitleText---page_header"
).innerText

let ticket = window.prompt(
  "Ticket number for this object",
  // default response
  "NO TICKET"
);

const formatDate = () => {
  let today = new Date()
  let dd  = (today.getDate() < 10 ? '0' : '') + today.getDate();
  let month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
  let yyyy = today.getFullYear()
  return (yyyy + "-" + month + "-" + dd);
}

let date = formatDate()
console.log("This is working")
document.activeElement.value=
`/*
  ${ruleName}(

  )
*/




/*
////////////////////////////// CHANGE LOG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

<${date}><${ticket}><Sean Kelly>
  --Created

*/
`
