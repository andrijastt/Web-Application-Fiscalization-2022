import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  register(firstnameForm, lastnameForm, usernameForm, passwordFrom, telephoneNumberForm, emailForm, nameForm, countryForm,
    cityFrom, postNumberForm, streetNameForm, streetNumberFrom, PIBForm, JMBPForm, imageDataForm){
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
      status: "new",
      firstTime: true,
      active: true,
      category: null,
      activityCodes: null,
      PDV: null,
      bankAccounts: null,
      storageUnits: null,
      registers: null,
    }
  
    return this.http.post(`${this.uri}/company/Register`, data)
  }

  checkFirstTime(usernameForm){
    const data = { username: usernameForm }
    return this.http.post(`${this.uri}/company/checkFirstTime`, data)
  }

  getAllRegisterCompany(){
    return this.http.get(`${this.uri}/company/getAllRegisterCompany`)
  }

  accept(usernameForm, passwordForm){
    const data = { 
      username: usernameForm,
      password: passwordForm,
      type: 1
    }
    return this.http.post(`${this.uri}/company/accept`, data)
  }

  decline(usernameForm){
    const data = { username: usernameForm}
    return this.http.post(`${this.uri}/company/decline`, data)
  }
}
