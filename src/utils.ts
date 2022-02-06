export function parseTextBetweenSpanAndDiv(text: string): string {

  // let regPattern = "/<\/span>(\C*)<div class=\"section-days-to-drip/";
  let regPattern = "<\\/span>([^\\0]*)<div class=\"section-days-to-drip";

  let regExp = new RegExp(regPattern, "gm");
  let regExpExecArray = regExp.exec(text);
  return regExpExecArray ? regExpExecArray[1] : "";
}

export function extractCleanText(nameText: string): string {
  return nameText.replace(/\s+/g, " ").trim();
}
