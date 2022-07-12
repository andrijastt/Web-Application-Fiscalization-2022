import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Buyer } from '../model/buyer';
import { Company } from '../model/company';
import { Item } from '../model/item';
import { ItemStats } from '../model/itemStats';
import { Receipt } from '../model/receipt';
import { StorageUnit } from '../model/storageUnit';
import { ReceiptDetailsComponent } from '../receipt-details/receipt-details.component';
import { RegisterCompanyService } from '../register-company.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private registerComapnyService: RegisterCompanyService, private companyService: CompanyService,
    private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.meBuyer = JSON.parse(localStorage.getItem('buyer'))

    this.registerComapnyService.getAllRegisterCompany().subscribe((data: Company[])=>{
      this.companies = data;

      for(let i = 0; i < this.companies.length; i++){

        let numbers: number[] = []
        let strings: string[] = []
        let stringsName: string[] = []
        let stringsProducer: string[] = []
        this.userService.getMyItems(this.companies[i].name).subscribe((data: string[])=>{

          for(let j = 0; j < data.length; j++){
            this.userService.getCheapestPrice(data[j], "", this.companies[i].name).subscribe((data1: ItemStats[])=>{
              let item: ItemStats = data1[0]
              numbers.push(item.sellingPrice)
              stringsName.push(item.itemName)
              stringsProducer.push(item.itemProducer) 

              this.lowestPrice[i] = numbers
              this.itemNames[i] = stringsName
              this.itemProducers[i] = stringsProducer
              this.userService.getDistinctPlace(data[j], "", this.companies[i].name).subscribe((data2: string)=>{
                strings.push(data2)
                this.storageUnits[i] = strings
              })
            })
          }
        })
      }
    })

    this.userService.getMyReceipts(this.meBuyer.idCard).subscribe((data: Receipt[])=> {
      this.myReceipts = data
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  passwordChange(){
    localStorage.setItem('location', 'user')
    this.router.navigate(['passwordChange'])
  }

  meBuyer: Buyer

  myReceipts: Receipt[] = []

  companies: Company[] = []

  itemNames: string[][] = []
  itemProducers: string[][] = []
  lowestPrice: number[][]= []
  storageUnits: string[][] = []

  itemNameSearch: string = ""
  itemProducerSearch: string = ""
  itemsSearch: ItemStats[] = []

  searchItem(){
    this.userService.searchItem(this.itemNameSearch, this.itemProducerSearch).subscribe((data: ItemStats[])=>{
      this.itemsSearch = data
    })
  }

  openDialog(receipt){
    this.dialog.open(ReceiptDetailsComponent, {
      height: '800px',
      width: '800px',
      data: {
        receipt: receipt 
      }
    })
  }

}
