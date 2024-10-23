import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { UpdatePassagemComponent } from './update-passagem.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('CreatePassagemComponent', () => {
  let component: UpdatePassagemComponent;
  let fixture: ComponentFixture<UpdatePassagemComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePassagemComponent],
      imports: [ReactiveFormsModule, BrowserModule, HttpClientTestingModule, FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePassagemComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    httpRequestsService = TestBed.inject(HttpRequestsService);
    fixture.detectChanges();
  });

  it('should update', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    spyOn(location, 'back');

    try {
      component.goBack();

      expect(location.back).toHaveBeenCalled();
    } catch (error) {
      console.error('Error in goBack test:', error);
      fail(error);
    }
  });

  it('should update elevador', fakeAsync(() => {

    spyOn(httpRequestsService, 'postRequest').and.returnValue(of({
      passagemId: '1',
      connection: [{ edificio: "1", piso: "2" }]
    }));
  
    component.updatePassagem("1","1,1","2,1");
   
    tick();

    expect(httpRequestsService.postRequest).toHaveBeenCalled();
  }));
});
