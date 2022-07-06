import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../model/company';
import { Item } from '../model/item';
import { RegisterCompanyService } from '../register-company.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private registerComapnyService: RegisterCompanyService, private companyService: CompanyService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.registerComapnyService.getAllRegisterCompany().subscribe((data: Company[]) => {
      this.comapnies = data;

      for(let i = 0; i < this.comapnies.length; i ++){
        this.companyService.getMyItems(this.comapnies[i].PIB).subscribe((data: Item[]) => {
          this.items[i] = data
        })
      }
    })
  }

  logout(){
    this.router.navigate([''])
  }

  passwordChange(){
    localStorage.setItem('location', 'user')
    this.router.navigate(['passwordChange'])
  }

  comapnies: Company[] = []
  items: Item[][] = []

  itemNameSearch: string = ""
  itemProducerSearch: string = ""
  itemsSearch: Item[] = []

  searchItem(){
    this.userService.searchItem(this.itemNameSearch, this.itemProducerSearch).subscribe((data: Item[])=>{
      // this.itemsSearch = data
      console.log(data)
    })
  }

}
