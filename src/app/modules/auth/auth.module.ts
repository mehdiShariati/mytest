import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NzInputModule,
    NzCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
