import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
