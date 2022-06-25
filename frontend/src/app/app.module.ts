import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { CompanyFirstComponent } from './company-first/company-first.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CompanyComponent,
    UserComponent,
    LoginAdminComponent,
    RegisterCompanyComponent,
    CompanyFirstComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// npm install --save @angular/material
// ng add @angular/material
// npm install --save @angular/cdk @angular/material