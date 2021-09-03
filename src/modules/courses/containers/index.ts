
import {CoursesListComponent} from '@modules/courses/components';
import {CoursePlannerListContainerComponent} from '@modules/courses/containers/course-plannerList-container/course-plannerList-container.component';
import { CoursesCardContainer } from '@modules/courses/containers/courses-card-container/courses-card.component';
 import {CoursesEditConteners} from '@modules/courses/containers/courses-edit-container/courses-editConteners'
import {CoursesDetailsConteners} from '@modules/courses/containers/courses-details-container/courses-detailsConteners';
import {CoursesPlannedDetailsContainerComponent} from '@modules/courses/containers/courses-planned-details-container/courses-planned-details-container.component';
import {CoursesPlannerContainer} from '@modules/courses/containers/courses-planner-container/courses-planner-container.component';


export const CoursesContainers = [CoursesPlannedDetailsContainerComponent,CoursesPlannerContainer,CoursesListComponent,CoursePlannerListContainerComponent,CoursesCardContainer,CoursesEditConteners,CoursesDetailsConteners];


export * from './courses-card-container/courses-card.component'
export * from './courses-edit-container/courses-editConteners'
export * from './courses-details-container/courses-detailsConteners'
export * from './courses-planner-container/courses-planner-container.component'
export * from './course-plannerList-container/course-plannerList-container.component'
export * from './courses-card-container/courses-card.component'
export * from './courses-planned-details-container/courses-planned-details-container.component'