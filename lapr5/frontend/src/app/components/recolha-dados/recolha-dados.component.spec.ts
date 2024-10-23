import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecolhaComponent } from './recolha-dados.component';

describe('RecolhaComponent', () => {
  let component: RecolhaComponent;
  let fixture: ComponentFixture< RecolhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecolhaComponent]
    });
    fixture = TestBed.createComponent( RecolhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});