import { extractCleanText, parseTextBetweenSpanAndDiv } from "./utils";
import { ERegForSectionTitle } from "./ZTMParsing";

function testParseTextBetweenSpanAndDiv(text: string) {
  return parseTextBetweenSpanAndDiv(text, ERegForSectionTitle.O100);
}

let title;
title = testParseTextBetweenSpanAndDiv(`
<div class="col-sm-12 course-section">
    <div class="section-title" data-release-date="" data-days-until-dripped="" data-is-dripped-by-date="" data-course-id="776308">
      <span class="section-lock v-middle">
        <svg width="24" height="24">
          <use xlink:href="#icon__LockClock"></use>
        </svg>&nbsp;
      </span>
      Introduction
      
      <div class="section-days-to-drip">
        <div class="section-days-logged-in">
          Available in
          <span class="section-days-to-drip-number"></span>
          days
        </div>
        <div class="section-days-logged-out">
          <span class="section-days-to-drip-number"></span>
          days
          after you enroll
        </div>
      </div>
    </div>
    
`);

console.log(extractCleanText(title));

let testTitle = "\n      Lifelong Learning\n      \n      ";

console.log(extractCleanText(testTitle));
