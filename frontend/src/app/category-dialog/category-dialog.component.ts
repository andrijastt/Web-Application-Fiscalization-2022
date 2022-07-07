import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CategoryDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

}
