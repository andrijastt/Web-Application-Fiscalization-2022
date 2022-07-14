import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { ActivityCode } from '../model/activityCode';
import { BankAccount } from '../model/bankAccount';
import { Company } from '../model/company';
import { Store } from '../model/store';
import { Register } from '../model/register';
import { RegisterModel } from '../model/registerModel';
import { StorageUnit } from '../model/storageUnit';
import { User } from '../model/user';

@Component({
  selector: 'app-company-first',
  templateUrl: './company-first.component.html',
  styleUrls: ['./company-first.component.css']
})
export class CompanyFirstComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  user: User
  company: Company

  category: string
  PDV: boolean

  storageUnitNumber: number = 1
  storageUnits: StorageUnit[] = []

  bankAccountsModel: BankAccount[] = []
  bankAcc: string[] = []
  bank: string[] = []
  bankErrors: string[] = []

  activityCodes: ActivityCode[] = []
  selectedActivityCodes: ActivityCode[] = []

  registerModels: RegisterModel[] = []
  
  registers: Register[][] = []
  registerTypes: string[][] = []

  stores: Store[] = []
  storesNumber: number = 1

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.companyService.getCompany(this.user.username).subscribe((Data: Company)=>{
      this.company = Data
      let obj = new Store
      obj.numRegisters = 1
      obj.companyPIB = this.company.PIB
      this.stores.push(obj)

      let stg = new StorageUnit
      stg.companyPIB = this.company.PIB
      this.storageUnits.push(stg)
    })

    let regsTypes: string[] = []
    regsTypes.push("")
    this.registerTypes.push(regsTypes)

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
    localStorage.clear()
    this.router.navigate([''])
  }

  onAddBankAccount(){
    const BA = new BankAccount()
    this.bankAcc.push('')
    this.bank.push('')
    this.bankErrors.push('')
    this.bankAccountsModel.push(BA)
  }

  removeBankAccount(i){
    if(this.bankAccountsModel.length ==1){
      alert('You need at least 1 bank account')
    } else {
      this.bankAccountsModel.splice(i, 1)
      this.bankAcc.splice(i, 1)
      this.bank.splice(i, 1)
      this.bankErrors.splice(i, 1)
    }
  }

  getActivityCodes(){
    this.companyService.getActivityCodes(this.category).subscribe((data: ActivityCode[])=>{
      this.activityCodes = data
    })
    while(this.selectedActivityCodes.length > 0) this.selectedActivityCodes.pop()
  }

  changeRegisterNumber(num){  
    if(this.stores[num].numRegisters > this.registerTypes[num].length){
      let reg = ""
      this.registerTypes[num].push(reg)
    } else {
      this.registerTypes[num].pop()
    }
  }

  onAddStorageUnit(){
    let stg = new StorageUnit
    this.storageUnits.push(stg)
  }

  removeStorageUnit(i){
    if(this.storageUnits.length == 1){
      alert('You need at least 1 storage')
    } else {
      this.storageUnits.splice(i, 1)
    }
  }

  onAddStore(){
    let obj = new Store
    obj.numRegisters = 1
    this.stores.push(obj)

    let regsTypes: string[] = []
    regsTypes.push("")
    this.registerTypes.push(regsTypes)
  }

  removeStore(i){
    if(this.stores.length == 1){
      alert('You need at least 1 store')
    } else {
      this.stores.splice(i, 1)
      this.registerTypes.splice(i, 1)
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

      if(!this.bank[i] || !this.bankAcc[i] || this.bankErrors[i] != "" || this.bank[i] == ""){
        this.send = false
      } 
    }

    for(let i = 0; i < this.storageUnits.length; i++){
      this.storageUnits[i].companyPIB = this.company.PIB
      if(!this.storageUnits[i].id || !this.storageUnits[i].name || this.storageUnits[i].name == ""){
        this.send = false;
        break;
      }

      if(i != this.storageUnits.length){
        for(let j = i + 1; j < this.storageUnits.length; j++){
          if(this.storageUnits[i].id == this.storageUnits[j].id){
            this.send = false
            break
          }
        }
      }
    }

    for(let i = 0; i < this.stores.length; i++){
      this.stores[i].companyPIB = this.company.PIB     
      if(!this.stores[i].id || !this.stores[i].location || !this.stores[i].name || this.stores[i].name == ""){
        this.send = false
        break;
      }

      for(let j = 0; j < this.stores[i].numRegisters; j++){
        if(this.registerTypes[i][j] == ""){
          this.send = false
          break;
        } 
      }

      if(i != this.stores.length){
        for(let j = i + 1; j < this.stores.length; j++){
          if(this.stores[i].id == this.stores[j].id){
            this.send = false
            break
          }
        }
      }
    }

    if(this.send){
      for(let i = 0; i < this.stores.length; i++){
        let regs: Register[] = []
        for(let j = 0; j < this.stores[i].numRegisters; j++){
          let reg = new Register
          reg.location = this.stores[i].location
          reg.type = this.registerTypes[i][j]
          reg.companyPIB = this.company.PIB
          regs.push(reg)
        }
        this.registers[i] = regs
      }
    }

    if(!this.category || !this.selectedActivityCodes || !this.PDV) this.send = false

    if(this.send){
      this.companyService.insertData(this.category, this.selectedActivityCodes, this.PDV, this.bankAccountsModel, 
        this.storageUnits, this.stores, this.registers, this.user.username, this.company.PIB).subscribe((resp =>{
          this.companyService.getCompany(this.user.username).subscribe((Data: Company)=>{
            alert(resp['message'])
            this.company = Data
            localStorage.setItem('company', JSON.stringify(this.company))
            this.router.navigate(['company'])
          })
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
