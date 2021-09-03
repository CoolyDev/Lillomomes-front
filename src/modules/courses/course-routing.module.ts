/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursePlannerListContainerComponent} from '@modules/courses/containers/course-plannerList-container/course-plannerList-container.component';
import {CoursesDetailsConteners, CoursesPlannedDetailsContainerComponent} from './containers';

/* Module */
import { CoursesModule } from './course.module';

/* Containers */
import * as CoursesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: CoursesContainers.CoursesCardContainer,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Course Catalog',
                    active: true,
                },
            ],
        } as SBRouteData,
    },

  {
    path: 'course-details/:id',
    canActivate: [],
    component: CoursesContainers.CoursesDetailsConteners,
    data: {
      title: 'OMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Courses',
          link: '/courses',
          active: false,
        },
        {
          text: 'Course Details',
          active: true,
        },
      ],
    } as SBRouteData,
  },

   {
    path: 'course-create',
   canActivate: [],
   component: CoursesContainers.CoursesEditConteners,
     data: {
     title: 'OMS',
     breadcrumbs: [
      {
          text: 'Dashboard',
       link: '/dashboard',
       },
      {
        text: 'Courses',
        link: '/courses',
        active: false,
     },
     {
      text: 'Course Add',
       active: true,
      },
    ],
  } as SBRouteData,
 },

    {
        path: 'course-planned-list',
        canActivate: [],
        component: CoursesContainers.CoursePlannerListContainerComponent,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Planned Courses',
                    link: '/courses/course-planned-list',
                    active: false,
                },
                {
                    text: 'Course Planned List',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'course-planned-details/:id',
        canActivate: [],
        component: CoursesContainers.CoursesPlannedDetailsContainerComponent,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Planned Courses',
                    link: '/courses/course-planned-list',
                    active: false,
                },
                {
                    text: 'Course Planned Details',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'course-planner',
        canActivate: [],
        component: CoursesContainers.CoursesPlannerContainer,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Courses',
                    link: '/courses',
                    active: false,
                },
                {
                    text: 'Course planner',
                    active: true,
                },
            ],
        } as SBRouteData,
    },

    {
        path: 'editCoursePlanned/:idCourse',
        canActivate: [],
        component: CoursesContainers.CoursesPlannerContainer,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Courses',
                    link: '/courses',
                    active: false,
                },
                {
                    text: 'Course planned edit',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'course-planner/:id',
        canActivate: [],
        component: CoursesContainers.CoursesPlannerContainer,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Courses',
                    link: '/courses',
                    active: false,
                },
                {
                    text: 'Course planner',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'course-planner',
        canActivate: [],
        component: CoursesContainers.CoursesPlannerContainer,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Courses',
                    link: '/courses',
                    active: false,
                },
                {
                    text: 'Course planner',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
  {
    path: 'edit-course/:id',
    canActivate: [],
    component: CoursesContainers.CoursesEditConteners,
    data: {
      title: 'OMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Courses',
          link: '/courses',
          active: false,
        },
        {
          text: 'Course edit',
          active: true,
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
    imports: [CoursesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class CourseRoutingModule {}
