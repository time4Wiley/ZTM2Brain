console.log("extracting Great")

function extractCleanText(nameText: string) {
  return nameText.replace(/\s+/g, " ").trim();
}

function extractLinks() {
  const x = document.querySelectorAll("a");
  const myArray:[string, string][] = [];
  for (let element of x) {
    const nameText = element.textContent;
    if (nameText) {
      const cleanText = extractCleanText(nameText);
      const cleanLink = element.href;
      myArray.push([cleanText, cleanLink]);
    }

  }

  return myArray
}

// TODO: extract section titles

function extractSectionTitles() {
  let selectorForCourseSection = "div.course-section";
  let selectorForSectionTitle = "div.section-title>span";
  const sections = document.querySelectorAll(selectorForCourseSection);

  for (let section of sections) {
    const sectionTitleElement = section.querySelector(selectorForSectionTitle)
    if (!sectionTitleElement) {
      continue
    }

    console.log(extractCleanText(sectionTitleElement.textContent ?? ""))

    const lectures = section.querySelectorAll<HTMLAnchorElement>(".section-item>a.item")
    console.log(lectures.length)
    for (let lecture of lectures) {

      console.log(lecture.href)

      const lectureNameElement = lecture.querySelector<HTMLSpanElement>("div.title-container>span.lecture-name")

      if (lectureNameElement) {
        console.log(extractCleanText(lectureNameElement.textContent ?? ""))
      }


    }
  }

  console.log(sections.length)
}

extractSectionTitles()

