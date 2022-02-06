console.log("extracting Great")

extractLinks()

function extractLinks() {
  const x = document.querySelectorAll("a");
  const myArray = [];
  for (let i = 0; i < x.length; i++) {
    const nameText = x[i].textContent;
    if (nameText) {
      const cleanText = nameText.replace(/\s+/g, " ").trim();
      const cleanLink = x[i].href;
      myArray.push([cleanText, cleanLink]);
    }

  }

  console.log(myArray);
}
