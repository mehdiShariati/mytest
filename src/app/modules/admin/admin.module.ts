import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './dashboard/aside/aside.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SystemUsersComponent } from './dashboard/system-users/system-users.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AsideComponent, SystemUsersComponent, AdminDashboardComponent],
  imports: [CommonModule, InlineSVGModule, RouterModule, TableModule, ProgressBarModule, InputTextModule],
  exports: [AsideComponent],
})
export class AdminModule {}
