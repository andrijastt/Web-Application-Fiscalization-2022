import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ItemStats } from '../model/itemStats';
import { Receipt } from '../model/receipt';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.get5latestReceipts().subscribe((data: Receipt[])=>{
      this.receipts = data

      for(let i = 0; i < this.receipts.length; i++){
        let items: ItemStats[] = []
        items = this.receipts[i].selectedItems
        this.receiptsItems.push(items)
      }
    })
  }

  receipts: Receipt[] = []
  receiptsItems: ItemStats[][] = []

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
