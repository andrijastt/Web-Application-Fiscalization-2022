import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { CompanyFirstComponent } from './company-first/company-first.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { TableReceiptComponent } from './table-receipt/table-receipt.component';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';

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
    PasswordChangeComponent,
    CategoryDialogComponent,
    TableReceiptComponent,
    ReceiptDetailsComponent
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
    MatRadioModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// npm install --save @angular/material
// ng add @angular/material
// npm install --save @angular/cdk @angular/material
// npm install craftyjs
// npm install -g browserify
// npm install
// npm install --save ocanvas
// u assets kod front-a se dodaju js fajlovi, a angular.json kod fronta u scripts deo dodajem scripte koej se 