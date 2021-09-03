import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';

import * as tablesComponents from './components/index';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as tablesContainers from './container';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IConfig, NgxMaskModule } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [

    ...tablesContainers.ContainersCompta,
    ...tablesComponents.ComponentsCompta,
],
exports: [
  ...tablesContainers.ContainersCompta,...tablesComponents.ComponentsCompta],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    NavigationModule,
    RouterModule,ReactiveFormsModule, FormsModule,
    NgMultiSelectDropDownModule,
    CommonModule,AppCommonModule
  ]
})
export class ComptabiliteModule { }
