import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-first',
  templateUrl: './company-first.component.html',
  styleUrls: ['./company-first.component.css']
})
export class CompanyFirstComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate([''])
  }
}
