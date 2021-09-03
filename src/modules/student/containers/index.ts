import { StudentTableContainer } from './student-table-container/student-table.component';
import {StudentsDetailsContainer} from "@modules/student/containers/student-details-container/student-details-container";
import {StudentFormContainer} from "@modules/student/containers/student-form-container/student-form-container";

export const StudentContainers = [StudentTableContainer,StudentsDetailsContainer,StudentFormContainer];

export * from './student-table-container/student-table.component';
export * from './student-details-container/student-details-container';
export * from './student-form-container/student-form-container';
