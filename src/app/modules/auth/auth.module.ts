import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CoreModule } from '../../core/core.module';
import { LogoutComponent } from './logout/logout.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent, LogoutComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DialogModule,
  ],
})
export class AuthModule {}
