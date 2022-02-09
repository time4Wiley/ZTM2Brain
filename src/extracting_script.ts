import { extractCleanText, parseTextBetweenSpanAndDiv } from "./utils";

console.log("extracting Great");

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

// TODO: extract section titles

class Lecture {
  constructor(public url: string, public title: string) {

  }

}

class Section {
  private lectures: Lecture[];

  constructor(public title: string) {
    this.lectures = [];
  }


  addLecture(lecture: Lecture) {
    this.lectures.push(lecture);
  }
}

function removeLastDirectoryPartsOf(url:string, n:number):string
{
  const segments = url.split("/");
  segments.splice(segments.length - n, n);
  return( segments.join('/') );
}

function extractSectionsAndLecturesForCourse() {
  const course = new Course();
  let selectorForCourseSection = "div.course-section";
  let selectorForSectionTitle = "div.section-title";
  const sectionElements = document.querySelectorAll(selectorForCourseSection);

  let pageURL = document.URL;

  const isWIP = pageURL.indexOf('lectures') > 0

  const regForSectionTitle = isWIP ? "<\\/span>([^\\0]*)</div>" : "<\\/span>([^\\0]*)<div class=\"section-days-to-drip"
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

    // let sectionTitle = extractCleanText(sectionTitleElement.textContent ?? "👄");
    // console.log(sectionTitleElement.textContent)
    console.log("👄");
    console.log(sectionTitle);
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

  console.log(sectionElements.length);

  return course
}


class Course {
  private sections: Section[];
  public title: string = '';
  public url: string = '';

  constructor() {
    this.sections = [];
  }

  addSection(section: Section) {
    this.sections.push(section);
  }
}

let course = extractSectionsAndLecturesForCourse();

// copy(course)
