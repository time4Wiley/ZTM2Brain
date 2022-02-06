console.log("extracting Great")

extractLinks()

function extractLinks() {
  const x = document.querySelectorAll("a");
  const myArray = [];
  for (let element of x) {
    const nameText = element.textContent;
    if (nameText) {
      const cleanText = nameText.replace(/\s+/g, " ").trim();
      const cleanLink = element.href;
      myArray.push([cleanText, cleanLink]);
    }

  }

  console.log(myArray);
}
