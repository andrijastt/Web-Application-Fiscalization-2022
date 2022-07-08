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

  changeRegisterNumber(num){  
    if(this.stores[num].numRegisters > this.registerTypes[num].length){
      let reg = ""
      this.registerTypes[num].push(reg)
    } else {
      this.registerTypes[num].pop()
    }
  }

  changeObjectsNumber(){  
    if(this.storesNumber > this.stores.length){
      let obj = new Store
      obj.numRegisters = 1
      obj.companyPIB = this.company.PIB
      this.stores.push(obj)

      let regsTypes: string[] = []
      regsTypes.push("")
      this.registerTypes.push(regsTypes)

    } else {
      this.stores.pop()
      this.registerTypes.pop()
    }
  }

  changeStorageUnitsNumber(){
    if(this.storageUnitNumber > this.storageUnits.length){
      let stg = new StorageUnit
      stg.companyPIB = this.company.PIB
      this.storageUnits.push(stg)
    } else {
      this.storageUnits.pop()
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

      if(!this.bank[i] || !this.bankAcc[i] || this.bankErrors[i] != ""){
        this.send = false
      } 
    }

    for(let i = 0; i < this.storageUnitNumber; i++){
      if(!this.storageUnits[i].id || !this.storageUnits[i].name){
        this.send = false;
        break;
      }
    }

    for(let i = 0; i < this.stores.length; i++){
      
      if(!this.stores[i].id || !this.stores[i].location || !this.stores[i].name){
        this.send = false
        break;
      }

      let regs: Register[] = []
      for(let j = 0; j < this.stores[i].numRegisters; j++){
        let reg = new Register
        reg.location = this.stores[i].location
        reg.type = this.registerTypes[i][j]
        reg.companyPIB = this.company.PIB
        if(this.registerTypes[i][j] == ""){
          this.send = false
          break;
        } 
        regs.push(reg)
      }
      this.registers[i] = regs
    }

    if(!this.category || !this.selectedActivityCodes || !this.PDV) this.send = false

    if(this.send){
      this.companyService.insertData(this.category, this.selectedActivityCodes, this.PDV, this.bankAccountsModel, 
        this.storageUnits, this.stores, this.registers, this.user.username, this.company.PIB).subscribe((resp =>{
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

  provera(){
    for(let i = 0; i < this.stores.length; i++){
      
      // if(!this.objects[i].id || !this.objects[i].location || !this.objects[i].name){
      //   this.send = false
      // }

      let regs: Register[] = []
      for(let j = 0; j < this.stores[i].numRegisters; j++){
        let reg = new Register
        reg.location = this.stores[i].location
        reg.type = this.registerTypes[i][j]
        // if(this.registerTypes[i][j] == "") this.send = false
        regs.push(reg)
      }
      this.registers[i] = regs
    }
    console.log(this.registers)
    console.log(this.stores)
  }
}
