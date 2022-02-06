export function parseTextBetweenSpanAndDiv(text: string): string {

  let regPattern = "/<\\/span>(\\C*)<div class=\"section-days-to-drip/gm";

  let regExpExecArray = new RegExp(regPattern).exec(text);
  return regExpExecArray ? regExpExecArray[1] : "";
}
