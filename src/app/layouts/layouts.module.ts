import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { FooterComponent } from '../modules/base/footer/footer.component';
import { HeaderComponent } from '../modules/base/header/header.component';
import { LayoutsRoutingModule } from './layouts-routing.module';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, LayoutsRoutingModule],
  exports: [MainLayoutComponent, AuthLayoutComponent],
})
export class LayoutsModule {}
