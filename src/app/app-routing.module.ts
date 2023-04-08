import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layouts } from './core/enums/layouts.enum';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AdminDashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { SystemUsersComponent } from './modules/admin/dashboard/system-users/system-users.component';
import { TicketsComponent } from './modules/admin/dashboard/tickets/tickets.component';
import { RolesComponent } from './modules/admin/dashboard/roles/roles.component';
import { GroupsComponent } from './modules/admin/dashboard/groups/groups.component';
import { OrganizationComponent } from './modules/admin/dashboard/organization/organization.component';
import { StructuresComponent } from './modules/admin/dashboard/structures/structures.component';
import { AuthGuard } from './core/guarda/auth.guard';
import { LogoutComponent } from './modules/auth/logout/logout.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   children: [{ path: '', component: DashboardComponent }],
  //   data: { layout: Layouts.Main },
  // },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'system-users', component: SystemUsersComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'organization', component: OrganizationComponent },
      { path: 'structures', component: StructuresComponent },
    ],
    data: { layout: Layouts.Admin },
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { layout: Layouts.Auth },
      },
      {
        path: 'new-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
    data: { layout: Layouts.Auth },
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { layout: Layouts.Main },
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/chat/chat-routing.module').then(m => m.ChatRoutingModule),
    data: { layout: Layouts.Main },
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
