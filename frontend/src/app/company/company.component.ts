import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../model/company';
import { StorageUnit } from '../model/storageUnit';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'))
    this.companyService.getMyStorageUntis(this.company.PIB).subscribe((data: StorageUnit[])=>{
      this.storageUnits = data
    })
  }

  company: Company
  storageUnits: StorageUnit[] = []

  logout(){
    this.router.navigate([''])
  }

  companyData: boolean
  ordersData: boolean
  storageRegisterData: boolean
  itemData: boolean
  tableData: boolean

  setCompanyData(){
    this.companyData = true
    this.ordersData = false
    this.storageRegisterData = false
    this.itemData = false
    this.tableData = false
  }

  setOrdersData(){
    this.companyData = false
    this.ordersData = true
    this.storageRegisterData = false
    this.itemData = false
    this.tableData = false
  }

  setStorageRegisterData(){
    this.companyData = false
    this.ordersData = false
    this.storageRegisterData = true
    this.itemData = false
    this.tableData = false
  }

  setItemData(){
    this.companyData = false
    this.ordersData = false
    this.storageRegisterData = false
    this.itemData = true
    this.tableData = false
  }

  setTableData(){
    this.companyData = false
    this.ordersData = false
    this.storageRegisterData = false
    this.itemData = false
    this.tableData = true
  }

}
