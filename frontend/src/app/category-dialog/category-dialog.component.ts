import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) private data, 
  private companyService: CompanyService) { }

  ngOnInit(): void {
    this.categoryName = this.data.name
    this.myItems = this.data.items
    this.companyPIB = this.data.companyPIB
  }

  categoryName: string
  myItems: Item[]
  itemNameSearch: string = ""
  itemsSearch: Item[] = []
  companyPIB: number

  serachItem(){
    this.companyService.searchItem(this.itemNameSearch, this.companyPIB).subscribe((data: Item[])=>{
      this.itemsSearch = data
      this.itemNameSearch = ""
    })
  }

  setCategory(item: Item){
    this.companyService.setItemCategory(item.itemName, item.producer, this.companyPIB, this.categoryName).subscribe((resp)=>{
      alert(resp['message'])
    })
  }

  close(){
    this.dialogRef.close()
  }

}
