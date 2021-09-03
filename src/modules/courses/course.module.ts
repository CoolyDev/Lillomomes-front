/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import {CoursesCardComponent} from '@modules/courses/components/courses-card/courses-card.component';
import * as tablesComponents from '@modules/employees/components';
import * as tablesContainers from '@modules/employees/containers';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
/* Components */
import * as coursesComponents from './components';

/* Containers */
import * as coursesContainers from './containers';

/* Directives */
import * as tablesDirectives from './directives';

/* Guards */
import * as tablesGuards from './guards';

/* Services */
import * as tablesServices from './services';
import * as tablesPipes from './pipes';
import {Courscomponents, EditCoursesComponent} from './components';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxDropzoneModule} from "ngx-dropzone";
import { CoursesPlannedCardComponent } from './components/courses-planned-card/coursesPlanned-card.component';
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";
import { CoursesPlannedCreateComponent } from './components/courses-planned-create/courses-planned-create.component';

import { CoursesPlannedListComponent } from './components/courses-planned-list/courses-planned-list.component';
import { CoursePlannerListContainerComponent } from './containers/course-plannerList-container/course-plannerList-container.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { CoursesPlannedDetailsComponent } from './components/courses-planned-details/courses-planned-details.component';
import { CoursesPlannedDetailsContainerComponent } from './containers/courses-planned-details-container/courses-planned-details-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    AppCommonModule,
    NavigationModule,
    Ng2SearchPipeModule,
    NgxDropzoneModule,
    NgBootstrapFormValidationModule,
  ],
    providers: [
        DecimalPipe,
        ...tablesServices.services,
        ...tablesPipes.pipes,
        ...tablesGuards.guards,
        ...tablesDirectives.directives,
    ],
    declarations: [
        ...coursesComponents.Courscomponents,
        ...coursesContainers.CoursesContainers,
        EditCoursesComponent,
        CoursesPlannedCardComponent,
        CoursesPlannedCreateComponent,
        CoursesPlannedListComponent,
        CoursePlannerListContainerComponent,
        CoursesPlannedCardComponent,
        CoursesCardComponent,
        CoursesDetailsComponent,
        CoursesPlannedDetailsComponent,
        CoursesPlannedDetailsContainerComponent,
    ],
    exports: [],
})
export class CoursesModule {}
