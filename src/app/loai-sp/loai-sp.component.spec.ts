import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiSPComponent } from './loai-sp.component';

describe('LoaiSPComponent', () => {
  let component: LoaiSPComponent;
  let fixture: ComponentFixture<LoaiSPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiSPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
