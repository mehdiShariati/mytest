import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminComponent } from './dashboard/dashboard.component';
import { AsideComponent } from './dashboard/aside/aside.component';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [DashboardAdminComponent, AsideComponent],
  imports: [CommonModule, InlineSVGModule],
})
export class AdminModule {}
