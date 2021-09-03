export interface Country {
    [key: string]: string | number;
    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}

export interface Employees {
    id: number | null,
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
    courseStatus:Boolean,
    roles:Rule,
    historique:History,
    isArchived:boolean | undefined
  }
export interface  courseStatus {
  id: number | null,
  name: string,
}

export interface  Departement {
  id: number | null,
  name: string,
}


export interface  History {
  id: number | null,
  year: string,
  entitled: string,
}

export enum EplannedCourseStatus {
    ongoing= 'ongoing',
    finished= 'finished',
    planned = 'planned',
}
export interface Rule {
  id: number | null,
  name: string,
}
