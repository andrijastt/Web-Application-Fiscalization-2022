import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../model/company';
import { Item } from '../model/item';
import { ItemStats } from '../model/itemStats';
import { StorageUnit } from '../model/storageUnit';
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

          for(let j = 0; j < this.items[i].length; j++){
            this.userService.getCheapestPrice(this.items[i][j].itemName, this.items[i][j].producer, this.comapnies[i].name).subscribe(
              (data: ItemStats[]) => {
                this.itemStats[i] = data
                this.userService.getDistinctStorageUnits(this.items[i][j].itemName, this.items[i][j].producer, this.comapnies[i].name).subscribe(
                  (data: string)=> {
                    this.itemStats[i][0].storageUnit = data
                  })
            })
          }
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
  itemStats: ItemStats[][] = []

  itemNameSearch: string = ""
  itemProducerSearch: string = ""
  itemsSearch: ItemStats[] = []

  searchItem(){
    this.userService.searchItem(this.itemNameSearch, this.itemProducerSearch).subscribe((data: ItemStats[])=>{
      this.itemsSearch = data
    })
  }

}
