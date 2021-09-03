import { TeacherTablesComponent } from './teacher-table-container/teacher-tables.component'
import {TeacherEditConteners} from "./teacher-edit-container/teacher-editConteners";
import {TeacherDetailsConteners} from "./teacher-details-container/teacher-detailsConteners";
import { TeacherProfilContainer } from './teacher-profil-container/teacher-profil.component';

export const TeacherContainers = [TeacherTablesComponent,TeacherEditConteners,TeacherDetailsConteners,TeacherProfilContainer];


export * from './teacher-table-container/teacher-tables.component'
export * from './teacher-edit-container/teacher-editConteners'
export * from './teacher-details-container/teacher-detailsConteners'
export * from './teacher-profil-container/teacher-profil.component'