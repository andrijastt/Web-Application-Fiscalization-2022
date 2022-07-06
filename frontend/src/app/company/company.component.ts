import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../model/company';
import { Customer } from '../model/customer';
import { Item } from '../model/item';
import { ItemStats } from '../model/itemStats';
import { StorageUnit } from '../model/storageUnit';
import { RegisterCompanyService } from '../register-company.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private registerCompanyService: RegisterCompanyService) { }

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'))
    this.companyService.getMyStorageUntis(this.company.PIB).subscribe((data: StorageUnit[])=>{
      this.storageUnits = data
      for(let i = 0; i < this.storageUnits.length; i++){
        this.itemStats.push(new ItemStats())
      }
    })
    this.companyService.getMyCustomers(this.company.PIB).subscribe((data: Customer[])=>{
      this.customers = data
    })

    this.companyService.getMyItems(this.company.PIB).subscribe((data: Item[])=>{
      this.items = data
      this.itemSlice = this.items.slice(0, 10)
    })
  }

  company: Company
  storageUnits: StorageUnit[] = []
  customers: Customer[] = []

  logout(){
    this.router.navigate([''])
  }

  passwordChange(){
    localStorage.setItem('location', 'company')
    this.router.navigate(['passwordChange'])
  }

  companyData: boolean = true
  ordersData: boolean
  goodsAndServices: boolean
  itemData: boolean
  tableData: boolean

  setCompanyData(){
    this.companyData = true
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = false
  }

  setOrdersData(){
    this.companyData = false
    this.ordersData = true
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = false
  }

  setGoodsAndServices(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = true
    this.itemData = false
    this.tableData = false
  }

  setItemData(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = true
    this.tableData = false
  }

  setTableData(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = true
  }

  /************************************************************/

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

  daysToPay: number
  discount: number

  imageData: string
  selectedFile: File = null
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
            
            } else {
              this.imageData = e.target.result;
              this.image = this.imageData
            }
          }
        }
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert("Bad image format")
      }
    }
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

  addCustomer(){
    let send: boolean

    if(!this.firstname || !this.lastname || !this.telephoneNumber || !this.email || !this.name || !this.country || 
      !this.city || !this.postNumber || !this.streetName || !this.streetNumber || !this.PIB || !this.JMBP || !this.daysToPay || 
      !this.discount || this.telephoneNumberCheck != "" || this.emailCheck != "" || this.checkMailNumber != "" || 
      this.streetNumberCheck != "" || this.PIBCheck != "" || this.PIBCheck != "" || this.JMBPCheck != "") {
        send = false
      } else send = true

    if(send){

      this.companyService.addCustomer(this.company.PIB, this.firstname, this.lastname, this.telephoneNumber, this.email, 
        this.name, this.country, this.city, this.postNumber, this.streetName, this.streetNumber, this.PIB, this.JMBP, 
        this.imageData, this.daysToPay, this.discount).subscribe(resp => {
          alert(resp['message'])
          location.reload()
        })

    } else {
      alert('Something is wrong')
    }
  }

  PIBSearch: number
  PIBSearchCheck: string
  companySearch: Company

  daysToPay2: number
  discount2: number

  checkPIBSearch(){
    if(this.PIBSearch < 100000001 || this.PIBSearch  > 999999999){
      this.PIBSearchCheck = "Wrong PIB format"
    } else this.PIBSearchCheck = ""
  }

  findCompanyByPIB(){
    if(this.PIBSearch != this.company.PIB){
      this.companyService.findCompanyByPIB(this.PIBSearch).subscribe((data: Company)=>{
        if(!data) alert('Company with this PIB does not exist')
        else this.companySearch = data
      })
    } else alert('You used your PIB')
  }

  addCustomer2(){
    let send: boolean
    if(!this.daysToPay2 || !this.discount2) send = false
    else send = true

    if(send){
      this.companyService.addCustomer(this.company.PIB, this.companySearch.firstname, this.companySearch.lastname, 
        this.companySearch.telephoneNumber, this.companySearch.email, this.companySearch.name, this.companySearch.country, 
        this.companySearch.city, this.companySearch.postNumber, this.companySearch.streetName, this.companySearch.streetNumber, 
        this.companySearch.PIB, this.companySearch.JMBP, this.companySearch.imageData, this.daysToPay2, this.discount2).subscribe(resp => {
          alert(resp['message'])
          location.reload()
        })
    } else {
      alert('Data not filled')
    }
  }

  /************************************************************/

  addGoods: boolean
  items: Item[] = []
  itemSlice: Item[] = []

  onPageChange(event){
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if(endIndex > this.items.length){
      endIndex = this.items.length
    }
    this.itemSlice = this.items.slice(startIndex, endIndex)
  }

  itemId: number
  itemName: string
  itemUnitOfMeasure: string
  itemTaxRate: string
  itemType: string
  itemImageData: string = null
  itemSelectedFile: File = null

  itemCountryOfOrigin: string
  itemForeignName: string
  itemBarcodeNumber: string
  itemProducerName: string = ""
  itemCustomsRate: number
  itemEkoTax: boolean
  itemExcies: boolean
  itemMinItems: number
  itemMaxItems: number
  itemDescription: number
  itemDeclaration: string
  itemAlert: string
  itemAlert1: string

  itemStats: ItemStats[] = []

  onFileSelectedItem(event: any){
    
    if(event.target.files && event.target.files[0]){
      const maxHW = 300;
      const minHW = 100;
      
      this.itemSelectedFile = <File>event.target.files[0];

      if(this.itemSelectedFile.type == "image/png" || this.itemSelectedFile.type == "image/jpg" || 
      this.itemSelectedFile.type == "image/jpeg"){
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            if(img_height > maxHW || img_height < minHW || img_width > maxHW || img_width < minHW){
              alert("Bad photo, size is big");
            
            } else {
              this.itemImageData = e.target.result;
            }
          }
        }
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert("Bad image format")
      }
    }

  }

  addItem(){
    let send: boolean = true

    if(!this.itemId || !this.itemName || !this.itemUnitOfMeasure || !this.itemTaxRate){
      send = false;
    }

    if(this.itemMinItems != 0 && this.itemMaxItems != 0){
      if(this.itemMinItems > this.itemMaxItems){
          this.itemAlert1 = "Minimal number of items is bigger than maximum number of items"
          send = false;
      }
    }

    for(let i = 0; i < this.itemStats.length; i++){
      this.itemStats[i].storageUnit = this.storageUnits[i].name
      this.itemStats[i].companyName = this.company.name
      this.itemStats[i].itemName = this.itemName
      this.itemStats[i].itemProducer = this.itemProducerName
      if(!this.itemStats[i].purchasePrice || !this.itemStats[i].sellingPrice || !this.itemStats[i].currentState ||
        !this.itemStats[i].minWantingNumber || !this.itemStats[i].maxWantingNumber ||
        this.itemStats[i].minWantingNumber > this.itemStats[i].maxWantingNumber){
        send = false;
        break;
      }
    }

    if(send){
      this.companyService.addItem(this.company.PIB, this.itemId, this.itemName, this.itemUnitOfMeasure, this.itemTaxRate, this.itemType, 
        this.itemImageData, this.itemCountryOfOrigin, this.itemForeignName, this.itemBarcodeNumber, this.itemProducerName, this.itemCustomsRate, 
        this.itemEkoTax, this.itemExcies, this.itemMinItems, this.itemMaxItems, this.itemDescription, this.itemDeclaration,
        this.itemStats). subscribe((resp => {   
          if(resp['message'] == 'Item ID taken'){
            alert(resp['message'])
          } else {
            location.reload()
            alert(resp['message'])
          }
        }))
    } else {
      this.itemAlert = "Not all general data is filled"
    }
  }

}
