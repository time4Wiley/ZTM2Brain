export class Lecture {
  constructor(public url: string, public title: string) {

  }

}

export class Section {
  private lectures: Lecture[];

  constructor(public title: string) {
    this.lectures = [];
  }


  addLecture(lecture: Lecture) {
    this.lectures.push(lecture);
  }
}

export interface ICourseMeta {
  brand?:string,
  abbrev?:string,
}

export class Course {
  private sections: Section[];
  public title: string = "";
  public url: string = "";
  meta: ICourseMeta = {};

  constructor() {
    this.sections = [];
  }

  addSection(section: Section) {
    this.sections.push(section);
  }
}
