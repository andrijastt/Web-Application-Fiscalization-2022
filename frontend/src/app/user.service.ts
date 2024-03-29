import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  get5latestReceipts(){
    return this.http.get(`${this.uri}/users/get5latestReceipts`)
  }

  changePassword(usernameForm, passwordForm){
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  getMyBuyer(usernameForm){
    const data = {
      username: usernameForm    
    }

    return this.http.post(`${this.uri}/users/getMyBuyer`, data)
  }

  searchItem(itemNameForm, itemProducerform){
    const data = {
      itemName: itemNameForm,
      producer: itemProducerform
    }

    return this.http.post(`${this.uri}/users/searchItem`, data)
  }
  
  getCheapestPrice(itemNameForm, itemProducerform, companyNameForm){
    const data = {
      itemName: itemNameForm,
      producer: itemProducerform,
      companyName: companyNameForm
    }

    return this.http.post(`${this.uri}/users/getCheapestPrice`, data)
  }

  getDistinctPlace(itemNameForm, itemProducerform, companyNameForm){
    const data = {
      itemName: itemNameForm,
      producer: itemProducerform,
      companyName: companyNameForm
    }

    return this.http.post(`${this.uri}/users/getDistinctPlace`, data)
  }

  getMyItems(companyNameForm){
    const data = {
      companyName: companyNameForm
    }

    return this.http.post(`${this.uri}/users/getMyItems`, data)
  }

  getMyReceipts(idCardForm){
    const data = {
      idCard: idCardForm
    }

    return this.http.post(`${this.uri}/users/getMyReceipts`, data)
  }
}
