import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { FooterComponent } from '../modules/base/footer/footer.component';
import { HeaderComponent } from '../modules/base/header/header.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { AdminModule } from '../modules/admin/admin.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent, HeaderComponent, FooterComponent, AdminLayoutComponent],
  imports: [CommonModule, LayoutsRoutingModule, AdminModule, DashboardModule, ConfirmDialogModule, InlineSVGModule],
  exports: [MainLayoutComponent, AuthLayoutComponent, AdminLayoutComponent],
})
export class LayoutsModule {}
