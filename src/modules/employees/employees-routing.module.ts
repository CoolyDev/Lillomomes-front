/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { EmployeesModule } from './employees.module';

/* Containers */
import * as employeesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: employeesContainers.ContactTablesComponent,
        data: {
            title: 'YASMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Employees',
                    active: true,
                },
            ],
        } as SBRouteData,
    },


  {
    path: 'employee-details/:id',
    canActivate: [],
    component: employeesContainers.EmployeeDetailsConteners,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Employees',
          link: '/employees',
          active: false,
        },
        {
          text: 'Employee Details',
          active: true,
        },
      ],
    } as SBRouteData,
  },

  {
    path: 'employee-profil',
    canActivate: [],
    component: employeesContainers.EmployeesProfilContainer,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Employees',
          link: '/employees',
          active: false,
        },
        {
          text: 'Profil',
          active: true,
        },
      ],
    } as SBRouteData,
  },

  {
    path: 'employee-create',
    canActivate: [],
    component: employeesContainers.EmployeeEditConteners,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Employees',
          link: '/employees',
          active: false,
        },
        {
          text: 'Employee Add',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  {
    path: 'edit-employee/:id',
    canActivate: [],
    component: employeesContainers.EmployeeEditConteners,
    data: {
      title: 'YASMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Employees',
          link: '/employees',
          active: false,
        },
        {
          text: 'Employee Edit',
          active: true,
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
    imports: [EmployeesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class EmployeesRoutingModule {}
