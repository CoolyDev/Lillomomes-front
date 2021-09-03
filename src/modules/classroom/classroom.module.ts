/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import {IConfig, NgxMaskModule} from 'ngx-mask';

/* Components */
import * as tablesComponents from './components';

/* Containers */
import * as tablesContainers from './containers';

import * as tablesServices from './services';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxDropzoneModule} from "ngx-dropzone";
import { ClassroomCardComponent } from './components/classroom-card/classroom-card.component';
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    NgxMaskModule.forRoot(maskConfig),
    Ng2SearchPipeModule,
    NgxDropzoneModule,
    NgBootstrapFormValidationModule,
  ],
    providers: [
        DecimalPipe,
        ...tablesServices.services,
    ],
  declarations: [
    ...tablesContainers.ClassroomContainers,
    ClassroomCardComponent,
  ],
    exports: [...tablesContainers.ClassroomContainers, ...tablesComponents.Classroomcomponents],
})
export class ClassroomModule {}
