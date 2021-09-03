import {CoursesPlannedListComponent} from '@modules/courses/components/courses-planned-list/courses-planned-list.component';
import { CoursesPlannedCardComponent } from './courses-planned-card/coursesPlanned-card.component' ;
import { CoursesListComponent } from './courses-list/courses-list.component' ;
import { EditCoursesComponent } from '@modules/courses/components/courses-edit/edit-courses.component';

import { CoursesPlannedCreateComponent } from './courses-planned-create/courses-planned-create.component' ;

export const Courscomponents = [CoursesPlannedListComponent,CoursesPlannedCreateComponent,CoursesPlannedCardComponent, CoursesListComponent,EditCoursesComponent];

export * from './courses-planned-card/coursesPlanned-card.component';
export * from './courses-list/courses-list.component';
export * from './courses-edit/edit-courses.component';
export * from './courses-planned-create/courses-planned-create.component';
export * from './courses-planned-list/courses-planned-list.component';