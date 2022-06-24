import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company';
import { User } from '../model/user';
import { RegisterCompanyService } from '../register-company.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private registerCompanyService: RegisterCompanyService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB != null){
        localStorage.setItem('user', JSON.stringify(userFromDB))
        if(userFromDB.type == 0){
          this.router.navigate(['user'])
        } 
        else {
          if(userFromDB.type == 1){
            this.registerCompanyService.checkFirstTime(userFromDB.username).subscribe((registerCompany: Company) =>{
              if(registerCompany.active){
                localStorage.setItem('company', JSON.stringify(registerCompany))
                if(registerCompany.firstTime) this.router.navigate(['companyFirst'])
                else this.router.navigate(['company'])
              } else {
                alert('Account deactivated')
                location.reload
              }
            })   
          } 
          else {
            if(userFromDB.type == 2){
              this.router.navigate(['admin'])
            } else this.message = "Ne postoji takav tip"
          }
        }
      } else this.message = "Error"
    })
  }

}
