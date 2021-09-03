/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */


/* Containers */
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';
import { StudentTablesModule } from './student-tables.module';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: tablesContainers.StudentTableContainer,
        data: {
            title: 'YASMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Elèves',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
  {
    path: 'student-details',
    canActivate: [],
    component: tablesContainers.StudentsDetailsContainer,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Elèves',
          link: '/students',
          active: false,
        },
        {
          text: 'details',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  {
    path: 'student-edit',
    canActivate: [],
    component: tablesContainers.StudentFormContainer,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Elèves',
          link: '/students',
          active: false,
        },
        {
          text: 'edit',
          active: true,
        },
      ],
    } as SBRouteData,
  },

  {
    path: 'student-edit/:id',
    canActivate: [],
    component: tablesContainers.StudentFormContainer,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Elèves',
          link: '/students',
          active: false,
        },
        {
          text: 'edit',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  {
    path: 'student-create',
    canActivate: [],
    component: tablesContainers.StudentFormContainer,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Elèves',
          link: '/students',
          active: false,
        },
        {
          text: 'Student add',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  {
    path: 'student-details/:id',
    canActivate: [],
    component: tablesContainers.StudentsDetailsContainer,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Elèves',
          link: '/students',
          active: false,
        },
        {
          text: 'Details Elèves',
          active: true,
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
    imports: [StudentTablesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class StudentTablesRoutingModule {}
