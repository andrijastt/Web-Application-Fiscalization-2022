import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { ActivityCode } from '../model/activityCode';
import { BankAccount } from '../model/bankAccount';
import { Register } from '../model/register';
import { RegisterModel } from '../model/registerModel';

@Component({
  selector: 'app-company-first',
  templateUrl: './company-first.component.html',
  styleUrls: ['./company-first.component.css']
})
export class CompanyFirstComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  category: string

  bankAccountsModel: BankAccount[] = []
  bankAcc: string[] = []
  bank: string[] = []

  activityCodes: ActivityCode[] = []
  selectedActivityCodes: ActivityCode[] = []

  registerNumber: number = 1
  registerModels: RegisterModel[] = []
  
  registers: Register[] = []
  registersLocation: string[] = []
  registersType: string[] = []

  ngOnInit(): void {
    let reg = new Register
    this.registers.push(reg)
    this.registersLocation.push("")
    this.registersType.push("")
    this.companyService.getRegisterModels().subscribe((data: RegisterModel[])=>{
      this.registerModels = data
    })
  }

  logout(){
    this.router.navigate([''])
  }

  onAddBankAccount(){
    const BA = new BankAccount()
    this.bankAcc.push('')
    this.bank.push('')
    this.bankAccountsModel.push(BA)
  }

  remove(i){
    this.bankAccountsModel.splice(i, 1)
    this.bankAcc.splice(i, 1)
    this.bank.splice(i, 1)
  }

  getActivityCodes(){
    this.companyService.getActivityCodes(this.category).subscribe((data: ActivityCode[])=>{
      this.activityCodes = data
    })
    while(this.selectedActivityCodes.length > 0) this.selectedActivityCodes.pop()
  }

  changeRegisterNumber(){  
    if(this.registerNumber > this.registers.length){
      let reg = new Register
      this.registers.push(reg)
    } else {
      this.registers.pop()
    }
  }

  removeRegister(i){
    this.registers.splice(i, 1)
  }

  addActivityCode(ac: ActivityCode){
    if(this.selectedActivityCodes.indexOf(ac) == -1) this.selectedActivityCodes.push(ac)
    else this.selectedActivityCodes.splice(this.selectedActivityCodes.indexOf(ac), 1)
    console.log(this.selectedActivityCodes)
  }

  provera(){
    console.log(this.registersType)
  }

}
