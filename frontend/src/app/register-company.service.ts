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
      status: "novo",
      firstTime: true
    }
    

    return this.http.post(`${this.uri}/company/Register`, data)
  }
}
