import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFirstComponent } from './company-first.component';

describe('CompanyFirstComponent', () => {
  let component: CompanyFirstComponent;
  let fixture: ComponentFixture<CompanyFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
