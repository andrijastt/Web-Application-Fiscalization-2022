import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  loginAdmin(){
    this.adminService.loginAdmin(this.username, this.password).subscribe((userFromDB : User)=>{
      if(userFromDB != null){
        this.router.navigate(['admin'])
      } else this.message = "Error"
    })
  }

}
