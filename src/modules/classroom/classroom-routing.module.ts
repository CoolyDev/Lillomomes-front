/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ClassroomModule } from './classroom.module';

/* Containers */
import * as classroomContainers from './containers';

/* Guards */
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: classroomContainers.ClassroomCardContainerComponent,
        data: {
            title: 'OMS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Room',
                    active: true,
                },
            ],
        } as SBRouteData,
  },
];

@NgModule({
    imports: [ClassroomModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ClassroomRoutingModule {}
