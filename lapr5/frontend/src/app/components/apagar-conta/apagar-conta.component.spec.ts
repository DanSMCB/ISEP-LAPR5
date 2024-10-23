import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarContaComponent } from './apagar-conta.component';

describe('ApagarContaComponent', () => {
  let component: ApagarContaComponent;
  let fixture: ComponentFixture< ApagarContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ApagarContaComponent]
    });
    fixture = TestBed.createComponent( ApagarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});