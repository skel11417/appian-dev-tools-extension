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
  let date = today.getDate()
  let month = today.getMonth() + 1
  let year = today.getFullYear()
  return `${year}-${month}-${date}`
}

let date = formatDate()

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
