import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  user: User
  oldPassword: string
  oldPasswordCheck: string

  newPassword: string
  newPasswordCheck: string

  confirmNewPassword: string
  confirmPasswordCheck: string

  passwordError: string

  send: boolean

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  checkOldPassword(){
    if(this.oldPassword != this.user.password) this.oldPasswordCheck = "Old password doesn't match"
    else this.oldPasswordCheck = "" 
  }

  checkNewPassword(){
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,12}$/
    if(!passwordRegex.test(this.newPassword)){
      this.newPasswordCheck = "Password must contain at least 1 number, 1 small letter, 1 capital letter, 1 special charater and 8 to 12 characters"
    } else { this.newPasswordCheck = "" }
    
  }

  checkConfirmPassword(){
    if(this.newPassword != this.confirmNewPassword){
      this.confirmPasswordCheck = "Passwords don't match"
    } else { 
      if(this.newPassword == this.oldPassword){
        this.passwordError = "New password can't be the same as the old one"
      } else this.passwordError = ""
      this.confirmPasswordCheck = "" 
    }
  }

  change(){

    if(this.oldPassword != this.newPassword && this.newPassword == this.confirmNewPassword) this.send = true
    else this.send = false

    if(this.send){
      this.userService.changePassword(this.user.username, this.newPassword).subscribe((resp =>{
        alert(resp['message'])
        localStorage.clear()
        this.router.navigate([''])
      }))
    } else {
      alert("Check input, something doesn't match")
    }
  }

}
