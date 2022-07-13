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

  insertData(categoryForm, activityCodesForm, PDVForm, bankAccountsForm, storageUnitsForm, objectsForm, registersForm, usernameForm, PIBForm){
    const data  = {
      category: categoryForm,
      activityCodes: activityCodesForm,
      PDV: PDVForm,
      bankAccounts: bankAccountsForm,
      storageUnits: storageUnitsForm,
      objects: objectsForm,
      registers: registersForm,
      username: usernameForm,
      PIB: PIBForm
    }

    return this.http.post(`${this.uri}/company/insertData`, data)
  }

  insertCompany(firstnameForm, lastnameForm, usernameForm, passwordFrom, telephoneNumberForm, emailForm, nameForm, countryForm,
    cityFrom, postNumberForm, streetNameForm, streetNumberFrom, PIBForm, JMBPForm, imageDataForm, categoryForm, activityCodesForm, 
    PDVForm, bankAccountsForm, storageUnitsForm, storesForm,registersForm){
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
      stores: storesForm,
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
    descriptionForm, declarationForm, itemStatsForm, itemStatsStoreForm){
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
      category: null,
      itemStats: itemStatsForm,
      itemStatsStore: itemStatsStoreForm
    }
    return this.http.post(`${this.uri}/company/addItem`, data)
  }

  createCategory(PIBForm, categoryNameForm){
    const data = {
      PIB: PIBForm,
      name: categoryNameForm
    }
    return this.http.post(`${this.uri}/company/createCategory`, data)
  }

  createSubCategory(PIBForm, categoryNameForm, subcategoryNameForm){
    const data = {
      PIB: PIBForm,
      name: categoryNameForm,
      subcategory: subcategoryNameForm
    }
    return this.http.post(`${this.uri}/company/createSubCategory`, data)
  }

  getMyCategories(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMyCategories`, data)
  }

  getMySubCategories(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMySubCategories`, data)
  }

  getMyRegisters(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMyRegisters`, data)
  }

  getMyStores(PIBForm){
    const data = { PIB: PIBForm }
    return this.http.post(`${this.uri}/company/getMyStores`, data)
  }

  searchItem(itemNameForm, PIBForm){
    const data = { 
      itemName: itemNameForm,
      PIB: PIBForm
    }
    return this.http.post(`${this.uri}/company/searchItem`, data)
  }

  setItemCategory(itemNameForm, itemProducerForm, PIBForm, categoryForm){
    const data = { 
      itemName: itemNameForm,
      producer: itemProducerForm,
      PIB: PIBForm,
      category: categoryForm
    }
    return this.http.post(`${this.uri}/company/setItemCategory`, data)
  }

  setItemSubCategory(itemNameForm, itemProducerForm, PIBForm, subcategoryForm){
    const data = { 
      itemName: itemNameForm,
      producer: itemProducerForm,
      PIB: PIBForm,
      subcategory: subcategoryForm
    }
    return this.http.post(`${this.uri}/company/setItemSubCategory`, data)
  }

  getMyPlaces(companyNameForm){
    const data = {
      companyName: companyNameForm
    }
    return this.http.post(`${this.uri}/company/getMyPlaces`, data)
  }

  getItemStats(companyNameForm, placeForm){
    const data = {
      companyName: companyNameForm,
      place: placeForm
    }
    return this.http.post(`${this.uri}/company/getItemStats`, data)
  }

  giveReceipt(selectedItemsForm, paymentTypeFrom, amountToPayForm, taxForm, moneyFrom, changeForm, idCardCashForm, firstNameBuyerForm, 
    lastNameBuyerForm, idCardMoneyCheckForm, idCardCreditCardForm, creditCardSlipForm, virmanCustomerForm, companyNameForm, companyPIBForm){
      let datePass = new Date()
      datePass.setHours(0, 0, 0, 0)
      const data = {
        selectedItems: selectedItemsForm,
        paymentType: paymentTypeFrom,
        amountToPay: amountToPayForm,
        tax: taxForm,
        money: moneyFrom,
        changeForm: changeForm,
        idCard: idCardCashForm || idCardMoneyCheckForm || idCardCreditCardForm,
        firstNameBuyer: firstNameBuyerForm,
        lastNameBuyer: lastNameBuyerForm,
        creditCardSlip: creditCardSlipForm,
        virmanCustomer: virmanCustomerForm,
        companyName: companyNameForm,
        companyPIB: companyPIBForm,
        date: new Date(),
        dateReview: datePass
      }
    return this.http.post(`${this.uri}/company/giveReceipt`, data)
  }

  getMyDailyReviews(companyPIBForm){
    const data = {
      companyPIB: companyPIBForm
    }
    return this.http.post(`${this.uri}/company/getMyDailyReviews`, data)
  }

  getDailyReview(companyPIBForm, dateForm){
    const data = {
      companyPIB: companyPIBForm,
      date: dateForm
    }
    return this.http.post(`${this.uri}/company/getDailyReview`, data)
  }

  getDepartmentsByPlace(companyPIBForm, storeNameForm){
    const data = {
      companyPIB: companyPIBForm,
      storeName: storeNameForm
    }
    return this.http.post(`${this.uri}/company/getDepartmentsByPlace`, data)
  }

  getMyTables(companyPIBForm, storeNameForm, departmentForm){
    const data = {
      companyPIB: companyPIBForm,
      storeName: storeNameForm,
      department: departmentForm
    }
    return this.http.post(`${this.uri}/company/getMyTables`, data)
  }

  setTableToTaken(companyPIBForm, storeNameForm, idForm){
    const data = {
      companyPIB: companyPIBForm,
      storeName: storeNameForm,
      id: idForm
    }
    return this.http.post(`${this.uri}/company/setTableToTaken`, data)
  }

  setTableToFree(companyPIBForm, storeNameForm, idForm){
    const data = {
      companyPIB: companyPIBForm,
      storeName: storeNameForm,
      id: idForm
    }
    return this.http.post(`${this.uri}/company/setTableToFree`, data)
  }

  updateCurrentState(itemStatForm){
    const data = {
      itemStat: itemStatForm
    }
    return this.http.post(`${this.uri}/company/updateCurrentState`, data)
  }

  updateTable(itemsForm, tableForm){
    const data = {
      items: itemsForm,
      table: tableForm
    }
    return this.http.post(`${this.uri}/company/updateTable`, data)
  }

  getDistinctTables(companyPIBForm){
    const data = {
      companyPIB: companyPIBForm
    }
    return this.http.post(`${this.uri}/company/getDistinctTables`, data)
  }

}
