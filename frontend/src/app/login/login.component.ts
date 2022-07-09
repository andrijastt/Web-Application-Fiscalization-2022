import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from '../model/buyer';
import { Company } from '../model/company';
import { ItemStats } from '../model/itemStats';
import { Receipt } from '../model/receipt';
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
    this.userService.get5latestReceipts().subscribe((data: Receipt[])=>{
      this.receipts = data

      for(let i = 0; i < this.receipts.length; i++){
        let items: ItemStats[] = []
        items = this.receipts[i].selectedItems
        this.receiptsItems.push(items)
      }
      console.log(this.receiptsItems)
    })
  }

  receipts: Receipt[] = []
  receiptsItems: ItemStats[][] = []

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB != null){
        localStorage.setItem('user', JSON.stringify(userFromDB))
        if(userFromDB.type == 0){
          this.userService.getMyBuyer(userFromDB.username).subscribe((data: Buyer)=> {
            localStorage.setItem('buyer', JSON.stringify(data))
            this.router.navigate(['user'])
          })
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
