import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllActivityCodes(){
    return this.http.get(`${this.uri}/company/getAllActivityCodes`)
  }

  getActivityCodes(category){

    if(category == 'caterer'){
      return this.http.get(`${this.uri}/company/getCatererCodes`)
    }else {
      return this.http.get(`${this.uri}/company/getStoreCodes`)
    }
      
  }

  getRegisterModels(){
    return this.http.get(`${this.uri}/company/getRegisterModels`)
  }

  insertData(categoryForm, activityCodesForm, PDVForm, bankAccountsForm, storageUnitsForm, registersForm, usernameForm){
    const data  = {
      category: categoryForm,
      activityCodes: activityCodesForm,
      PDV: PDVForm,
      bankAccounts: bankAccountsForm,
      storageUnits: storageUnitsForm,
      registers: registersForm,
      username: usernameForm
    }

    return this.http.post(`${this.uri}/company/insertData`, data)
  }
}
