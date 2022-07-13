import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company.service';
import { Item } from '../model/item';
import { SubCategory } from '../model/subCategory';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.css']
})
export class SubcategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SubcategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) private data, 
  private companyService: CompanyService) { }

  ngOnInit(): void {

    this.subcategory = this.data.name
    this.myItems = this.data.items
    this.companyPIB = this.data.companyPIB
  }

  subcategory: SubCategory
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
    this.companyService.setItemSubCategory(item.itemName, item.producer, this.companyPIB, this.subcategory).subscribe((resp)=>{
      alert(resp['message'])
    })
  }

  close(){
    this.dialogRef.close()
  }

}
