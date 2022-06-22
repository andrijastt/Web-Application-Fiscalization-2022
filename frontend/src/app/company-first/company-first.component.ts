import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from '../model/bankAccount';

@Component({
  selector: 'app-company-first',
  templateUrl: './company-first.component.html',
  styleUrls: ['./company-first.component.css']
})
export class CompanyFirstComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder) { }

  bankAccounts: FormArray = new FormArray([])
  bankAccountsModel: BankAccount[] = []

  bankAcc: string[] = []
  bank: string[] = []

  ngOnInit(): void {}

  logout(){
    this.router.navigate([''])
  }

  onAddBankAccount(){
    // this.bankAccounts.push(this.fb.group({
    //   bankAcc: [''],
    //   bank: ['']
    // }))
    // const control = new FormControl(null)
    // this.bankAccounts.push(control)
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

  provera(){
    console.log(this.bankAcc)
    console.log(this.bank)
  }
  
  provera2(){
    for(let i = 0; i < this.bankAcc.length; i++){
      this.bankAccountsModel[i].bankAccount = this.bankAcc[i]
      this.bankAccountsModel[i].bank = this.bank[i]
    }
    console.log(this.bankAccountsModel)
  }
  // sifre delatnosti su 4 cifre
}
