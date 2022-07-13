import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDialogComponent } from './subcategory-dialog.component';

describe('SubcategoryDialogComponent', () => {
  let component: SubcategoryDialogComponent;
  let fixture: ComponentFixture<SubcategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
