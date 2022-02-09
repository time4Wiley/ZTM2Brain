import { extractCleanText, parseTextBetweenSpanAndDiv, removeLastDirectoryPartsOf } from "./utils";
import { Course, Lecture, Section } from "./Course";
import { ERegForSectionTitle } from "./ZTMParsing";

function extractSectionsAndLecturesForCourse(meta: { abbrev: string; brand: string }) {
  const course = new Course();

  course.meta = meta;

  let selectorForCourseSection = "div.course-section";
  let selectorForSectionTitle = "div.section-title";
  const sectionElements = document.querySelectorAll(selectorForCourseSection);

  let pageURL = document.URL;

  const isWIP = pageURL.indexOf('lectures') > 0

  const regForSectionTitle = isWIP ? ERegForSectionTitle.WIP : ERegForSectionTitle.O100
  const selectorForCourseTitle = isWIP ? 'div.course-sidebar-head>h2' : 'div.course-sidebar>h2'

  course.title = document.querySelector(selectorForCourseTitle)?.textContent ?? ''
  course.url = isWIP ? removeLastDirectoryPartsOf(pageURL, 2) : pageURL

  for (let sectionElement of sectionElements) {

    const sectionTitleElement = sectionElement.querySelector(selectorForSectionTitle);
    if (!sectionTitleElement) {
      continue;
    }

    let sectionTitle = parseTextBetweenSpanAndDiv(sectionTitleElement.innerHTML, regForSectionTitle);

    if (!sectionTitle) {
      sectionTitle = parseTextBetweenSpanAndDiv(sectionTitleElement.outerHTML, regForSectionTitle);
    }

    console.log("👄: ", sectionTitle);
    const section = new Section(sectionTitle.trim());

    const lectureElements = sectionElement.querySelectorAll<HTMLAnchorElement>(".section-item>a.item");
    console.log(lectureElements.length);
    for (let lectureElement of lectureElements) {
      let lectureURL = lectureElement.href;
      const lectureNameElement = lectureElement.querySelector<HTMLSpanElement>("div.title-container>span.lecture-name");

      let lectureTitle = "";

      if (lectureNameElement) {
        lectureTitle = extractCleanText(lectureNameElement.textContent ?? "");
      }

      section.addLecture(new Lecture(lectureURL, lectureTitle));

    }
    course.addSection(section);

  }

  return course
}

const brand = 'ZTM'
const abbrev = 'FPY'
const meta = {brand, abbrev}
let course = extractSectionsAndLecturesForCourse(meta);

// copy(course)
