console.log("extracting Great")

function extractLinks() {
  const x = document.querySelectorAll("a");
  const myArray:[string, string][] = [];
  for (let element of x) {
    const nameText = element.textContent;
    if (nameText) {
      const cleanText = nameText.replace(/\s+/g, " ").trim();
      const cleanLink = element.href;
      myArray.push([cleanText, cleanLink]);
    }

  }

  return myArray
}

console.log(extractLinks()[0])

// TODO: extract section titles

function extractSectionTitles() {

}

extractSectionTitles()

