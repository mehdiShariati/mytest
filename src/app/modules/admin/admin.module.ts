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
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardInformationComponent } from './dashboard/system-users/card-information/card-information.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { GroupsComponent } from './dashboard/groups/groups.component';
import { OrganizationComponent } from './dashboard/organization/organization.component';
import { StructuresComponent } from './dashboard/structures/structures.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AsideComponent,
    SystemUsersComponent,
    AdminDashboardComponent,
    CardInformationComponent,
    TicketsComponent,
    RolesComponent,
    GroupsComponent,
    OrganizationComponent,
    StructuresComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule,
    TableModule,
    ProgressBarModule,
    InputTextModule,
    PaginatorModule,
    DialogModule,
    TabViewModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    ProgressSpinnerModule,
    CheckboxModule,
  ],
  exports: [AsideComponent],
})
export class AdminModule {}
