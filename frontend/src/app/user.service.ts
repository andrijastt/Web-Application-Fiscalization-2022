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
    // return this.http.post('http://localhost:4000/users/login', data)
  }

}

// На усменој одбрани кандидат мора самостално да инсталира све програме неопходне за
// исправан рад приложеног решења (уколико не постоје у рачунарској лабораторији).
// ovo znači da mogu da skinem pakete ko