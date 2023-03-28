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
    children: [
      { path: 'system-users', component: SystemUsersComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'groups', component: GroupsComponent },
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
    ],
    data: { layout: Layouts.Auth },
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { layout: Layouts.Main },
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/chat/chat-routing.module').then(m => m.ChatRoutingModule),
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
