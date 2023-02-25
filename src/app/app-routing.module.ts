import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layouts } from './core/enums/layouts.enum';
import { DashboardAdminComponent } from './modules/admin/dashboard/dashboard.component';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   children: [{ path: '', component: DashboardComponent }],
  //   data: { layout: Layouts.Main },
  // },
  {
    path: 'admin',
    children: [{ path: '', component: DashboardAdminComponent }],
    data: { layout: Layouts.Main },
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
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
