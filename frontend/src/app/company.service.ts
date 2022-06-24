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

  insertCompany(firstnameForm, lastnameForm, usernameForm, passwordFrom, telephoneNumberForm, emailForm, nameForm, countryForm,
    cityFrom, postNumberForm, streetNameForm, streetNumberFrom, PIBForm, JMBPForm, imageDataForm, categoryForm, activityCodesForm, 
    PDVForm, bankAccountsForm, storageUnitsForm, registersForm){
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordFrom,
      telephoneNumber: telephoneNumberForm,
      email: emailForm,
      name: nameForm,
      country: countryForm,
      city: cityFrom,
      postNumber: postNumberForm,
      streetName: streetNameForm,
      streetNumber: streetNumberFrom,
      PIB: PIBForm,
      JMBP: JMBPForm,
      imageData: imageDataForm,
      status: "accepted",
      firstTime: false,
      active: true,
      category: categoryForm,
      activityCodes: activityCodesForm,
      PDV: PDVForm,
      bankAccounts: bankAccountsForm,
      storageUnits: storageUnitsForm,
      registers: registersForm,
    }

    return this.http.post(`${this.uri}/company/insertCompany`, data)
  }

  activate(usernameForm){
    const data = {username: usernameForm}
    return this.http.post(`${this.uri}/company/activate`, data)
  }

  deactivate(usernameForm){
    const data = {username: usernameForm}
    return this.http.post(`${this.uri}/company/deactivate`, data)
  }
}
