import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CompanyService } from '../company.service';
import { ActivityCode } from '../model/activityCode';
import { BankAccount } from '../model/bankAccount';
import { Company } from '../model/company';
import { Register } from '../model/register';
import { RegisterModel } from '../model/registerModel';
import { StorageUnit } from '../model/storageUnit';
import { Store } from '../model/store';
import { User } from '../model/user';
import { RegisterCompanyService } from '../register-company.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private registerCompanyService: RegisterCompanyService,
    private companyService: CompanyService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.registerCompanyService.getAllRegisterCompany().subscribe((data: Company[])=>{
      this.registerCompanys = data
    })

    let obj = new Store
    obj.numRegisters = 1
    this.stores.push(obj)

    let stg = new StorageUnit
    this.storageUnits.push(stg)

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

  user: User
  registerCompanys: Company[] = []

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  accept(username, password){
    this.registerCompanyService.accept(username, password).subscribe((resp)=>{
      alert(resp['message'])
      location.reload()
    })
  }

  decline(username){
    this.registerCompanyService.decline(username).subscribe((resp)=>{
      alert(resp['message'])
      location.reload()
    })
  }

  firstname: string
  lastname: string
  username: string

  password: string
  confirmPassword: string
  passwordCheck: string
  confirmPasswordCheck: string

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

  PIB: number
  JMBP: string
  PIBCheck: string
  JMBPCheck: string

  imageData: string
  selectedFile: File = null

  send: boolean
  message: string

  image: string

  onFileSelected(event: any){
    
    if(event.target.files && event.target.files[0]){
      const maxHW = 300;
      const minHW = 100;
      
      this.selectedFile = <File>event.target.files[0];

      if(this.selectedFile.type == "image/png" || this.selectedFile.type == "image/jpg" || this.selectedFile.type == "image/jpeg"){
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            console.log(img_height, img_width);

            if(img_height > maxHW || img_height < minHW || img_width > maxHW || img_width < minHW){
              alert("Bad photo, size is big");
              this.send = false;
              // return false;
            } else {
              this.imageData = e.target.result;
              this.image = this.imageData
              this.send = true;
              // return true;
            }
          }
        }
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert("Bad image format")
      }
    }
  }

  checkPassword(){
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,12}$/
    if(!passwordRegex.test(this.password)){
      this.passwordCheck = "Password must contain at least 1 number, 1 small letter, 1 capital letter, 1 special charater and 8 to 12 characters"
    } else { this.passwordCheck = "" }
    if(this.password != this.confirmPassword){
      this.confirmPasswordCheck = "Passwords don't match"
    } else { this.confirmPasswordCheck = "" }
  }

  checkConfirmPassword(){
    if(this.password != this.confirmPassword){
      this.confirmPasswordCheck = "Passwords don't match"
    } else { this.confirmPasswordCheck = "" }
  }

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
      this.storageUnits[i].companyPIB = this.PIB
      if(!this.storageUnits[i].id || !this.storageUnits[i].name){
        this.send = false;
        break;
      }
    }

    for(let i = 0; i < this.stores.length; i++){
      
      this.stores[i].companyPIB = this.PIB

      if(!this.stores[i].id || !this.stores[i].location || !this.stores[i].name){
        this.send = false
        break;
      }

      for(let j = 0; j < this.stores[i].numRegisters; j++){  
        if(this.registerTypes[i][j] == ""){
          this.send = false
          break;
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
          reg.companyPIB = this.PIB
          regs.push(reg)
        }
        this.registers[i] = regs
      }
    }

    if(!this.category || !this.selectedActivityCodes || !this.PDV) this.send = false

    if(this.password != this.confirmPassword || !this.firstname || !this.lastname || !this.username ||
      !this.password || !this.confirmPassword || !this.telephoneNumber || !this.email || !this.name || !this.country ||
      !this.city || !this.postNumber || !this.streetName || !this.streetNumber || !this.PIB || !this.JMBP || !this.image ||
      this.JMBPCheck != "" || this.PIBCheck != "" || this.streetNumberCheck != "" || this.checkMailNumber != "" || 
      this.emailCheck != "" || this.telephoneNumberCheck != "" || this.confirmPasswordCheck != "" || this.passwordCheck != "") {
        this.send = false;
      }
    else this.send = true

    if(this.send){
      this.companyService.insertCompany(this.firstname, this.lastname, this.username, this.password, 
        this.telephoneNumber, this.email, this.name, this.country, this.city, this.postNumber, this.streetName, 
        this.streetNumber, this.PIB, this.JMBP, this.image, this.category, this.selectedActivityCodes, this.PDV, this.bankAccountsModel, 
        this.storageUnits, this.stores, this.registers).subscribe((resp =>{
          alert(resp['message'])
          location.reload()
        }))
    } else {
      alert('Not all data is filled')
    }
  }

  activate(username){
    this.companyService.activate(username).subscribe((resp =>{
      alert(resp['message'])
      location.reload()
    }))
  }

  deactivate(username){
    this.companyService.deactivate(username).subscribe((resp =>{
      alert(resp['message'])
      location.reload()
    }))
  }

  passwordChange(){
    localStorage.setItem('location', 'admin')
    this.router.navigate(['passwordChange'])
  }

  // add user deo

  firstnameUser: string = ""
  lastnameUser: string = ""
  usernameUser: string = ""
  passwordUser: string = ""
  telephoneNumberUser: string = ""
  idCardUser: string = ""

  passwordCheckUser: string = ""
  telephoneNumberCheckUser: string = ""
  idCardCheck: string = ""

  checkPasswordUser(){
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,12}$/
    if(!passwordRegex.test(this.passwordUser)){
      this.passwordCheckUser = "Password must contain at least 1 number, 1 small letter, 1 capital letter, 1 special charater and 8 to 12 characters"
    } else { this.passwordCheckUser = "" }
  }

  checkTelephoneNumberUser(){
    let telephoneNumberRegex = /^\d{9,10}$/
    if(!telephoneNumberRegex.test(this.telephoneNumberUser)){
      this.telephoneNumberCheckUser = "Bad telephone number, must contain only numbers and has 9 to 10 characters"
    } else this.telephoneNumberCheckUser = ""
  }

  checkIDCard(){
    let idCardRegex = /^\d{9}$/
    if(!idCardRegex.test(this.idCardUser)){
      this.idCardCheck = "Bad id number, must contain only numbers and has 9 characters"
    } else this.idCardCheck = ""
  }

  insertUser(){
    if(this.firstnameUser == "" || this.lastnameUser == "" || this.usernameUser == "" || this.passwordUser == "" || 
    this.telephoneNumberUser == "" || this.idCardUser == "" || this.idCardCheck != "" || this.telephoneNumberCheckUser != "" || 
    this.passwordCheckUser != ""){
      alert('Bad data')
    } else {
      this.adminService.insertUser(this.firstnameUser, this.lastnameUser, this.usernameUser, this.passwordUser, this.telephoneNumberUser, 
        this.idCardUser).subscribe((resp)=>{
          alert(resp['message'])
          this.firstnameUser = ""
          this.lastnameUser = ""
          this.usernameUser = ""
          this.passwordUser = ""
          this.telephoneNumberUser = ""
          this.idCardUser = ""
      })
    }
  }
}
