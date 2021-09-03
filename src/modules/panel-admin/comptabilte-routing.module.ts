
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHeadComponent } from '@modules/navigation/components';
import { SBRouteData } from '@modules/navigation/models';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { InscriptionComponent, PaiementComponent } from './components/index';
import { ComptabiliteModule } from './comptabilite.module';

import * as tablesContainers from './container/index';
/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: tablesContainers.InscriptionContainer,
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
    path: 'inscription',
    canActivate: [],
    component: tablesContainers.InscriptionContainer,
    data: {
        title: 'Lillomômes',
        breadcrumbs: [
            {
                text: 'Dashboard',
                link: '/dashboard',
            },
            {
                text: 'inscription',
                active: true,
            },
        ],
    } as SBRouteData,
},
{
    path: 'paiement',
    canActivate: [],
    component: tablesContainers.PaiementContainer,
    data: {
        title: 'Lillomômes',
        breadcrumbs: [
            {
                text: 'Dashboard',
                link: '/dashboard',
            },
            {
                text: 'paiement',
                active: true,
            },
        ],
    } as SBRouteData,
},
];

@NgModule({
  declarations: [],
    imports: [ComptabiliteModule,RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ComptabiliteRoutingModule {}
