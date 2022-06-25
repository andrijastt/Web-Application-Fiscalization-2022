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

  passwordChange(){
    localStorage.setItem('location', 'company')
    this.router.navigate(['passwordChange'])
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

  firstname: string
  lastname: string

  telephoneNumber: string
  telephoneNumberCheck: string

  email: string
  emailCheck: string

  name: string
  country: string
  city: string

  postNumber: Number
  checkMailNumber: string

  streetName: string
  streetNumber: Number
  streetNumberCheck: string

  PIB: Number
  JMBP: string
  PIBCheck: string
  JMBPCheck: string

  days: number
  discount: number

  checkTelephoneNumber(){
    let telephoneNumberRegex = /^\d{9,10}$/
    if(!telephoneNumberRegex.test(this.telephoneNumber)){
      this.telephoneNumberCheck = "Bad telephone number, must contain only numbers and has 9 to 10 characters"
    } else this.telephoneNumberCheck = ""
  }

  checkEmail(){
    let emailRegex = /^.*@.*\..*[a-z]$/
    if(!emailRegex.test(this.email)){
      this.emailCheck = "Bad email format"
    } else { this.emailCheck = "" }
  }

  checkPostNumber(){
    if(this.postNumber < 10000 || this.postNumber > 99999){
      this.checkMailNumber = "Bad post number"
    } else {
      this.checkMailNumber = ""
    }
  }

  checkStreetNumber(){
    if(this.streetNumber < 0){
      this.streetNumberCheck = "Street number can't be less than 0 (0 is no number)"
    } else {
      this.streetNumberCheck = ""
    }
  }

  checkPIB(){
    if(this.PIB < 100000001 || this.PIB  > 999999999){
      this.PIBCheck = "Wrong PIB format"
    } else this.PIBCheck = ""
  }

  checkJMBP(){
    let JMBPRegex = /^\d{8}$/
    if(!JMBPRegex.test(this.JMBP)){
      this.JMBPCheck = "Wrong JMBP format"
    } else this.JMBPCheck = ""
  }

  addCustomer(){
    let send: boolean

    if(!this.firstname || !this.lastname || !this.telephoneNumber || !this.email || !this.name || !this.country || 
      !this.city || !this.postNumber || !this.streetName || !this.streetNumber || !this.PIB || !this.JMBP || !this.days || 
      !this.discount) {
        send = false
      } else send = true
  }

  PIBSearch: number
  PIBSearchCheck: string
  companySearch: Company

  checkPIBSearch(){
    if(this.PIBSearch < 100000001 || this.PIBSearch  > 999999999){
      this.PIBSearchCheck = "Wrong PIB format"
    } else this.PIBSearchCheck = ""
  }

  findCompanyByPIB(){
    this.companyService.findCompanyByPIB(this.PIBSearch).subscribe((data: Company)=>{
      this.companySearch = data
    })
  }

}
