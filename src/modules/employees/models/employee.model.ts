import { Room} from '@modules/classroom/models';
import {Students} from '@modules/student/models';

export interface Country {
    [key: string]: string | number;
    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}

export interface Employees {
    id: number;
    firstName: string ;
     lastName:string  ;
    gender:string;
   birthday:string;
   businessPhone:string;
    privatePhone:string;
   email:string;
   nationality:string;
    status:Boolean ;
    linkedinLink:string;
     xingLink:string;
    facebookLink:string;
    youtubeLink:string;
   address:string;
   city:string;
     country:string;
    institutions:Institution;
    jobType:string;
    department:string;
    jobRole:string;
    workLocation:string;
     password:string;
    historiques:History;
    emergencyContacts:EmergencyContacts;
    skills:Skill;
    role:Roles;
  }
export interface  Courses {
    idCourses:number | null,
    courseLevel: string,
    courseName: string,
    coursePrice:string,
    courseUnit:string,
    courseStatus:boolean
    institution:Institution,
    courseComment:string,
    courseDescription:string
}

export interface  CoursesPlanned {
    idPlanCourse:number | null,
    startDate: string,
    endDate:string,
    coursesTime:string,
    startTime:string,
    courseType:string,
    courseMode:string,
    endTime:string,
    courseFrequency: string,
    courseUnit:string,
    courses:Courses,
    employee:Employees,
    room:Room,
    students:Students,
    plannedCourseStatus:string,
    remark:string
}

export interface  Status {
    id: number | null,
    name: string,
}
export interface  EmergencyContacts {
    id:number|null,
    firstName: string,
    lastName: string,
    email: string,
    phone1: string,
    phone2: string,
}
export interface  Skill {
    id: number | null,
    skillName: string,
}
export interface  Institution {
    id: number | null,
    institutionName: string,
}
export interface  Departement {
  id: number,
  name: string,
}


export interface  History {
  id: number | null,
  year: string,
  entitled: string,
}

export enum Roles {
  ROLE_ADMIN= 'Admin',
  ROLE_MODERATOR= 'Moderator',
  ROLE_SUPER_ADMIN = 'Super Admin',
  ROLE_USER="User"
}

export enum Department {
  Admission= 'Admission',
  IT= 'IT',
  Teaching = 'Teaching',
  Leadership= "Leadership",
  SalesMarketing="Sales & Marketing"
}

export enum EmergencyContactNature {
    Father= "Father",
    Mother= "Grandfather",
    Grandfather="Grandfather",
    Grandmother = "Grandmother",
    Brother= "Brother",
    Uncle="Uncle",
    Aunt= 'Aunt',
    Godfather= "Godfather",
    Godmother = "Godmother",
    Boyfriend= "Boyfriend",
    Girlfriend= "Girlfriend",
    Husband="Husband",
    Wife= "Wife",
    Other= "Other",
}

export interface Rule {
  id: number | null,
  name: string,
}
export interface Teacher {
    idTeacher: number | null,
    firstName: string,
    lastName: string,
    gender: string,
    jobRole:string,
    department:string,
    email:string,
    businessPhone:string,
    privatePhone:string,
    workLocation:string,
    password:string,
    Cpassword:string,
    status:string,
    roles:Rule,
    historique:History,
    archived:boolean | undefined
}