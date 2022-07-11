import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CompanyService } from '../company.service';
import { Category } from '../model/category';
import { Company } from '../model/company';
import { Customer } from '../model/customer';
import { DailyReview } from '../model/dailyReview';
import { Item } from '../model/item';
import { ItemStats } from '../model/itemStats';
import { Register } from '../model/register';
import { StorageUnit } from '../model/storageUnit';
import { Store } from '../model/store';
import { Table } from '../model/table';
import { RegisterCompanyService } from '../register-company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router, private companyService: CompanyService, private registerCompanyService: RegisterCompanyService, 
    private dialog: MatDialog) { }

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

    this.companyService.getMyCategories(this.company.PIB).subscribe((data: Category[])=>{
      this.allCategories = data
    })

    this.companyService.getMyRegisters(this.company.PIB).subscribe((data: Register[])=>{
      this.myRegisters = data
    })

    this.companyService.getMyStores(this.company.PIB).subscribe((data: Store[])=>{
      this.myStores = data
      for(let i = 0; i < this.myStores.length; i++){
        this.itemStatsStore.push(new ItemStats())
      }
    })

    this.companyService.getMyPlaces(this.company.name).subscribe((data: string[]) => {
      this.myPlaces = data
    })
  }

  company: Company
  myRegisters: Register[]
  storageUnits: StorageUnit[] = []
  customers: Customer[] = []
  myStores: Store[] = []

  logout(){
    localStorage.clear()
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
  receiptsData: boolean
  reviewsData: boolean

  setCompanyData(){
    this.companyData = true
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = false
    this.receiptsData = false
    this.reviewsData = false
  }

  setOrdersData(){
    this.companyData = false
    this.ordersData = true
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = false
    this.receiptsData = false
    this.reviewsData = false
  }

  setGoodsAndServices(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = true
    this.itemData = false
    this.tableData = false
    this.receiptsData = false
    this.reviewsData = false
  }

  setItemData(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = true
    this.tableData = false
    this.receiptsData = false
    this.reviewsData = false
  }

  setTableData(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = true
    this.receiptsData = false
    this.reviewsData = false
  }

  setReceiptsData(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = false
    this.receiptsData = true
    this.reviewsData = false
  }

  setReviewsData(){
    this.companyData = false
    this.ordersData = false
    this.goodsAndServices = false
    this.itemData = false
    this.tableData = false
    this.receiptsData = false
    this.reviewsData = true

    this.companyService.getMyDailyReviews(this.company.PIB).subscribe((data: Date[]) => {
      this.dailyReviewDates = data
      if(data.length > 0){
        this.companyService.getDailyReview(this.company.PIB, this.dailyReviewDates[0]).subscribe((data: DailyReview)=>{
          this.dailyReview = data
        })
      }
    })
  }

  /*********************************************************************************************************/

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

  /*********************************************************************************************************/

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
  itemStatsStore: ItemStats[] = []

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

  barcodeMessage: string
  checkBarcode(){
    let regexBarcode = /^\d{12}$/
    if(regexBarcode.test(this.itemBarcodeNumber)){
      this.barcodeMessage = ""
    } else {
      this.barcodeMessage = "Wrong format(12 digits)"
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
      this.itemStats[i].place = this.storageUnits[i].name
      this.itemStats[i].typeOfPlace = "storageUnit"
      this.itemStats[i].companyName = this.company.name
      this.itemStats[i].itemName = this.itemName
      this.itemStats[i].itemProducer = this.itemProducerName
      if(!this.itemStats[i].purchasePrice || !this.itemStats[i].sellingPrice || this.itemStats[i].currentState < 0 ||
        this.itemStats[i].minWantingNumber < 0 || this.itemStats[i].maxWantingNumber < 0||
        this.itemStats[i].minWantingNumber > this.itemStats[i].maxWantingNumber){
        send = false;
        break;
      }
    }

    for(let i = 0; i < this.itemStatsStore.length; i++){
      this.itemStatsStore[i].place = this.myStores[i].name
      this.itemStatsStore[i].typeOfPlace = "store"
      this.itemStatsStore[i].companyName = this.company.name
      this.itemStatsStore[i].itemName = this.itemName
      this.itemStatsStore[i].itemProducer = this.itemProducerName
      if(!this.itemStatsStore[i].purchasePrice || !this.itemStatsStore[i].sellingPrice || this.itemStatsStore[i].currentState < 0 ||
        this.itemStatsStore[i].minWantingNumber < 0 || this.itemStatsStore[i].maxWantingNumber < 0||
        this.itemStatsStore[i].minWantingNumber > this.itemStatsStore[i].maxWantingNumber){
        send = false;
        break;
      }
    }

    if(send){
      this.companyService.addItem(this.company.PIB, this.itemId, this.itemName, this.itemUnitOfMeasure, this.itemTaxRate, this.itemType, 
        this.itemImageData, this.itemCountryOfOrigin, this.itemForeignName, this.itemBarcodeNumber, this.itemProducerName, this.itemCustomsRate, 
        this.itemEkoTax, this.itemExcies, this.itemMinItems, this.itemMaxItems, this.itemDescription, this.itemDeclaration,
        this.itemStats, this.itemStatsStore). subscribe((resp => {   
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

  /*********************************************************************************************************/

  category: string = ""
  
  allCategories: Category[] = []

  createCategory(){
    if(this.category != ""){
      this.companyService.createCategory(this.company.PIB, this.category).subscribe((resp)=> {
        this.companyService.getMyCategories(this.company.PIB).subscribe((data: Category[])=>{
          this.allCategories = data
        })
        alert(resp['message'])
      })
    }
    this.category = ""
  }

  openDialog(name){
    this.dialog.open(CategoryDialogComponent, {
      height: '800px',
      width: '800px',
      data: {
        name: name,
        items: this.items,
        companyPIB: this.company.PIB
      }
    })
  }

  /*********************************************************************************************************/

  selectedStore: string
  ctx: CanvasRenderingContext2D
  selectedStoreChange(){
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.ctx.fillStyle = '#fec'
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.strokeStyle = '#0f0f0f'
    for (let x = 0; x <= this.canvas.nativeElement.width; x += 100) {
      for (let y = 0; y <= this.canvas.nativeElement.height; y += 100) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.nativeElement.height);
        this.ctx.stroke();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.nativeElement.width, y);
        this.ctx.stroke();
      }
    }

    this.companyService.getMyTables(this.company.PIB, this.selectedStore).subscribe((data: Table[]) => {

      for(let i = 0; i < data.length; i++){
        if(data[i].type == "square"){
          this.ctx.fillStyle = 'white'
          const square = new Square(this.ctx);  
          square.draw(data[i].x, data[i].y, data[i].w, data[i].h);

          this.ctx.fillStyle = 'black'
          this.ctx.font = "20px Arial";
          let text: string = ""
          text += data[i].id
          this.ctx.fillText(text, data[i].x, data[i].y +20)

        } else {
          this.ctx.fillStyle = 'white'
          const circle = new Circle(this.ctx);  
          circle.draw(data[i].x, data[i].y, data[i].w);
          
          this.ctx.fillStyle = 'black'
          this.ctx.font = "20px Arial";
          let text: string = ""
          text += data[i].id
          this.ctx.fillText(text, data[i].x, data[i].y +20)
        }
      }

    })

    var x: number
    var y: number
    var context = this.ctx
    this.canvas.nativeElement.addEventListener('click', canvasClicked, true)
    function canvasClicked(e) {
      x = e.x;
      y = e.y;
    }
      
  }

  /*********************************************************************************************************/

  myPlaces: string[] = []
  place: string
  myItemStats: ItemStats[] = []
  orderNumber: number[] = []

  selectedItems: ItemStats[] = []
  selectedItemsName: string[] = []
  selectedItemPDV: string[] = []

  billClosed: boolean = false
  amountToPay: number = 0
  paymentType: string

  getItemStats(){
    while(this.orderNumber.length > 0) this.orderNumber.pop()
    this.companyService.getItemStats(this.company.name, this.place).subscribe((data: ItemStats[]) => {
      this.myItemStats = data
      this.selectedItemsName = []
      this.selectedItems = []
      this.orderNumber = []
      this.selectedItemPDV = []
      for(let i = 0; i < data.length; i++){
        this.orderNumber.push(0)
      }
    })
  }

  addToCart(item, num){

    if(this.billClosed || this.orderNumber[num] > item.currentState){
      alert('No')
    } else {
      if(this.orderNumber[num] > 0){
        if(this.selectedItemsName.length > 0 && this.selectedItemsName.includes(item.itemName)){
          let i = this.selectedItemsName.indexOf(item.itemName)
          console.log(i)
          this.selectedItemsName.splice(i, 1)
          this.selectedItems.splice(i, 1)
          this.selectedItemPDV.splice(i, 1)
        }
    
        let itemStat = new ItemStats()
    
        itemStat.itemName = item.itemName
        itemStat.itemProducer = item.itemProducer
        itemStat.sellingPrice = item.sellingPrice
        itemStat.currentState = this.orderNumber[num]
        itemStat.companyName = this.company.name
        itemStat.place = item.place
  
        this.selectedItems.push(itemStat)
        this.selectedItemsName.push(itemStat.itemName)

        for(let i = 0; i < this.items.length; i++){
          if(item.itemName == this.items[i].itemName){
            this.selectedItemPDV.push(this.items[0].taxRate)
            break;    
          }
        }

        alert('Item added')
      } else {
        alert('Amount equals 0')
      }
    }
  }

  closeBill(){
    if(this.selectedItems.length == 0){
      alert("Can't close the bill, no items added")
    } else {
      this.billClosed = true
      for(let i = 0; i < this.selectedItems.length; i++){
        this.amountToPay += (this.selectedItems[i].currentState * this.selectedItems[i].sellingPrice)
      }
    }
  }

  money: number
  change: number
  idCardCash: string
  idCardCashError: string = ""

  firstNameBuyer: string
  lastNameBuyer: string
  idCardMoneyCheck: string
  idCardMoneyCheckError: string = ""

  idCardCreditCard: string
  idCardCreditCardError: string = ""

  creditCardSlip: string

  virmanCustomer: string = ""

  checkIDCardCash(){
    let idCardRegex = /^\d{9}$/
    if(!idCardRegex.test(this.idCardCash)){
      this.idCardCashError = "Bad id number, must contain only numbers and has 9 characters"
    } else this.idCardCashError = ""
  }

  checkIDCardMoneyCheck(){
    let idCardRegex = /^\d{9}$/
    if(!idCardRegex.test(this.idCardMoneyCheck)){
      this.idCardMoneyCheckError = "Bad id number, must contain only numbers and has 9 characters"
    } else this.idCardMoneyCheckError = ""
  }

  checkIDCardCreditCard(){
    let idCardRegex = /^\d{9}$/
    if(!idCardRegex.test(this.idCardCreditCard)){
      this.idCardCreditCardError = "Bad id number, must contain only numbers and has 9 characters"
    } else this.idCardCreditCardError = ""
  }

  paymentTypeChange(){
    
    if(this.paymentType == 'cash'){
      this.money = this.amountToPay

      this.firstNameBuyer = ""
      this.lastNameBuyer = ""
      this.idCardMoneyCheck = ""

      this.idCardCreditCard = ""
      this.creditCardSlip = ""

      this.virmanCustomer = ""
    }

    if(this.paymentType == 'moneyCheck'){

      this.money = 0
      this.change = 0   
      this.idCardCash = ""

      this.idCardCreditCard = ""
      this.creditCardSlip = ""

      this.virmanCustomer = ""
    }

    if(this.paymentType == 'creditCard'){
      this.money = 0
      this.change = 0   
      this.idCardCash = ""

      this.firstNameBuyer = ""
      this.lastNameBuyer = ""
      this.idCardMoneyCheck = ""

      this.virmanCustomer = ""
    }

    if(this.paymentType == 'virman'){

      this.money = 0
      this.change = 0   
      this.idCardCash = ""

      this.firstNameBuyer = ""
      this.lastNameBuyer = ""
      this.idCardMoneyCheck = ""

      this.idCardCreditCard = ""
      this.creditCardSlip = ""

      this.virmanCustomer = ""
    }
    
  }

  giveReceipt(){

    let tax = 0
    for(let i = 0; i < this.selectedItems.length; i++){
      if(this.selectedItemPDV[i] == '20%'){
        tax += (this.selectedItems[i].currentState * this.selectedItems[i].sellingPrice) / 6
      }
      if(this.selectedItemPDV[i] == '10%'){
        tax += (this.selectedItems[i].currentState * this.selectedItems[i].sellingPrice) * 10 /11
      }
      if(this.selectedItemPDV[i] == '0%'){
        continue;
      }
    }

    if(this.paymentType == 'cash'){
      this.change = this.money - this.amountToPay
      if(this.idCardCashError == ""){
        this.companyService.giveReceipt(this.selectedItems, this.paymentType, this.amountToPay, tax, this.money, this.change, 
          this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
          this.virmanCustomer, this.company.name, this.company.PIB).subscribe((resp)=>{
            alert(resp['message'])
          })

      } 
      else {
        if(this.idCardCash != ""){
          alert('Fill good id card info')
        } else {
          this.companyService.giveReceipt(this.selectedItems, this.paymentType, this.amountToPay, tax, this.money, this.change, 
            "", this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
            this.virmanCustomer, this.company.name, this.company.PIB).subscribe((resp)=>{
              alert(resp['message'])
            })
        }

      }
    } 
    else {
      if(this.paymentType == 'moneyCheck'){

        if(this.firstNameBuyer == "" || this.lastNameBuyer == "" || this.idCardMoneyCheckError != "" || 
        this.idCardMoneyCheck == ""){
          alert('Not all data is filled')
        }
        else {
          this.companyService.giveReceipt(this.selectedItems, this.paymentType, this.amountToPay, tax, this.money, this.change, 
            this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
            this.virmanCustomer, this.company.name, this.company.PIB).subscribe((resp)=>{
              alert(resp['message'])
            })
        }

      } 
      else {
        if(this.paymentType == 'creditCard'){

          if(this.idCardCreditCardError != "" || this.creditCardSlip == "" || this.idCardCreditCard == ""){
            alert('Not all data is filled')
          }
          else {
            this.companyService.giveReceipt(this.selectedItems, this.paymentType, this.amountToPay, tax, this.money, this.change, 
              this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
              this.virmanCustomer, this.company.name, this.company.PIB).subscribe((resp)=>{
                alert(resp['message'])
              })
          }

        } 
        else {
          console.log(this.virmanCustomer)
          if(this.virmanCustomer == ""){
            alert('Not all data is filled')
          }
          else {
            this.companyService.giveReceipt(this.selectedItems, this.paymentType, this.amountToPay, tax, this.money, this.change, 
              this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
              this.virmanCustomer, this.company.name, this.company.PIB).subscribe((resp)=>{
                alert(resp['message'])
                
              })
          }
        }
      }
    }
    this.billClosed = false
    while(this.orderNumber.length > 0) this.orderNumber.pop()
    this.selectedItemsName = []
    this.selectedItems = []
    this.orderNumber = []
    this.selectedItemPDV = []
    this.amountToPay = 0

    this.paymentType = ""

    this.money = 0
    this.change = 0   
    this.idCardCash = ""

    this.firstNameBuyer = ""
    this.lastNameBuyer = ""
    this.idCardMoneyCheck = ""

    this.idCardCreditCard = ""
    this.creditCardSlip = ""

    this.virmanCustomer = ""
  }

  /*********************************************************************************************************/

  dailyReviewDates: Date[] = []
  dailyReview: DailyReview = new DailyReview()

  dateSearch: string = ""

  getDailyReview(){
    this.companyService.getDailyReview(this.company.PIB, this.dateSearch).subscribe((data: DailyReview)=>{
      this.dailyReview = data
    })
  }

}

export class Square {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, w: number, h: number) {
    this.ctx.rect(x, y, w, h);
    this.ctx.fillRect(x, y, w, h)
  }
}

export class Circle {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, r: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI)
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.fillStyle = 'white'
    this.ctx.beginPath();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
  }

}