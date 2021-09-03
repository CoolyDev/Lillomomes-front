import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";
import {AuthGuard} from "@modules/auth/guards";
import {authInterceptorProviders} from "@modules/auth/interceptors/auth.interceptor";


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgMultiSelectDropDownModule.forRoot(),
        AppRoutingModule, HttpClientModule, NgBootstrapFormValidationModule.forRoot()],
    providers: [DecimalPipe,AuthGuard,authInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
