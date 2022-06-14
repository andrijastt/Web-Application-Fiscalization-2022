import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "user", component: UserComponent},
  {path: "admin", component: AdminComponent},
  {path: "company", component: CompanyComponent},
  {path: "registerCompany", component: RegisterCompanyComponent},
  {path: "loginAdmin", component: LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
