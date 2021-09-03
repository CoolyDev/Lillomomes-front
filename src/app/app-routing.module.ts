import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@modules/auth/guards";
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },

    {
        path: 'dashboard',
       canActivate: [AuthGuard],
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: 'tables',
        loadChildren: () =>
            import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    },
    {
        path: 'comptabilite',
        loadChildren: () =>
            import('@modules/panel-admin/comptabilte-routing.module').then(m => m.ComptabiliteRoutingModule),
    },
    {
        path: 'employees',
        loadChildren: () =>
            import('@modules/employees/employees-routing.module').then(m => m.EmployeesRoutingModule),
    },
    {
        path: 'students',
        loadChildren: () =>
            import('modules/student/student-tables-routing.module').then(m => m.StudentTablesRoutingModule),
    },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: 'rooms',
        loadChildren: () =>
            import('modules/classroom/classroom-routing.module').then(m => m.ClassroomRoutingModule),
    },
    {
        path: 'courses',
        loadChildren: () =>
            import('@modules/courses/course-routing.module').then(m => m.CourseRoutingModule),
    },
    {
        path: 'teacher',
        loadChildren: () =>
            import('modules/teachers/teacher-routing.module').then(m => m.TeacherRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
