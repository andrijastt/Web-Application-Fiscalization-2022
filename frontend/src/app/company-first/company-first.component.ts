import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { ActivityCode } from '../model/activityCode';
import { BankAccount } from '../model/bankAccount';
import { Register } from '../model/register';
import { RegisterModel } from '../model/registerModel';
import { User } from '../model/user';

@Component({
  selector: 'app-company-first',
  templateUrl: './company-first.component.html',
  styleUrls: ['./company-first.component.css']
})
export class CompanyFirstComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  user: User

  category: string
  PDV: boolean
  storage: number = 1

  bankAccountsModel: BankAccount[] = []
  bankAcc: string[] = []
  bank: string[] = []
  bankErrors: string[] = []

  activityCodes: ActivityCode[] = []
  selectedActivityCodes: ActivityCode[] = []

  registerNumber: number = 1
  registerModels: RegisterModel[] = []
  
  registers: Register[] = []
  registersLocation: string[] = []
  registersType: string[] = []

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    let reg = new Register
    this.registers.push(reg)
    this.registersLocation.push("")
    this.registersType.push("")
    this.companyService.getRegisterModels().subscribe((data: RegisterModel[])=>{
      this.registerModels = data
    })
    const BA = new BankAccount()
    this.bankAcc.push('')
    this.bank.push('')
    this.bankErrors.push('')
    this.bankAccountsModel.push(BA)
  }

  logout(){
    this.router.navigate([''])
  }

  onAddBankAccount(){
    const BA = new BankAccount()
    this.bankAcc.push('')
    this.bank.push('')
    this.bankErrors.push('')
    this.bankAccountsModel.push(BA)
  }

  remove(i){
    this.bankAccountsModel.splice(i, 1)
    this.bankAcc.splice(i, 1)
    this.bank.splice(i, 1)
    this.bankErrors.splice(i, 1)
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
  }

  checkBankAccount(bankAcc, index){
    let bankAccountRegex = /^\d{3}-\d{12}-\d{2}$/
    if(!bankAccountRegex.test(bankAcc)){
      this.bankErrors[index] = "Bad format"
    } else{
      this.bankErrors[index] = ""
    }
  }

  send: boolean = true

  insert(){
    this.send = true
    for(let i = 0; i < this.bankAccountsModel.length; i++){
      this.bankAccountsModel[i].bank = this.bank[i]
      this.bankAccountsModel[i].bankAccount = this.bankAcc[i]

      if(!this.bank[i] || !this.bankAcc[i]){
        this.send = false
      } 
    }

    for(let i = 0; i < this.registers.length; i++){
      this.registers[i].location = this.registersLocation[i]
      this.registers[i].type = this.registersType[i]

      if(!this.registers[i].location || !this.registers[i].type){
        this.send = false
        break
      }
    }

    if(!this.category || !this.selectedActivityCodes || !this.PDV) this.send = false

    if(this.send){
      this.companyService.insertData(this.category, this.selectedActivityCodes, this.PDV, this.bankAccountsModel, 
        this.storage, this.registers, this.user.username).subscribe((resp =>{
          alert(resp['message'])
          this.router.navigate(['company'])
        }))
    } else {
      alert('Not all data is filled')
    }
  }

  passwordChange(){
    localStorage.setItem('location', 'companyFirst')
    this.router.navigate(['passwordChange'])
  }
}
