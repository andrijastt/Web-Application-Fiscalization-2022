import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CompanyService } from '../company.service';
import { Customer } from '../model/customer';
import { Item } from '../model/item';
import { ItemStats } from '../model/itemStats';
import { Table } from '../model/table';

@Component({
  selector: 'app-table-receipt',
  templateUrl: './table-receipt.component.html',
  styleUrls: ['./table-receipt.component.css']
})
export class TableReceiptComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) private data, 
  private companyService: CompanyService) { }

  ngOnInit(): void {
    this.table = this.data.table

    this.companyService.getMyItems(this.table.companyPIB).subscribe((data: Item[])=>{
      this.items = data
      this.companyService.getItemStats(this.table.companyName, this.table.storeName).subscribe((data: ItemStats[])=>{
        this.myItemStats = data
        console.log(this.myItemStats)
        this.selectedItemsName = []
        this.orderNumber = []
        this.selectedItemPDV = []
        for(let i = 0; i < data.length; i++){
          this.orderNumber.push(0)
        }
        for(let i = 0; i < this.table.items.length; i++){
          this.selectedItemsName.push(this.table.items[i].itemName)
    
            for(let j = 0; j < this.items.length; j++){
              if(this.table.items[i].itemName == this.items[j].itemName){
                this.selectedItemPDV.push(this.items[0].taxRate)
                break;    
              }
            }
        }
    
      })
    })

    this.companyService.getMyCustomers(this.table.companyPIB).subscribe((data: Customer[])=>{
      this.customers = data
    })
    
  }

  customers: Customer[]
  items: Item[]
  table: Table
  myItemStats: ItemStats[] = []
  orderNumber: number[] = []

  selectedItemsName: string[] = []
  selectedItemPDV: string[] = []

  billClosed: boolean = false
  amountToPay: number = 0
  paymentType: string

  addToCart(item, num){

    if(this.billClosed || this.orderNumber[num] > item.currentState){
      alert('No')
    } else {
      if(this.orderNumber[num] > 0){

        let bool = false
        let item1: ItemStats
        if(this.selectedItemsName.length > 0 && this.selectedItemsName.includes(item.itemName)){
          let i = this.selectedItemsName.indexOf(item.itemName)
          this.selectedItemsName.splice(i, 1)
          item1 = this.table.items[i]
          this.table.items.splice(i, 1)
          this.selectedItemPDV.splice(i, 1)
          bool = true
        }
    
        let itemStat = new ItemStats()
    
        itemStat.itemName = item.itemName
        itemStat.itemProducer = item.itemProducer
        itemStat.sellingPrice = item.sellingPrice
        itemStat.currentState = this.orderNumber[num]
        itemStat.companyName = this.table.companyName
        itemStat.unitOfMeasure = item.unitOfMeasure
        itemStat.place = item.place
  
        this.table.items.push(itemStat)
        this.selectedItemsName.push(itemStat.itemName)

        for(let i = 0; i < this.items.length; i++){
          if(item.itemName == this.items[i].itemName){
            this.selectedItemPDV.push(this.items[0].taxRate)
            break;    
          }
        }

        if(!bool){
          this.companyService.updateCurrentState(itemStat).subscribe((resp) => {
            this.companyService.updateTable(this.table.items, this.table).subscribe((resp)=>{
              this.companyService.getItemStats(this.table.companyName, this.table.storeName).subscribe((data: ItemStats[])=>{
                this.myItemStats = data
                alert('Item added')
              })              
            })
          })

        } else {
          let num2 = itemStat.currentState - item1.currentState
          item1.currentState = num2
          this.companyService.updateCurrentState(item1).subscribe((resp) => {
            this.companyService.updateTable(this.table.items, this.table).subscribe((resp)=>{
              this.companyService.getItemStats(this.table.companyName, this.table.storeName).subscribe((data: ItemStats[])=>{
                this.myItemStats = data
                alert('Item added')
              })
            })
          })
        }

        this.companyService.getItemStats(this.table.companyName, this.table.storeName).subscribe((data: ItemStats[])=>{
          this.myItemStats = data
        })
      } else {
        alert('Amount equals 0')
      }
    }
  }

  closeBill(){
    if(this.table.items.length == 0){
      alert("Can't close the bill, no items added")
    } else {
      this.billClosed = true
      for(let i = 0; i < this.table.items.length; i++){
        this.amountToPay += (this.table.items[i].currentState * this.table.items[i].sellingPrice)
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
    for(let i = 0; i < this.table.items.length; i++){
      if(this.selectedItemPDV[i] == '20%'){
        tax += (this.table.items[i].currentState * this.table.items[i].sellingPrice) / 6
      }
      if(this.selectedItemPDV[i] == '10%'){
        tax += (this.table.items[i].currentState * this.table.items[i].sellingPrice) * 10 /11
      }
      if(this.selectedItemPDV[i] == '0%'){
        continue;
      }
    }

    if(this.paymentType == 'cash'){
      this.change = this.money - this.amountToPay
      if(this.idCardCashError == ""){
        this.companyService.giveReceipt(this.table.items, this.paymentType, this.amountToPay, tax, this.money, this.change, 
          this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
          this.virmanCustomer, this.table.companyName, this.table.companyPIB).subscribe((resp)=>{
            alert(resp['message'])
          })

      } 
      else {
        if(this.idCardCash != ""){
          alert('Fill good id card info')
        } else {
          this.companyService.giveReceipt(this.table.items, this.paymentType, this.amountToPay, tax, this.money, this.change, 
            "", this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
            this.virmanCustomer, this.table.companyName, this.table.companyPIB).subscribe((resp)=>{
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
          this.companyService.giveReceipt(this.table.items, this.paymentType, this.amountToPay, tax, this.money, this.change, 
            this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
            this.virmanCustomer, this.table.companyName, this.table.companyPIB).subscribe((resp)=>{
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
            this.companyService.giveReceipt(this.table.items, this.paymentType, this.amountToPay, tax, this.money, this.change, 
              this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
              this.virmanCustomer, this.table.companyName, this.table.companyPIB).subscribe((resp)=>{
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
            this.companyService.giveReceipt(this.table.items, this.paymentType, this.amountToPay, tax, this.money, this.change, 
              this.idCardCash, this.firstNameBuyer, this.lastNameBuyer, this.idCardMoneyCheck, this.idCardCreditCard, this.creditCardSlip, 
              this.virmanCustomer, this.table.companyName, this.table.companyPIB).subscribe((resp)=>{
                alert(resp['message'])
                
              })
          }
        }
      }
    }
    this.billClosed = false
    while(this.orderNumber.length > 0) this.orderNumber.pop()
    this.selectedItemsName = []
    this.table.items = []
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

    this.companyService.updateTable(this.table.items, this.table).subscribe((resp)=>{
      this.dialogRef.close();
    })
    
  }

  close(){
    this.dialogRef.close();
  }

}