import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSupComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginSupComponent;
  let fixture: ComponentFixture<LoginSupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSupComponent]
    });
    fixture = TestBed.createComponent(LoginSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
