export function parseTextBetweenSpanAndDiv(text: string, regPattern: string): string {
  let regExp = new RegExp(regPattern, "gm");
  let regExpExecArray = regExp.exec(text);
  return regExpExecArray ? regExpExecArray[1] : "";
}

export function extractCleanText(nameText: string): string {
  return nameText.replace(/\s+/g, " ").trim();
}

function extractLinks() {
  const x = document.querySelectorAll("a");
  const myArray: [string, string][] = [];
  for (let element of x) {
    const nameText = element.textContent;
    if (nameText) {
      const cleanText = extractCleanText(nameText);
      const cleanLink = element.href;
      myArray.push([cleanText, cleanLink]);
    }

  }

  return myArray;
}

export function removeLastDirectoryPartsOf(url: string, n: number): string {
  const segments = url.split("/");
  segments.splice(segments.length - n, n);
  return (segments.join("/"));
}
