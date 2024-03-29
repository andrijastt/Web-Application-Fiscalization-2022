import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  loginAdmin(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/admin/loginAdmin`, data)
  }

  insertUser(firstnameForm, lastnameForm, usernameForm, passwordFrom, telephoneNumberForm, idCardForm){
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordFrom,
      telephoneNumber: telephoneNumberForm,
      idCard: idCardForm
    }
    return this.http.post(`${this.uri}/admin/insertUser`, data)

  }

  getAllDailyReviews(){
    return this.http.get(`${this.uri}/admin/getAllDailyReviews`)

  }

  getSearchDailyReviews(companyNameSearchForm, companyPIBSearchForm, firstDayForm, lastDayForm){
    const data = {
      companyNameSearch: companyNameSearchForm,
      companyPIBSearch: companyPIBSearchForm,
      firstDay: firstDayForm,
      lastDay: lastDayForm
    }

    return this.http.post(`${this.uri}/admin/getSearchDailyReviews`, data)

  }
}
