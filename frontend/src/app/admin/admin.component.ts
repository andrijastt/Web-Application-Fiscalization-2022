import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company';
import { User } from '../model/user';
import { RegisterCompanyService } from '../register-company.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private registerCompanyService: RegisterCompanyService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.registerCompanyService.getAllRegisterCompany().subscribe((data: Company[])=>{
      this.registerCompanys = data
    })
  }

  user: User
  registerCompanys: Company[] = []

  logout(){
    this.router.navigate([''])
  }

  accept(username, password){
    this.registerCompanyService.accept(username, password).subscribe((resp)=>{
      alert(resp['message'])
      location.reload()
    })
  }

  decline(username){
    this.registerCompanyService.decline(username).subscribe((resp)=>{
      alert(resp['message'])
      location.reload()
    })
  }
}
