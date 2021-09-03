/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import {NgbdToastGlobal} from '@modules/student/toast/toast-global.component';
import {ToastsContainer} from '@modules/student/toast/toasts-container.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


/* Components */
import * as tablesComponents from './components';

/* Containers */
import * as tablesContainers from './containers';

/* Directives */
import * as tablesDirectives from './directives';

/* Guards */
import * as tablesGuards from './guards';

/* Services */
import * as tablesServices from './services';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { StudentFormComponent } from './components/student-form/student-form.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        Ng2SearchPipeModule,
        NgxDropzoneModule,
        NgBootstrapFormValidationModule,
        NgMultiSelectDropDownModule,
    ],
    providers: [
        DecimalPipe,
        ...tablesServices.services,
        ...tablesGuards.guards,
        ...tablesDirectives.directives,
    ],
    declarations: [
        NgbdToastGlobal, ToastsContainer,
      //Container
        ...tablesContainers.StudentContainers,

        ...tablesComponents.StudentComponents,
        ...tablesDirectives.directives,
        StudentDetailsComponent,
        StudentFormComponent,
    ],
    exports: [...tablesContainers.StudentContainers, ...tablesComponents.StudentComponents],
})
export class StudentTablesModule {}
