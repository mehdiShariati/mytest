import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./modules/auth/auth.module";
import {RouterModule, Routes} from "@angular/router";

registerLocaleData(en);

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule)},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    // {provide: NZ_I18N, useValue: en_US}
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule {
}
