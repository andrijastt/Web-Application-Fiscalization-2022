import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB != null){
        if(userFromDB.type == 0){
          this.router.navigate(['user'])
        } 
        else {
          if(userFromDB.type == 1){
            this.router.navigate(['company'])
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
