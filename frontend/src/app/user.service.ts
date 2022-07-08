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

  getDistinctStorageUnits(itemNameForm, itemProducerform, companyNameForm){
    const data = {
      itemName: itemNameForm,
      producer: itemProducerform,
      companyName: companyNameForm
    }

    return this.http.post(`${this.uri}/users/getDistinctStorageUnits`, data)
  }

  getMyItems(companyNameForm){
    const data = {
      companyName: companyNameForm
    }

    return this.http.post(`${this.uri}/users/getMyItems`, data)
  }

  
}
