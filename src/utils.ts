export function parseTextBetweenSpanAndDiv(text: string, regPattern: string): string {
  let regExp = new RegExp(regPattern, "gm");
  let regExpExecArray = regExp.exec(text);
  return regExpExecArray ? regExpExecArray[1] : "";
}

export function extractCleanText(nameText: string): string {
  return nameText.replace(/\s+/g, " ").trim();
}
