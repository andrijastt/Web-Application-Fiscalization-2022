import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getCompany(usernameForm){
    const data = {username: usernameForm}
    return this.http.post(`${this.uri}/company/getCompany`, data)
  }

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

  insertData(categoryForm, activityCodesForm, PDVForm, bankAccountsForm, storageUnitsForm, registersForm, usernameForm, PIBForm){
    const data  = {
      category: categoryForm,
      activityCodes: activityCodesForm,
      PDV: PDVForm,
      bankAccounts: bankAccountsForm,
      storageUnits: storageUnitsForm,
      registers: registersForm,
      username: usernameForm,
      PIB: PIBForm
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

  getMyStorageUntis(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMyStorageUntis`, data)
  }

  findCompanyByPIB(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/findCompanyByPIB`, data)
  }

  addCustomer(sellerPIBForm, firstnameForm, lastnameForm, telephoneNumberForm, emailForm, nameForm, countryForm, cityFrom, 
    postNumberForm, streetNameForm, streetNumberFrom, PIBForm, JMBPForm, imageDataForm, daysToPayForm, discountForm){
    const data = {
      sellerPIB: sellerPIBForm,
      firstname: firstnameForm,
      lastname: lastnameForm,
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
      daysToPay: daysToPayForm,
      discount: discountForm
    }

    return this.http.post(`${this.uri}/company/addCustomer`, data)
  }

  getMyCustomers(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMyCustomers`, data)
  }

  getMyItems(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMyItems`, data)
  }

  addItem(companyPIBForm, itemIdForm, itemNameForm, unitOfMeasureForm, taxRateForm, typeForm, imageForm, countryOfOriginForm, 
    foreignItemNameForm, barcodeNumberForm, producerForm, customsRateForm, ekoTaxForm, exciseForm, minItemsForm, maxItemsForm, 
    descriptionForm, declarationForm, itemStatsForm, storageUnitsForm){
    const data = {
      companyPIB: companyPIBForm,
      itemId: itemIdForm,
      itemName: itemNameForm,
      unitOfMeasure: unitOfMeasureForm,
      taxRate: taxRateForm, 
      type: typeForm, 
      image: imageForm, 
      countryOfOrigin: countryOfOriginForm || null, 
      foreignItemName: foreignItemNameForm || null,
      barcodeNumber: barcodeNumberForm || null,  
      producer: producerForm || "",
      customsRate: customsRateForm || null,
      ekoTax: ekoTaxForm || null,
      excise: exciseForm || null,
      minItems: minItemsForm || null,
      maxItems: maxItemsForm || null,
      description: descriptionForm || null,
      declaration: declarationForm || null,
      itemStats: itemStatsForm,
      storageUnits: storageUnitsForm
    }
    return this.http.post(`${this.uri}/company/addItem`, data)
  }
}
