/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { TeacherModule } from './teacher.module';

/* Containers */
import * as teacherContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: teacherContainers.TeacherTablesComponent,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Teachers',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
  {
    path: 'create-teacher',
    canActivate: [],
    component: teacherContainers.TeacherEditConteners,
    data: {
      title: 'OMS',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Teachers',
          link: '/teacher',
          active: false,
        },
        {
          text: 'Teacher add',
          active: true,
        },
      ],
    } as SBRouteData,
  },
    {
        path: 'profil-teacher/:id',
        canActivate: [],
        component: teacherContainers.TeacherProfilContainer,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Teachers',
                    link: '/teacher',
                    active: false,
                },
                {
                    text: 'teacher profil',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [TeacherModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TeacherRoutingModule {}
