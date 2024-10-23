import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgavComponent } from './algav.component';

describe('AlgavComponent', () => {
  let component: AlgavComponent;
  let fixture: ComponentFixture<AlgavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
