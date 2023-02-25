import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';

const COMPONENTS = [];

const MODULES = [CommonModule, DashboardModule, AuthModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
})
export class FeaturesModule {}
