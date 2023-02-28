import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { FooterComponent } from '../modules/base/footer/footer.component';
import { HeaderComponent } from '../modules/base/header/header.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { AdminModule } from '../modules/admin/admin.module';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, LayoutsRoutingModule, AdminModule],
  exports: [MainLayoutComponent, AuthLayoutComponent],
})
export class LayoutsModule {}
